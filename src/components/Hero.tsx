"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Coffee, Code, ArrowRight } from "lucide-react";

export default function Hero() {
  const [activeSide, setActiveSide] = useState<"lover" | "solver" | null>(null);

  return (
    <section className="relative w-full h-full overflow-hidden flex items-center bg-cream-bg">
      {/* Dynamic Background Split Glow */}
      <div className="absolute inset-0 flex transition-all duration-700 ease-out">
        {/* Left: Lover side container */}
        <div className={`h-full transition-all duration-700 ease-out relative overflow-hidden flex flex-col justify-center px-8 sm:px-16 lg:px-24 ${
          activeSide === "lover" ? "w-[60%] bg-amber-50/40" : activeSide === "solver" ? "w-[40%] bg-zinc-100/10" : "w-1/2 bg-transparent"
        }`}>
          {/* Subtle warm orange gradient */}
          <div className="absolute inset-0 bg-radial-gradient from-amber-200/10 to-transparent opacity-50 pointer-events-none" />
          
          <div className={`transition-all duration-500 transform ${
            activeSide === "lover" ? "scale-105 translate-x-2" : activeSide === "solver" ? "opacity-20 scale-95 blur-[1px]" : ""
          }`}>
            <div className="flex items-center gap-2 text-amber-700/80 font-serif italic text-base sm:text-lg mb-2">
              <Coffee size={18} />
              <span>ชีวิตส่วนตัว — The Lover</span>
            </div>
            
            <h1 className="font-serif italic text-3xl sm:text-5xl lg:text-7xl text-cream-ink leading-tight font-medium">
              Lover <br />
              <span className="text-amber-800 tracking-wide font-normal text-xl sm:text-3xl lg:text-4xl">อบอุ่น อ่อนโยน บันทึกด้วยใจ</span>
            </h1>
            
            <p className="font-handwriting text-xl sm:text-2xl lg:text-3xl text-cream-mid mt-4 max-w-sm leading-relaxed">
              "ความงามในความเรียบง่าย ร้านกาแฟ และบันทึกห้วงความรู้สึก..."
            </p>

            {/* Portal Navigation Links for Lover */}
            <div className={`mt-8 flex flex-col sm:flex-row gap-4 transition-all duration-500 ${
              activeSide === "lover" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
            }`}>
              <Link 
                href="/perspective"
                className="px-6 py-3 bg-amber-100 hover:bg-amber-200/80 border border-amber-200 text-amber-900 rounded-full font-serif italic font-semibold text-sm shadow-sm transition-all duration-300 hover:shadow flex items-center justify-between gap-4 group"
              >
                <span>Enter Perspective</span>
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link 
                href="/creative"
                className="px-6 py-3 bg-cream-surface hover:bg-cream-muted/20 border border-cream-muted text-cream-ink rounded-full font-serif italic font-semibold text-sm shadow-sm transition-all duration-300 hover:shadow flex items-center justify-between gap-4 group"
              >
                <span>Enter Creative</span>
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Solver side container */}
        <div className={`h-full transition-all duration-700 ease-out relative overflow-hidden flex flex-col justify-center px-8 sm:px-16 lg:px-24 border-l border-cream-muted/30 ${
          activeSide === "solver" ? "w-[60%] bg-teal-50/15" : activeSide === "lover" ? "w-[40%] bg-zinc-100/10" : "w-1/2 bg-transparent"
        }`}>
          {/* Subtle cool teal gradient */}
          <div className="absolute inset-0 bg-radial-gradient from-teal-100/15 to-transparent opacity-50 pointer-events-none" />

          <div className={`transition-all duration-500 transform ${
            activeSide === "solver" ? "scale-105 md:-translate-x-2" : activeSide === "lover" ? "opacity-20 scale-95 blur-[1px]" : ""
          }`}>
            <div className="flex items-center gap-2 text-teal-700/90 font-sans text-sm tracking-widest uppercase font-semibold mb-2">
              <Code size={16} />
              <span>ชีวิตงาน — The Solver</span>
            </div>
            
            <h2 className="font-serif italic text-3xl sm:text-5xl lg:text-7xl text-cream-ink leading-tight font-medium">
              Solver <br />
              <span className="text-teal-900 tracking-wide font-sans font-normal text-xl sm:text-3xl lg:text-4xl font-light">ตรรกะ แม่นยำ ไขโจทย์ระบบ</span>
            </h2>
            
            <p className="text-xs sm:text-sm lg:text-base text-cream-mid mt-4 max-w-sm leading-relaxed font-sans font-light">
              "Solving complex computation models and engineering datasets with structured logic."
            </p>

            {/* Portal Navigation Links for Solver */}
            <div className={`mt-8 flex flex-col sm:flex-row gap-4 transition-all duration-500 ${
              activeSide === "solver" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
            }`}>
              <Link 
                href="/reflective"
                className="px-6 py-3 bg-teal-950 hover:bg-teal-900 text-teal-50 rounded-full font-sans font-semibold text-xs tracking-wider uppercase shadow-sm transition-all duration-300 hover:shadow flex items-center justify-between gap-4 group"
              >
                <span>Enter Reflective</span>
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link 
                href="/eatver"
                className="px-6 py-3 bg-cream-surface hover:bg-cream-muted/20 border border-cream-muted text-cream-ink rounded-full font-sans font-semibold text-xs tracking-wider uppercase shadow-sm transition-all duration-300 hover:shadow flex items-center justify-between gap-4 group"
              >
                <span>Enter Eatver</span>
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Center Portrait Anchor */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none transition-all duration-700 hidden lg:block ${
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

      {/* Help hover notice when neutral */}
      {!activeSide && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-none text-center bg-cream-surface/30 backdrop-blur-[2px] border border-cream-muted/20 px-6 py-2 rounded-full shadow-sm animate-pulse">
          <p className="text-[10px] tracking-widest uppercase font-bold text-cream-mid">
            Hover either side to enter portals
          </p>
        </div>
      )}
    </section>
  );
}
