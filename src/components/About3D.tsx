"use client";

import { useRef, useEffect, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations, Environment, Html } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

// Suppress THREE.Clock deprecation warnings inside R3F
if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    if (args[0] && typeof args[0] === "string" && args[0].includes("THREE.Clock")) return;
    originalWarn(...args);
  };
}

// 3D Poses definitions for the Avatar Head across sections
const SECTION_POSES: Record<number, { position: [number, number, number]; scale: [number, number, number]; rotation: [number, number, number] }> = {
  0: { // Hero / Landing
    position: [0, 0, 0],
    scale: [0.576, 0.576, 0.576],
    rotation: [0, 0, 0]
  },
  1: { // Creative Design Ch.
    position: [0, 0, 0],
    scale: [0.576, 0.576, 0.576],
    rotation: [0, 0, 0]
  },
  2: { // Engineering Ch.
    position: [0, 0, 0],
    scale: [0.576, 0.576, 0.576],
    rotation: [0, 0, 0]
  },
  3: { // User Experience Ch.
    position: [0, 0, 0],
    scale: [0.576, 0.576, 0.576],
    rotation: [0, 0, 0]
  },
  4: { // Obsession & Conclusion
    position: [0, 0, 0],
    scale: [0.576, 0.576, 0.576],
    rotation: [0, 0, 0]
  },
  5: { // Showcase
    position: [0, 0, 0],
    scale: [0.576, 0.576, 0.576],
    rotation: [0, 0, 0]
  },
  6: { // Projects / Tunnel Backdrop
    position: [0, 0, -3.2],
    scale: [0.23, 0.23, 0.23],
    rotation: [0, 0, 0]
  }
};

interface AvatarModelProps {
  activeSection: number;
  tapData: { x: number; y: number; trigger: number };
  mouse: { x: number; y: number };
}

