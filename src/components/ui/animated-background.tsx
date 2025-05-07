
import React from "react";
import { useAnimatedBackground } from "@/hooks/useAnimatedBackground";

interface AnimatedTextProps {
  texts: string[];
  maxParticles?: number;
  colors?: string[];
  particleInterval?: number;
  fadeInDurationPercent?: number;
  fadeOutStartPercent?: number;
  particleSpeed?: number;
  gridSize?: number;
  gridOpacity?: number;
}

export const AnimatedBackground: React.FC<AnimatedTextProps> = (props) => {
  const { canvasRef } = useAnimatedBackground(props);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full -z-10"
    />
  );
};
