'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function RoseCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isBloomed, setIsBloomed] = useState(false);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 200;
    canvas.width = size;
    canvas.height = size;

    const centerX = size / 2;
    const centerY = size / 2;

    let bloomProgress = 0;
    const targetBloom = 1;

    const drawRose = (progress: number) => {
      ctx.clearRect(0, 0, size, size);

      // Draw stem
      ctx.strokeStyle = '#228B22';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(centerX, size);
      ctx.lineTo(centerX, centerY + 30);
      ctx.stroke();

      // Draw leaves
      ctx.fillStyle = '#32CD32';
      ctx.beginPath();
      ctx.ellipse(centerX - 15, centerY + 20, 8, 15, -0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(centerX + 15, centerY + 15, 8, 15, 0.5, 0, Math.PI * 2);
      ctx.fill();

      // Draw rose petals (layered)
      const petalLayers = 5;
      const baseRadius = 20 * progress;

      for (let layer = 0; layer < petalLayers; layer++) {
        const layerRadius = baseRadius + layer * 8;
        const petalCount = 5 + layer * 2;
        const layerProgress = Math.max(0, Math.min(1, (progress - layer * 0.15) / 0.3));

        // Skip drawing if layer hasn't started blooming yet
        if (layerProgress <= 0) continue;

        for (let i = 0; i < petalCount; i++) {
          const angle = (i / petalCount) * Math.PI * 2 + (layer * 0.3);
          const petalX = centerX + Math.cos(angle) * layerRadius * layerProgress;
          const petalY = centerY + Math.sin(angle) * layerRadius * layerProgress * 0.7;

          // Ensure gradient radius is always positive
          const gradientRadius = Math.max(0.1, 15 * layerProgress);

          // Draw petal
          const gradient = ctx.createRadialGradient(
            petalX, petalY, 0,
            petalX, petalY, gradientRadius
          );
          
          if (layer === 0) {
            gradient.addColorStop(0, '#FF69B4');
            gradient.addColorStop(1, '#FF1493');
          } else if (layer === 1) {
            gradient.addColorStop(0, '#FFB6C1');
            gradient.addColorStop(1, '#FF69B4');
          } else {
            gradient.addColorStop(0, '#FFE4E1');
            gradient.addColorStop(1, '#FFB6C1');
          }

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.ellipse(
            petalX,
            petalY,
            12 * layerProgress,
            18 * layerProgress,
            angle,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
      }

      // Draw center
      if (progress > 0.3) {
        const centerRadius = Math.max(0.1, 15 * progress);
        const centerGradient = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, centerRadius
        );
        centerGradient.addColorStop(0, '#FF1493');
        centerGradient.addColorStop(1, '#DC143C');
        ctx.fillStyle = centerGradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, Math.max(0.1, 12 * progress), 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const animate = () => {
      if (bloomProgress < targetBloom) {
        bloomProgress += 0.02;
        if (bloomProgress >= targetBloom) {
          bloomProgress = targetBloom;
          setIsBloomed(true);
        }
      }

      drawRose(bloomProgress);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <canvas
        ref={canvasRef}
        className="drop-shadow-2xl"
        style={{ imageRendering: 'auto' }}
      />
      {isBloomed && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <span className="text-4xl animate-pulse">✨</span>
        </motion.div>
      )}
    </motion.div>
  );
}
