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
    scale: [0.576, 0.576, 0.576],
    rotation: [0, 0, 0]
  },
  1: { // Craft
    position: [0, 0, 0],
    scale: [0.576, 0.576, 0.576],
    rotation: [0, 0, 0]
  },
  2: { // Intelligence
    position: [0, 0, 0],
    scale: [0.576, 0.576, 0.576],
    rotation: [0, 0, 0]
  },
  3: { // Experience
    position: [0, 0, 0],
    scale: [0.576, 0.576, 0.576],
    rotation: [0, 0, 0]
  },
  4: { // Obsession & Conclusion
    position: [0, 0, 0],
    scale: [0.576, 0.576, 0.576],
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

  // Wobble offsets for physical springy click reactions
  const wobblePosition = useRef({ x: 0, y: 0, z: 0 });
  const wobbleRotation = useRef({ x: 0, y: 0, z: 0 });

  // Separate smooth look-at tracking/breathing values from high-frequency click wobbles
  const mouseLookRotation = useRef({ x: 0, y: 0 });
  const basePosition = useRef({ x: 0, y: 0, z: 0 });

  // Store reference to the mesh with morph target influences to manually control eyes (Blink)
  const headMeshRef = useRef<THREE.Mesh | null>(null);

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
        const mat = new THREE.MeshPhysicalMaterial({
          metalness: 1.0,
          roughness: 0.1,
          clearcoat: 1.0,
          clearcoatRoughness: 0.05,
          color: new THREE.Color("#f3f3f3"),
        });

        // Store reference to the head mesh containing shape keys
        if (mesh.morphTargetInfluences) {
          headMeshRef.current = mesh;
        }

        mesh.material = mat;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });

    // Restore original GLB parent rotations (keeps it upright) and apply corrections on the scene root:
    // Pitch: 0.4 rad (tilts face down to look straight at the screen), Yaw: -0.85 rad (aligns face forward)
    scene.rotation.set(0.4, -0.85, 0);
  }, [actions, scene]);

  // Handle tap animations (physics push back and eyes closing morph target)
  useEffect(() => {
    if (tapData.trigger === 0 || !groupRef.current) return;

    const pose = SECTION_POSES[activeSection] || SECTION_POSES[0];

    // Kill active tweens to prevent stacking
    gsap.killTweensOf(wobblePosition.current);
    gsap.killTweensOf(wobbleRotation.current);
    gsap.killTweensOf(groupRef.current.scale);

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

    // Click Recoil Physics:
    // Pushes back deeply on Z-axis and swings in opposite directions with decaying amplitude:
    // Tap (large recoil) -> return (LEFT shake) -> RIGHT -> LEFT/center -> settle (REST)
    
    // Translation Recoil: snap back 1.2 units on Z and shift on X/Y relative to click
    const recoilPosX = tapData.x * 0.18;
    const recoilPosY = -tapData.y * 0.18;
    const recoilPosZ = -1.2;

    gsap.timeline()
      // Step 1: Rapidly move to recoil position over 0.05s to simulate instant impact push
      .to(wobblePosition.current, { x: recoilPosX, y: recoilPosY, z: recoilPosZ, duration: 0.05, ease: "power2.out" })
      // Step 2: Swing to opposite side (LEFT shake / push forward) - starts after 0.04s pause, takes 0.48s (slower, more natural)
      .to(wobblePosition.current, { 
        x: -recoilPosX * 0.75, 
        y: -recoilPosY * 0.75, 
        z: -recoilPosZ * 0.35, 
        duration: 0.48, 
        ease: "power2.out" 
      }, "+=0.04")
      // Step 3: Swing back (RIGHT / push back slightly) - 0.45s
      .to(wobblePosition.current, { 
        x: recoilPosX * 0.5, 
        y: recoilPosY * 0.5, 
        z: recoilPosZ * 0.15, 
        duration: 0.45, 
        ease: "power2.inOut" 
      })
      // Step 4: Swing back (LEFT/center / push forward slightly) - 0.45s
      .to(wobblePosition.current, { 
        x: -recoilPosX * 0.2, 
        y: -recoilPosY * 0.2, 
        z: -recoilPosZ * 0.06, 
        duration: 0.45, 
        ease: "power2.inOut" 
      })
      // Step 5: Settle to rest - 0.6s
      .to(wobblePosition.current, { x: 0, y: 0, z: 0, duration: 0.6, ease: "power2.inOut" });

    // Rotational Wobble (Pitch, Yaw, Roll): much wider sweeps for an impactful dizzy head shake
    // Large recoil: Yaw rotates roughly 50-70 degrees (0.85 to 1.05 rad) away from camera
    const baseRecoilY = (Math.random() > 0.5 ? 1 : -1) * gsap.utils.random(0.85, 1.05);
    const baseRecoilX = gsap.utils.random(-0.2, 0.15);
    const baseRecoilZ = (Math.random() > 0.5 ? 1 : -1) * gsap.utils.random(0.15, 0.25);

    const recoilX = baseRecoilX + tapData.y * 0.45; // Pitch
    const recoilY = baseRecoilY - tapData.x * 0.6;  // Yaw
    const recoilZ = baseRecoilZ - tapData.x * 0.3;  // Roll

    gsap.timeline()
      // Step 1: Rapidly rotate to recoil pose over 0.05s
      .to(wobbleRotation.current, { x: recoilX, y: recoilY, z: recoilZ, duration: 0.05, ease: "power2.out" })
      // Step 2: Swing to opposite side (LEFT shake) - starts after 0.04s pause, takes 0.5s (damped to approx -7°)
      .to(wobbleRotation.current, { 
        x: -recoilX * 0.12, 
        y: -recoilY * 0.12, 
        z: -recoilZ * 0.12, 
        duration: 0.5, 
        ease: "power2.out" 
      }, "+=0.04")
      // Step 3: Swing back (RIGHT) - 0.45s (damped to approx +5°)
      .to(wobbleRotation.current, { 
        x: recoilX * 0.08, 
        y: recoilY * 0.08, 
        z: recoilZ * 0.08, 
        duration: 0.45, 
        ease: "power2.inOut" 
      })
      // Step 4: Swing back (LEFT/center) - 0.45s (damped to approx -3°)
      .to(wobbleRotation.current, { 
        x: -recoilX * 0.05, 
        y: -recoilY * 0.05, 
        z: -recoilZ * 0.05, 
        duration: 0.45, 
        ease: "power2.inOut" 
      })
      // Step 5: Settle to rest - 0.6s
      .to(wobbleRotation.current, { x: 0, y: 0, z: 0, duration: 0.6, ease: "power2.inOut" });

    // 3. Scale pop: grows 20% over 0.15s, then shrinks back to normal over 0.35s (slower recoil)
    gsap.timeline()
      .to(groupRef.current.scale, {
        x: pose.scale[0] * 1.2,
        y: pose.scale[1] * 1.2,
        z: pose.scale[2] * 1.2,
        duration: 0.15,
        ease: "power2.out",
      })
      .to(groupRef.current.scale, {
        x: pose.scale[0],
        y: pose.scale[1],
        z: pose.scale[2],
        duration: 0.35,
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
  }, [tapData.trigger]);

  // Handle frame loop for mouse tracking & breathing float
  useFrame((state) => {
    if (groupRef.current) {
      const pose = SECTION_POSES[activeSection] || SECTION_POSES[0];
      const time = state.clock.getElapsedTime();

      // 1. Slower and subtler vertical breathing bobbing drift (~4px amplitude, increased by 30% from 0.03)
      const idleFloatY = Math.sin(time * 0.8) * 0.04;

      // Guide the base position smoothly (pose transition + breathing drift)
      basePosition.current.x = THREE.MathUtils.lerp(basePosition.current.x, pose.position[0], 0.05);
      basePosition.current.y = THREE.MathUtils.lerp(
        basePosition.current.y,
        pose.position[1] + idleFloatY,
        0.05
      );
      basePosition.current.z = THREE.MathUtils.lerp(basePosition.current.z, pose.position[2], 0.05);

      // Set actual position as a direct sum of base position and additive wobble translation
      groupRef.current.position.x = basePosition.current.x + wobblePosition.current.x;
      groupRef.current.position.y = basePosition.current.y + wobblePosition.current.y;
      groupRef.current.position.z = basePosition.current.z + wobblePosition.current.z;

      // 2. Idle breathing-scale pulse (scales very subtly between 1.0 and 1.02)
      const breathingScale = 1.0 + Math.sin(time * 2.0) * 0.01;
      
      if (!gsap.isTweening(groupRef.current.scale)) {
        groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, pose.scale[0] * breathingScale, 0.05);
        groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y, pose.scale[1] * breathingScale, 0.05);
        groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, pose.scale[2] * breathingScale, 0.05);
      }

      // 3. Mouse Look-At Tracking: Guide look-at rotation smoothly in the background
      // Uses global window mouse coordinates mapped to [-1, 1] passed via props
      // Inverts X-rotation so head looks UP when mouse is UP (positive mouse.y)
      const targetLookX = -(mouse.y * Math.PI) / 8; // vertical tilt (up/down)
      const targetLookY = (mouse.x * Math.PI) / 6;  // horizontal rotation (left/right)

      mouseLookRotation.current.x = THREE.MathUtils.lerp(mouseLookRotation.current.x, targetLookX, 0.08);
      mouseLookRotation.current.y = THREE.MathUtils.lerp(mouseLookRotation.current.y, targetLookY, 0.08);

      // Set actual rotation as a direct sum of look-at tracking and crisp springy wobble rotation
      groupRef.current.rotation.x = mouseLookRotation.current.x + wobbleRotation.current.x;
      groupRef.current.rotation.y = mouseLookRotation.current.y + wobbleRotation.current.y;
      groupRef.current.rotation.z = pose.rotation[2] + wobbleRotation.current.z;

      // 4. Reset light position back to default coordinates once tap finishes
      if (tapLightRef.current && !gsap.isTweening(tapLightRef.current.position)) {
        tapLightRef.current.position.set(0, 0.3, 1.5);
      }
    }
  });

  return (
    <group ref={groupRef} dispose={null} scale={[0.576, 0.576, 0.576]} position={[0, 0, 0]}>
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

interface About3DProps {
  active: boolean;
  activeSection: number;
  tapData: { x: number; y: number; trigger: number };
  mouse: { x: number; y: number };
}

export default function About3D({ active, activeSection, tapData, mouse }: About3DProps) {
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
        <directionalLight position={[-2, 6, -6]} intensity={3.0} color="#de3421" />

        <Environment preset="studio" />

        <Suspense fallback={null}>
          <AvatarModel activeSection={activeSection} tapData={tapData} mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/chrome_avatar_blinking.glb");
