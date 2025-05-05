
import React, { useEffect, useRef } from "react";

interface AnimatedTextProps {
  texts: string[];
}

export const AnimatedBackground: React.FC<AnimatedTextProps> = ({ texts }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const particles: TextParticle[] = [];
    const maxParticles = 15; // Increased from 10 to accommodate more texts
    const colors = [
      "rgba(30, 174, 219, 1)",    // Bright blue
      "rgba(41, 156, 0, 1)",      // Primary green
      "rgba(51, 195, 240, 1)",    // Sky blue
      "rgba(0, 170, 255, 1)",     // Another bright blue
    ];

    // Create new floating text at random position
    const createParticle = () => {
      if (particles.length >= maxParticles) return;
      
      const randomText = texts[Math.floor(Math.random() * texts.length)];
      const randomX = Math.random() * canvas.width;
      const randomY = Math.random() * canvas.height;
      const randomSpeedX = (Math.random() - 0.5) * 0.3;
      const randomSpeedY = (Math.random() - 0.5) * 0.3;
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomLifespan = 10000 + Math.random() * 5000; // 10-15 seconds
      
      particles.push({
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
    };

    // Animation loop
    const animate = () => {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background effects - grid lines
      drawGridPattern(ctx, canvas);
      
      // Update and draw text particles
      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.currentLife += 16; // ~16ms per frame

        // Calculate opacity based on life cycle (fade in, stay, fade out)
        const fadeInDuration = particle.lifespan * 0.2; // 20% of life for fade in
        const fadeOutStart = particle.lifespan * 0.8; // 80% of life before fade out

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
          particles.splice(index, 1);
          return;
        }

        // Draw text
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.font = `${Math.floor(14 * particle.scale)}px Inter, sans-serif`;
        ctx.fillStyle = particle.color;
        ctx.fillText(particle.text, particle.x, particle.y);
        ctx.restore();

        // Draw subtle glow
        if (particle.opacity > 0.5) {
          ctx.save();
          ctx.globalAlpha = particle.opacity * 0.2;
          ctx.shadowColor = particle.color;
          ctx.shadowBlur = 8;
          ctx.font = `${Math.floor(14 * particle.scale)}px Inter, sans-serif`;
          ctx.fillStyle = particle.color;
          ctx.fillText(particle.text, particle.x, particle.y);
          ctx.restore();
        }
      });

      requestAnimationFrame(animate);
    };

    // Draw futuristic grid pattern
    const drawGridPattern = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      const gridSize = 50;
      const gridLineWidth = 0.5;
      
      ctx.strokeStyle = "rgba(30, 174, 219, 0.1)"; // Bright blue with low opacity
      ctx.lineWidth = gridLineWidth;
      
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
      ctx.fillStyle = "rgba(30, 174, 219, 0.2)";
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    // Create new particles periodically
    const particleInterval = setInterval(createParticle, 1200); // Slightly increased interval for more text variety
    
    // Start animation loop
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      clearInterval(particleInterval);
    };
  }, [texts]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full -z-10"
    />
  );
};
