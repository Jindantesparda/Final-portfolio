
import React, { useState } from 'react';
import { Scene } from './components/Scene';
import { UIOverlay } from './components/UIOverlay';
import { Cursor } from './components/Cursor';
import { VisualConfig, DEFAULT_CONFIG } from './types';

const App: React.FC = () => {
  const [config, setConfig] = useState<VisualConfig>(DEFAULT_CONFIG);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <Cursor />
      <Scene config={config} />
      <UIOverlay config={config} setConfig={setConfig} />
    </div>
  );
};

export default App;