function AvatarModel({ activeSection, tapData, mouse }: AvatarModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const tapLightRef = useRef<THREE.PointLight>(null);
  const headMeshRef = useRef<THREE.Mesh | null>(null);

  // Expose activeSection to ref to prevent R3F stale closures
  const activeSectionRef = useRef(activeSection);
  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  // Load avatar glb and setup animations
  const { scene, animations } = useGLTF("/chrome_avatar_blinking.glb");
  const { actions } = useAnimations(animations, groupRef);

  // Position, breathing, and wobble physics states
  const basePosition = useRef(new THREE.Vector3(0, 0, 0));
  const wobblePosition = useRef({ x: 0, y: 0, z: 0 });
  const wobbleRotation = useRef({ x: 0, y: 0, z: 0 });
  const mouseLookRotation = useRef({ x: 0, y: 0 });

  // 1. Traverse mesh to apply chrome materials, set corrective rotation, and play blinking animations on load
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshPhysicalMaterial({
          metalness: 1.0,
          roughness: 0.1,
          clearcoat: 1.0,
          clearcoatRoughness: 0.05,
          color: new THREE.Color("#f3f3f3"),
        });
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Store reference to the head mesh containing shape keys
        if (mesh.morphTargetInfluences) {
          headMeshRef.current = mesh;
        }
      }
    });

    // Pitch: 0.4 rad (tilts face down to look straight at screen), Yaw: -0.85 rad (aligns face forward)
    scene.rotation.set(0.4, -0.85, 0);

    // Play shape key blink action loop
    const blinkAction = actions["white_mesh (1)Action.004"];
    if (blinkAction) {
      blinkAction.reset().fadeIn(0.5).play();
      blinkAction.setLoop(THREE.LoopRepeat, Infinity);
    }
  }, [actions, scene]);

  // 2. Click Tap interactive GSAP recoil and eye-shut triggers
  const lastTapTrigger = useRef(tapData.trigger);
  useEffect(() => {
    if (tapData.trigger > lastTapTrigger.current) {
      lastTapTrigger.current = tapData.trigger;
      const group = groupRef.current;
      if (!group) return;

      const currentSection = activeSectionRef.current;
      const pose = SECTION_POSES[currentSection] || SECTION_POSES[0];

      // Kill active tweens to prevent stacking
      gsap.killTweensOf(wobblePosition.current);
      gsap.killTweensOf(wobbleRotation.current);
      gsap.killTweensOf(group.scale);

      // Stop natural blinking animation loop completely to release morph target control
      const blinkAction = actions["white_mesh (1)Action.004"];
      if (blinkAction) {
        blinkAction.stop();
      }

      if (headMeshRef.current && headMeshRef.current.morphTargetInfluences) {
        gsap.killTweensOf(headMeshRef.current.morphTargetInfluences);

        // Instantly shut eyes at the moment of impact (t = 0)
        headMeshRef.current.morphTargetInfluences[0] = 1.0;

        // Keep them closed for 1.45s (during all primary dizzy swings), then open smoothly over 0.4s
        gsap.to(headMeshRef.current.morphTargetInfluences, {
          0: 0.0,
          delay: 1.45,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => {
            if (blinkAction) {
              blinkAction.play();
            }
          }
        });
      }

      // Click Recoil translation: snap back 1.2 units on Z and shift on X/Y relative to click
      const recoilPosX = tapData.x * 0.18;
      const recoilPosY = -tapData.y * 0.18;
      const recoilPosZ = -1.2;

      gsap.timeline()
        .to(wobblePosition.current, { x: recoilPosX, y: recoilPosY, z: recoilPosZ, duration: 0.05, ease: "power2.out" })
        .to(wobblePosition.current, { 
          x: -recoilPosX * 0.75, 
          y: -recoilPosY * 0.75, 
          z: -recoilPosZ * 0.35, 
          duration: 0.48, 
          ease: "power2.out" 
        }, "+=0.04")
        .to(wobblePosition.current, { 
          x: recoilPosX * 0.5, 
          y: recoilPosY * 0.5, 
          z: recoilPosZ * 0.15, 
          duration: 0.45, 
          ease: "power2.inOut" 
        })
        .to(wobblePosition.current, { 
          x: -recoilPosX * 0.2, 
          y: -recoilPosY * 0.2, 
          z: -recoilPosZ * 0.06, 
          duration: 0.45, 
          ease: "power2.inOut" 
        })
        .to(wobblePosition.current, { x: 0, y: 0, z: 0, duration: 0.6, ease: "power2.inOut" });

      // Click Recoil rotation: wide dizzy head shakes
      const baseRecoilY = (Math.random() > 0.5 ? 1 : -1) * gsap.utils.random(0.85, 1.05);
      const baseRecoilX = gsap.utils.random(-0.2, 0.15);
      const baseRecoilZ = (Math.random() > 0.5 ? 1 : -1) * gsap.utils.random(0.15, 0.25);

      const recoilX = baseRecoilX + tapData.y * 0.45;
      const recoilY = baseRecoilY - tapData.x * 0.6;
      const recoilZ = baseRecoilZ - tapData.x * 0.3;

      gsap.timeline()
        .to(wobbleRotation.current, { x: recoilX, y: recoilY, z: recoilZ, duration: 0.05, ease: "power2.out" })
        .to(wobbleRotation.current, { 
          x: -recoilX * 0.12, 
          y: -recoilY * 0.12, 
          z: -recoilZ * 0.12, 
          duration: 0.5, 
          ease: "power2.out" 
        }, "+=0.04")
        .to(wobbleRotation.current, { 
          x: recoilX * 0.08, 
          y: recoilY * 0.08, 
          z: recoilZ * 0.08, 
          duration: 0.45, 
          ease: "power2.inOut" 
        })
        .to(wobbleRotation.current, { 
          x: -recoilX * 0.05, 
          y: -recoilY * 0.05, 
          z: -recoilZ * 0.05, 
          duration: 0.45, 
          ease: "power2.inOut" 
        })
        .to(wobbleRotation.current, { x: 0, y: 0, z: 0, duration: 0.6, ease: "power2.inOut" });

      // Scale pop: grows 20% over 0.15s, then returns
      gsap.timeline()
        .to(group.scale, {
          x: pose.scale[0] * 1.2,
          y: pose.scale[1] * 1.2,
          z: pose.scale[2] * 1.2,
          duration: 0.15,
          ease: "power2.out",
        })
        .to(group.scale, {
          x: pose.scale[0],
          y: pose.scale[1],
          z: pose.scale[2],
          duration: 0.35,
          ease: "power2.inOut",
        });

      // Emissive blue light glow flash
      if (tapLightRef.current) {
        gsap.killTweensOf(tapLightRef.current);
        gsap.fromTo(
          tapLightRef.current,
          { intensity: 12.0 },
          {
            intensity: 0.0,
            duration: 1.2,
            ease: "power2.out",
          }
        );
      }
    }
  }, [tapData]);

  // 3. Main R3F loop: updates positions and look-at rotations
  // 3. Main R3F loop: updates positions and look-at rotations
  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();

    // Retrieve base pose data based on active section
    const currentSection = activeSectionRef.current;
    const pose = SECTION_POSES[currentSection] || SECTION_POSES[0];

    // Organic breathing float frequency mapping
    const idleFloatY = Math.sin(time * 0.8) * 0.04;

    // Guide the base position smoothly (pose transition + breathing drift)
    if (currentSection === 6) {
      // Head falls together with camera, offset 3.2 units in front and dead-centered
      const localOffset = new THREE.Vector3(0, 0, -3.2);
      const targetPos = localOffset.applyQuaternion(state.camera.quaternion).add(state.camera.position);
      // Add idle vertical bobbing relative to camera up vector
      const upVector = new THREE.Vector3(0, 1, 0).applyQuaternion(state.camera.quaternion);
      targetPos.addScaledVector(upVector, idleFloatY);

      basePosition.current.lerp(targetPos, 0.15);
    } else {
      basePosition.current.x = THREE.MathUtils.lerp(basePosition.current.x, pose.position[0], 0.05);
      basePosition.current.y = THREE.MathUtils.lerp(
        basePosition.current.y,
        pose.position[1] + idleFloatY,
        0.05
      );
      basePosition.current.z = THREE.MathUtils.lerp(basePosition.current.z, pose.position[2], 0.05);
    }

    // Set actual position as a direct sum of base position and additive wobble translation
    groupRef.current.position.copy(basePosition.current);
    groupRef.current.position.x += wobblePosition.current.x;
    groupRef.current.position.y += wobblePosition.current.y;
    groupRef.current.position.z += wobblePosition.current.z;

    // Breathing-scale pulse
    const breathingScale = 1.0 + Math.sin(time * 2.0) * 0.01;
    
    let baseScaleX = pose.scale[0];
    let baseScaleY = pose.scale[1];
    let baseScaleZ = pose.scale[2];

    if (currentSection === 5 && typeof window !== "undefined" && window.innerWidth < 768) {
      // Shrink head scale on mobile to avoid overlapping the showcase cards
      baseScaleX = 0.3;
      baseScaleY = 0.3;
      baseScaleZ = 0.3;
    }
    
    if (!gsap.isTweening(groupRef.current.scale)) {
      groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, baseScaleX * breathingScale, 0.05);
      groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y, baseScaleY * breathingScale, 0.05);
      groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, baseScaleZ * breathingScale, 0.05);
    }

    // Mouse Look-At Tracking: Guide look-at rotation smoothly in the background
    const targetLookX = -(mouse.y * Math.PI) / 8; // vertical tilt (up/down)
    const targetLookY = (mouse.x * Math.PI) / 6;  // horizontal rotation (left/right)

    mouseLookRotation.current.x = THREE.MathUtils.lerp(mouseLookRotation.current.x, targetLookX, 0.08);
    mouseLookRotation.current.y = THREE.MathUtils.lerp(mouseLookRotation.current.y, targetLookY, 0.08);

    // Set actual rotation as a direct sum of base pose rotation, look-at tracking, and springy wobble rotation
    groupRef.current.rotation.x = pose.rotation[0] + mouseLookRotation.current.x + wobbleRotation.current.x;
    groupRef.current.rotation.y = pose.rotation[1] + mouseLookRotation.current.y + wobbleRotation.current.y;
    groupRef.current.rotation.z = pose.rotation[2] + wobbleRotation.current.z;

    // Reset light position back to default coordinates once tap finishes
    if (tapLightRef.current && !gsap.isTweening(tapLightRef.current.position)) {
      tapLightRef.current.position.set(0, 0.3, 1.5);
    }
  });

  return (
    <group ref={groupRef} dispose={null} scale={[0.576, 0.576, 0.576]} position={[0, 0, 0]}>
      {/* Front key light to illuminate the chrome face during tunnel travel */}
      <directionalLight position={[1, 1, 3]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-1, 1.5, 2.5]} intensity={0.5} color="#ffffff" />

      {/* Front PointLight for blue emissive click glow effect */}
      <pointLight
        ref={tapLightRef}
        color="#0066ff"
        intensity={0}
        distance={2.0}
        position={[0, 0.3, 1.5]}
      />
      <primitive object={scene} />
    </group>
  );
}

