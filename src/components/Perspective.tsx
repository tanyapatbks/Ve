"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, BookOpen } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface PerspectiveItem {
  id: string;
  year: string;
  title: string;
  description: string;
  note: string;
  image?: string;
}

interface PerspectiveProps {
  items: PerspectiveItem[];
}

export default function Perspective({ items }: PerspectiveProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  // Sort items: oldest to newest (left to right)
  const sortedItems = [...items].sort((a, b) => parseInt(a.year) - parseInt(b.year));

  useEffect(() => {
    // Scroll to the end (Present) on initial load so the user starts at the present!
    if (scrollTrackRef.current) {
      const element = scrollTrackRef.current;
      element.scrollLeft = element.scrollWidth - element.clientWidth;
    }

    // Horizontal wheel scroll conversion
    const handleWheel = (e: WheelEvent) => {
      if (!scrollTrackRef.current) return;
      
      const element = scrollTrackRef.current;
      const isAtLeft = element.scrollLeft === 0;
      const isAtRight = Math.ceil(element.scrollLeft + element.clientWidth) >= element.scrollWidth;

      // Only hijack scroll if we are in bounds of the horizontal timeline
      if ((e.deltaY < 0 && !isAtLeft) || (e.deltaY > 0 && !isAtRight)) {
        e.preventDefault();
        element.scrollTo({
          left: element.scrollLeft + e.deltaY * 1.2,
          behavior: "auto"
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    // GSAP entry reveal animation
    const cards = gsap.utils.toArray(".timeline-card");
    cards.forEach((card: any) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [sortedItems]);

  return (
    <section 
      id="perspective" 
      ref={containerRef}
      className="py-24 bg-cream-bg min-h-screen flex flex-col justify-center border-t border-cream-muted/30"
    >
      <div className="max-w-7xl mx-auto px-6 w-full mb-10">
        <div className="flex items-center gap-3 text-cream-mid font-serif italic text-lg mb-2">
          <BookOpen size={20} />
          <span>Perspective</span>
        </div>
        <h2 className="font-serif italic text-4xl lg:text-6xl text-cream-ink leading-tight font-medium">
          กระดาษแผ่นยาวของชีวิต
        </h2>
        <p className="text-sm text-cream-mid mt-2 max-w-xl font-sans tracking-wide">
          บันทึกการเดินทางตามลำดับเวลา เลื่อนซ้ายเพื่อมองย้อนกลับไปในอดีต (Birth ➔ Present) 
          <span className="hidden md:inline"> และสามารถเลื่อนล้อเมาส์เพื่อเดินทางในเวลาได้</span>
        </p>
      </div>

      {/* Horizontal Scroll Track */}
      <div 
        ref={scrollTrackRef}
        className="w-full overflow-x-auto overflow-y-hidden py-10 scrollbar-none perspective-timeline-container flex flex-row items-stretch select-none"
        style={{ scrollBehavior: "smooth" }}
      >
        {/* Continuous Paper Roller Wrapper */}
        <div className="flex gap-16 px-12 md:px-24 min-w-max items-center relative py-6 bg-cream-surface/30 border-y border-cream-muted/20 shadow-inner">
          
          {/* Scroll Navigation Hint */}
          <div className="flex flex-col items-center justify-center text-cream-mid/70 max-w-[200px] text-center pr-8 border-r border-cream-muted/30 animate-pulse">
            <ArrowLeft size={24} className="mb-2" />
            <span className="text-xs font-semibold tracking-widest uppercase">เลื่อนย้อนไปในอดีต</span>
            <span className="font-handwriting text-lg mt-1"> birth is here </span>
          </div>

          {/* Timeline Cards */}
          {sortedItems.map((item, index) => (
            <div 
              key={item.id} 
              className="timeline-card w-[320px] sm:w-[420px] bg-cream-bg rounded-lg shadow-md border border-cream-muted/40 p-6 md:p-8 flex flex-col relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Notebook Line Aesthetic */}
              <div className="absolute inset-x-0 bottom-4 top-20 journal-lines opacity-10 pointer-events-none" />

              {/* Header: Year */}
              <div className="flex justify-between items-baseline border-b border-cream-muted/30 pb-4 mb-4">
                <span className="font-serif italic text-5xl lg:text-7xl font-bold text-cream-mid/45 tracking-tighter">
                  {item.year}
                </span>
                <span className="text-xs uppercase tracking-widest font-bold text-cream-mid/80 bg-cream-surface px-2.5 py-1 rounded-full border border-cream-muted/20">
                  Milestone {index + 1}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif italic text-2xl text-cream-ink font-semibold mb-3">
                {item.title}
              </h3>

              {/* Main Description */}
              <p className="text-sm text-cream-ink/80 leading-relaxed font-sans font-light mb-6 flex-grow whitespace-normal">
                {item.description}
              </p>

              {/* Handwriting Journal Note */}
              <div className="bg-amber-50/20 border-l-2 border-cream-mid/40 pl-4 py-2 mt-auto">
                <p className="font-handwriting text-xl sm:text-2xl text-cream-mid/95 leading-snug whitespace-normal">
                  {item.note}
                </p>
              </div>

              {/* Connector Pin */}
              <div className="absolute top-1/2 -right-10 w-4 h-4 rounded-full bg-cream-muted/60 border-2 border-cream-bg hidden sm:flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-cream-mid" />
              </div>
            </div>
          ))}

          {/* End of Timeline Indicator */}
          <div className="flex flex-col items-center justify-center text-cream-mid/70 max-w-[200px] text-center pl-8 border-l border-cream-muted/30">
            <div className="w-4 h-4 rounded-full bg-cream-mid mb-2 animate-ping" />
            <span className="text-xs font-semibold tracking-widest uppercase text-cream-mid">ปัจจุบัน</span>
            <span className="font-handwriting text-lg mt-1">the present moment</span>
          </div>

        </div>
      </div>
    </section>
  );
}
