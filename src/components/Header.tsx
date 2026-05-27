"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-cream-bg/85 backdrop-blur-md border-b border-cream-muted/30 py-3 shadow-sm" 
        : "bg-transparent py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image 
            src="/Ve-Tan-Boon.png" 
            alt="Ve Tan Boon Logo" 
            width={120} 
            height={40} 
            className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-sans text-sm tracking-widest uppercase font-medium text-cream-ink/80">
          <Link href="/perspective" className="hover:text-cream-mid transition-colors relative py-1 group">
            Perspective
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cream-mid transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/creative" className="hover:text-cream-mid transition-colors relative py-1 group">
            Creative
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cream-mid transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/reflective" className="hover:text-cream-mid transition-colors relative py-1 group">
            Reflective
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cream-mid transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/eatver" className="hover:text-cream-mid transition-colors relative py-1 group">
            Eatver
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cream-mid transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/admin" className="px-4 py-2 border border-cream-mid/50 rounded-full hover:bg-cream-surface transition-all duration-300 text-xs font-semibold text-cream-mid">
            Admin
          </Link>
        </nav>

        {/* Mobile menu toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-cream-ink/80 hover:text-cream-mid focus:outline-none"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-cream-bg border-b border-cream-muted/50 p-6 flex flex-col gap-4 font-sans text-sm tracking-widest uppercase font-medium text-cream-ink shadow-lg animate-fade-in">
          <Link 
            href="/perspective" 
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-cream-mid transition-colors py-2 border-b border-cream-surface"
          >
            Perspective
          </Link>
          <Link 
            href="/creative" 
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-cream-mid transition-colors py-2 border-b border-cream-surface"
          >
            Creative
          </Link>
          <Link 
            href="/reflective" 
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-cream-mid transition-colors py-2 border-b border-cream-surface"
          >
            Reflective
          </Link>
          <Link 
            href="/eatver" 
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-cream-mid transition-colors py-2 border-b border-cream-surface"
          >
            Eatver
          </Link>
          <Link 
            href="/admin" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-cream-mid font-semibold flex justify-between items-center"
          >
            Admin Panel ➔
          </Link>
        </div>
      )}
    </header>
  );
}
