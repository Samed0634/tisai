
import { TextParticle } from "./types";

/**
 * Draws a grid pattern on the canvas
 */
export const drawGridPattern = (
  ctx: CanvasRenderingContext2D, 
  canvas: HTMLCanvasElement,
  gridSize: number,
  gridOpacity: number
): void => {
  const lineOpacity = gridOpacity;
  
  ctx.strokeStyle = `rgba(30, 174, 219, ${lineOpacity})`; // Bright blue with configurable opacity
  ctx.lineWidth = 0.5;
  
  // Horizontal lines
  for (let y = 0; y < canvas.height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
  
  // Vertical lines
  for (let x = 0; x < canvas.width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  
  // Add some brighter points at intersections for a tech effect
  ctx.fillStyle = `rgba(30, 174, 219, ${lineOpacity * 2})`;
  for (let x = 0; x < canvas.width; x += gridSize) {
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, Math.PI * 2);
      ctx.fill();
    }
  }
};

/**
 * Renders a single text particle on the canvas
 */
export const renderParticle = (
  ctx: CanvasRenderingContext2D,
  particle: TextParticle,
  fontSize: number,
  fontFamily: string
): void => {
  // Draw text with custom font size and family
  ctx.save();
  ctx.globalAlpha = particle.opacity;
  ctx.font = `${Math.floor(fontSize * particle.scale)}px ${fontFamily}`;
  ctx.fillStyle = particle.color;
  ctx.fillText(particle.text, particle.x, particle.y);
  ctx.restore();

  // Draw subtle glow effect when opacity is high enough
  if (particle.opacity > 0.5) {
    ctx.save();
    ctx.globalAlpha = particle.opacity * 0.2;
    ctx.shadowColor = particle.color;
    ctx.shadowBlur = 8;
    ctx.font = `${Math.floor(fontSize * particle.scale)}px ${fontFamily}`;
    ctx.fillStyle = particle.color;
    ctx.fillText(particle.text, particle.x, particle.y);
    ctx.restore();
  }
};
