"use client";

import { useState } from "react";
import { Sparkles, Calendar, Layers, X } from "lucide-react";

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
  const [selectedItem, setSelectedItem] = useState<CreativeItem | null>(null);

  const categories = ["All", "Moments", "Creations", "Archive"];

  const filteredItems = activeCategory === "All"
    ? items
    : items.filter(item => item.category.toLowerCase() === activeCategory.toLowerCase());

  // Helper to render beautiful organic abstract thumbnail when no image exists
  const renderThumbnail = (item: CreativeItem) => {
    if (item.image) {
      return (
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
      <div className={`w-full h-full bg-gradient-to-tr ${gradient} flex flex-col justify-between p-6 transition-all duration-500 group-hover:scale-[1.02] relative overflow-hidden`}>
        <div className="absolute inset-0 bg-radial-gradient from-cream-bg/25 to-transparent pointer-events-none" />
        <div className="flex justify-between items-start z-10">
          <span className="text-xs uppercase tracking-wider font-bold text-cream-mid">{item.category}</span>
          <span className="font-serif italic text-lg text-cream-mid">{item.year}</span>
        </div>
        <div className="z-10">
          <h4 className="font-serif italic text-2xl text-cream-ink leading-tight">{item.title}</h4>
          <span className="text-xs font-handwriting text-cream-mid/80 mt-1 block">contemplative collection</span>
        </div>
      </div>
    );
  };

  return (
    <section id="creative" className="py-28 bg-cream-surface/10 border-t border-cream-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 text-cream-mid font-serif italic text-lg mb-2">
              <Sparkles size={20} />
              <span>Creative space</span>
            </div>
            <h2 className="font-serif italic text-4xl lg:text-6xl text-cream-ink leading-tight font-medium">
              ผลงานและสิ่งที่สะสม
            </h2>
            <p className="text-sm text-cream-mid mt-2 max-w-md font-sans">
              บันทึกช่วงเวลาสำคัญ โครงการสร้างสรรค์ และคอลเลกชันความทรงจำที่ตกตะกอนตามกาลเวลา
            </p>
          </div>

          {/* Categories Tab */}
          <div className="flex flex-wrap gap-2 border-b border-cream-muted/20 pb-2 md:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs uppercase tracking-widest font-semibold rounded-full border transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-cream-ink text-cream-bg border-cream-ink"
                    : "bg-transparent text-cream-mid border-cream-muted/30 hover:border-cream-mid hover:text-cream-ink"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer bg-cream-bg rounded-xl overflow-hidden border border-cream-muted/40 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex flex-col h-[320px]"
            >
              {/* Image / Gradient Cover */}
              <div className="h-[220px] overflow-hidden relative border-b border-cream-muted/20">
                {renderThumbnail(item)}
              </div>

              {/* Meta */}
              <div className="p-4 flex justify-between items-center bg-cream-bg">
                <span className="text-xs uppercase tracking-widest font-bold text-cream-mid">
                  {item.category}
                </span>
                <span className="text-xs font-mono text-cream-mid/70 flex items-center gap-1 font-light">
                  <Calendar size={12} /> {item.year}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Modal Overlay */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-cream-ink/40 backdrop-blur-sm animate-fade-in">
            <div className="bg-cream-bg border border-cream-muted/40 max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden relative animate-scale-up">
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-cream-bg/85 border border-cream-muted/30 text-cream-ink hover:text-cream-mid transition-colors shadow-sm"
              >
                <X size={18} />
              </button>

              {/* Modal Cover Image */}
              <div className="h-[280px] md:h-[320px] relative overflow-hidden border-b border-cream-muted/20">
                {selectedItem.image ? (
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-tr ${
                    selectedItem.category === "Creations" 
                      ? "from-teal-100 to-teal-200/50" 
                      : selectedItem.category === "Archive"
                      ? "from-zinc-100 to-zinc-200/60"
                      : "from-amber-100 to-amber-200/50"
                  } flex items-center justify-center p-8`}>
                    <div className="text-center">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-cream-mid block mb-2">
                        {selectedItem.category} • {selectedItem.year}
                      </span>
                      <h3 className="font-serif italic text-4xl lg:text-5xl text-cream-ink leading-tight">
                        {selectedItem.title}
                      </h3>
                    </div>
                  </div>
                )}
              </div>

              {/* Description & Details */}
              <div className="p-6 md:p-8 bg-cream-bg">
                <div className="flex items-center gap-4 text-xs font-semibold text-cream-mid uppercase tracking-widest mb-4">
                  <span className="flex items-center gap-1">
                    <Layers size={14} /> {selectedItem.category}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cream-muted" />
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> Created in {selectedItem.year}
                  </span>
                </div>

                <h3 className="font-serif italic text-3xl text-cream-ink mb-4">
                  {selectedItem.title}
                </h3>

                <p className="text-sm text-cream-ink/85 leading-relaxed font-sans font-light">
                  {selectedItem.description}
                </p>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
