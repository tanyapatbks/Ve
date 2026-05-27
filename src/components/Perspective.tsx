"use client";

import { useState } from "react";
import Image from "next/image";
import { BookOpen, MessageCircle, Send, Star, User } from "lucide-react";

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
  // Sort items newest to oldest (standard feed style: newest first!)
  const sortedItems = [...items].sort((a, b) => parseInt(b.year) - parseInt(a.year));

  // Simulated Comments State keyed by post ID
  const [comments, setComments] = useState<Record<string, Array<{ author: string; text: string }>>>({
    "5": [
      { author: "Tanya", text: "ยินดีด้วยกับพื้นที่บันทึกส่วนตัวที่อบอุ่นชิ้นนี้ครับพี่วี!" },
      { author: "Nont", text: "Lover & Solver in one person. So inspiring." }
    ],
    "4": [
      { author: "Student_A", text: "ขอบคุณสไลด์บรรยายของอาจารย์มากครับ เข้าใจสถาปัตยกรรมซอฟต์แวร์กระจายศูนย์ชัดเจนขึ้นมาก" }
    ],
    "3": [
      { author: "Researcher_X", text: "โจทย์ประมวลผลข้อมูลอัลกอริทึมซับซ้อนท้าทายสุดๆ ครับ คารวะฝีมือเลย" }
    ]
  });

  // Active inputs state keyed by post ID
  const [inputStates, setInputStates] = useState<Record<string, string>>({});
  
  // Detail expanded state keyed by post ID
  const [expandedDetails, setExpandedDetails] = useState<Record<string, boolean>>({});

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2500);
  };

  const handlePostComment = (postId: string) => {
    const text = inputStates[postId]?.trim();
    if (!text) return;

    const newComment = { author: "Visitor", text };
    const currentPostComments = comments[postId] || [];
    
    setComments({
      ...comments,
      [postId]: [...currentPostComments, newComment]
    });

    // Clear input
    setInputStates({
      ...inputStates,
      [postId]: ""
    });
    
    triggerToast("Comment posted!");
  };

  const handleShare = (postId: string) => {
    const shareUrl = `${window.location.origin}/perspective#post-${postId}`;
    navigator.clipboard.writeText(shareUrl);
    triggerToast("Link copied to clipboard! 🔗");
  };

  const toggleDetail = (postId: string) => {
    setExpandedDetails({
      ...expandedDetails,
      [postId]: !expandedDetails[postId]
    });
  };

  // Helper to render beautiful visual covers for posts without direct photos
  const renderVisualCover = (item: PerspectiveItem) => {
    if (item.image) {
      return (
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      );
    }

    // Soft editorial abstract meshes for timeline posts
    let mesh = "from-amber-100 via-orange-100 to-amber-200/50";
    if (parseInt(item.year) < 2010) {
      mesh = "from-amber-200/40 via-yellow-100 to-orange-100/50";
    } else if (parseInt(item.year) < 2020) {
      mesh = "from-orange-100/40 via-amber-100 to-teal-100/30";
    } else if (parseInt(item.year) <= 2026) {
      mesh = "from-teal-50 via-amber-50 to-amber-100/40";
    }

    return (
      <div className={`w-full h-full bg-gradient-to-br ${mesh} flex items-center justify-center p-8 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-radial-gradient from-cream-bg/20 to-transparent pointer-events-none" />
        <div className="text-center z-10 p-6 rounded-2xl bg-cream-bg/65 backdrop-blur-[2px] border border-cream-muted/20 shadow-sm max-w-xs">
          <span className="font-serif italic text-6xl lg:text-7xl font-bold text-cream-mid/30 select-none block leading-none mb-2">
            {item.year}
          </span>
          <span className="text-[10px] uppercase tracking-widest font-bold text-cream-mid block border-t border-cream-muted/30 pt-2">
            Historical Moment
          </span>
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

      {/* Page Description Header */}
      <div className="text-center border-b border-cream-muted/30 pb-8 mb-4">
        <div className="flex justify-center items-center gap-2 text-cream-mid font-serif italic text-lg mb-2">
          <BookOpen size={18} />
          <span>Perspective Journals</span>
        </div>
        <h2 className="font-serif italic text-4xl text-cream-ink font-semibold">
          กระดาษแผ่นยาวของชีวิต
        </h2>
        <p className="text-xs text-cream-mid uppercase tracking-widest font-semibold mt-1">
          vetanboon timeline feed
        </p>
      </div>

      {/* Instagram Feed List */}
      <div className="flex flex-col gap-12">
        {sortedItems.map((item) => {
          const postComments = comments[item.id] || [];
          const isExpanded = expandedDetails[item.id] || false;

          return (
            <article 
              key={item.id} 
              id={`post-${item.id}`}
              className="bg-cream-bg border border-cream-muted/50 rounded-xl overflow-hidden shadow-sm"
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
                
                {/* Visual Dot Pin */}
                <div className="w-1.5 h-1.5 rounded-full bg-cream-mid/60" />
              </div>

              {/* Main Media Visual Cover */}
              <div className="aspect-square w-full border-b border-cream-muted/20 relative bg-cream-surface/20">
                {renderVisualCover(item)}
              </div>

              {/* Post Actions (Likes excluded per request) */}
              <div className="p-4 flex items-center gap-4 border-b border-cream-muted/10">
                <button 
                  onClick={() => toggleDetail(item.id)}
                  className="text-cream-mid hover:text-cream-ink transition-colors focus:outline-none"
                  title="View comments & details"
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

              {/* Caption & Intimate thoughts */}
              <div className="px-4 py-3 flex flex-col gap-2 bg-cream-bg">
                <div className="flex items-baseline gap-2">
                  <span className="font-sans font-bold text-xs tracking-wider text-cream-ink">
                    vetanboon
                  </span>
                  {/* Handwritten diary entry caption! */}
                  <p className="font-handwriting text-xl sm:text-2xl text-cream-ink/90 leading-tight">
                    {item.note}
                  </p>
                </div>

                {/* Collapsible details block */}
                <div className="mt-1">
                  {isExpanded ? (
                    <div className="text-xs sm:text-sm text-cream-ink/80 leading-relaxed font-sans font-light border-t border-cream-muted/25 pt-2 mt-2 animate-fade-in">
                      {item.description}
                      <button 
                        onClick={() => toggleDetail(item.id)}
                        className="text-[10px] font-bold text-cream-mid hover:text-cream-ink block mt-1 uppercase tracking-wider"
                      >
                        Hide details
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => toggleDetail(item.id)}
                      className="text-[10px] font-bold text-cream-mid hover:text-cream-ink uppercase tracking-wider block"
                    >
                      View historical details...
                    </button>
                  )}
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