const CosmicTunnelBackdropShader = {
  uniforms: {
    uTime: { value: 0 },
    uOpacity: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform float uOpacity;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv - vec2(0.5);
      float r = length(uv);

      vec3 colorCream = vec3(0.98, 0.97, 0.96); // #FAF8F5
      vec3 colorRed = vec3(0.87, 0.20, 0.13);   // #de3421

      // Circular glowing wormhole core (exponential decay)
      float core = exp(-r * 8.0);
      float halo = exp(-r * 3.0) * 0.65;

      vec3 finalColor = mix(colorRed, colorCream, core / (core + halo + 0.001));

      // Make the backdrop plane transparent outside the glowing core region
      float alpha = clamp(core + halo, 0.0, 1.0) * uOpacity;
      
      // Apply smooth radial fall-off to the alpha channel
      alpha *= smoothstep(0.5, 0.2, r);

      gl_FragColor = vec4(finalColor, alpha);
    }
  `
};

function WarpTunnelBackdrop({ activeSection }: { activeSection: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const opacityRef = useRef(0);

  const activeSectionRef = useRef(activeSection);
  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    const time = state.clock.getElapsedTime();
    materialRef.current.uniforms.uTime.value = time;

    // Lock backdrop position in front of camera at constant Z offset (Z=-25)
    meshRef.current.position.set(
      state.camera.position.x,
      state.camera.position.y,
      state.camera.position.z - 25.0
    );

    // Keep it facing flat towards the camera
    meshRef.current.quaternion.copy(state.camera.quaternion);

    const currentSection = activeSectionRef.current;
    const targetOpacity = currentSection === 6 ? 1.0 : 0.0;
    opacityRef.current = THREE.MathUtils.lerp(opacityRef.current, targetOpacity, 0.08);
    materialRef.current.uniforms.uOpacity.value = opacityRef.current;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -25.0]} renderOrder={-1}>
      <planeGeometry args={[18, 18]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={CosmicTunnelBackdropShader.vertexShader}
        fragmentShader={CosmicTunnelBackdropShader.fragmentShader}
        uniforms={CosmicTunnelBackdropShader.uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

const CosmicTunnelCylinderShader = {
  uniforms: {
    uTime: { value: 0 },
    uOpacity: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform float uOpacity;
    varying vec2 vUv;

    float fbm(vec2 uv) {
      float f = 0.0;
      f += 0.5000 * sin(uv.x * 3.0 + uv.y * 2.0 + uTime * 0.4);
      f += 0.2500 * sin(uv.x * 6.0 - uv.y * 4.0 - uTime * 0.6);
      f += 0.1250 * sin(uv.x * 12.0 + uv.y * 8.0 + uTime * 0.8);
      return f * 0.5 + 0.5;
    }

    void main() {
      // 1. Generate sharp, glowing warp-speed light streaks in three layers
      // Scaled differently to have variable length, speed, and density
      float whiteStreaks = smoothstep(0.6, 0.99, sin(vUv.x * 90.0 + vUv.y * 8.0 - uTime * 20.0) * 0.5 + 0.5);
      float goldStreaks = smoothstep(0.65, 0.98, sin(vUv.x * 50.0 + vUv.y * 14.0 - uTime * 28.0) * 0.5 + 0.5);
      float redStreaks = smoothstep(0.6, 0.97, sin(vUv.x * 70.0 - vUv.y * 10.0 - uTime * 14.0) * 0.5 + 0.5);

      // 2. High-contrast swirling nebula clouds
      vec2 nebulaUV = vec2(vUv.x * 2.0 + sin(vUv.y * 4.0 - uTime * 0.3) * 0.15, vUv.y * 2.0 - uTime * 0.25);
      float cloudVal = fbm(nebulaUV * 6.0);
      float cloudRed = pow(cloudVal, 3.5) * 2.2;
      float cloudAmber = pow(fbm(nebulaUV * 10.0 + vec2(1.0, 1.0)), 3.0) * 1.6;

      // Color Palette Vectors
      vec3 colorCream = vec3(0.98, 0.97, 0.96); // #FAF8F5 (cream)
      vec3 colorRed = vec3(0.87, 0.20, 0.13);   // #de3421 (brand red)
      vec3 colorBlack = vec3(0.04, 0.04, 0.04); // #0A0A0A (dark background)
      vec3 colorAmber = vec3(0.88, 0.63, 0.13); // #e2a222 (amber gold)

      // Base: mix gas filaments into dark space
      vec3 finalColor = colorBlack;
      finalColor = mix(finalColor, colorRed, cloudRed * 0.8);
      finalColor = mix(finalColor, colorAmber, cloudAmber * 0.65);

      // Additive blending for volumetric-looking light trails
      finalColor += colorRed * redStreaks * 1.5;
      finalColor += colorAmber * goldStreaks * 1.8;
      finalColor += colorCream * whiteStreaks * 2.5;

      // Fade out at ends of tube to prevent harsh clipping boundaries
      float fade = smoothstep(0.0, 0.12, vUv.y) * smoothstep(1.0, 0.85, vUv.y);
      finalColor = mix(colorBlack, finalColor, fade);

      gl_FragColor = vec4(finalColor, uOpacity);
    }
  `
};

