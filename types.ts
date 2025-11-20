export enum VisualizationMode {
  WARP = 'WARP',
  FLOAT = 'FLOAT',
  CHAOS = 'CHAOS'
}

export enum Section {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  PROJECTS = 'PROJECTS',
  CONTACT = 'CONTACT'
}

export interface VisualConfig {
  speed: number; // 0.1 to 5.0
  colorPrimary: string; // Hex color
  colorSecondary: string; // Hex color
  bloomThreshold: number; // 0 to 1
  bloomStrength: number; // 0 to 3
  fov: number; // Field of view
  rotationSpeed: number;
  particleCount: number;
  mode: VisualizationMode;
}

export const DEFAULT_CONFIG: VisualConfig = {
  speed: 0.5, // Slower default for readability
  colorPrimary: '#00ffff', // Cyan
  colorSecondary: '#4f46e5', // Indigo
  bloomThreshold: 0.2,
  bloomStrength: 1.2,
  fov: 75,
  rotationSpeed: 0.1,
  particleCount: 2000,
  mode: VisualizationMode.FLOAT
};