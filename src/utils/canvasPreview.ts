
export const canvasPreview = (
  image: HTMLImageElement | null,
  canvas: HTMLCanvasElement | null,
  crop: { x: number; y: number; width: number; height: number }
) => {
  if (!image || !canvas || !crop.width || !crop.height) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = crop.width;
  canvas.height = crop.height;

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height
  );
};
