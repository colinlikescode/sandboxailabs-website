"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const noise = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const orbVertex = /* glsl */ `
uniform float uTime;
uniform float uEnergy;
varying vec3 vNormal;
varying vec3 vView;
varying float vNoise;
${noise}
void main(){
  float n = snoise(position * 1.4 + uTime * 0.35);
  n += 0.5 * snoise(position * 3.0 - uTime * 0.5);
  vNoise = n;
  vec3 displaced = position + normal * n * (0.11 + uEnergy * 0.12);
  vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
  vNormal = normalize(normalMatrix * normal);
  vView = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}`;

const orbFragment = /* glsl */ `
uniform float uTime;
varying vec3 vNormal;
varying vec3 vView;
varying float vNoise;
void main(){
  float fres = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.2);
  vec3 rose = vec3(1.0, 0.22, 0.42);
  vec3 violet = vec3(0.43, 0.16, 0.85);
  vec3 amber = vec3(1.0, 0.62, 0.35);
  vec3 deep = vec3(0.16, 0.02, 0.12);
  float t = smoothstep(-0.8, 0.9, vNoise);
  vec3 col = mix(deep, rose, t);
  col = mix(col, violet, smoothstep(0.2, 1.0, vNormal.x * 0.5 + 0.5 - vNormal.y * 0.4));
  col += amber * pow(max(vNoise, 0.0), 3.0) * 0.8;
  float spec = pow(max(dot(reflect(-normalize(vec3(-0.5, 0.8, 0.6)), vNormal), vView), 0.0), 24.0);
  col += vec3(1.0) * spec * 0.6;
  col += mix(rose, vec3(1.0, 0.75, 0.85), fres) * fres * 0.8;
  gl_FragColor = vec4(col, 1.0);
}`;

const glowVertex = /* glsl */ `
varying vec3 vNormal;
varying vec3 vView;
void main(){
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vNormal = normalize(normalMatrix * normal);
  vView = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}`;

const glowFragment = /* glsl */ `
varying vec3 vNormal;
varying vec3 vView;
void main(){
  float i = pow(0.62 - dot(vNormal, vView), 3.0);
  gl_FragColor = vec4(1.0, 0.25, 0.45, 1.0) * i * 0.9;
}`;

const particleVertex = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
attribute float aSpeed;
attribute float aSize;
varying float vAlpha;
void main(){
  float a = uTime * aSpeed;
  float c = cos(a), s = sin(a);
  vec3 p = vec3(position.x * c - position.z * s, position.y, position.x * s + position.z * c);
  p.y += sin(uTime * 0.8 + position.x * 3.0) * 0.05;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = aSize * uPixelRatio * (6.0 / -mv.z);
  vAlpha = smoothstep(-2.5, 1.5, p.z);
}`;

const particleFragment = /* glsl */ `
varying float vAlpha;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  gl_FragColor = vec4(1.0, 0.8, 0.88, a * vAlpha * 0.9);
}`;

export default function AgentOrb() {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mount.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(pixelRatio);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.z = 9.5;

    const group = new THREE.Group();
    scene.add(group);

    const orbUniforms = { uTime: { value: 0 }, uEnergy: { value: 0 } };
    const orb = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1, 64),
      new THREE.ShaderMaterial({ vertexShader: orbVertex, fragmentShader: orbFragment, uniforms: orbUniforms })
    );
    group.add(orb);

    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(1.3, 64, 64),
      new THREE.ShaderMaterial({
        vertexShader: glowVertex,
        fragmentShader: glowFragment,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
      })
    );
    group.add(glow);

    const count = 1400;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const ring = i % 3;
      const r = 1.5 + ring * 0.35 + Math.random() * 0.25;
      const theta = Math.random() * Math.PI * 2;
      const spread = ring === 0 ? 0.04 : 0.12 + Math.random() * 0.1;
      positions.set([Math.cos(theta) * r, (Math.random() - 0.5) * spread * r, Math.sin(theta) * r], i * 3);
      speeds[i] = (0.08 + Math.random() * 0.12) * (ring === 1 ? -1 : 1);
      sizes[i] = 2 + Math.random() * 6;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));
    pGeo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    const pUniforms = { uTime: { value: 0 }, uPixelRatio: { value: pixelRatio } };
    const particles = new THREE.Points(
      pGeo,
      new THREE.ShaderMaterial({
        vertexShader: particleVertex,
        fragmentShader: particleFragment,
        uniforms: pUniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    particles.rotation.x = 0.35;
    particles.rotation.z = -0.15;
    scene.add(particles);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = el;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    const pointer = { x: 0, y: 0, energy: 0 };
    const target = { x: 0, y: 0, energy: 0 };
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
      target.energy = 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(el);

    const start = performance.now();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const t = reduced ? 0 : (performance.now() - start) / 1000;
      target.energy *= 0.96;
      pointer.x += (target.x - pointer.x) * 0.05;
      pointer.y += (target.y - pointer.y) * 0.05;
      pointer.energy += (target.energy - pointer.energy) * 0.05;

      orbUniforms.uTime.value = t;
      orbUniforms.uEnergy.value = pointer.energy;
      pUniforms.uTime.value = t;
      group.rotation.y = t * 0.15 + pointer.x * 0.4;
      group.rotation.x = pointer.y * 0.3;
      particles.rotation.y = pointer.x * 0.2;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh || o instanceof THREE.Points) {
          o.geometry.dispose();
          (o.material as THREE.Material).dispose();
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mount} className="absolute inset-0" />;
}
