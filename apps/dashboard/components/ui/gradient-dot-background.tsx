import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useMemo, useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface GradientDotBackgroundProps {
  className?: string;
  /** Whether to show the dot pattern overlay */
  showDots?: boolean;
  /** Whether to animate the dots */
  animateDots?: boolean;
}

/**
 * Animated dot component with motion effects
 */
const AnimatedDot = ({ 
  cx, 
  cy, 
  delay, 
  animationType, 
  floatDistance, 
  driftX, 
  driftY,
  isDark
}: { 
  cx: number; 
  cy: number; 
  delay: number; 
  animationType: string; 
  floatDistance: number; 
  driftX: number; 
  driftY: number;
  isDark: boolean;
}) => {
  const animations = {
    float: {
      opacity: [0.15, 0.6, 0.15],
      cy: [cy, cy - floatDistance, cy],
      cx: [cx, cx + (Math.random() - 0.5) * 6, cx],
    },
    pulse: {
      opacity: [0.2, 0.7, 0.2],
      r: [1.2, 1.8, 1.2],
    },
    drift: {
      opacity: [0.15, 0.5, 0.15],
      cx: [cx, cx + driftX, cx],
      cy: [cy, cy + driftY, cy],
    },
  };

  const animation = animations[animationType as keyof typeof animations];
  
  // Blue/purple color for dark mode, dark gray for light mode
  const dotColor = isDark ? "rgba(115, 130, 255, 0.5)" : "rgba(13, 13, 13, 0.12)";

  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={1.5}
      fill={dotColor}
      initial={{ opacity: 0.15 }}
      animate={animation}
      transition={{
        duration: animationType === 'float' ? 3 : animationType === 'drift' ? 4 : 2.5,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

/**
 * Gradient background with dot pattern overlay
 * Matches Figma design: light blue base (#f5fbff) with purple/blue gradient blurs
 * with subtle dot pattern overlay
 */
export function GradientDotBackground({
  className,
  showDots = true,
  animateDots = true,
}: GradientDotBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Measure container and update on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Generate animated dots - increased spacing for better performance
  const spacing = 50; // Increased from 28 to reduce dot count significantly
  const cols = Math.ceil(dimensions.width / spacing) + 1;
  const rows = Math.ceil(dimensions.height / spacing) + 1;

  const dots = useMemo(() => {
    if (rows <= 0 || cols <= 0) return [];
    
    const dotArray = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const randomType = Math.random();
        dotArray.push({
          id: `${row}-${col}`,
          x: col * spacing,
          y: row * spacing,
          delay: Math.random() * 2,
          animationType: randomType < 0.4 ? 'float' : randomType < 0.7 ? 'pulse' : 'drift',
          floatDistance: Math.random() * 8 + 4,
          driftX: (Math.random() - 0.5) * 12,
          driftY: (Math.random() - 0.5) * 12,
        });
      }
    }
    return dotArray;
  }, [rows, cols]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 overflow-hidden",
        className
      )}
    >
      {/* Base background - Figma bg/status/info #f5fbff */}
      <div
        className="absolute inset-0 bg-[#f5fbff] dark:bg-[var(--bg-secondary)]"
      />
      
      {/* Main gradient blur - top right - vibrant purple/blue */}
      <div
        className="absolute right-[-100px] top-[-100px] h-[500px] w-[500px] rounded-full blur-[100px]"
        style={{
          background: 'radial-gradient(circle, rgba(77, 75, 247, 0.35) 0%, rgba(115, 130, 255, 0.25) 40%, rgba(192, 209, 255, 0.15) 70%, transparent 100%)',
        }}
      />
      
      {/* Main gradient blur - bottom left - vibrant purple/blue */}
      <div
        className="absolute bottom-[-100px] left-[-100px] h-[450px] w-[450px] rounded-full blur-[100px]"
        style={{
          background: 'radial-gradient(circle, rgba(77, 75, 247, 0.3) 0%, rgba(115, 130, 255, 0.2) 40%, rgba(192, 209, 255, 0.1) 70%, transparent 100%)',
        }}
      />
      
      {/* Accent spark - center top */}
      <div
        className="absolute left-[40%] top-[5%] h-[300px] w-[300px] rounded-full blur-[80px]"
        style={{
          background: 'radial-gradient(circle, rgba(88, 92, 255, 0.25) 0%, rgba(151, 171, 255, 0.15) 50%, transparent 80%)',
        }}
      />
      
      {/* Accent spark - right center */}
      <div
        className="absolute right-[10%] top-[35%] h-[350px] w-[350px] rounded-full blur-[90px]"
        style={{
          background: 'radial-gradient(circle, rgba(77, 75, 247, 0.2) 0%, rgba(115, 130, 255, 0.12) 50%, transparent 80%)',
        }}
      />
      
      {/* Accent spark - bottom center */}
      <div
        className="absolute bottom-[15%] left-[45%] h-[250px] w-[250px] rounded-full blur-[70px]"
        style={{
          background: 'radial-gradient(circle, rgba(88, 92, 255, 0.18) 0%, rgba(151, 171, 255, 0.1) 50%, transparent 80%)',
        }}
      />
      
      {/* Small accent - left side */}
      <div
        className="absolute left-[15%] top-[50%] h-[200px] w-[200px] rounded-full blur-[60px]"
        style={{
          background: 'radial-gradient(circle, rgba(77, 75, 247, 0.15) 0%, rgba(192, 209, 255, 0.08) 50%, transparent 80%)',
        }}
      />
      
      {/* Animated dot pattern overlay */}
      {showDots && animateDots && dimensions.width > 0 && (
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
          aria-hidden="true"
        >
          {dots.map((dot) => (
            <AnimatedDot
              key={dot.id}
              cx={dot.x}
              cy={dot.y}
              delay={dot.delay}
              animationType={dot.animationType}
              floatDistance={dot.floatDistance}
              driftX={dot.driftX}
              driftY={dot.driftY}
              isDark={isDark}
            />
          ))}
        </svg>
      )}
      
      {/* Static dot pattern fallback */}
      {showDots && !animateDots && (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
        >
          <defs>
            <pattern
              id="dot-pattern-static"
              width={24}
              height={24}
              patternUnits="userSpaceOnUse"
            >
              <circle cx={1.5} cy={1.5} r={1.5} fill={isDark ? "rgba(115, 130, 255, 0.5)" : "rgba(13,13,13,0.12)"} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-pattern-static)" />
        </svg>
      )}
    </div>
  );
}

export default GradientDotBackground;
