"use client";

import dynamic from "next/dynamic";
import { MapPin, Map } from "lucide-react";

interface FooderPin {
  id: string;
  name: string;
  category: string;
  lat: number;
  lng: number;
  review: string;
  rating: number;
  image?: string;
}

interface FooderProps {
  pins: FooderPin[];
}

// Load Map Component Dynamically to prevent SSR reference errors (window is not defined)
const FooderMap = dynamic(() => import("./FooderMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[450px] rounded-2xl bg-cream-surface/30 border border-cream-muted/50 flex flex-col items-center justify-center text-cream-mid animate-pulse">
      <Map size={36} className="mb-2 animate-bounce" />
      <span className="text-xs uppercase tracking-widest font-semibold font-sans">Loading Contemplative Map...</span>
    </div>
  )
});

export default function Fooder({ pins }: FooderProps) {
  return (
    <section id="fooder" className="py-28 bg-cream-surface/20 border-t border-cream-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 text-cream-mid font-serif italic text-lg mb-2">
              <MapPin size={20} />
              <span>Fooder space</span>
            </div>
            <h2 className="font-serif italic text-4xl lg:text-6xl text-cream-ink leading-tight font-medium">
              แผนที่ความอร่อยและการเดินทาง
            </h2>
            <p className="text-sm text-cream-mid mt-2 font-sans leading-relaxed">
              มุมโปรดและร้านโปรดของ Ve บันทึกสถานที่เสิร์ฟรสชาติละมุนและวิวผ่อนคลายจิตใจ ทุกหมุดผ่านการคัดสรรจากรสนิยมแบบ Lover ที่ใส่ใจรายละเอียด
            </p>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-wider text-cream-ink/80 bg-cream-bg border border-cream-muted/30 px-5 py-3 rounded-full shadow-sm">
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-amber-600 border border-amber-950 inline-block" /> Cafe
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-orange-600 border border-orange-950 inline-block" /> Restaurant
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-teal-600 border border-teal-950 inline-block" /> Sightseeing
            </span>
          </div>
        </div>

        {/* Dynamic Map Component */}
        <FooderMap pins={pins} />

      </div>
    </section>
  );
}
