
import { TextParticle } from "./types";

/**
 * Creates a new particle with the given parameters
 */
export const createParticle = (
  text: string,
  canvasWidth: number,
  canvasHeight: number,
  colors: string[],
  particleSpeed: number
): TextParticle => {
  const randomX = Math.random() * canvasWidth;
  const randomY = Math.random() * canvasHeight;
  const randomSpeedX = (Math.random() - 0.5) * particleSpeed;
  const randomSpeedY = (Math.random() - 0.5) * particleSpeed;
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomLifespan = 10000 + Math.random() * 5000; // 10-15 seconds
  
  return {
    x: randomX,
    y: randomY,
    text,
    opacity: 0,
    scale: 0.5 + Math.random() * 0.5,
    speedX: randomSpeedX,
    speedY: randomSpeedY,
    lifespan: randomLifespan,
    currentLife: 0,
    color: randomColor,
  };
};

/**
 * Updates the opacity of a particle based on its lifecycle
 */
export const updateParticleOpacity = (
  particle: TextParticle, 
  fadeInDurationPercent: number, 
  fadeOutStartPercent: number
): number => {
  const fadeInDuration = particle.lifespan * fadeInDurationPercent;
  const fadeOutStart = particle.lifespan * fadeOutStartPercent;

  if (particle.currentLife < fadeInDuration) {
    // Fade in
    return particle.currentLife / fadeInDuration;
  } else if (particle.currentLife > fadeOutStart) {
    // Fade out
    return 1 - ((particle.currentLife - fadeOutStart) / (particle.lifespan - fadeOutStart));
  } else {
    // Stay visible
    return 1;
  }
};

/**
 * Applies mouse repulsion to a particle
 */
export const applyMouseRepulsion = (
  particle: TextParticle,
  mousePosition: { x: number, y: number } | null,
  mouseRepelRadius: number,
  mouseRepelStrength: number,
  deltaTime: number
): void => {
  if (!mousePosition) return;

  const dx = particle.x - mousePosition.x;
  const dy = particle.y - mousePosition.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Only apply repulsion within the mouseRepelRadius
  if (distance < mouseRepelRadius) {
    // Calculate repulsion force (stronger when closer)
    const repelFactor = (mouseRepelRadius - distance) / mouseRepelRadius * mouseRepelStrength;

    // Normalize the direction vector
    const normDx = dx / distance || 0; // Avoid division by zero
    const normDy = dy / distance || 0;

    // Apply repulsion force (normalized for frame rate independence)
    particle.x += normDx * repelFactor * (deltaTime / 16);
    particle.y += normDy * repelFactor * (deltaTime / 16);
  }
};

/**
 * Updates a particle's position based on speed and deltaTime
 */
export const updateParticlePosition = (
  particle: TextParticle,
  deltaTime: number
): void => {
  particle.x += particle.speedX * (deltaTime / 16);
  particle.y += particle.speedY * (deltaTime / 16);
  particle.currentLife += deltaTime;
};
