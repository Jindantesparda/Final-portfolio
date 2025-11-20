import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { VisualConfig, VisualizationMode } from '../types';

interface TunnelProps {
  config: VisualConfig;
}

export const Tunnel: React.FC<TunnelProps> = ({ config }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const count = config.particleCount;

  // Store initial random positions
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const radius = 10 + Math.random() * 20; // Tunnel radius
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = Math.random() * 200 - 100; // Spread along Z
      const speedOffset = Math.random() * 0.5 + 0.5;
      const colorMix = Math.random(); // For mixing primary/secondary colors
      temp.push({ x, y, z, angle, radius, speedOffset, colorMix });
    }
    return temp;
  }, [count]);

  // Re-color instances when colors change
  useEffect(() => {
    if (!meshRef.current) return;
    const color1 = new THREE.Color(config.colorPrimary);
    const color2 = new THREE.Color(config.colorSecondary);
    const tempColor = new THREE.Color();

    particles.forEach((particle, i) => {
      tempColor.lerpColors(color1, color2, particle.colorMix);
      meshRef.current!.setColorAt(i, tempColor);
    });
    meshRef.current.instanceColor!.needsUpdate = true;
  }, [config.colorPrimary, config.colorSecondary, particles]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Rotate entire tunnel slightly based on mode
    if (config.mode === VisualizationMode.CHAOS) {
      meshRef.current.rotation.z += delta * config.rotationSpeed * 2;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
    } else {
      meshRef.current.rotation.z += delta * config.rotationSpeed;
      meshRef.current.rotation.x = 0;
    }

    particles.forEach((particle, i) => {
      // Move Z
      particle.z += config.speed * 20 * delta * particle.speedOffset;

      // Loop Z
      if (particle.z > 50) {
        particle.z = -150;
      }

      // Apply Logic
      const { x, y, z, angle, radius } = particle;

      if (config.mode === VisualizationMode.WARP) {
        // Straight tunnel effect
        dummy.position.set(x, y, z);
        // Stretch particles to look like light speed lines
        dummy.scale.set(1, 1, 10 + config.speed * 10); 
        dummy.rotation.set(0, 0, angle); // Rotate to face center roughly
      } else if (config.mode === VisualizationMode.FLOAT) {
         // Gentle floating particles
        const floatX = x + Math.sin(state.clock.elapsedTime + z * 0.1) * 2;
        const floatY = y + Math.cos(state.clock.elapsedTime + z * 0.1) * 2;
        dummy.position.set(floatX, floatY, z);
        dummy.scale.set(1, 1, 1);
        dummy.rotation.set(Math.random(), Math.random(), Math.random());
      } else { // CHAOS
        const chaosRadius = radius + Math.sin(z * 0.2 + state.clock.elapsedTime * 5) * 5;
        const chaosX = Math.cos(angle) * chaosRadius;
        const chaosY = Math.sin(angle) * chaosRadius;
        dummy.position.set(chaosX, chaosY, z);
        dummy.rotation.set(z * 0.1, z * 0.1, 0);
        dummy.scale.set(2, 2, 2);
      }

      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.2, 0.2, 1]} />
      <meshBasicMaterial toneMapped={false} transparent opacity={0.8} />
    </instancedMesh>
  );
};
