"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

// Custom shader plane component
function ImagePlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Load the hero image texture
  const texture = useTexture("/hero.jpg");

  // Custom shader definition
  const shaderData = useMemo(() => {
    return {
      uniforms: {
        uTexture: { value: texture },
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uHover: { value: 0.0 },
      },
      vertexShader: `
        varying vec2 vUv;
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uHover;

        void main() {
          vUv = uv;
          vec3 pos = position;

          // Subtle background wave / breathing
          float waveX = sin(pos.y * 2.0 + uTime * 1.0) * 0.03;
          float waveY = cos(pos.x * 2.0 + uTime * 1.0) * 0.03;

          // Interactive vertex warp when mouse is close
          float dist = distance(uv, uMouse);
          float force = smoothstep(0.4, 0.0, dist);
          
          // Displace vertices on the Z-axis
          pos.z += (waveX + waveY) * (1.0 - uHover * 0.4) + sin(uTime * 3.0 + pos.x * 8.0) * 0.06 * force * uHover;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D uTexture;
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uHover;

        void main() {
          vec2 uv = vUv;

          // Calculate vector from mouse to UV
          vec2 mouseDir = uv - uMouse;
          float dist = length(mouseDir);
          float force = smoothstep(0.5, 0.0, dist) * uHover;

          // Liquid wave distortion on UV based on hover force
          float wave = sin(dist * 20.0 - uTime * 4.0) * 0.012 * force;
          uv += normalize(mouseDir) * wave;

          // Extra subtle micro-ripples
          uv.x += sin(uv.y * 15.0 + uTime * 0.8) * 0.0015 * (1.0 - uHover * 0.6);
          uv.y += cos(uv.x * 15.0 + uTime * 0.8) * 0.0015 * (1.0 - uHover * 0.6);

          // Chromatic aberration (RGB Split)
          // Since the portrait is high contrast black-and-white, separating channels 
          // yields gorgeous red and cyan fringes along the subject edges.
          float rOffset = 0.003 + 0.015 * force;
          float bOffset = -0.003 - 0.015 * force;

          vec4 texColorR = texture2D(uTexture, uv + vec2(rOffset, 0.0));
          vec4 texColorG = texture2D(uTexture, uv);
          vec4 texColorB = texture2D(uTexture, uv + vec2(bOffset, 0.0));

          gl_FragColor = vec4(texColorR.r, texColorG.g, texColorB.b, 1.0);
        }
      `
    };
  }, [texture]);

  // Framerate-independent animation loop
  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current) return;

    // 1. Hover state lerping
    const targetHover = isHovered ? 1.0 : 0.0;
    materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
      materialRef.current.uniforms.uHover.value,
      targetHover,
      0.08
    );

    // 2. Time uniform increment
    materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();

    // 3. Mouse pointer tracking and lerping (mapped from [-1, 1] to [0, 1] for shaders)
    const rawPointerX = (state.pointer.x + 1) / 2;
    const rawPointerY = (state.pointer.y + 1) / 2;

    materialRef.current.uniforms.uMouse.value.x = THREE.MathUtils.lerp(
      materialRef.current.uniforms.uMouse.value.x,
      rawPointerX,
      0.1
    );
    materialRef.current.uniforms.uMouse.value.y = THREE.MathUtils.lerp(
      materialRef.current.uniforms.uMouse.value.y,
      rawPointerY,
      0.1
    );

    // 4. Smooth mesh tilt rotation based on mouse coordinates
    const tiltAngleY = (state.pointer.x * Math.PI) / 10;  // horizontal tilt
    const tiltAngleX = -(state.pointer.y * Math.PI) / 10; // vertical tilt

    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, tiltAngleY, 0.08);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, tiltAngleX, 0.08);

    // 5. Idle breathing float animation
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      {/* 3:4 Aspect Ratio Plane */}
      <planeGeometry args={[3, 4, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        args={[shaderData]}
        transparent
      />
    </mesh>
  );
}

export default function Hero3D() {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={1.5} />
        <ImagePlane />
      </Canvas>
    </div>
  );
}
