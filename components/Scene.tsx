import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { Tunnel } from './Tunnel';
import { VisualConfig } from '../types';
import { OrbitControls } from '@react-three/drei';

interface SceneProps {
  config: VisualConfig;
}

export const Scene: React.FC<SceneProps> = ({ config }) => {
  return (
    <div className="w-full h-full absolute top-0 left-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: config.fov, near: 0.1, far: 300 }}
        gl={{ antialias: false }} // Optimization for postprocessing
        dpr={[1, 2]} // Handle high DPI screens
      >
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 10, 120]} />
        
        <Suspense fallback={null}>
          <Tunnel config={config} />
        </Suspense>

        <EffectComposer disableNormalPass>
          <Bloom 
            luminanceThreshold={config.bloomThreshold} 
            mipmapBlur 
            intensity={config.bloomStrength} 
            radius={0.6}
          />
          <Noise opacity={0.05} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
        
        {/* Subtle controls for user if they want to look around */}
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
      </Canvas>
    </div>
  );
};
