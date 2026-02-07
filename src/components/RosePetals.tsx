'use client';

import { useEffect, useRef } from 'react';
import { createPetal, drawPetal, type Petal } from '@/lib/animations';

interface RosePetalsProps {
  petalCount?: number;
}

export default function RosePetals({ petalCount = 50 }: RosePetalsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const petalsRef = useRef<Petal[]>([]);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize petals
    petalsRef.current = Array.from({ length: petalCount }, () =>
      createPetal(canvas.width, canvas.height)
    );

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petalsRef.current.forEach((petal) => {
        // Update position
        petal.x += petal.vx;
        petal.y += petal.vy;
        petal.rotation += petal.rotationSpeed;

        // Add slight wind effect
        petal.vx += (Math.random() - 0.5) * 0.02;
        petal.vx *= 0.99; // Damping

        // Reset if off screen
        if (petal.y > canvas.height + 20) {
          petal.y = -20;
          petal.x = Math.random() * canvas.width;
        }
        if (petal.x < -20) petal.x = canvas.width + 20;
        if (petal.x > canvas.width + 20) petal.x = -20;

        drawPetal(ctx, petal, mouseRef.current.x, mouseRef.current.y);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [petalCount]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ background: 'transparent' }}
    />
  );
}
