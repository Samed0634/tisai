
import { TextParticle, MousePosition, ClickPosition } from "./types";

/**
 * Creates a new particle with the given parameters
 */
export const createParticle = (
  text: string,
  canvasWidth: number,
  canvasHeight: number,
  colors: string[],
  particleSpeed: number,
  x?: number,
  y?: number
): TextParticle => {
  // Use provided position or generate random position
  const randomX = x !== undefined ? x : Math.random() * canvasWidth;
  const randomY = y !== undefined ? y : Math.random() * canvasHeight;
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
  mousePosition: MousePosition | null,
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
 * Applies click effect to particles
 */
export const applyClickEffect = (
  particle: TextParticle,
  clickPosition: ClickPosition | null,
  clickForce: number,
  deltaTime: number
): void => {
  if (!clickPosition) return;
  
  // Only affect particles for a short time after the click (500ms)
  if (performance.now() - clickPosition.time > 500) return;
  
  const dx = particle.x - clickPosition.x;
  const dy = particle.y - clickPosition.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const radius = 150; // Click effect radius
  
  if (distance < radius) {
    // Create an outward force from the click point
    const force = (radius - distance) / radius * clickForce;
    const angle = Math.atan2(dy, dx);
    
    // Add to the particle's speed
    particle.speedX += (Math.cos(angle) * force * (deltaTime / 16));
    particle.speedY += (Math.sin(angle) * force * (deltaTime / 16));
    
    // Add a small randomization to create more dynamic movement
    particle.speedX += (Math.random() - 0.5) * 0.2 * (deltaTime / 16);
    particle.speedY += (Math.random() - 0.5) * 0.2 * (deltaTime / 16);
  }
};

/**
 * Creates multiple particles at a specific position
 */
export const createParticlesAtPosition = (
  texts: string[],
  canvasWidth: number,
  canvasHeight: number,
  colors: string[],
  particleSpeed: number,
  count: number,
  x: number,
  y: number
): TextParticle[] => {
  const particles: TextParticle[] = [];
  
  for (let i = 0; i < count; i++) {
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    particles.push(createParticle(randomText, canvasWidth, canvasHeight, colors, particleSpeed * 1.5, x, y));
  }
  
  return particles;
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
  
  // Add a slight drag effect to gradually slow particles
  particle.speedX *= 0.995;
  particle.speedY *= 0.995;
};

/**
 * Keeps particles within the canvas boundaries with a bounce effect
 */
export const keepParticleInBounds = (
  particle: TextParticle, 
  canvasWidth: number,
  canvasHeight: number
): void => {
  // Add a small offset to prevent particles from getting stuck at the edges
  const buffer = 10;
  
  if (particle.x < buffer) {
    particle.x = buffer;
    particle.speedX = Math.abs(particle.speedX) * 0.8;
  } else if (particle.x > canvasWidth - buffer) {
    particle.x = canvasWidth - buffer;
    particle.speedX = -Math.abs(particle.speedX) * 0.8;
  }
  
  if (particle.y < buffer) {
    particle.y = buffer;
    particle.speedY = Math.abs(particle.speedY) * 0.8;
  } else if (particle.y > canvasHeight - buffer) {
    particle.y = canvasHeight - buffer;
    particle.speedY = -Math.abs(particle.speedY) * 0.8;
  }
};
