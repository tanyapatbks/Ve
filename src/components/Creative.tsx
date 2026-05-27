"use client";

import { useState, useRef } from "react";
import { Sparkles, MessageCircle, Send, Calendar, Layers, ChevronLeft, ChevronRight } from "lucide-react";

interface CreativeItem {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  image?: string;
}

interface CreativeProps {
  items: CreativeItem[];
}

export default function Creative({ items }: CreativeProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories = ["All", "Moments", "Creations", "Archive"];

  const filteredItems = activeCategory === "All"
    ? items
    : items.filter(item => item.category.toLowerCase() === activeCategory.toLowerCase());

  // Sort items: newest to oldest
  const sortedItems = [...filteredItems].sort((a, b) => parseInt(b.year) - parseInt(a.year));

  // Simulated Comments State
  const [comments, setComments] = useState<Record<string, Array<{ author: string; text: string }>>>({
    "101": [
      { author: "Sara", text: "โทนภาพฟิล์มสีละมุนตามาก สัมผัสได้ถึงแสงแดดอุ่นๆ เลยค่ะ" },
      { author: "ArtLover", text: "Composition is absolute gold." }
    ],
    "102": [
      { author: "Developer_Y", text: "UI ดูลื่นไหลไร้น้ำหนักตามชื่อจริงๆ ครับ วางโครงสร้างดีมาก" }
    ]
  });

  const [inputStates, setInputStates] = useState<Record<string, string>>({});
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2500);
  };

  const handlePostComment = (postId: string) => {
    const text = inputStates[postId]?.trim();
    if (!text) return;

    const newComment = { author: "Visitor", text };
    const currentComments = comments[postId] || [];

    setComments({
      ...comments,
      [postId]: [...currentComments, newComment]
    });

    setInputStates({ ...inputStates, [postId]: "" });
    triggerToast("Comment posted!");
  };

  const handleShare = (postId: string) => {
    const shareUrl = `${window.location.origin}/creative#post-${postId}`;
    navigator.clipboard.writeText(shareUrl);
    triggerToast("Link copied to clipboard! 🔗");
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  const renderThumbnail = (item: CreativeItem) => {
    if (item.image) {
      return (
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover select-none"
          draggable="false"
        />
      );
    }

    // Organic gradients tailored to categories
    let gradient = "from-amber-100 to-amber-200/50";
    if (item.category === "Creations") {
      gradient = "from-teal-50 to-teal-100/50";
    } else if (item.category === "Archive") {
      gradient = "from-zinc-100 to-zinc-200/60";
    }

    return (
      <div className={`w-full h-full bg-gradient-to-tr ${gradient} flex flex-col justify-between p-8 relative overflow-hidden select-none`}>
        <div className="absolute inset-0 bg-radial-gradient from-cream-bg/25 to-transparent pointer-events-none" />
        <div className="flex justify-between items-start z-10">
          <span className="text-xs uppercase tracking-widest font-bold text-cream-mid">{item.category}</span>
          <span className="font-serif italic text-2xl text-cream-mid">{item.year}</span>
        </div>
        <div className="z-10 bg-cream-bg/45 backdrop-blur-[1px] p-4 rounded-xl border border-cream-muted/20 shadow-sm">
          <h4 className="font-serif italic text-2xl text-cream-ink leading-tight">{item.title}</h4>
          <span className="text-xs font-handwriting text-cream-mid/80 mt-1 block">contemplative creation</span>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full w-full flex flex-col justify-between bg-cream-bg overflow-hidden relative">
      
      {/* Dynamic Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-cream-ink text-cream-bg rounded-full text-xs font-semibold uppercase tracking-wider shadow-lg animate-fade-in">
          {toastMessage}
        </div>
      )}

      {/* Top Header Panel: Navigation & Filters */}
      <div className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cream-muted/20 bg-cream-bg z-10">
        <div>
          <div className="flex items-center gap-2 text-cream-mid font-serif italic text-sm mb-0.5">
            <Sparkles size={14} className="animate-pulse" />
            <span>Creative Gallery</span>
          </div>
          <h2 className="font-serif italic text-2xl text-cream-ink font-semibold">
            ผลงานและสิ่งที่สะสม
          </h2>
        </div>

        {/* Category Selector Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
                }
              }}
              className={`px-4 py-1.5 text-[10px] uppercase tracking-widest font-semibold rounded-full border transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-cream-ink text-cream-bg border-cream-ink shadow-sm"
                  : "bg-transparent text-cream-mid border-cream-muted/30 hover:border-cream-mid hover:text-cream-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Center Horizontal Track Container */}
      <div className="flex-grow w-full relative flex items-center justify-center overflow-hidden">
        
        {/* Navigation Arrows for desktop */}
        <button 
          onClick={scrollLeft}
          className="absolute left-4 z-20 p-3 rounded-full bg-cream-surface/80 backdrop-blur border border-cream-muted/30 text-cream-ink hover:bg-cream-bg transition-colors shadow-md hidden md:flex items-center justify-center"
          title="Scroll Left"
        >
          <ChevronLeft size={20} />
        </button>

        <button 
          onClick={scrollRight}
          className="absolute right-4 z-20 p-3 rounded-full bg-cream-surface/80 backdrop-blur border border-cream-muted/30 text-cream-ink hover:bg-cream-bg transition-colors shadow-md hidden md:flex items-center justify-center"
          title="Scroll Right"
        >
          <ChevronRight size={20} />
        </button>

        {/* Horizontal Scroll Deck */}
        <div 
          ref={scrollContainerRef}
          className="w-full h-full flex flex-row items-center gap-6 sm:gap-10 px-6 sm:px-12 md:px-24 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none"
        >
          {sortedItems.length === 0 ? (
            <div className="w-full text-center py-20 text-cream-mid italic font-light text-sm select-none">
              No items in this category yet.
            </div>
          ) : (
            sortedItems.map((item) => {
              const postComments = comments[item.id] || [];

              return (
                <article 
                  key={item.id} 
                  id={`post-${item.id}`}
                  className="snap-center flex-shrink-0 w-[88vw] md:w-[75vw] lg:w-[65vw] max-w-4xl h-[68vh] md:h-[62vh] bg-cream-bg border border-cream-muted/40 rounded-3xl overflow-hidden shadow-md flex flex-col md:flex-row transition-all duration-300 hover:border-cream-mid hover:shadow-lg animate-fade-in"
                >
                  
                  {/* Visual Frame: Left / Top */}
                  <div className="w-full md:w-1/2 h-[40%] md:h-full relative overflow-hidden bg-cream-surface/10 border-b md:border-b-0 md:border-r border-cream-muted/20">
                    {renderThumbnail(item)}
                  </div>

                  {/* Details Card Content: Right / Bottom */}
                  <div className="w-full md:w-1/2 h-[60%] md:h-full flex flex-col justify-between p-5 sm:p-7 bg-cream-bg">
                    
                    {/* Top Row: Meta Badge & Share Button */}
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] uppercase tracking-widest font-bold bg-cream-surface text-cream-mid px-2.5 py-1 rounded-full border border-cream-muted/20">
                        {item.category}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-cream-mid font-mono flex items-center gap-1">
                          <Calendar size={11} /> {item.year}
                        </span>
                      </div>
                    </div>

                    {/* Content text */}
                    <div className="my-2.5">
                      <h3 className="font-serif italic text-xl sm:text-2xl font-bold text-cream-ink leading-tight mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-cream-ink/80 font-sans font-light leading-relaxed max-h-[80px] overflow-y-auto pr-1">
                        {item.description}
                      </p>
                    </div>

                    {/* Interactive Comments Area for each creation */}
                    <div className="flex-grow flex flex-col justify-between border-t border-cream-muted/20 pt-3 mt-1 overflow-hidden">
                      <span className="text-[9px] uppercase tracking-widest font-bold text-cream-mid mb-2 flex items-center gap-1">
                        <MessageCircle size={10} /> Thoughts & Comments ({postComments.length})
                      </span>

                      {/* Comment feed block */}
                      <div className="flex-grow overflow-y-auto max-h-[110px] mb-3 pr-1 flex flex-col gap-2">
                        {postComments.length === 0 ? (
                          <p className="text-[10px] text-cream-mid/70 italic font-light py-2">Be the first to share your thoughts on this creation...</p>
                        ) : (
                          postComments.map((comment, index) => (
                            <div key={index} className="text-[11px] leading-relaxed bg-cream-surface/20 border border-cream-muted/10 p-2 rounded-xl">
                              <div className="flex justify-between items-center mb-0.5">
                                <span className="font-semibold text-cream-ink">{comment.author}</span>
                                <span className="text-[8px] text-cream-mid font-mono">just now</span>
                              </div>
                              <p className="text-cream-ink/85 font-light">{comment.text}</p>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Comment input widget */}
                      <div className="flex items-center gap-2 pt-2 border-t border-cream-muted/10 bg-cream-bg">
                        <input
                          type="text"
                          placeholder="Write a thought..."
                          value={inputStates[item.id] || ""}
                          onChange={(e) => setInputStates({ ...inputStates, [item.id]: e.target.value })}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handlePostComment(item.id);
                          }}
                          className="flex-grow px-3 py-1.5 rounded-lg border border-cream-muted/40 bg-cream-surface/10 text-xs text-cream-ink placeholder-cream-mid/60 focus:outline-none focus:border-cream-mid font-light"
                        />
                        <button
                          onClick={() => handlePostComment(item.id)}
                          className="px-3 py-1.5 bg-cream-ink text-cream-bg text-[10px] font-semibold uppercase tracking-wider rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40"
                          disabled={!inputStates[item.id]?.trim()}
                        >
                          Post
                        </button>
                      </div>
                    </div>

                    {/* Bottom Actions Row */}
                    <div className="flex items-center justify-between border-t border-cream-muted/15 pt-3 mt-3">
                      <span className="text-[9px] uppercase tracking-widest font-bold text-cream-mid flex items-center gap-1">
                        <Layers size={10} /> {item.category} Series
                      </span>
                      
                      <button 
                        onClick={() => handleShare(item.id)}
                        className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-cream-mid hover:text-cream-ink transition-colors"
                        title="Copy direct share link"
                      >
                        <Send size={11} /> Copy Share Link
                      </button>
                    </div>

                  </div>

                </article>
              );
            })
          )}
        </div>

      </div>

      {/* Swipe/Scroll Help Info Bar */}
      <div className="py-2.5 bg-cream-surface/30 border-t border-cream-muted/20 text-center select-none z-10">
        <p className="text-[9px] tracking-widest uppercase font-bold text-cream-mid">
          ✦ Swipe or Scroll horizontally to explore creations ✦
        </p>
      </div>

    </div>
  );
}
