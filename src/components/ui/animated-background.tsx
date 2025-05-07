
import React from "react";
import { useAnimatedBackground } from "@/hooks/useAnimatedBackground";
import { AnimatedBackgroundConfig } from "@/utils/animation/types";

export type AnimatedBackgroundProps = AnimatedBackgroundConfig;

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = (props) => {
  const { canvasRef } = useAnimatedBackground(props);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full -z-10"
    />
  );
};