function WarpTunnelCylinder({ activeSection }: { activeSection: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const opacityRef = useRef(0);

  const activeSectionRef = useRef(activeSection);
  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current) return;

    const time = state.clock.getElapsedTime();
    const dt = Math.min(delta, 0.1);

    materialRef.current.uniforms.uTime.value = time;

    meshRef.current.position.set(
      state.camera.position.x,
      state.camera.position.y,
      -10.0
    );

    const currentSection = activeSectionRef.current;
    const speed = currentSection === 6 ? 0.008 : 0.002;
    meshRef.current.rotation.y += speed * 60 * dt;

    const targetOpacity = currentSection === 6 ? 1.0 : 0.0;
    opacityRef.current = THREE.MathUtils.lerp(opacityRef.current, targetOpacity, 0.08);
    materialRef.current.uniforms.uOpacity.value = opacityRef.current;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -10.0]} rotation={[Math.PI / 2, 0, 0]} renderOrder={-2}>
      {/* 64x64 segments subdivision ensures smooth perspective coordinate mapping inside tube */}
      <cylinderGeometry args={[3.2, 3.2, 45, 64, 64, true]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={CosmicTunnelCylinderShader.vertexShader}
        fragmentShader={CosmicTunnelCylinderShader.fragmentShader}
        uniforms={CosmicTunnelCylinderShader.uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Starfield({ activeSection }: { activeSection: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1500;

  const activeSectionRef = useRef(activeSection);
  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  // Initialize random positions and brand colors for the stars in a cylindrical tunnel
  const [positions, speeds, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sp = new Float32Array(count);
    const cols = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.6 + Math.random() * 7.4;
      const z = Math.random() * 32 - 22;

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius;
      pos[i * 3 + 2] = z;

      sp[i] = 0.04 + Math.random() * 0.12;

      const rand = Math.random();
      if (rand < 0.5) {
        // Cream White (#FAF8F5)
        cols[i * 3] = 0.98;
        cols[i * 3 + 1] = 0.97;
        cols[i * 3 + 2] = 0.96;
      } else if (rand < 0.9) {
        // Brand Red (#de3421)
        cols[i * 3] = 0.87;
        cols[i * 3 + 1] = 0.20;
        cols[i * 3 + 2] = 0.13;
      } else {
        // Gold/Amber (#e2a222)
        cols[i * 3] = 0.88;
        cols[i * 3 + 1] = 0.63;
        cols[i * 3 + 2] = 0.13;
      }
    }
    return [pos, sp, cols];
  }, []);

  const speedFactor = useRef(0);
  const opacityFactor = useRef(0);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const currentSection = activeSectionRef.current;

    const targetSpeed = currentSection === 6 ? 1.0 : 0.0;
    speedFactor.current = THREE.MathUtils.lerp(speedFactor.current, targetSpeed, 0.05);

    const targetOpacity = currentSection === 6 ? 0.75 : 0.0;
    opacityFactor.current = THREE.MathUtils.lerp(opacityFactor.current, targetOpacity, 0.05);

    const mat = pointsRef.current.material as THREE.PointsMaterial;
    if (mat) {
      mat.opacity = opacityFactor.current;
    }

    const geo = pointsRef.current.geometry;
    const posArr = geo.attributes.position.array as Float32Array;
    const dt = Math.min(delta, 0.1);

    for (let i = 0; i < count; i++) {
      const speed = (0.015 + speeds[i] * 0.85) * speedFactor.current + 0.002;
      posArr[i * 3 + 2] += speed * 60 * dt;

      if (posArr[i * 3 + 2] > 5) {
        posArr[i * 3 + 2] = -27;
        const angle = Math.random() * Math.PI * 2;
        const radius = 1.6 + Math.random() * 7.4;
        posArr[i * 3] = Math.cos(angle) * radius;
        posArr[i * 3 + 1] = Math.sin(angle) * radius;
      }
    }

    geo.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.z += (0.015 * speedFactor.current + 0.002) * 60 * dt;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors={true}
        size={0.038}
        sizeAttenuation={true}
        transparent={true}
        opacity={0}
        depthWrite={false}
      />
    </points>
  );
}

