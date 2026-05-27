"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowDown, Coffee, Code } from "lucide-react";

export default function Hero() {
  const [activeSide, setActiveSide] = useState<"lover" | "solver" | null>(null);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-cream-bg flex items-center">
      {/* Dynamic Background Split Glow */}
      <div className="absolute inset-0 flex transition-all duration-700 ease-out">
        <div className={`h-full transition-all duration-700 ease-out flex items-center justify-center relative overflow-hidden ${
          activeSide === "lover" ? "w-[58%] bg-amber-50/40" : activeSide === "solver" ? "w-[42%] bg-zinc-100/10" : "w-1/2 bg-transparent"
        }`}>
          {/* Subtle warm orange gradient for Lover side */}
          <div className="absolute inset-0 bg-radial-gradient from-amber-200/10 to-transparent opacity-50 pointer-events-none" />
        </div>
        <div className={`h-full transition-all duration-700 ease-out flex items-center justify-center relative overflow-hidden ${
          activeSide === "solver" ? "w-[58%] bg-teal-50/15" : activeSide === "lover" ? "w-[42%] bg-zinc-100/10" : "w-1/2 bg-transparent"
        }`}>
          {/* Subtle teal gradient for Solver side */}
          <div className="absolute inset-0 bg-radial-gradient from-teal-100/15 to-transparent opacity-50 pointer-events-none" />
        </div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Interactive Side: Lover */}
        <div 
          className="w-full md:w-1/2 h-[45%] md:h-full flex flex-col justify-center items-start md:pr-16 cursor-pointer select-none group/left transition-all duration-500 py-6"
          onMouseEnter={() => setActiveSide("lover")}
          onMouseLeave={() => setActiveSide(null)}
        >
          <div className={`transition-all duration-500 transform ${
            activeSide === "lover" ? "scale-105 translate-x-2" : activeSide === "solver" ? "opacity-25 scale-95 blur-[1px]" : ""
          }`}>
            <div className="flex items-center gap-2 text-amber-700/80 font-serif italic text-lg mb-2">
              <Coffee size={18} className="animate-pulse" />
              <span>สองร่างในคนเดียว — ชีวิตส่วนตัว</span>
            </div>
            <h1 className="font-serif italic text-3xl sm:text-4xl lg:text-6xl text-cream-ink leading-tight font-medium">
              The Lover <br />
              <span className="text-amber-800 tracking-wide font-normal text-2xl sm:text-3xl lg:text-4xl">อบอุ่น อ่อนโยน บันทึกด้วยใจ</span>
            </h1>
            <p className="font-handwriting text-xl sm:text-2xl lg:text-3xl text-cream-mid mt-4 max-w-md leading-relaxed">
              "เพราะโลกมีความงามซ่อนอยู่ในรอยยิ้ม ร้านกาแฟแสนสงบ และบันทึกเขียนมือที่ไม่เร่งร้อน..."
            </p>
            <div className="mt-6 flex items-center gap-3 text-xs sm:text-sm text-amber-700/80 uppercase tracking-widest font-semibold">
              <span>Moments</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Authenticity</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Intimacy</span>
            </div>
          </div>
        </div>

        {/* Right Interactive Side: Solver */}
        <div 
          className="w-full md:w-1/2 h-[45%] md:h-full flex flex-col justify-center items-start md:pl-16 cursor-pointer select-none group/right transition-all duration-500 py-6 border-t md:border-t-0 md:border-l border-cream-muted/30"
          onMouseEnter={() => setActiveSide("solver")}
          onMouseLeave={() => setActiveSide(null)}
        >
          <div className={`transition-all duration-500 transform ${
            activeSide === "solver" ? "scale-105 md:-translate-x-2" : activeSide === "lover" ? "opacity-25 scale-95 blur-[1px]" : ""
          }`}>
            <div className="flex items-center gap-2 text-teal-700/90 font-sans text-sm tracking-widest uppercase font-semibold mb-2">
              <Code size={16} />
              <span>สองร่างในคนเดียว — ชีวิตงาน</span>
            </div>
            <h2 className="font-serif italic text-3xl sm:text-4xl lg:text-6xl text-cream-ink leading-tight font-medium">
              The Solver <br />
              <span className="text-teal-900 tracking-wide font-sans font-normal text-2xl sm:text-3xl lg:text-4xl">แม่นยำ ทรงพลัง ไขโจทย์ประมวลผล</span>
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-cream-mid mt-4 max-w-md leading-relaxed font-sans font-light">
              "Solving complex computation models and engineering datasets with structured logic. Science is but a code to translate nature."
            </p>
            <div className="mt-6 flex items-center gap-3 text-xs sm:text-sm text-teal-800/80 uppercase tracking-widest font-semibold">
              <span>Research</span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
              <span>Algorithms</span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
              <span>Engineering</span>
            </div>
          </div>
        </div>

      </div>

      {/* Floating Center Portrait Anchor */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none transition-all duration-700 hidden md:block ${
        activeSide === "lover" ? "rotate-2 scale-[1.02]" : activeSide === "solver" ? "-rotate-2 scale-[1.02]" : ""
      }`}>
        <div className="relative w-[320px] h-[320px] lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden border-[6px] border-cream-bg shadow-2xl transition-all duration-500 bg-cream-surface">
          <Image 
            src="/ve_portrait.png" 
            alt="Ve Tan Boon Double Exposure Portrait" 
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-[10px] tracking-widest uppercase text-cream-mid font-semibold font-sans">
          Scroll to explore
        </span>
        <div className="w-8 h-8 rounded-full bg-cream-surface border border-cream-muted/50 flex items-center justify-center text-cream-mid animate-bounce shadow-sm">
          <ArrowDown size={14} />
        </div>
      </div>

    </section>
  );
}
