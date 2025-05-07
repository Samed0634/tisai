
import { useEffect, useRef } from "react";

// Types for the hook parameters
interface UseAnimatedBackgroundProps {
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
  mouseRepelStrength?: number; // New: strength of mouse repulsion
  mouseRepelRadius?: number; // New: radius of mouse influence
}

// Types for the particle objects
interface TextParticle {
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

export const useAnimatedBackground = ({
  texts,
  maxParticles = 20,
  colors = [
    "rgba(30, 174, 219, 1)",    // Bright blue
    "rgba(41, 156, 0, 1)",      // Primary green
    "rgba(51, 195, 240, 1)",    // Sky blue
    "rgba(0, 170, 255, 1)",     // Another bright blue
  ],
  particleInterval = 1000,
  fadeInDurationPercent = 0.2,
  fadeOutStartPercent = 0.8,
  particleSpeed = 0.3,
  gridSize = 50,
  gridOpacity = 0.1,
  fontSize = 14,
  fontFamily = "Inter, sans-serif",
  mouseRepelStrength = 0.5, // Default mouse repulsion strength
  mouseRepelRadius = 150, // Default mouse influence radius
}: UseAnimatedBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameIdRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const particlesRef = useRef<TextParticle[]>([]);
  const lastParticleTimeRef = useRef<number>(0);
  const mousePositionRef = useRef<{ x: number, y: number } | null>(null); // Track mouse position

  // Main animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions to window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse position
    const handleMouseMove = (event: MouseEvent) => {
      mousePositionRef.current = {
        x: event.clientX,
        y: event.clientY
      };
    };

    // Reset mouse position when mouse leaves the canvas
    const handleMouseLeave = () => {
      mousePositionRef.current = null;
    };

    // Add mouse event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Create new floating text at random position
    const createParticle = (timestamp: number) => {
      // Check if enough time has passed since the last particle creation
      if (timestamp - lastParticleTimeRef.current < particleInterval) return;
      
      // Check if we've reached the maximum number of particles
      if (particlesRef.current.length >= maxParticles) return;
      
      const randomText = texts[Math.floor(Math.random() * texts.length)];
      const randomX = Math.random() * canvas.width;
      const randomY = Math.random() * canvas.height;
      const randomSpeedX = (Math.random() - 0.5) * particleSpeed;
      const randomSpeedY = (Math.random() - 0.5) * particleSpeed;
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomLifespan = 10000 + Math.random() * 5000; // 10-15 seconds
      
      particlesRef.current.push({
        x: randomX,
        y: randomY,
        text: randomText,
        opacity: 0,
        scale: 0.5 + Math.random() * 0.5,
        speedX: randomSpeedX,
        speedY: randomSpeedY,
        lifespan: randomLifespan,
        currentLife: 0,
        color: randomColor,
      });
      
      // Update last particle creation time
      lastParticleTimeRef.current = timestamp;
    };

    // Draw futuristic grid pattern
    const drawGridPattern = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
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

    // Calculate repulsion effect from mouse
    const applyMouseRepulsion = (particle: TextParticle, deltaTime: number) => {
      if (!mousePositionRef.current) return;

      const dx = particle.x - mousePositionRef.current.x;
      const dy = particle.y - mousePositionRef.current.y;
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

    // Optimized animation loop using requestAnimationFrame
    const animate = (timestamp: number) => {
      // Skip frame if less than ~16ms has passed (aiming for ~60fps)
      if (timestamp - lastTimeRef.current < 16) {
        animationFrameIdRef.current = requestAnimationFrame(animate);
        return;
      }
      
      // Calculate delta time for smooth animation regardless of frame rate
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;
      
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background effects - grid lines
      drawGridPattern(ctx, canvas);
      
      // Create particles at regular intervals
      createParticle(timestamp);
      
      // Update and draw text particles
      particlesRef.current = particlesRef.current.filter(particle => {
        // Update position with delta time for frame-rate independent movement
        particle.x += particle.speedX * (deltaTime / 16);
        particle.y += particle.speedY * (deltaTime / 16);
        particle.currentLife += deltaTime;

        // Apply mouse repulsion effect
        applyMouseRepulsion(particle, deltaTime);

        // Calculate opacity based on life cycle (fade in, stay, fade out)
        const fadeInDuration = particle.lifespan * fadeInDurationPercent;
        const fadeOutStart = particle.lifespan * fadeOutStartPercent;

        if (particle.currentLife < fadeInDuration) {
          // Fade in
          particle.opacity = particle.currentLife / fadeInDuration;
        } else if (particle.currentLife > fadeOutStart) {
          // Fade out
          particle.opacity = 1 - ((particle.currentLife - fadeOutStart) / (particle.lifespan - fadeOutStart));
        } else {
          // Stay visible
          particle.opacity = 1;
        }

        // Remove if past lifespan
        if (particle.currentLife >= particle.lifespan) {
          return false;
        }

        // Draw text with custom font size and family
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.font = `${Math.floor(fontSize * particle.scale)}px ${fontFamily}`;
        ctx.fillStyle = particle.color;
        ctx.fillText(particle.text, particle.x, particle.y);
        ctx.restore();

        // Draw subtle glow
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
        
        return true;
      });

      // Continue the animation loop
      animationFrameIdRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation loop
    lastTimeRef.current = performance.now();
    animationFrameIdRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameIdRef.current);
      particlesRef.current = [];
    };
  }, [
    texts, 
    maxParticles, 
    colors, 
    particleInterval, 
    fadeInDurationPercent, 
    fadeOutStartPercent, 
    particleSpeed, 
    gridSize, 
    gridOpacity,
    fontSize,
    fontFamily,
    mouseRepelStrength,
    mouseRepelRadius
  ]);

  return { canvasRef };
};
