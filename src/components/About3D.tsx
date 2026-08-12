"use client";

import { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, Environment } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

// Suppress THREE.Clock deprecation warnings inside R3F
if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    if (args[0] && typeof args[0] === "string") {
      const msg = args[0];
      if (
        msg.includes("THREE.Clock: This module has been deprecated") ||
        msg.includes("THREE.WebGLShadowMap") ||
        msg.includes("THREE.WebGLProgram") ||
        msg.includes("warning X4122")
      ) {
        return;
      }
    }
    originalWarn.apply(console, args);
  };
}

interface SectionPose {
  position: [number, number, number];
  scale: [number, number, number];
  rotation: [number, number, number];
}

const SECTION_POSES: Record<number, SectionPose> = {
  0: { // Intro / Centered
    position: [0, 0, 0],
    scale: [0.64, 0.64, 0.64],
    rotation: [0, 0, 0]
  },
  1: { // Craft
    position: [0, 0, 0],
    scale: [0.64, 0.64, 0.64],
    rotation: [0, 0, 0]
  },
  2: { // Intelligence
    position: [0, 0, 0],
    scale: [0.64, 0.64, 0.64],
    rotation: [0, 0, 0]
  },
  3: { // Experience
    position: [0, 0, 0],
    scale: [0.64, 0.64, 0.64],
    rotation: [0, 0, 0]
  },
  4: { // Obsession & Conclusion
    position: [0, 0, 0],
    scale: [0.64, 0.64, 0.64],
    rotation: [0, 0, 0]
  }
};

interface AvatarModelProps {
  activeSection: number;
  tapTrigger: number;
  mouse: { x: number; y: number };
}

function AvatarModel({ activeSection, tapTrigger, mouse }: AvatarModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const tapLightRef = useRef<THREE.PointLight>(null);

  // Load optimized glb model
  const { scene, animations } = useGLTF("/chrome_avatar_blinking.glb");
  const { actions } = useAnimations(animations, groupRef);

  useEffect(() => {
    // Play shape key blink action loop
    const action = actions["white_mesh (1)Action.004"];
    if (action) {
      action.reset().fadeIn(0.5).play();
      action.setLoop(THREE.LoopRepeat, Infinity);
    }

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
      }
    });

    // Restore original GLB parent rotations (keeps it upright) and apply corrections on the scene root:
    // Pitch: 0.4 rad (tilts face down to look straight at the screen), Yaw: -0.85 rad (aligns face forward)
    scene.rotation.set(0.4, -0.85, 0);
  }, [actions, scene]);

  // Handle tap animations (physics push back and emissive blue light glow)
  useEffect(() => {
    if (tapTrigger === 0 || !groupRef.current) return;

    const pose = SECTION_POSES[activeSection] || SECTION_POSES[0];

    // Kill active tweens to prevent stacking
    gsap.killTweensOf(groupRef.current.position);
    gsap.killTweensOf(groupRef.current.scale);

    // Z-axis push-back and elastic return bounce
    gsap.fromTo(
      groupRef.current.position,
      { z: pose.position[2] - 0.8 },
      {
        z: pose.position[2],
        duration: 1.2,
        ease: "elastic.out(1, 0.45)",
      }
    );

    // Head scale pulse (1.0 -> 1.1 -> 1.0) over 0.4s
    gsap.timeline()
      .to(groupRef.current.scale, {
        x: pose.scale[0] * 1.15,
        y: pose.scale[1] * 1.15,
        z: pose.scale[2] * 1.15,
        duration: 0.2,
        ease: "power2.out",
      })
      .to(groupRef.current.scale, {
        x: pose.scale[0],
        y: pose.scale[1],
        z: pose.scale[2],
        duration: 0.2,
        ease: "power2.inOut",
      });

    // Emissive blue light glow flash on the face
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
  }, [tapTrigger]);

  // Handle frame loop for mouse tracking & breathing float
  useFrame((state) => {
    if (groupRef.current) {
      const pose = SECTION_POSES[activeSection] || SECTION_POSES[0];
      const time = state.clock.getElapsedTime();

      // 1. Slower and subtler vertical breathing bobbing drift (~4px amplitude, increased by 30% from 0.03)
      const idleFloatY = Math.sin(time * 0.8) * 0.04;
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, pose.position[0], 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        pose.position[1] + idleFloatY,
        0.05
      );

      if (!gsap.isTweening(groupRef.current.position)) {
        groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, pose.position[2], 0.05);
      }

      // 2. Idle breathing-scale pulse (scales very subtly between 1.0 and 1.02)
      const breathingScale = 1.0 + Math.sin(time * 2.0) * 0.01;
      
      if (!gsap.isTweening(groupRef.current.scale)) {
        groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, pose.scale[0] * breathingScale, 0.05);
        groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y, pose.scale[1] * breathingScale, 0.05);
        groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, pose.scale[2] * breathingScale, 0.05);
      }

      // 3. Mouse Look-At Tracking: Subtle weighted rotation tracking (damping: 0.08)
      // Uses global window mouse coordinates mapped to [-1, 1] passed via props
      // Inverts X-rotation so head looks UP when mouse is UP (positive mouse.y)
      const targetRotationX = -(mouse.y * Math.PI) / 8; // vertical tilt (up/down)
      const targetRotationY = (mouse.x * Math.PI) / 6;  // horizontal rotation (left/right)

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotationX,
        0.08
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotationY,
        0.08
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        pose.rotation[2],
        0.08
      );
    }
  });

  return (
    <group ref={groupRef} dispose={null} scale={[0.64, 0.64, 0.64]} position={[0, 0, 0]}>
      {/* Front PointLight for blue emissive click glow effect */}
      <pointLight
        ref={tapLightRef}
        color="#0066ff"
        intensity={0}
        distance={3.5}
        position={[0, 0.3, 1.5]}
      />
      <primitive object={scene} />
    </group>
  );
}

interface About3DProps {
  active: boolean;
  activeSection: number;
  tapTrigger: number;
  mouse: { x: number; y: number };
}

export default function About3D({ active, activeSection, tapTrigger, mouse }: About3DProps) {
  if (!active) return null;

  return (
    <div className="w-full h-full pointer-events-none select-none">
      <Canvas
        camera={{ position: [0, 0, 5.0], fov: 45 }}
        dpr={[1, 2]}
        shadows={{ type: THREE.PCFShadowMap }}
        gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
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
        <directionalLight position={[-2, 6, -6]} intensity={3.0} color="#de3421" />

        <Environment preset="studio" />

        <Suspense fallback={null}>
          <AvatarModel activeSection={activeSection} tapTrigger={tapTrigger} mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/chrome_avatar_blinking.glb");
