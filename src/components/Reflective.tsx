"use client";

import { useState } from "react";
import { GraduationCap, Download, Play, X, MoreVertical } from "lucide-react";

interface ReflectiveItem {
  id: string;
  title: string;
  description: string;
  link: string;
  type: string; // "Lecture" | "Slides" | "Resources"
  duration: string;
  views?: number;
  age?: string;
}

interface ReflectiveProps {
  items: ReflectiveItem[];
}

export default function Reflective({ items }: ReflectiveProps) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const lectures = items.filter(item => item.type.toLowerCase() === "lecture");
  const resources = items.filter(item => item.type.toLowerCase() !== "lecture");

  // Helper to extract YouTube video ID
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <section className="bg-cream-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-14 border-b border-cream-muted/30 pb-8">
          <div className="flex items-center gap-3 text-cream-mid font-serif italic text-lg mb-2">
            <GraduationCap size={20} />
            <span>Reflective space</span>
          </div>
          <h2 className="font-serif italic text-4xl lg:text-6xl text-cream-ink leading-tight font-medium">
            สื่อการสอนและความรู้ที่อยากส่งต่อ
          </h2>
          <p className="text-xs text-cream-mid uppercase tracking-widest font-semibold mt-1">
            Lectures & Computational Resources
          </p>
        </div>

        {/* Video Lectures Grid Section */}
        <div className="mb-16">
          <h3 className="text-xs uppercase tracking-widest font-bold text-cream-mid mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" /> Video lectures & courses
          </h3>

          {lectures.length === 0 ? (
            <p className="text-sm text-cream-mid italic font-light">No lectures uploaded yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {lectures.map((lecture) => {
                const videoId = getYouTubeId(lecture.link) || "bMkDKhrw3L0";
                const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
                
                return (
                  <div 
                    key={lecture.id}
                    onClick={() => setActiveVideoId(videoId)}
                    className="group cursor-pointer flex flex-col gap-3 transition-transform duration-300 hover:scale-[1.01]"
                  >
                    {/* YouTube Video Frame */}
                    <div className="relative aspect-video rounded-xl overflow-hidden shadow-sm bg-zinc-950 border border-cream-muted/40">
                      <img 
                        src={thumbnailUrl} 
                        alt={lecture.title}
                        className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                        onError={(e) => {
                          // Fallback in case maxresdefault is not available
                          (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                        }}
                      />
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-cream-ink/20">
                        <div className="w-12 h-12 rounded-full bg-cream-bg/95 flex items-center justify-center text-red-600 shadow-md">
                          <Play size={20} className="fill-red-600 ml-0.5" />
                        </div>
                      </div>

                      {/* YouTube Duration Badge exactly matching requested layout */}
                      <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-[10px] font-semibold text-white rounded font-mono select-none">
                        {lecture.duration}
                      </span>
                    </div>

                    {/* Meta info details */}
                    <div className="flex justify-between items-start gap-3 px-1">
                      <div className="flex-grow">
                        {/* Title: Bold clean font */}
                        <h4 className="font-sans font-bold text-sm text-cream-ink leading-snug group-hover:text-cream-mid transition-colors line-clamp-2">
                          {lecture.title}
                        </h4>
                        
                        {/* View counts and age subtitle */}
                        <p className="text-[11px] text-cream-mid font-light mt-1 tracking-wide leading-none">
                          การดู {lecture.views || 133} ครั้ง • {lecture.age || "9 เดือนที่ผ่านมา"}
                        </p>
                      </div>

                      {/* Three-dot options menu */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(lecture.description);
                        }}
                        className="p-1 rounded-full text-cream-mid hover:text-cream-ink hover:bg-cream-surface/50 transition-colors"
                        title="View details"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Slides & Downloads Section */}
        <div className="border-t border-cream-muted/20 pt-12">
          <h3 className="text-xs uppercase tracking-widest font-bold text-cream-mid mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-600" /> Slides & Academic slides
          </h3>

          {resources.length === 0 ? (
            <p className="text-sm text-cream-mid italic font-light">No slides or resources uploaded yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((res) => (
                <div 
                  key={res.id}
                  className="bg-cream-bg border border-cream-muted/40 rounded-xl p-6 transition-all duration-300 hover:bg-cream-surface/20 flex flex-col justify-between shadow-sm border-l-4 border-l-teal-700"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[9px] font-bold uppercase tracking-widest bg-cream-surface text-teal-800 border border-cream-muted/30 px-2 py-0.5 rounded">
                        {res.type}
                      </span>
                      <span className="text-xs text-cream-mid font-mono">{res.duration}</span>
                    </div>
                    <h4 className="font-serif italic text-xl text-cream-ink font-semibold mb-2">
                      {res.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-cream-ink/80 leading-relaxed font-sans font-light">
                      {res.description}
                    </p>
                  </div>

                  <a 
                    href={res.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cream-mid hover:text-cream-ink transition-colors group mt-6 self-start"
                  >
                    <Download size={14} className="group-hover:translate-y-0.5 transition-transform duration-300" />
                    Download resource files
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Embedded High-Fidelity Video Lightbox Player */}
      {activeVideoId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-cream-muted/30 animate-scale-up">
            
            {/* Close Button */}
            <button 
              onClick={() => setActiveVideoId(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors border border-white/20 shadow-md"
              title="Close player"
            >
              <X size={18} />
            </button>

            {/* YouTube Embedded iframe player */}
            <iframe
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}

    </section>
  );
}
