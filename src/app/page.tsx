'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import RosePetals from '@/components/RosePetals';
import FloatingHearts from '@/components/FloatingHearts';
import LoveMessage from '@/components/LoveMessage';
import RoseCanvas from '@/components/RoseCanvas';

const messages = [
  {
    text: "Happy Rose Day, my beautiful Kana! 🌹",
    emoji: "🌹",
  },
  {
    text: "Every petal that falls reminds me of how much I love you.",
    emoji: "💕",
  },
  {
    text: "You are the most precious rose in my garden of life.",
    emoji: "🌷",
  },
  {
    text: "Just like a rose, you bring beauty and joy wherever you go.",
    emoji: "✨",
  },
  {
    text: "I hope this day is as special and lovely as you are!",
    emoji: "💖",
  },
  {
    text: "Thank you for being the amazing person you are, Kana!",
    emoji: "🥰",
  },
];

interface Sparkle {
  left: number;
  top: number;
  delay: number;
  duration: number;
}

export default function Home() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Generate sparkles only on client side
    const sparkleData: Sparkle[] = Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
    }));
    setSparkles(sparkleData);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-100/50 via-white/30 to-pink-100/50"></div>
        {isMounted && (
          <div className="absolute top-0 left-0 w-full h-full">
            {sparkles.map((sparkle, i) => (
              <div
                key={i}
                className="absolute sparkle"
                style={{
                  left: `${sparkle.left}%`,
                  top: `${sparkle.top}%`,
                  animationDelay: `${sparkle.delay}s`,
                  animationDuration: `${sparkle.duration}s`,
                }}
              >
                ✨
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Canvas Animations */}
      <RosePetals petalCount={60} />
      <FloatingHearts />

      {/* Main Content */}
      <main className="relative z-30 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 bg-clip-text text-transparent float"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            Happy Rose Day
          </motion.h1>
          <motion.h2
            className="text-4xl md:text-5xl font-semibold text-pink-700 mb-8"
            style={{ fontFamily: 'var(--font-nunito)' }}
          >
            Kana! 🌹
          </motion.h2>
        </motion.div>

        {/* Animated Rose */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <RoseCanvas />
        </motion.div>

        {/* Love Messages */}
        <div className="w-full max-w-2xl space-y-4">
          {messages.map((message, index) => (
            <LoveMessage
              key={index}
              message={message.text}
              emoji={message.emoji}
              delay={0.5 + index * 0.2}
            />
          ))}
        </div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-pink-600 text-xl font-medium gentle-pulse">
            With all my love 💕
          </p>
          <p className="text-pink-500 text-lg mt-2">
            Click anywhere to create more hearts! 💖
          </p>
        </motion.div>
      </main>
    </div>
  );
}
