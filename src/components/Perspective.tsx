"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, Star } from "lucide-react";

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
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const thumbnailsContainerRef = useRef<HTMLDivElement>(null);
  
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
    <div className="absolute inset-0 w-full h-full bg-zinc-950 text-white flex flex-col justify-between overflow-hidden">
      
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed bottom-36 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-cream-bg text-cream-ink rounded-full text-xs font-semibold uppercase tracking-wider shadow-lg animate-fade-in">
          {toastMessage}
        </div>
      )}

      {/* Fullscreen Backdrop & Content Details wrapper */}
      <div className="relative w-full h-full flex flex-col md:flex-row items-stretch overflow-hidden">
        
        {/* Active Mindmap Ambient Blur & Visual Cover (Right on desktop) */}
        <div className="absolute inset-0 md:left-2/5 w-full md:w-3/5 h-full bg-zinc-950 flex items-center justify-center pointer-events-none z-0">
          
          {/* Ambient Glow behind the map */}
          <div 
            key={`ambient-${activeMindmap.id}`}
            style={{ backgroundImage: `url(${activeMindmap.image})` }}
            className="absolute inset-0 bg-cover bg-center filter blur-3xl opacity-20 transition-all duration-1000 scale-110" 
          />
          
          {/* Main Map: Legit Full View */}
          <img 
            key={`img-${activeMindmap.id}`}
            src={activeMindmap.image} 
            alt={activeMindmap.title}
            className="w-full h-full object-contain p-4 md:p-8 z-10 transition-all duration-700 ease-out animate-scale-up"
          />

          {/* Dynamic dark gradient fades to guarantee text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent md:hidden z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent hidden md:block z-10" />
        </div>

        {/* Netflix Card Detail Left Panel Overlay (Left on desktop) */}
        <div 
          key={`details-${activeMindmap.id}`}
          className="absolute md:relative inset-0 w-full md:w-2/5 h-full z-10 flex flex-col justify-center px-6 sm:px-12 md:px-16 bg-gradient-to-t from-zinc-950 via-zinc-950/85 to-zinc-950/30 md:bg-none animate-fade-in"
        >
          <div className="max-w-md flex flex-col gap-4 mb-24 md:mb-12">
            
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold tracking-widest uppercase bg-red-600 text-white px-2 py-0.5 rounded shadow">
                TOP 10
              </span>
              <span className="text-xs uppercase tracking-widest font-semibold text-zinc-400">
                Chapter {activeMindmap.id} • Year {activeMindmap.year}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-wide text-cream-bg drop-shadow-md">
              {activeMindmap.title}
            </h2>

            {/* Handwritten caption (replacing netflix movie short recap!) */}
            <p className="font-handwriting text-2xl sm:text-3xl text-amber-200/90 leading-snug drop-shadow-sm">
              "{activeMindmap.note}"
            </p>

            {/* Description */}
            <p className="text-xs sm:text-sm text-zinc-300 font-sans font-light leading-relaxed drop-shadow max-h-[120px] overflow-y-auto pr-2">
              {activeMindmap.description}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <button 
                onClick={() => handleShare(activeMindmap.id)}
                className="px-5 py-2.5 bg-white text-zinc-950 hover:bg-zinc-200 rounded-lg font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-2 shadow"
              >
                <Send size={13} /> Share Link
              </button>
              <button 
                onClick={() => setIsCommentsOpen(true)}
                className="px-5 py-2.5 bg-zinc-800/90 hover:bg-zinc-700/90 text-white border border-zinc-700/50 rounded-lg font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-2 shadow"
              >
                <MessageCircle size={13} /> Comments ({activeComments.length})
              </button>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <span className="bg-zinc-800 text-amber-400 border border-zinc-700 py-0.5 px-2 rounded text-[10px] font-mono tracking-widest uppercase font-bold flex items-center gap-0.5 shadow">
                <Star size={10} className="fill-amber-400" /> 16+ ADVANCED RESEARCH
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* Row Section: Horizontal Card Thumbnails sitting at the very bottom */}
      <div className="absolute bottom-6 left-0 right-0 z-20 w-full px-6 sm:px-12 md:px-16">
        <h3 className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 mb-2 drop-shadow-sm">
          เนื่องจากคุณศึกษา วิศวกรรมระบบปัญญาประดิษฐ์ (Continuous Timeline Feed)
        </h3>

        <div 
          ref={thumbnailsContainerRef}
          className="flex gap-4 overflow-x-auto pb-2 scrollbar-none scroll-smooth"
        >
          {mindmaps.map((item) => {
            const isActive = activeMindmap.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setActiveMindmap(item)}
                className={`flex-shrink-0 w-[140px] sm:w-[200px] aspect-video rounded-xl overflow-hidden border cursor-pointer transition-all duration-300 relative group bg-zinc-950 ${
                  isActive 
                    ? "border-amber-400 ring-4 ring-amber-400/25 scale-[1.03] z-10" 
                    : "border-zinc-800 hover:scale-[1.03] hover:border-zinc-500"
                }`}
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity select-none"
                  draggable="false"
                />
                
                {/* Netflix-style category tag overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent flex flex-col justify-end p-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-[8px] font-bold text-amber-300 tracking-wider block">CHAPTER {item.id}</span>
                  <span className="text-[9px] font-bold text-white leading-tight truncate block">{item.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Side Slide-in Comments Drawer overlay (Netflix-style detail drawer) */}
      <div 
        className={`fixed top-20 right-0 bottom-0 w-full sm:w-[420px] bg-zinc-950/95 backdrop-blur-md border-l border-zinc-800/80 p-6 z-40 flex flex-col justify-between transition-all duration-300 shadow-2xl ${
          isCommentsOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
          <div>
            <h3 className="font-serif italic text-lg text-cream-bg font-semibold flex items-center gap-2">
              <MessageCircle size={16} /> Reflections & Comments
            </h3>
            <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-sans font-light mt-0.5 truncate max-w-[280px]">
              "{activeMindmap.title}"
            </p>
          </div>
          <button 
            onClick={() => setIsCommentsOpen(false)}
            className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            title="Close Drawer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Comment list */}
        <div className="flex-grow flex flex-col gap-3 overflow-y-auto pr-2 mb-4">
          {activeComments.length === 0 ? (
            <p className="text-xs text-zinc-500 italic font-light py-8 text-center">No comments posted yet on this chapter. Be the first to share your thoughts!</p>
          ) : (
            activeComments.map((comment, index) => (
              <div 
                key={index} 
                className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-xl shadow-sm text-xs leading-relaxed flex flex-col gap-1 transition-all"
              >
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-zinc-200">{comment.author}</span>
                  <span className="text-[8px] text-zinc-500 font-mono">posted just now</span>
                </div>
                <p className="text-zinc-400 font-light">{comment.text}</p>
              </div>
            ))
          )}
        </div>

        {/* Add comment input */}
        <div className="flex gap-2 items-center pt-4 border-t border-zinc-800 bg-zinc-950">
          <input
            type="text"
            placeholder="Add your comment or question..."
            value={inputStates[activeMindmap.id] || ""}
            onChange={(e) => setInputStates({ ...inputStates, [activeMindmap.id]: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter") handlePostComment(activeMindmap.id);
            }}
            className="flex-grow px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-900 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-500 font-light"
          />
          <button
            onClick={() => handlePostComment(activeMindmap.id)}
            disabled={!inputStates[activeMindmap.id]?.trim()}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors disabled:opacity-40"
          >
            Post
          </button>
        </div>
      </div>

      {/* Background dimmer when Comments Drawer is open on small screens */}
      {isCommentsOpen && (
        <div 
          onClick={() => setIsCommentsOpen(false)}
          className="fixed inset-0 top-20 bg-black/60 backdrop-blur-[1px] z-30 transition-opacity"
        />
      )}

    </div>
  );
}
