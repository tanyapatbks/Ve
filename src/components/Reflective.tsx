"use client";

import { GraduationCap, Video, BookOpen, ExternalLink, Download } from "lucide-react";

interface ReflectiveItem {
  id: string;
  title: string;
  description: string;
  link: string;
  type: string; // "Lecture" | "Slides" | "Resources"
  duration: string;
}

interface ReflectiveProps {
  items: ReflectiveItem[];
}

export default function Reflective({ items }: ReflectiveProps) {
  const lectures = items.filter(item => item.type.toLowerCase() === "lecture");
  const resources = items.filter(item => item.type.toLowerCase() !== "lecture");

  return (
    <section id="reflective" className="py-28 bg-cream-bg border-t border-cream-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 text-cream-mid font-serif italic text-lg mb-2">
            <GraduationCap size={20} />
            <span>Reflective space</span>
          </div>
          <h2 className="font-serif italic text-4xl lg:text-6xl text-cream-ink leading-tight font-medium">
            สื่อการสอนและความรู้ที่อยากส่งต่อ
          </h2>
          <p className="text-sm text-cream-mid mt-2 max-w-xl font-sans leading-relaxed">
            พื้นที่แบ่งปันประสบการณ์ทางวิทยาการคอมพิวเตอร์และการวิจัยประมวลผลข้อมูล สำหรับนักศึกษาและผู้ค้นหาคำตอบในโลกแห่งระบบตรรกะประยุกต์
          </p>
        </div>

        {/* Content Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Lectures (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h3 className="text-xs uppercase tracking-widest font-bold text-cream-mid mb-2 flex items-center gap-2">
              <Video size={14} /> YouTube Lectures & Courses
            </h3>
            
            {lectures.length === 0 ? (
              <p className="text-sm text-cream-mid italic font-light">No lectures uploaded yet.</p>
            ) : (
              lectures.map(lecture => (
                <div 
                  key={lecture.id}
                  className="bg-cream-surface/20 border border-cream-muted/30 rounded-xl p-6 transition-all duration-300 hover:bg-cream-surface/40 flex flex-col sm:flex-row sm:items-start gap-4"
                >
                  {/* Visual Icon */}
                  <div className="w-12 h-12 rounded-lg bg-cream-surface flex items-center justify-center text-cream-mid flex-shrink-0 border border-cream-muted/35">
                    <Video size={20} />
                  </div>
                  
                  {/* Detail */}
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h4 className="font-serif italic text-xl text-cream-ink font-semibold">
                        {lecture.title}
                      </h4>
                      <span className="text-xs font-semibold uppercase tracking-wider text-cream-mid bg-cream-surface px-2.5 py-0.5 rounded-full border border-cream-muted/20">
                        {lecture.duration}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-cream-ink/80 leading-relaxed font-sans font-light mb-4">
                      {lecture.description}
                    </p>
                    
                    {/* Play Link Button */}
                    <a 
                      href={lecture.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-cream-mid hover:text-cream-ink transition-colors group"
                    >
                      Watch Lecture 
                      <ExternalLink size={12} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Column: Slides & Research resources (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h3 className="text-xs uppercase tracking-widest font-bold text-cream-mid mb-2 flex items-center gap-2">
              <BookOpen size={14} /> Slides & Research Resources
            </h3>

            {resources.length === 0 ? (
              <p className="text-sm text-cream-mid italic font-light">No slides or resources uploaded yet.</p>
            ) : (
              resources.map(res => (
                <div 
                  key={res.id}
                  className="bg-cream-bg border-l-2 border-cream-mid/60 rounded-r-xl p-6 transition-all duration-300 hover:bg-cream-surface/10 flex flex-col justify-between h-auto gap-4 shadow-sm border-y border-r border-cream-muted/30"
                >
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-cream-mid bg-cream-surface px-2 py-0.5 rounded-full border border-cream-muted/20">
                        {res.type}
                      </span>
                      <span className="text-xs text-cream-mid font-mono font-light">{res.duration}</span>
                    </div>
                    <h4 className="font-serif italic text-lg text-cream-ink font-semibold mb-2">
                      {res.title}
                    </h4>
                    <p className="text-xs text-cream-ink/80 leading-relaxed font-sans font-light">
                      {res.description}
                    </p>
                  </div>

                  {/* Resource Link Button */}
                  <a 
                    href={res.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cream-mid hover:text-cream-ink transition-colors group mt-2 self-start"
                  >
                    <Download size={14} className="group-hover:translate-y-0.5 transition-transform duration-300" />
                    Get slides & files
                  </a>
                </div>
              ))
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
