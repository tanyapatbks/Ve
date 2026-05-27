"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Star } from "lucide-react";

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

interface FooderMapProps {
  pins: FooderPin[];
}

const createCustomIcon = (category: string) => {
  let color = "bg-amber-600 border-amber-950";
  if (category.toLowerCase() === "restaurant") {
    color = "bg-orange-600 border-orange-950";
  } else if (category.toLowerCase() === "sightseeing") {
    color = "bg-teal-600 border-teal-950";
  }

  return L.divIcon({
    html: `<div class="w-6 h-6 rounded-full ${color} border-2 flex items-center justify-center text-[10px] text-white font-bold shadow-md transform transition-transform duration-300 hover:scale-125">
             ${category[0]?.toUpperCase() || "P"}
           </div>`,
    className: "custom-leaflet-icon",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

export default function FooderMap({ pins }: FooderMapProps) {
  // Center on Bangkok
  const defaultCenter: [number, number] = [13.74, 100.52];

  return (
    <div className="w-full h-[450px] rounded-2xl overflow-hidden border border-cream-muted/50 shadow-md cream-map relative z-10">
      <MapContainer 
        center={defaultCenter} 
        zoom={12} 
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pins.map(pin => (
          <Marker 
            key={pin.id} 
            position={[pin.lat, pin.lng]} 
            icon={createCustomIcon(pin.category)}
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
        ))}
      </MapContainer>
    </div>
  );
}
