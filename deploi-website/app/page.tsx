"use client";

import Navbar from "@/components/Navbar";
import AnimatedArrowFrame from "@/components/AnimatedArrowFrame";
import ArrowFrameCarousel from "@/components/ArrowFrameCarousel";
import { useState, useEffect } from "react";

export default function Home() {
  const [isLightMode, setIsLightMode] = useState(false);

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
  };

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add("light-mode");
    } else {
      document.documentElement.classList.remove("light-mode");
    }

    // Update favicon based on theme
    const updateFavicon = () => {
      // Remove existing favicon links
      const existingLinks = document.querySelectorAll("link[rel='icon'], link[rel='shortcut icon']");
      existingLinks.forEach(link => link.remove());

      // Create new favicon link
      const link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/svg+xml";
      link.href = isLightMode ? "/Deploi Icon Black.svg" : "/Deploi Icon.svg";
      document.head.appendChild(link);
    };

    updateFavicon();
  }, [isLightMode]);

  return (
    <main className={`min-h-screen relative p-4 md:p-10 transition-colors duration-300 ${
      isLightMode ? "bg-white text-black" : "bg-black text-white"
    }`}>
      <Navbar isLightMode={isLightMode} />

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col min-h-screen">
        {/* Carousel Above */}
        <div className="pt-20">
          <ArrowFrameCarousel onClick={toggleTheme} isLightMode={isLightMode} />
        </div>

        {/* Centered Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 -mt-8">
          <div className="text-center max-w-xl">
            <h1 className="font-light text-4xl sm:text-5xl leading-tight mb-4 md:mb-6">
              <span className="inline-block animate-word-1">Tailored</span>
              {" "}
              <span className="inline-block animate-word-2">Solutions</span>
              {" "}
              <span className="inline-block animate-word-3">Just</span>
              {" "}
              <span className="inline-block animate-word-4">For</span>
              {" "}
              <span className="inline-block animate-word-5">You</span>
            </h1>
            <p className={`animate-description max-w-lg mx-auto text-base sm:text-lg mb-6 md:mb-8 font-light ${
              isLightMode ? "text-gray-600" : "text-gray-400"
            }`}>
              Transform your business with tailored software solutions that scale with your needs.
            </p>
            <div className="flex justify-center">
              <a 
                href="https://wa.me/6281291767679" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`animate-button inline-block px-6 py-3 md:px-8 md:py-4 font-medium text-base md:text-lg transition-colors rounded ${
                  isLightMode 
                    ? "bg-black text-white hover:bg-gray-800" 
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                Get Solutions
              </a>
            </div>
          </div>
        </div>

        {/* Carousel Below */}
        <div className="-mt-8 pb-8">
          <ArrowFrameCarousel onClick={toggleTheme} isLightMode={isLightMode} />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex absolute inset-0 items-center justify-center px-10 lg:px-22">
        <div className="w-full max-w-7xl flex items-center justify-center gap-16 lg:gap-30">
          {/* Tagline and CTA - Left Side */}
          <div className="flex-1 max-w-2xl text-left">
            <h1 className="font-light max-w-xl text-5xl lg:text-6xl leading-tight mb-6">
              <span className="inline-block animate-word-1">Tailored</span>
              {" "}
              <span className="inline-block animate-word-2">Solutions</span>
              {" "}
              <span className="inline-block animate-word-3">Just</span>
              {" "}
              <span className="inline-block animate-word-4">For</span>
              {" "}
              <span className="inline-block animate-word-5">You</span>
            </h1>
            <p className={`animate-description max-w-lg text-xl mb-8 font-light ${
              isLightMode ? "text-gray-600" : "text-gray-400"
            }`}>
              Transform your business with tailored software solutions that scale with your needs.
            </p>
            <div className="flex justify-start">
              <a 
                href="https://wa.me/6281291767679" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`animate-button inline-block px-8 py-4 font-medium text-lg transition-colors rounded ${
                  isLightMode 
                    ? "bg-black text-white hover:bg-gray-800" 
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                Get Solutions
              </a>
            </div>
          </div>

          {/* Arrow Frame SVG - Right Side */}
          <AnimatedArrowFrame onClick={toggleTheme} isLightMode={isLightMode} />
        </div>
      </div>
    </main>
  );
}
