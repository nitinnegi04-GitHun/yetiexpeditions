'use client';

import { useState, useEffect } from "react";
import { Mountain, Menu, X, Users, Brain, MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@sanity/client";
import { urlFor } from "@/sanity/image";

const sanity = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'qmj04x7n',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
    apiVersion: '2024-01-01',
    useCdn: true,
});

interface NavbarProps {
    logoUrl?: string | null;
    logoAlt?: string;
    siteName?: string;
}

export default function Navbar({ logoUrl: initialLogoUrl, siteName: initialSiteName }: NavbarProps = {}) {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [logoUrl, setLogoUrl] = useState<string | null>(initialLogoUrl ?? null);
    const [siteName, setSiteName] = useState(initialSiteName ?? 'Yeti Expeditions');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    useEffect(() => {
        sanity
            .fetch(`*[_type == "siteSettings"][0]{ logo, siteName }`)
            .then((s: any) => {
                if (s?.siteName) setSiteName(s.siteName);
                if (s?.logo) setLogoUrl(urlFor(s.logo).height(64).quality(90).url());
            })
            .catch(() => {});
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; }
    }, [isMenuOpen]);

    // Helpers for active states
    const isOurStoryActive = pathname === '/Our_story' || pathname === '/about';
    const isJournalActive = pathname === '/journal';
    const isChatActive = pathname === '/contact';

    // Primary red/brand color used generically as inline fallback if tailwind fails
    const ACTIVE_COLOR = '#ef4444'; 
    const INACTIVE_COLOR = '#475569';

    return (
        <>
            {/* Top Header - Desktop only, hidden on mobile */}
            <header
                className="w-full border-b border-zinc-100"
                style={{
                    zIndex: 9000,
                    background: 'white',
                    position: 'sticky',
                    top: 0,
                    left: 0,
                    right: 0,
                    display: isMobile ? 'none' : 'block',
                }}
            >
                <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 md:px-12 relative">
                    
                    {/* Logo - Always Left Aligned */}
                    <Link href="/" className="flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
                        {logoUrl ? (
                            <img
                                src={logoUrl}
                                alt={siteName}
                                style={{ height: '36px' }}
                                className="w-auto object-contain"
                            />
                        ) : (
                            <Mountain className="text-primary w-6 h-6 md:w-8 md:h-8 shrink-0" />
                        )}
                        
                        {/* Name displays next to logo in both scenarios */}
                        <span className="text-lg md:text-xl font-black tracking-tighter uppercase whitespace-nowrap text-slate-900">
                            {siteName}
                        </span>
                    </Link>

                    {/* Desktop Nav - Always Right Aligned */}
                    <nav className="hidden md:flex items-center gap-12 text-sm font-bold uppercase tracking-widest text-slate-900 ml-auto">
                        <Link className="hover:text-primary transition-colors" href="/#treks">Treks</Link>
                        <Link className="hover:text-primary transition-colors" href="/Our_story">Our Story</Link>
                        <Link className="hover:text-primary transition-colors" href="/journal">Journal</Link>
                        <button className="bg-primary text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-black transition-all cursor-pointer border-none outline-none">
                            Enquire Now
                        </button>
                    </nav>
                </div>
            </header>

            {/* Bottom Mobile Navigation Bar */}
            <div
                className="md:hidden"
                style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', height: '65px', zIndex: 99999, pointerEvents: 'none' }}
            >
                {/* 1. The Main Rectangular White Bar - non-interactive, let touches fall through */}
                <div
                    style={{
                        position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%',
                        backgroundColor: '#ffffff', boxShadow: '0px -2px 10px rgba(0,0,0,0.1)',
                        borderTopLeftRadius: '16px', borderTopRightRadius: '16px',
                        pointerEvents: 'none'
                    }}
                />

                {/* 2. The Interactive Buttons Overlay */}
                <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', pointerEvents: 'auto' }}>
                    <div style={{ width: '100%', maxWidth: '340px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '100%', paddingLeft: '8px', paddingRight: '8px', paddingBottom: '6px' }}>
                        
                        {/* Menu */}
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', width: '54px', paddingBottom: '4px', cursor: 'pointer', outline: 'none', background: 'none', border: 'none' }}>
                            {isMenuOpen ? <X size={24} color={ACTIVE_COLOR}/> : <Menu size={24} color={isMenuOpen ? ACTIVE_COLOR : INACTIVE_COLOR}/>}
                            <span style={{ color: isMenuOpen ? ACTIVE_COLOR : INACTIVE_COLOR, fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{isMenuOpen ? 'Close' : 'Menu'}</span>
                        </button>
                        
                        {/* Our Story */}
                        <Link href="/Our_story" onClick={() => setIsMenuOpen(false)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', width: '54px', paddingBottom: '4px', cursor: 'pointer', outline: 'none', textDecoration: 'none' }}>
                            <Users size={22} color={isOurStoryActive ? ACTIVE_COLOR : INACTIVE_COLOR} />
                            <span style={{ color: isOurStoryActive ? ACTIVE_COLOR : INACTIVE_COLOR, fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>Our Story</span>
                        </Link>

                        {/* Treks */}
                        <Link href="/#treks" onClick={() => setIsMenuOpen(false)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', width: '54px', paddingBottom: '4px', cursor: 'pointer', outline: 'none', textDecoration: 'none' }}>
                            <Mountain size={22} color={pathname === '/' ? ACTIVE_COLOR : INACTIVE_COLOR} />
                            <span style={{ color: pathname === '/' ? ACTIVE_COLOR : INACTIVE_COLOR, fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>Treks</span>
                        </Link>

                        {/* Journal */}
                        <Link href="/journal" onClick={() => setIsMenuOpen(false)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', width: '54px', paddingBottom: '4px', cursor: 'pointer', outline: 'none', textDecoration: 'none' }}>
                            <Brain size={22} color={isJournalActive ? ACTIVE_COLOR : INACTIVE_COLOR} />
                            <span style={{ color: isJournalActive ? ACTIVE_COLOR : INACTIVE_COLOR, fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Journal</span>
                        </Link>
                        
                        {/* Chat */}
                        <Link href="/contact" onClick={() => setIsMenuOpen(false)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', width: '54px', paddingBottom: '4px', cursor: 'pointer', outline: 'none', textDecoration: 'none' }}>
                            <MessageCircle size={22} color={isChatActive ? ACTIVE_COLOR : '#10b981'} />
                            <span style={{ color: isChatActive ? ACTIVE_COLOR : INACTIVE_COLOR, fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Chat</span>
                        </Link>

                    </div>
                </div>
            </div>

            {/* Mobile Menu Full Screen Overlay - Hardcoded styling to avoid Tailwind purges */}
            {isMenuOpen && (
                <div 
                    style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#ffffff', zIndex: 99998, display: 'flex', flexDirection: 'column', paddingTop: '96px', paddingBottom: '128px', paddingLeft: '24px', paddingRight: '24px', gap: '24px', overflowY: 'auto' }}
                >
                    <div style={{ display: 'flex', borderBottom: '1px solid #f4f4f5', paddingBottom: '24px', marginBottom: '8px' }}>
                        <h2 style={{ fontSize: '1.875rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0f172a', margin: 0 }}>Menu Navigation</h2>
                    </div>
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0f172a' }}>
                        <Link href="/#treks" onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none', color: '#0f172a' }}>Treks</Link>
                        <Link href="/Our_story" onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none', color: '#0f172a' }}>Our Story</Link>
                        <Link href="/journal" onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none', color: '#0f172a' }}>Journal</Link>
                    </nav>
                    <div style={{ marginTop: '32px', paddingTop: '32px', borderTop: '1px solid #f4f4f5' }}>
                        <button style={{ backgroundColor: ACTIVE_COLOR, color: '#ffffff', width: '100%', padding: '20px 0', fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', border: 'none', cursor: 'pointer' }}>
                            Enquire Now
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
