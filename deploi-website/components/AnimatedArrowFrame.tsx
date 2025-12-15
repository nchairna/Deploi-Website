"use client";

import { useState, useEffect, useRef } from "react";

interface AnimatedArrowFrameProps {
  onClick?: () => void;
  isLightMode?: boolean;
}

export default function AnimatedArrowFrame({ onClick, isLightMode = false }: AnimatedArrowFrameProps) {
  const [rotation, setRotation] = useState(0);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rotationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mark animation as complete after all fade-in animations finish (0.9s + 0.6s = 1.5s)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimationComplete(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Random 90-degree rotations with random delays
  useEffect(() => {
    if (!isAnimationComplete) return;

    const scheduleNextRotation = () => {
      // Check if large screen (lg breakpoint = 1024px)
      const isLargeScreen = window.innerWidth >= 1024;
      // Faster rotation on large screens: 0.4-0.8s, normal on smaller: 0.8-2s
      const delay = isLargeScreen 
        ? Math.random() * 800 + 800 
        : Math.random() * 1200 + 800;
      
      rotationTimeoutRef.current = setTimeout(() => {
        // Randomly choose clockwise (+90) or counterclockwise (-90)
        const direction = Math.random() < 0.5 ? 90 : -90;
        setRotation((prev) => prev + direction);
        
        // Schedule next rotation
        scheduleNextRotation();
      }, delay);
    };

    // Start the rotation cycle
    scheduleNextRotation();

    return () => {
      if (rotationTimeoutRef.current) {
        clearTimeout(rotationTimeoutRef.current);
      }
    };
  }, [isAnimationComplete]);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      ref={containerRef}
      className={`shrink-0 w-[300px] md:w-[400px] lg:w-[500px] h-auto cursor-pointer arrow-frame-hover ${
        isLightMode ? "arrow-frame-light" : ""
      }`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transformOrigin: "center center",
        transform: isAnimationComplete 
          ? `rotate(${rotation}deg) scale(${isHovered ? 1.05 : 1})` 
          : `scale(${isHovered ? 1.05 : 1})`,
        transition: isAnimationComplete 
          ? "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)" 
          : "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <svg 
        width="859" 
        height="859" 
        viewBox="0 0 859 859" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto object-contain"
      >
        {/* Component 1: Diagonal Arrow - appears first */}
        <g className="animate-fade-in-1">
          <path 
            d="M857.328 115.401L121.651 851.077L8.21732 737.643L743.894 1.96687L857.328 115.401Z" 
            stroke={isLightMode ? "#000000" : "#FFFFFF"}
            strokeOpacity="1"
            strokeWidth="2"
            fill="none"
            className="transition-colors duration-300"
          />
        </g>

        {/* Component 2: Vertical Rectangle - appears second */}
        <g className="animate-fade-in-2">
          <path 
            d="M698.077 0.501953H858.5V858.5H698.077V0.501953Z" 
            stroke={isLightMode ? "#000000" : "#FFFFFF"}
            strokeOpacity="1"
            strokeWidth="2"
            fill="none"
            className="transition-colors duration-300"
          />
        </g>

        {/* Component 3: Horizontal Rectangle - appears third */}
        <g className="animate-fade-in-3">
          <path 
            d="M858.498 0.5V160.923H0.5V0.5H858.498Z" 
            stroke={isLightMode ? "#000000" : "#FFFFFF"}
            strokeOpacity="1"
            strokeWidth="2"
            fill="none"
            className="transition-colors duration-300"
          />
        </g>
      </svg>
    </div>
  );
}