const PROJECTS_LIST = [
  {
    id: "aether-net",
    number: "01",
    title: "AETHER-NET",
    category: "AI & Neural Graphics Pipeline",
    year: "2026",
    description: "An experimental neural field generator that bakes high-dimensional representations of scenes into low-latency WebGL shaders. Drastically speeds up real-time Gaussian Splatting and NeRF visualization in-browser.",
    tech: ["Three.js", "GLSL Shaders", "PyTorch", "WebGL 2.0"],
    color: "#f5e1cd",
    accentColor: "#de3421",
    githubLink: "https://github.com/RazeO1/aether-net",
    liveLink: "#",
    z: -4,
    x: 1.5,
    y: 0.05,
    isRight: true
  },
  {
    id: "khepri",
    number: "02",
    title: "KHEPRI ENGINE",
    category: "Interactive Vector Physics Editor",
    year: "2025",
    description: "A browser-based vector modeling canvas driven by a custom WASM physical solver engine. Supports structural constraints, rigid-body joints, and real-time tension stress heat-mapping.",
    tech: ["Rust", "WASM", "Canvas2D", "GSAP Core"],
    color: "#ebc299",
    accentColor: "#d5802a",
    githubLink: "https://github.com/RazeO1/khepri",
    liveLink: "#",
    z: -13,
    x: -1.5,
    y: -0.15,
    isRight: false
  },
  {
    id: "nox",
    number: "03",
    title: "NOX SPATIAL",
    category: "Generative Audio Ambient Player",
    year: "2025",
    description: "A procedural spatial audio synthesizer that maps cursor coordinates, local weather, and page interaction velocity into a continuous ambient soundscape. Visualizes frequency nodes in real time.",
    tech: ["Tone.js", "Web Audio API", "HTML5 Canvas", "Tailwind CSS"],
    color: "#e2dbd4",
    accentColor: "#9b8064",
    githubLink: "https://github.com/RazeO1/nox",
    liveLink: "#",
    z: -22,
    x: 1.5,
    y: 0.15,
    isRight: true
  }
];

