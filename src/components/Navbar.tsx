'use client';

import { useState } from "react";
import { Mountain, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="w-full border-b border-zinc-border sticky top-0 bg-white z-50">
            <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 py-4 md:py-6 md:px-12">

                {/* Logo Section */}
                <div className="flex items-center gap-3">
                    <Mountain className="text-primary w-6 h-6 md:w-8 md:h-8 shrink-0" />
                    <Link href="/" className="text-lg md:text-xl font-black tracking-tighter uppercase whitespace-nowrap" onClick={() => setIsMenuOpen(false)}>
                        Yeti Expeditions
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-12 text-sm font-bold uppercase tracking-widest">
                    <a className="hover:text-primary transition-colors" href="#">Treks</a>
                    <a className="hover:text-primary transition-colors" href="#">Safety</a>
                    <Link className="hover:text-primary transition-colors" href="/about">Our Story</Link>
                    <Link className="hover:text-primary transition-colors" href="/journal">Journal</Link>
                </nav>

                {/* Action Area: Book Now + Mobile Menu Toggle */}
                <div className="flex items-center gap-4 md:gap-6">
                    <button className="hidden md:block bg-primary text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-black transition-all">
                        Book Now
                    </button>

                    {/* Hamburger Menu - Only visible on Mobile */}
                    <button
                        className="md:hidden flex items-center justify-center p-1 text-slate-800 hover:text-primary transition-colors"
                        aria-label="Toggle Navigation Menu"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

            </div>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white border-b border-zinc-border flex flex-col px-6 py-8 gap-8 md:hidden shadow-xl">
                    <nav className="flex flex-col gap-6 text-xl font-black uppercase tracking-widest">
                        <a className="hover:text-primary transition-colors" href="#" onClick={() => setIsMenuOpen(false)}>Treks</a>
                        <a className="hover:text-primary transition-colors" href="#" onClick={() => setIsMenuOpen(false)}>Safety</a>
                        <Link className="hover:text-primary transition-colors" href="/about" onClick={() => setIsMenuOpen(false)}>Our Story</Link>
                        <Link className="hover:text-primary transition-colors" href="/journal" onClick={() => setIsMenuOpen(false)}>Journal</Link>
                    </nav>
                    <button className="bg-primary text-white w-full py-4 text-sm font-bold uppercase tracking-widest hover:bg-black transition-all mt-4">
                        Book Now
                    </button>
                </div>
            )}
        </header>
    );
}
