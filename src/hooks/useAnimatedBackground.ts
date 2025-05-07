
import { useEffect, useRef } from "react";
import { TextParticle, AnimatedBackgroundConfig, MousePosition } from "@/utils/animation/types";
import { createParticle, updateParticleOpacity, applyMouseRepulsion, updateParticlePosition } from "@/utils/animation/particleUtils";
import { drawGridPattern, renderParticle } from "@/utils/animation/renderUtils";
import { resizeCanvas } from "@/utils/animation/canvasUtils";

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
  mouseRepelStrength = 0.5,
  mouseRepelRadius = 150,
}: AnimatedBackgroundConfig) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameIdRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const particlesRef = useRef<TextParticle[]>([]);
  const lastParticleTimeRef = useRef<number>(0);
  const mousePositionRef = useRef<MousePosition | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initial canvas setup
    resizeCanvas(canvas);
    
    // Event listeners setup
    const handleResize = () => resizeCanvas(canvas);
    const handleMouseMove = (event: MouseEvent) => {
      mousePositionRef.current = {
        x: event.clientX,
        y: event.clientY
      };
    };
    const handleMouseLeave = () => {
      mousePositionRef.current = null;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Function to create a new particle if conditions are met
    const tryCreateParticle = (timestamp: number): void => {
      // Check if enough time has passed since the last particle creation
      if (timestamp - lastParticleTimeRef.current < particleInterval) return;
      
      // Check if we've reached the maximum number of particles
      if (particlesRef.current.length >= maxParticles) return;
      
      const randomText = texts[Math.floor(Math.random() * texts.length)];
      particlesRef.current.push(createParticle(randomText, canvas.width, canvas.height, colors, particleSpeed));
      
      // Update last particle creation time
      lastParticleTimeRef.current = timestamp;
    };

    // Main animation loop
    const animate = (timestamp: number): void => {
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
      
      // Draw background grid
      drawGridPattern(ctx, canvas, gridSize, gridOpacity);
      
      // Try to create new particles
      tryCreateParticle(timestamp);
      
      // Update and draw text particles
      particlesRef.current = particlesRef.current.filter(particle => {
        // Update particle position and lifecycle
        updateParticlePosition(particle, deltaTime);
        
        // Apply mouse repulsion effect
        applyMouseRepulsion(
          particle, 
          mousePositionRef.current, 
          mouseRepelRadius, 
          mouseRepelStrength, 
          deltaTime
        );

        // Calculate opacity based on life cycle
        particle.opacity = updateParticleOpacity(particle, fadeInDurationPercent, fadeOutStartPercent);

        // Remove if past lifespan
        if (particle.currentLife >= particle.lifespan) {
          return false;
        }

        // Render the particle
        renderParticle(ctx, particle, fontSize, fontFamily);
        
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
      window.removeEventListener("resize", handleResize);
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