function CameraPath({ activeSection, projectsProgress }: { activeSection: number; projectsProgress: number }) {
  const { camera } = useThree();
  const persCamera = camera as THREE.PerspectiveCamera;
  const smoothedProgress = useRef(0);
  const currentTargetX = useRef(0);

  // Expose props to refs to avoid R3F stale closure issues inside useFrame
  const projectsProgressRef = useRef(projectsProgress);
  const activeSectionRef = useRef(activeSection);

  useEffect(() => {
    projectsProgressRef.current = projectsProgress;
    activeSectionRef.current = activeSection;
  }, [projectsProgress, activeSection]);

  useFrame((state, delta) => {
    const latestProgress = projectsProgressRef.current;
    const latestSection = activeSectionRef.current;

    // Smoothen progress changes
    smoothedProgress.current = THREE.MathUtils.lerp(
      smoothedProgress.current,
      latestProgress,
      0.04
    );

    if (latestSection === 6) {
      // Z travel from Z=5.0 down to Z=-27.0
      const camZ = 5.0 - smoothedProgress.current * 32.0;

      // Subtly float camera on X and Y for a handheld look
      const floatX = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.12;
      const floatY = Math.cos(state.clock.getElapsedTime() * 0.3) * 0.12;

      // Dynamic tilt: tilt towards upcoming project's side
      let targetLookX = 0;
      if (camZ > -4) {
        targetLookX = 0.28;
      } else if (camZ > -13) {
        targetLookX = -0.28;
      } else if (camZ > -22) {
        targetLookX = 0.28;
      }

      currentTargetX.current = THREE.MathUtils.lerp(currentTargetX.current, targetLookX, 0.05);

      persCamera.position.set(floatX, floatY, camZ);
      persCamera.lookAt(new THREE.Vector3(currentTargetX.current, 0, camZ - 4.0));

      // Dynamic FOV adjustment: zooms in when close to focus Z coordinate (cz + 3.2)
      const cardZs = [-4, -13, -22];
      let minDist = 999;
      cardZs.forEach((cz) => {
        const d = Math.abs(camZ - (cz + 3.2));
        if (d < minDist) minDist = d;
      });

      // Warp speed stretch: FOV climbs between cards and tightens to 40 at focus points
      const targetFOV = 40 + THREE.MathUtils.clamp(minDist * 3.5, 0, 16);
      persCamera.fov = THREE.MathUtils.lerp(persCamera.fov, targetFOV, 0.08);
      persCamera.updateProjectionMatrix();
    } else {
      // Smoothly return camera to home position
      persCamera.position.lerp(new THREE.Vector3(0, 0, 5.0), 0.05);
      
      const lookTarget = new THREE.Vector3(0, 0, 0);
      const targetRot = new THREE.Matrix4().lookAt(persCamera.position, lookTarget, new THREE.Vector3(0, 1, 0));
      const targetQuat = new THREE.Quaternion().setFromRotationMatrix(targetRot);
      persCamera.quaternion.slerp(targetQuat, 0.05);

      if (persCamera.fov !== 45) {
        persCamera.fov = THREE.MathUtils.lerp(persCamera.fov, 45, 0.05);
        persCamera.updateProjectionMatrix();
      }
    }
  });

  return null;
}

