
// Types used across animation utilities
export interface TextParticle {
  x: number;
  y: number;
  text: string;
  opacity: number;
  scale: number;
  speedX: number;
  speedY: number;
  lifespan: number;
  currentLife: number;
  color: string;
}

export interface AnimatedBackgroundConfig {
  texts: string[];
  maxParticles?: number;
  colors?: string[];
  particleInterval?: number;
  fadeInDurationPercent?: number;
  fadeOutStartPercent?: number;
  particleSpeed?: number;
  gridSize?: number;
  gridOpacity?: number;
  fontSize?: number;
  fontFamily?: string;
  mouseRepelStrength?: number;
  mouseRepelRadius?: number;
  clickEffect?: boolean;
  clickSpawnCount?: number;
  clickForce?: number;
  tapCreateParticles?: boolean;
  tapParticleCount?: number;
}

export interface MousePosition {
  x: number;
  y: number;
}

export interface ClickPosition {
  x: number;
  y: number;
  time: number;
}
