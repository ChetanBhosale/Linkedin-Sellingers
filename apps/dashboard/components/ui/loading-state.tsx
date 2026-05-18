"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import EncryptedText to avoid SSR hydration issues
const EncryptedText = dynamic(
  () => import("@/components/ui/encrypted-text").then((mod) => mod.EncryptedText),
  { ssr: false }
);

interface LoadingStateProps {
  className?: string;
}

export function LoadingState({ className = "" }: LoadingStateProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`relative flex flex-col items-center justify-center h-screen w-screen overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--blue-25)] via-[var(--bg-primary)] to-[var(--blue-50)] dark:from-[var(--bg-primary)] dark:via-[var(--bg-secondary)] dark:to-[var(--bg-primary)]" />
      <motion.div
        className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-40"
        style={{
          background: "radial-gradient(circle, var(--blue-500) 0%, var(--blue-300) 40%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-[-10%] left-[-5%] w-[450px] h-[450px] rounded-full blur-[120px] opacity-40"
        style={{
          background: "radial-gradient(circle, var(--blue-400) 0%, var(--blue-200) 40%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className="relative"
        >
          {/* Blue glow effect behind text */}
          <motion.div
            className="absolute inset-0 blur-3xl opacity-60"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-full h-full bg-[var(--blue-500)]" />
          </motion.div>
          
          {/* Encrypted text with blue color - smaller size */}
          <div className="relative" style={{ filter: "drop-shadow(0 0 20px var(--blue-400))" }}>
            {mounted ? (
              <EncryptedText
                text="Linkrunner"
                className="text-xl font-bold tracking-tight"
                revealedClassName="text-[var(--blue-500)]"
                encryptedClassName="text-[var(--blue-300)]"
                revealDelayMs={80}
                flipDelayMs={40}
              />
            ) : (
              <div className="text-xl font-bold tracking-tight text-[var(--blue-500)]">
                Linkruner
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Floating particles effect - blue themed */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[var(--blue-400)]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0, 0.7, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}
