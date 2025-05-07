
import React from "react";
import { useAnimatedBackground } from "@/hooks/useAnimatedBackground";

interface AnimatedBackgroundProps {
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
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = (props) => {
  const { canvasRef } = useAnimatedBackground(props);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full -z-10"
    />
  );
};
