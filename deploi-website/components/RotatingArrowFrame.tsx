"use client";

import { useState, useEffect, useRef } from "react";

interface RotatingArrowFrameProps {
  isLightMode?: boolean;
  onClick?: () => void;
  className?: string;
  size?: string;
}

export default function RotatingArrowFrame({ 
  isLightMode = false, 
  onClick,
  className = "",
  size = "w-[200px] h-[200px]"
}: RotatingArrowFrameProps) {
  const [rotation, setRotation] = useState(0);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const rotationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mark animation as complete after initial delay
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
      // Random delay between 0.8-2 seconds
      const delay = Math.random() * 1200 + 800;
      
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

  return (
    <div 
      className={`flex-shrink-0 ${size} transition-transform duration-300 ease-out cursor-pointer ${className}`}
      onClick={onClick}
      style={{
        transformOrigin: "center center",
        transform: isAnimationComplete ? `rotate(${rotation}deg)` : undefined,
        transition: isAnimationComplete ? "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)" : undefined,
      }}
    >
      <svg 
        width="859" 
        height="859" 
        viewBox="0 0 859 859" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain"
      >
        <g>
          <path 
            d="M857.328 115.401L121.651 851.077L8.21732 737.643L743.894 1.96687L857.328 115.401Z" 
            stroke={isLightMode ? "#000000" : "#FFFFFF"}
            strokeOpacity="1"
            strokeWidth="3"
            fill="none"
            className="transition-colors duration-300"
          />
        </g>
        <g>
          <path 
            d="M698.077 0.501953H858.5V858.5H698.077V0.501953Z" 
            stroke={isLightMode ? "#000000" : "#FFFFFF"}
            strokeOpacity="1"
            strokeWidth="3"
            fill="none"
            className="transition-colors duration-300"
          />
        </g>
        <g>
          <path 
            d="M858.498 0.5V160.923H0.5V0.5H858.498Z" 
            stroke={isLightMode ? "#000000" : "#FFFFFF"}
            strokeOpacity="1"
            strokeWidth="3"
            fill="none"
            className="transition-colors duration-300"
          />
        </g>
      </svg>
    </div>
  );
}

