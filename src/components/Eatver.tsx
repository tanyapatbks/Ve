"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { MapPin, Coffee, Utensils, Compass, Star } from "lucide-react";

interface EatverPin {
  id: string;
  name: string;
  category: string;
  lat: number;
  lng: number;
  review: string;
  rating: number;
  image?: string;
}

interface EatverProps {
  pins: EatverPin[];
}

// Load Map Component Dynamically to prevent SSR reference errors
const EatverMap = dynamic(() => import("./EatverMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-2xl bg-cream-surface/30 border border-cream-muted/50 flex flex-col items-center justify-center text-cream-mid animate-pulse">
      <Compass size={36} className="mb-2 animate-bounce" />
      <span className="text-xs uppercase tracking-widest font-semibold font-sans">Loading CartoDB Positron Map...</span>
    </div>
  )
});

export default function Eatver({ pins }: EatverProps) {
  const [selectedPin, setSelectedPin] = useState<EatverPin | null>(pins[0] || null);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "cafe":
        return <Coffee size={14} className="text-amber-700" />;
      case "restaurant":
        return <Utensils size={14} className="text-orange-700" />;
      default:
        return <Compass size={14} className="text-teal-700" />;
    }
  };

  return (
    <section className="bg-cream-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 border-b border-cream-muted/30 pb-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 text-cream-mid font-serif italic text-lg mb-2">
              <MapPin size={20} />
              <span>Eatver Space</span>
            </div>
            <h2 className="font-serif italic text-4xl lg:text-6xl text-cream-ink leading-tight font-medium">
              แผนที่ความอร่อยและการเดินทาง
            </h2>
            <p className="text-xs text-cream-mid uppercase tracking-widest font-semibold mt-1">
              Ve's Curated Food & Cafe Map
            </p>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-wider text-cream-ink/80 bg-cream-bg border border-cream-muted/30 px-5 py-3 rounded-full shadow-sm">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-600 border border-amber-950 inline-block" /> Cafe
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-orange-600 border border-orange-950 inline-block" /> Restaurant
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-teal-600 border border-teal-950 inline-block" /> Sightseeing
            </span>
          </div>
        </div>

        {/* Dashboard Split: Left list, Right map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch h-[650px] lg:h-[550px]">
          
          {/* Left panel: Places List (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4 overflow-y-auto pr-2 scrollbar-none h-[250px] lg:h-full pb-4">
            <h3 className="text-xs uppercase tracking-widest font-bold text-cream-mid mb-1 flex items-center gap-2">
              📍 Curated Food Spots ({pins.length})
            </h3>
            
            {pins.length === 0 ? (
              <p className="text-sm text-cream-mid italic font-light">No places pinned yet.</p>
            ) : (
              pins.map((pin) => {
                const isActive = selectedPin?.id === pin.id;
                
                return (
                  <div 
                    key={pin.id}
                    onClick={() => setSelectedPin(pin)}
                    className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 flex flex-col gap-2 ${
                      isActive 
                        ? "bg-cream-bg border-cream-mid shadow ring-2 ring-cream-muted/30" 
                        : "bg-cream-surface/10 border-cream-muted/30 hover:bg-cream-surface/20"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-cream-mid flex items-center gap-1">
                          {getCategoryIcon(pin.category)}
                          {pin.category}
                        </span>
                        <h4 className="font-serif italic text-lg text-cream-ink font-semibold mt-1">
                          {pin.name}
                        </h4>
                      </div>
                      
                      {/* Rating */}
                      <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/50 flex items-center gap-0.5">
                        <Star size={10} className="fill-amber-500 text-amber-500" /> {pin.rating.toFixed(1)}
                      </span>
                    </div>

                    <p className="text-xs text-cream-ink/80 leading-relaxed font-sans font-light line-clamp-2">
                      "{pin.review}"
                    </p>

                    <div className="text-[10px] text-cream-mid font-mono font-light text-right">
                      {pin.lat.toFixed(4)}, {pin.lng.toFixed(4)}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right panel: Map widget (7 cols) */}
          <div className="lg:col-span-7 h-[350px] lg:h-full">
            <EatverMap pins={pins} selectedPin={selectedPin} />
          </div>

        </div>

      </div>
    </section>
  );
}
