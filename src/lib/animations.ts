export interface Petal {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  size: number;
  color: string;
  opacity: number;
}

export interface Heart {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
}

export const petalColors = [
  '#FFB6C1', // Light pink
  '#FFC0CB', // Pink
  '#FF69B4', // Hot pink
  '#DC143C', // Crimson
  '#FFE4E1', // Misty rose
  '#FFFFFF', // White
];

export const heartColors = [
  '#FF69B4', // Hot pink
  '#FF1493', // Deep pink
  '#FFB6C1', // Light pink
  '#DC143C', // Crimson
];

export function createPetal(width: number, height: number): Petal {
  return {
    x: Math.random() * width,
    y: -20 - Math.random() * 100,
    vx: (Math.random() - 0.5) * 0.5,
    vy: 0.5 + Math.random() * 1.5,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.1,
    size: 8 + Math.random() * 12,
    color: petalColors[Math.floor(Math.random() * petalColors.length)],
    opacity: 0.6 + Math.random() * 0.4,
  };
}

export function createHeart(x: number, y: number): Heart {
  return {
    x,
    y,
    size: 15 + Math.random() * 20,
    speed: 1 + Math.random() * 2,
    opacity: 0.7 + Math.random() * 0.3,
    color: heartColors[Math.floor(Math.random() * heartColors.length)],
  };
}

export function drawPetal(
  ctx: CanvasRenderingContext2D,
  petal: Petal,
  mouseX?: number,
  mouseY?: number
) {
  ctx.save();
  ctx.translate(petal.x, petal.y);
  ctx.rotate(petal.rotation);
  ctx.globalAlpha = petal.opacity;

  // Draw petal shape (oval/teardrop)
  ctx.fillStyle = petal.color;
  ctx.beginPath();
  ctx.ellipse(0, 0, petal.size * 0.6, petal.size, 0, 0, Math.PI * 2);
  ctx.fill();

  // Add subtle highlight
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.beginPath();
  ctx.ellipse(-petal.size * 0.2, -petal.size * 0.3, petal.size * 0.2, petal.size * 0.3, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  // Add mouse interaction (slight attraction)
  if (mouseX !== undefined && mouseY !== undefined) {
    const dx = mouseX - petal.x;
    const dy = mouseY - petal.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 100) {
      petal.vx += (dx / distance) * 0.01;
      petal.vy += (dy / distance) * 0.01;
    }
  }
}

export function drawHeart(
  ctx: CanvasRenderingContext2D,
  heart: Heart
) {
  ctx.save();
  ctx.translate(heart.x, heart.y);
  ctx.scale(heart.size / 20, heart.size / 20);
  ctx.globalAlpha = heart.opacity;
  ctx.fillStyle = heart.color;

  // Draw heart shape
  ctx.beginPath();
  ctx.moveTo(0, 5);
  ctx.bezierCurveTo(0, 0, -5, 0, -5, 5);
  ctx.bezierCurveTo(-5, 10, 0, 15, 0, 20);
  ctx.bezierCurveTo(0, 15, 5, 10, 5, 5);
  ctx.bezierCurveTo(5, 0, 0, 0, 0, 5);
  ctx.fill();

  ctx.restore();
}
