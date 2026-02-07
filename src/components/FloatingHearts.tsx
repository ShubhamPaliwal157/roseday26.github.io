'use client';

import { useEffect, useRef, useState } from 'react';
import { createHeart, drawHeart, type Heart } from '@/lib/animations';

export default function FloatingHearts() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const heartsRef = useRef<Heart[]>([]);
  const [isVisible, setIsVisible] = useState(true);

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

    // Initialize some hearts
    heartsRef.current = Array.from({ length: 5 }, () =>
      createHeart(
        Math.random() * canvas.width,
        canvas.height + Math.random() * 200
      )
    );

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      heartsRef.current = heartsRef.current.filter((heart) => {
        heart.y -= heart.speed;
        heart.x += Math.sin(heart.y * 0.01) * 0.5; // Gentle sway

        if (heart.y < -50) {
          return false; // Remove if off screen
        }

        drawHeart(ctx, heart);
        return true;
      });

      // Add new hearts occasionally
      if (Math.random() < 0.02 && heartsRef.current.length < 10) {
        heartsRef.current.push(
          createHeart(
            Math.random() * canvas.width,
            canvas.height + 20
          )
        );
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create multiple hearts at click position
    for (let i = 0; i < 3; i++) {
      heartsRef.current.push(createHeart(x, y));
    }
  };

  if (!isVisible) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-auto z-20 cursor-pointer"
      style={{ background: 'transparent' }}
      onClick={handleClick}
    />
  );
}
