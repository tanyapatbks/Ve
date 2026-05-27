"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Star } from "lucide-react";

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

interface EatverMapProps {
  pins: EatverPin[];
  selectedPin: EatverPin | null;
}

// Controller component to smoothly fly/pan to selected pin coordinates
function MapController({ selectedPin }: { selectedPin: EatverPin | null }) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedPin) {
      map.flyTo([selectedPin.lat, selectedPin.lng], 14, {
        animate: true,
        duration: 1.2
      });
    }
  }, [selectedPin, map]);

  return null;
}

const createCustomIcon = (category: string, isActive: boolean) => {
  let color = "bg-amber-600 border-amber-950 text-white";
  if (category.toLowerCase() === "restaurant") {
    color = "bg-orange-600 border-orange-950 text-white";
  } else if (category.toLowerCase() === "sightseeing") {
    color = "bg-teal-600 border-teal-950 text-white";
  }

  const activeClass = isActive 
    ? "scale-125 ring-4 ring-cream-mid/40 z-50 animate-bounce" 
    : "scale-100 hover:scale-110 shadow-md";

  return L.divIcon({
    html: `<div class="w-7 h-7 rounded-full ${color} border-2 flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${activeClass}">
             ${category[0]?.toUpperCase() || "P"}
           </div>`,
    className: "custom-leaflet-icon",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
};

export default function EatverMap({ pins, selectedPin }: EatverMapProps) {
  const defaultCenter: [number, number] = [13.74, 100.52];

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden border border-cream-muted/50 shadow-md cream-map relative z-10">
      <MapContainer 
        center={defaultCenter} 
        zoom={12} 
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        
        {pins.map(pin => {
          const isActive = selectedPin?.id === pin.id;
          
          return (
            <Marker 
              key={pin.id} 
              position={[pin.lat, pin.lng]} 
              icon={createCustomIcon(pin.category, isActive)}
            >
              <Popup className="custom-popup">
                <div className="p-2 font-sans max-w-[240px]">
                  <div className="flex justify-between items-start gap-2 mb-1.5 border-b border-cream-muted/20 pb-1">
                    <h4 className="font-serif italic text-base text-cream-ink font-bold leading-tight">
                      {pin.name}
                    </h4>
                    <span className="text-[9px] uppercase tracking-wider font-bold bg-cream-surface text-cream-mid px-1.5 py-0.5 rounded border border-cream-muted/20">
                      {pin.category}
                    </span>
                  </div>
                  
                  <p className="text-[11px] text-cream-ink/90 leading-relaxed font-light mb-2">
                    "{pin.review}"
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-cream-mid">
                    <span className="flex items-center gap-0.5 font-semibold">
                      <Star size={10} className="fill-amber-400 text-amber-400" /> {pin.rating.toFixed(1)}
                    </span>
                    <span className="font-mono text-[9px] opacity-75">{pin.lat.toFixed(4)}, {pin.lng.toFixed(4)}</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Pan and zoom controller */}
        <MapController selectedPin={selectedPin} />
      </MapContainer>
    </div>
  );
}
