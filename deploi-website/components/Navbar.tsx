"use client";

import AnimatedLogo from "@/components/AnimatedLogo";
import { useState } from "react";

interface NavbarProps {
  isLightMode?: boolean;
}

export default function Navbar({ isLightMode = false }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="absolute pt-3 md:pt-0 top-4 left-4 right-4 md:top-10 md:left-10 md:right-10">
      {/* Mobile Layout - Logo left, Hamburger right */}
      <div className="md:hidden flex items-center justify-between w-full">
        {/* Logo - Left */}
        <div className="flex justify-start">
          <AnimatedLogo isLightMode={isLightMode} />
        </div>

        {/* Hamburger Menu - Right */}
        <div className="flex justify-end">
          <button
            className="flex flex-col gap-1.5 z-50 relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 transition-all duration-300 ${
              isLightMode ? "bg-black" : "bg-white"
            } ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`w-6 h-0.5 transition-all duration-300 ${
              isLightMode ? "bg-black" : "bg-white"
            } ${isMenuOpen ? "opacity-0" : ""}`}></span>
            <span className={`w-6 h-0.5 transition-all duration-300 ${
              isLightMode ? "bg-black" : "bg-white"
            } ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between w-full">
        <div className="flex items-center gap-8">
          <AnimatedLogo isLightMode={isLightMode} />
          <nav>
            <ul className={`flex items-center gap-10 font-light text-xl ml-6 transition-colors duration-300 ${
              isLightMode ? "text-black" : "text-white"
            }`}>
              <li className="animate-nav-link-1">
                <a href="#" className="hover:opacity-80 transition-opacity">
                  Solutions
                </a>
              </li>
              <li className="animate-nav-link-2">
                <a href="#" className="hover:opacity-80 transition-opacity">
                  About
                </a>
              </li>
              <li className="animate-nav-link-3">
                <a href="https://wa.me/6281291767679" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <button className={`px-6 py-2 font-medium text-lg transition-colors rounded ${
          isLightMode 
            ? "bg-black text-white hover:bg-gray-800" 
            : "bg-white text-black hover:bg-gray-200"
        }`}>
          Login
        </button>
      </div>

      {/* Mobile Navigation Popover */}
      <nav className={`absolute top-[calc(100%+0.8rem)] left-0 right-0 w-full ${
        isLightMode ? "bg-white border-b border-gray-200" : "bg-black border-b border-gray-800"
      } transform transition-all duration-300 z-50 md:hidden ${
        isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
      }`}>
        <div className="flex flex-col py-4 px-6 gap-4">
          <ul className={`flex flex-col gap-4 font-light text-base transition-colors duration-300 ${
            isLightMode ? "text-black" : "text-white"
          }`}>
            <li>
              <a href="#" className="hover:opacity-80 transition-opacity" onClick={() => setIsMenuOpen(false)}>
                Solutions
              </a>
            </li>
            <li>
              <a href="#" className="hover:opacity-80 transition-opacity" onClick={() => setIsMenuOpen(false)}>
                About
              </a>
            </li>
            <li>
              <a href="https://wa.me/6281291767679" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" onClick={() => setIsMenuOpen(false)}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

