"use client";

import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";

interface MindmapItem {
  id: string;
  year: string;
  title: string;
  description: string;
  note: string;
  image: string;
}

export default function Perspective() {
  const mindmaps: MindmapItem[] = [
    {
      id: "1",
      year: "2026",
      title: "Software Engineering Is Splitting",
      description: "Software engineering is splitting into two worlds. On one side, AI writes the code natively. On the other side, humans define structural intent, govern system tradeoffs, and maintain overall code quality.",
      note: "มนุษย์คือกำหนดทิศทางและควบคุมระบบ ส่วน AI คือผู้ช่วยเขียนโค้ดและประมวลผล...",
      image: "/mindmaps/1.png"
    },
    {
      id: "2",
      year: "2026",
      title: "Software 3.0",
      description: "Tracing the paradigm shift in software development: from manual handcrafted code (1.0) and machine learning from datasets (2.0) to natural language intent compiled by autonomous AI agents (3.0). Highlighting strict constraints, reviews, and validation rules.",
      note: "ยุคสมัยใหม่แห่งการส่งสัญญาณเจตจำนงของมนุษย์ เพื่อสั่งการฝูงเอเจนต์อัจฉริยะ...",
      image: "/mindmaps/2.png"
    },
    {
      id: "3",
      year: "2026",
      title: "Agentic Engineering",
      description: "Deep dive into the lifecycle of building agentic environments: setting clear goals, feeding dense context, defining distinct agent roles (Planner, Coder, Reviewer), maintaining system rules, running unit tests, and verifying diff correctness.",
      note: "บทบาทใหม่ของนักพัฒนาคือการกำหนดขอบเขต กฎกติกา และการตรวจสอบพฤติกรรม...",
      image: "/mindmaps/3.png"
    },
    {
      id: "4",
      year: "2026",
      title: "Why AI Coding Needs Reviewer Agents",
      description: "Explaining the necessity of dual-agent feedback loops. While a Builder Agent excels at producing rapid code, a Reviewer Agent is essential to discover edge cases, audit security breaches, flag performance bottlenecks, and guarantee ultimate quality.",
      note: "สองหัวดีกว่าหัวเดียว: เอเจนต์สร้างโค้ดคู่ขนานกับเอเจนต์รีวิวเพื่อความแม่นยำสูงสุด...",
      image: "/mindmaps/4.png"
    },
    {
      id: "5",
      year: "2026",
      title: "Agents.md — AI Constitution",
      description: "How structural specifications and coding guidelines shape the behavior, accuracy, and predictability of agentic development environments, creating reliable and autonomous system architectures.",
      note: "การร่างกฎระเบียบและแนวทางปฏิบัติ เพื่อให้ระบบปัญญาประดิษฐ์ประมวลผลได้อย่างสม่ำเสมอ...",
      image: "/mindmaps/5.png"
    }
  ];

  const [activeMindmap, setActiveMindmap] = useState<MindmapItem>(mindmaps[0]);
  const [toastMessage, setToastMessage] = useState("");
  
  // Simulated comments state
  const [comments, setComments] = useState<Record<string, Array<{ author: string; text: string }>>>({
    "1": [
      { author: "Sara", text: "แผนภาพสรุปการแยกตัวของวิศวกรรมซอฟต์แวร์ได้ชัดเจนมากค่ะ!" },
      { author: "Nont", text: "AI writes the code, human defines the intent. This is the future." }
    ],
    "2": [
      { author: "Engineer_X", text: "Software 3.0 อธิบายการเลื่อนระดับชั้นภาษาโปรแกรมมิ่งได้เห็นภาพสุดๆ" }
    ],
    "3": [
      { author: "Dev_P", text: "ชอบแนวคิด Agentic Role (Planner, Coder, Reviewer) ครับ เอาไปใช้งานจริงเวิร์กมาก" }
    ]
  });

  const [inputStates, setInputStates] = useState<Record<string, string>>({});

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2500);
  };

  const handlePostComment = (id: string) => {
    const text = inputStates[id]?.trim();
    if (!text) return;

    const currentPostComments = comments[id] || [];
    setComments({
      ...comments,
      [id]: [...currentPostComments, { author: "Visitor", text }]
    });
    setInputStates({ ...inputStates, [id]: "" });
    triggerToast("Comment posted!");
  };

  const handleShare = (id: string) => {
    const shareUrl = `${window.location.origin}/perspective#mindmap-${id}`;
    navigator.clipboard.writeText(shareUrl);
    triggerToast("Link copied to clipboard! 🔗");
  };

  const activeComments = comments[activeMindmap.id] || [];

  return (
    <div className="max-w-6xl mx-auto px-6 flex flex-col gap-10">
      
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-cream-ink text-cream-bg rounded-full text-xs font-semibold uppercase tracking-wider shadow-lg animate-fade-in">
          {toastMessage}
        </div>
      )}

      {/* Netflix Screen: Large active mindmap */}
      <div className="bg-zinc-950 rounded-3xl overflow-hidden border border-cream-muted/20 shadow-2xl relative min-h-[500px] flex flex-col justify-end p-6 sm:p-12 text-white">
        
        {/* Active Mindmap Backdrop Cover with Bottom Creamy Gradient */}
        <div className="absolute inset-0 bg-zinc-950">
          <img 
            src={activeMindmap.image} 
            alt={activeMindmap.title}
            className="w-full h-full object-contain object-right opacity-60 pointer-events-none transition-all duration-700"
          />
          {/* Netflix-style ambient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/50 to-transparent" />
        </div>

        {/* Netflix Card Detail overlay */}
        <div className="relative z-10 max-w-xl flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold tracking-widest uppercase bg-red-600 text-white px-2 py-0.5 rounded">
              TOP 10
            </span>
            <span className="text-xs uppercase tracking-widest font-semibold text-cream-muted">
              Chapter {activeMindmap.id} • Year {activeMindmap.year}
            </span>
          </div>

          {/* Title */}
          <h2 className="font-serif italic text-3xl sm:text-5xl font-bold leading-tight tracking-wide text-cream-bg">
            {activeMindmap.title}
          </h2>

          {/* Handwritten caption (replacing netflix movie short recap!) */}
          <p className="font-handwriting text-2xl sm:text-3xl text-amber-200/90 leading-snug">
            "{activeMindmap.note}"
          </p>

          {/* Description */}
          <p className="text-xs sm:text-sm text-zinc-300 font-sans font-light leading-relaxed">
            {activeMindmap.description}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <button 
              onClick={() => handleShare(activeMindmap.id)}
              className="px-6 py-2.5 bg-cream-bg text-cream-ink hover:bg-cream-surface rounded-lg font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-2"
            >
              <Send size={14} /> Copy Direct Share Link
            </button>
            <a 
              href="#comments-section"
              className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 rounded-lg font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-2"
            >
              <MessageCircle size={14} /> View Comments ({activeComments.length})
            </a>
          </div>
        </div>

        {/* Netflix rating tag */}
        <span className="absolute bottom-12 right-0 bg-zinc-800/80 border-l-4 border-amber-500 py-1.5 px-4 text-xs font-mono font-semibold tracking-widest select-none">
          16+ ADVANCED RESEARCH
        </span>
      </div>

      {/* Row Section: Horizontal Card Thumbnails */}
      <div>
        <h3 className="text-xs uppercase tracking-widest font-bold text-cream-mid mb-4">
          เนื่องจากคุณศึกษา วิศวกรรมระบบปัญญาประดิษฐ์ (Continuous Timeline Feed)
        </h3>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none scroll-smooth">
          {mindmaps.map((item) => {
            const isActive = activeMindmap.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setActiveMindmap(item)}
                className={`flex-shrink-0 w-[180px] sm:w-[240px] aspect-video rounded-xl overflow-hidden border cursor-pointer transition-all duration-300 relative group bg-zinc-950 ${
                  isActive 
                    ? "border-amber-400 ring-4 ring-amber-400/20 scale-[1.03] z-10" 
                    : "border-cream-muted/40 hover:scale-[1.03] hover:border-cream-mid"
                }`}
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity"
                />
                
                {/* Netflix-style category tag overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-[9px] font-bold text-amber-300 tracking-wider block">CHAPTER {item.id}</span>
                  <span className="text-[10px] font-bold text-white leading-tight truncate block">{item.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Comments Area for Active Mindmap */}
      <div id="comments-section" className="bg-cream-surface/20 border border-cream-muted/30 rounded-2xl p-6 sm:p-8 mt-4 animate-fade-in">
        <h3 className="text-xs uppercase tracking-widest font-bold text-cream-mid mb-4 flex items-center gap-2">
          <MessageCircle size={14} /> Comments and reflection on "{activeMindmap.title}"
        </h3>

        {/* Comment list */}
        <div className="flex flex-col gap-4 border-b border-cream-muted/20 pb-6 mb-6 max-h-[300px] overflow-y-auto pr-2">
          {activeComments.length === 0 ? (
            <p className="text-xs text-cream-mid italic font-light">No comments posted yet on this chapter. Be the first to share your thoughts!</p>
          ) : (
            activeComments.map((comment, index) => (
              <div 
                key={index} 
                className="bg-cream-bg border border-cream-muted/20 p-4 rounded-xl shadow-sm text-xs leading-relaxed flex flex-col gap-1 transition-all"
              >
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-cream-ink">{comment.author}</span>
                  <span className="text-[9px] text-cream-mid font-mono">posted just now</span>
                </div>
                <p className="text-cream-ink/80 font-light">{comment.text}</p>
              </div>
            ))
          )}
        </div>

        {/* Add comment input */}
        <div className="flex gap-3 items-center">
          <input
            type="text"
            placeholder="Add your comment or question..."
            value={inputStates[activeMindmap.id] || ""}
            onChange={(e) => setInputStates({ ...inputStates, [activeMindmap.id]: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter") handlePostComment(activeMindmap.id);
            }}
            className="flex-grow px-4 py-2.5 rounded-lg border border-cream-muted/50 bg-cream-bg text-cream-ink text-xs focus:outline-none focus:border-cream-mid font-light"
          />
          <button
            onClick={() => handlePostComment(activeMindmap.id)}
            disabled={!inputStates[activeMindmap.id]?.trim()}
            className="px-5 py-2.5 bg-cream-ink text-cream-bg text-xs font-semibold uppercase tracking-widest rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            Post
          </button>
        </div>
      </div>

    </div>
  );
}
