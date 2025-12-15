"use client";

import RotatingArrowFrame from "./RotatingArrowFrame";

interface ArrowFrameCarouselProps {
  isLightMode?: boolean;
  onClick?: () => void;
}

export default function ArrowFrameCarousel({ isLightMode = false, onClick }: ArrowFrameCarouselProps) {
  const frames = Array(5).fill(null);
  
  return (
    <div className="w-full overflow-hidden py-12">
      <div className="flex gap-6 animate-scroll-right items-center">
        {/* First set of frames */}
        {frames.map((_, i) => (
          <RotatingArrowFrame
            key={`first-${i}`}
            isLightMode={isLightMode}
            onClick={onClick}
            size="w-[150px] h-[150px]"
          />
        ))}
        {/* Duplicate set for seamless loop */}
        {frames.map((_, i) => (
          <RotatingArrowFrame
            key={`second-${i}`}
            isLightMode={isLightMode}
            onClick={onClick}
            size="w-[150px] h-[150px]"
          />
        ))}
      </div>
    </div>
  );
}