function ProjectCapsules({ activeSection }: { activeSection: number }) {
  const { camera } = useThree();
  const capsuleRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Expose activeSection to ref to prevent R3F stale closure
  const activeSectionRef = useRef(activeSection);
  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useFrame(() => {
    const camZ = camera.position.z;
    const currentSection = activeSectionRef.current;

    PROJECTS_LIST.forEach((item, idx) => {
      const el = capsuleRefs.current[idx];
      if (!el) return;

      const dist = camZ - item.z;
      let opacity = 0;
      let blur = 0;

      if (currentSection === 6 && dist > -0.5 && dist < 12.0) {
        // Smooth opacity bell curve
        if (dist < 1.5) {
          opacity = THREE.MathUtils.clamp((dist + 0.5) / 2.0, 0, 1);
        } else if (dist > 8.0) {
          opacity = THREE.MathUtils.clamp((12.0 - dist) / 4.0, 0, 1);
        } else {
          opacity = 1.0;
        }

        // Depth of Field Focus: sharpest at sweet spot dist = 3.2
        const focusError = Math.abs(dist - 3.2);
        blur = THREE.MathUtils.clamp((focusError - 0.6) * 1.8, 0, 12);
      }

      // Directly update DOM element styles in the frame tick for high-end rendering speed
      el.style.opacity = String(opacity);
      el.style.filter = `blur(${blur}px)`;
      el.style.pointerEvents = opacity > 0.1 ? "auto" : "none";
      el.style.display = opacity <= 0.01 ? "none" : "flex";
    });
  });

  return (
    <group>
      {PROJECTS_LIST.map((item, idx) => {
        return (
          <group key={item.id} position={[item.x, item.y, item.z]} rotation={[0, item.isRight ? -0.15 : 0.15, 0]}>
            <Html
              transform
              distanceFactor={1.3}
            >
              <div 
                ref={(el) => { capsuleRefs.current[idx] = el; }}
                className="flex flex-col lg:flex-row items-stretch gap-6 text-white p-6 rounded-2xl border border-white/10 w-[740px] select-none pointer-events-auto"
                style={{
                  backgroundColor: "rgba(10, 10, 10, 0.85)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                  opacity: 0,
                  display: "none"
                }}
              >
                {item.isRight ? (
                  <>
                    {/* Left: Editorial text */}
                    <div className="w-[50%] flex flex-col justify-center text-left pr-2">
                      <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-widest mb-3">
                        <span className="font-bold" style={{ color: item.accentColor }}>
                          {item.number} / 03
                        </span>
                        <span className="text-neutral-600">|</span>
                        <span className="text-neutral-400 font-medium">{item.category}</span>
                      </div>
                      <h3 className="font-display font-medium text-2xl md:text-3xl text-white leading-none tracking-tight mb-4">
                        {item.title}
                      </h3>
                      <p className="font-sans text-neutral-400 text-[11px] leading-relaxed mb-6">
                        {item.description}
                      </p>
                      <div className="flex gap-4 items-center">
                        <a href={item.githubLink} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-neutral-300 hover:text-white hover:line-through transition-all duration-300 font-bold">
                          Codebase
                        </a>
                        <a href={item.liveLink} className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-neutral-300 hover:text-white hover:line-through transition-all duration-300 font-bold">
                          Live Demo
                        </a>
                      </div>
                    </div>

                    {/* Right: Card */}
                    <div className="w-[50%] flex justify-end items-center">
                      <div
                        className="w-full max-w-[320px] h-[220px] rounded-xl border border-black p-4 flex flex-col justify-between shadow-sm"
                        style={{ backgroundColor: item.color }}
                      >
                        <div className="flex justify-between items-start border-b border-black/10 pb-2">
                          <div className="flex flex-col">
                            <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-500 mb-0.5">
                              selected work
                            </span>
                            <span className="font-display font-bold text-sm text-black leading-none">
                              {item.title}
                            </span>
                          </div>
                          <div className="font-mono text-[8px] font-bold text-black border border-black/20 rounded-full px-1.5 py-0.5">
                            {item.year}
                          </div>
                        </div>

                        <div className="flex-1 w-full flex items-center justify-center py-2 opacity-75">
                          {idx === 0 && (
                            <svg className="w-[110px] h-[70px] stroke-black/30 fill-none" viewBox="0 0 100 60">
                              <g className="animate-pulse">
                                <circle cx="20" cy="15" r="1.5" className="fill-black" />
                                <circle cx="50" cy="45" r="1.5" className="fill-black" />
                                <circle cx="80" cy="20" r="1.5" className="fill-black" />
                                <circle cx="40" cy="15" r="1.5" className="fill-black" />
                                <circle cx="70" cy="40" r="1.5" className="fill-black" />
                              </g>
                              <path d="M20 15 L50 45 L80 20 M40 15 L70 40 L50 45 M20 15 L40 15 L80 20 L70 40" strokeWidth="0.5" />
                            </svg>
                          )}
                        </div>

                        <div className="border-t border-black/10 pt-2 flex flex-col gap-1.5">
                          <div className="flex flex-wrap gap-1">
                            {item.tech.slice(0, 3).map((tag) => (
                              <span key={tag} className="font-mono text-[7px] uppercase tracking-wider bg-[#fcf7f3]/60 border border-black/5 rounded-md px-1 py-0.2 font-bold text-neutral-700">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex justify-between items-center text-[7px] font-mono text-neutral-500 uppercase tracking-widest font-semibold">
                            <span>Selected Works</span>
                            <span>{item.number}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Left: Card */}
                    <div className="w-[50%] flex justify-start items-center">
                      <div
                        className="w-full max-w-[320px] h-[220px] rounded-xl border border-black p-4 flex flex-col justify-between shadow-sm"
                        style={{ backgroundColor: item.color }}
                      >
                        <div className="flex justify-between items-start border-b border-black/10 pb-2">
                          <div className="flex flex-col">
                            <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-500 mb-0.5">
                              selected work
                            </span>
                            <span className="font-display font-bold text-sm text-black leading-none">
                              {item.title}
                            </span>
                          </div>
                          <div className="font-mono text-[8px] font-bold text-black border border-black/20 rounded-full px-1.5 py-0.5">
                            {item.year}
                          </div>
                        </div>

                        <div className="flex-1 w-full flex items-center justify-center py-2 opacity-75">
                          {idx === 1 && (
                            <svg className="w-[90px] h-[70px] stroke-black/35 fill-none" viewBox="0 0 100 60">
                              <circle cx="50" cy="30" r="18" strokeWidth="0.5" strokeDasharray="3,3" />
                              <rect x="35" y="15" width="30" height="30" strokeWidth="0.75" />
                              <line x1="50" y1="30" x2="65" y2="45" strokeWidth="1" className="stroke-[#de3421]" />
                            </svg>
                          )}
                          {idx === 2 && (
                            <svg className="w-[110px] h-[70px] stroke-black/35 fill-none" viewBox="0 0 100 60">
                              <path d="M10 30 C 20 10, 25 50, 35 30 C 45 10, 55 50, 65 30 C 75 10, 85 50, 90 30" strokeWidth="0.75" />
                              <circle cx="35" cy="30" r="2.5" className="fill-[#de3421] stroke-none" />
                              <circle cx="65" cy="30" r="2.5" className="fill-[#de3421] stroke-none" />
                            </svg>
                          )}
                        </div>

                        <div className="border-t border-black/10 pt-2 flex flex-col gap-1.5">
                          <div className="flex flex-wrap gap-1">
                            {item.tech.slice(0, 3).map((tag) => (
                              <span key={tag} className="font-mono text-[7px] uppercase tracking-wider bg-[#fcf7f3]/60 border border-black/5 rounded-md px-1 py-0.2 font-bold text-neutral-700">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex justify-between items-center text-[7px] font-mono text-neutral-500 uppercase tracking-widest font-semibold">
                            <span>Selected Works</span>
                            <span>{item.number}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Editorial text */}
                    <div className="w-[50%] flex flex-col justify-center text-left pl-2">
                      <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-widest mb-3">
                        <span className="font-bold" style={{ color: item.accentColor }}>
                          {item.number} / 03
                        </span>
                        <span className="text-neutral-600">|</span>
                        <span className="text-neutral-400 font-medium">{item.category}</span>
                      </div>
                      <h3 className="font-display font-medium text-2xl md:text-3xl text-white leading-none tracking-tight mb-4">
                        {item.title}
                      </h3>
                      <p className="font-sans text-neutral-400 text-[11px] leading-relaxed mb-6">
                        {item.description}
                      </p>
                      <div className="flex gap-4 items-center">
                        <a href={item.githubLink} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-neutral-300 hover:text-white hover:line-through transition-all duration-300 font-bold">
                          Codebase
                        </a>
                        <a href={item.liveLink} className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-neutral-300 hover:text-white hover:line-through transition-all duration-300 font-bold">
                          Live Demo
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

interface About3DProps {
  active: boolean;
  activeSection: number;
  projectsProgress: number;
  tapData: { x: number; y: number; trigger: number };
  mouse: { x: number; y: number };
}

export default function About3D({ active, activeSection, projectsProgress, tapData, mouse }: About3DProps) {
  if (!active) return null;

  return (
    <div className="w-full h-full pointer-events-none select-none">
      <Canvas
        camera={{ position: [0, 0, 5.0], fov: 45 }}
        dpr={[1, 2]}
        shadows={{ type: THREE.PCFShadowMap }}
        gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true, localClippingEnabled: true }}
      >
        <ambientLight intensity={0.2} />

        {/* Studio Directional and Spot Lights */}
        <spotLight
          position={[6, 12, 6]}
          angle={0.25}
          penumbra={1}
          intensity={2.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[-6, 4, 3]} intensity={0.6} />
        <directionalLight position={[-2, 6, -6]} intensity={0.8} color="#ffffff" />

        <Environment preset="studio" />

        <Suspense fallback={null}>
          <AvatarModel activeSection={activeSection} tapData={tapData} mouse={mouse} />
          <Starfield activeSection={activeSection} />
          <WarpTunnelBackdrop activeSection={activeSection} />
          <WarpTunnelCylinder activeSection={activeSection} />
          <CameraPath activeSection={activeSection} projectsProgress={projectsProgress} />
          <ProjectCapsules activeSection={activeSection} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/chrome_avatar_blinking.glb");
