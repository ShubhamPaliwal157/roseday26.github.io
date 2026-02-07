'use client';

import { motion } from 'framer-motion';

interface LoveMessageProps {
  message: string;
  delay?: number;
  emoji?: string;
}

export default function LoveMessage({ message, delay = 0, emoji = '🌹' }: LoveMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-pink-200/50 max-w-md mx-auto mb-6 hover:shadow-xl transition-shadow"
    >
      <div className="flex items-start gap-3">
        <span className="text-3xl">{emoji}</span>
        <p className="text-pink-800 text-lg leading-relaxed font-medium">
          {message}
        </p>
      </div>
    </motion.div>
  );
}
