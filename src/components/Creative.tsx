"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, MessageCircle, Send, Calendar, Layers } from "lucide-react";

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

  const renderThumbnail = (item: CreativeItem) => {
    if (item.image) {
      return (
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover"
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
      <div className={`w-full h-full bg-gradient-to-tr ${gradient} flex flex-col justify-between p-8 relative overflow-hidden`}>
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
    <div className="max-w-xl mx-auto px-4 sm:px-6 flex flex-col gap-10">
      
      {/* Dynamic Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-cream-ink text-cream-bg rounded-full text-xs font-semibold uppercase tracking-wider shadow-lg animate-fade-in">
          {toastMessage}
        </div>
      )}

      {/* Header with Category Filter */}
      <div className="border-b border-cream-muted/30 pb-8 mb-4 flex flex-col items-center gap-6">
        <div className="text-center">
          <div className="flex justify-center items-center gap-2 text-cream-mid font-serif italic text-lg mb-2">
            <Sparkles size={18} />
            <span>Creative Collections</span>
          </div>
          <h2 className="font-serif italic text-4xl text-cream-ink font-semibold">
            ผลงานและสิ่งที่สะสม
          </h2>
          <p className="text-xs text-cream-mid uppercase tracking-widest font-semibold mt-1">
            moments & creations feed
          </p>
        </div>

        {/* Categories Tab */}
        <div className="flex flex-wrap gap-2 justify-center border-t border-cream-muted/15 pt-4 w-full">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 text-xs uppercase tracking-widest font-semibold rounded-full border transition-all duration-300 ${
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

      {/* Instagram Feed List */}
      <div className="flex flex-col gap-12">
        {sortedItems.map((item) => {
          const postComments = comments[item.id] || [];

          return (
            <article 
              key={item.id} 
              id={`post-${item.id}`}
              className="bg-cream-bg border border-cream-muted/50 rounded-xl overflow-hidden shadow-sm animate-fade-in"
            >
              {/* Post Header: Profile & Location info */}
              <div className="p-4 flex items-center justify-between border-b border-cream-muted/20 bg-cream-bg">
                <div className="flex items-center gap-3">
                  {/* User Profile Avatar */}
                  <div className="relative w-9 h-9 rounded-full overflow-hidden border border-cream-muted/40 bg-cream-surface flex items-center justify-center text-cream-mid">
                    <Image
                      src="/ve_portrait.png"
                      alt="Ve Avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="font-sans font-semibold text-xs tracking-wider text-cream-ink block">
                      vetanboon
                    </span>
                    <span className="text-[10px] text-cream-mid font-light block">
                      {item.title} • {item.year}
                    </span>
                  </div>
                </div>
                
                {/* Category Badge */}
                <span className="text-[9px] uppercase tracking-widest font-bold bg-cream-surface text-cream-mid px-2.5 py-1 rounded-full border border-cream-muted/20">
                  {item.category}
                </span>
              </div>

              {/* Main Media Visual Cover */}
              <div className="aspect-square w-full border-b border-cream-muted/20 relative overflow-hidden bg-cream-surface/20">
                {renderThumbnail(item)}
              </div>

              {/* Post Actions (Likes excluded per request) */}
              <div className="p-4 flex items-center gap-4 border-b border-cream-muted/10">
                <button 
                  className="text-cream-mid hover:text-cream-ink transition-colors focus:outline-none"
                  title="View comments"
                >
                  <MessageCircle size={20} />
                </button>
                <button 
                  onClick={() => handleShare(item.id)}
                  className="text-cream-mid hover:text-cream-ink transition-colors focus:outline-none"
                  title="Share post link"
                >
                  <Send size={18} />
                </button>
              </div>

              {/* Caption & Description details */}
              <div className="px-4 py-3 flex flex-col gap-2 bg-cream-bg">
                <div className="flex items-baseline gap-2">
                  <span className="font-sans font-bold text-xs tracking-wider text-cream-ink">
                    vetanboon
                  </span>
                  <p className="text-xs sm:text-sm text-cream-ink/90 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-[10px] text-cream-mid font-semibold uppercase tracking-wider mt-1">
                  <span className="flex items-center gap-0.5"><Layers size={10} /> {item.category}</span>
                  <span className="w-1 h-1 rounded-full bg-cream-muted" />
                  <span className="flex items-center gap-0.5"><Calendar size={10} /> {item.year}</span>
                </div>
              </div>

              {/* Comments Feed Area */}
              <div className="px-4 pb-3 border-t border-cream-muted/10 bg-cream-surface/10">
                {postComments.length > 0 && (
                  <div className="py-2 flex flex-col gap-1.5 max-h-28 overflow-y-auto border-b border-cream-muted/15">
                    {postComments.map((comment, index) => (
                      <div key={index} className="text-[11px] sm:text-xs leading-relaxed">
                        <span className="font-semibold text-cream-ink mr-2">{comment.author}</span>
                        <span className="text-cream-ink/80 font-light">{comment.text}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Comment Input */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={inputStates[item.id] || ""}
                    onChange={(e) => setInputStates({ ...inputStates, [item.id]: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handlePostComment(item.id);
                    }}
                    className="flex-grow bg-transparent border-none text-xs text-cream-ink placeholder-cream-mid/70 focus:outline-none font-light py-1"
                  />
                  <button
                    onClick={() => handlePostComment(item.id)}
                    className="text-xs font-bold uppercase tracking-wider text-cream-mid hover:text-cream-ink transition-colors disabled:opacity-40"
                    disabled={!inputStates[item.id]?.trim()}
                  >
                    Post
                  </button>
                </div>
              </div>

            </article>
          );
        })}
      </div>

    </div>
  );
}
