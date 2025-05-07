
/**
 * Resizes the canvas to match the window dimensions
 */
export const resizeCanvas = (canvas: HTMLCanvasElement): void => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};
