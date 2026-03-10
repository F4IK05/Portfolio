"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function Sphere() {
  const groupRef = useRef<THREE.Group>(null);

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(2, 2), []);

  const points = useMemo(() => {
    const positions = geometry.getAttribute("position");
    const seen = new Set<string>();
    const unique: THREE.Vector3[] = [];
    for (let i = 0; i < positions.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(positions, i);
      const key = `${v.x.toFixed(4)},${v.y.toFixed(4)},${v.z.toFixed(4)}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(v);
      }
    }
    const pointsGeo = new THREE.BufferGeometry().setFromPoints(unique);
    return pointsGeo;
  }, [geometry]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={geometry}>
        <meshBasicMaterial color="white" wireframe opacity={0.8} transparent />
      </mesh>
      <points geometry={points}>
        <pointsMaterial color="white" size={0.06} sizeAttenuation />
      </points>
    </group>
  );
}

export default function WireframeSphere() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ background: "transparent" }}
      gl={{ alpha: true, antialias: true }}
    >
      <Sphere />
    </Canvas>
  );
}
