'use client';

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Clock, User, CalendarDays, Mail } from "lucide-react";
import { ARTICLES } from "./articles";

const CATEGORIES = ["All", "Expedition Reports", "Gear & Kit", "Training", "Altitude Science", "Community"];

export default function JournalPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const featured = ARTICLES.find(a => a.featured)!;
    const grid = ARTICLES.filter(a => !a.featured && (activeCategory === "All" || a.category === activeCategory));

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* ── Hero Header ── */}
            <section className="border-b border-zinc-border">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-4">
                            Field Dispatches
                        </span>
                        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
                            Journal
                        </h1>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-sm md:text-right">
                        Unfiltered writing from the guides, the trails, and the people who live among the mountains. No sponsored content. No gear reviews we didn't earn.
                    </p>
                </div>
            </section>

            {/* ── Featured Article ── */}
            <section className="border-b border-zinc-border">
                <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row">

                    {/* Image */}
                    <div className="w-full lg:w-1/2 overflow-hidden" style={{ minHeight: "420px" }}>
                        <img
                            src={featured.image}
                            alt={featured.title}
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            style={{ minHeight: "420px" }}
                        />
                    </div>

                    {/* Content */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 md:p-12 lg:p-16 bg-slate-50">
                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary border border-primary/30 px-3 py-1">
                                    Featured
                                </span>
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 border border-zinc-border px-3 py-1">
                                    {featured.category}
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-tight mb-6">
                                {featured.title}
                            </h2>
                            <p className="text-slate-600 text-sm leading-relaxed mb-8">
                                {featured.excerpt}
                            </p>
                        </div>

                        <div>
                            <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-8 flex-wrap">
                                <span className="flex items-center gap-2">
                                    <User className="w-3 h-3" />{featured.author}
                                </span>
                                <span className="flex items-center gap-2">
                                    <CalendarDays className="w-3 h-3" />{featured.date}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock className="w-3 h-3" />{featured.readTime}
                                </span>
                            </div>
                            <Link
                                href={`/journal/${featured.slug}`}
                                className="inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-colors group"
                            >
                                Read Dispatch
                                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Filter Bar ── */}
            <section className="border-b border-zinc-border sticky top-[88px] z-40 bg-white">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-4 flex items-center gap-3 overflow-x-auto">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 shrink-0">
                        Filter:
                    </span>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 border transition-colors shrink-0
                                ${activeCategory === cat
                                    ? "bg-slate-900 text-white border-slate-900"
                                    : "border-zinc-border text-slate-500 hover:border-slate-900 hover:text-slate-900"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* ── Article Grid ── */}
            <section className="border-b border-zinc-border">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16">
                    {grid.length === 0 ? (
                        <div className="py-20 text-center">
                            <p className="text-sm font-black uppercase tracking-widest text-slate-300">
                                No dispatches in this category yet.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-zinc-border border border-zinc-border">
                            {grid.map(article => (
                                <Link
                                    key={article.slug}
                                    href={`/journal/${article.slug}`}
                                    className="bg-white flex flex-col group hover:bg-slate-50 transition-colors"
                                >
                                    {/* Image */}
                                    <div className="relative overflow-hidden h-52 border-b border-zinc-border">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                        <span className="absolute bottom-3 left-4 text-[9px] font-black uppercase tracking-[0.2em] text-white/80">
                                            {article.category}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-col flex-1 p-6 md:p-8">
                                        <h3 className="text-lg font-black uppercase tracking-tight leading-tight mb-3 group-hover:text-primary transition-colors">
                                            {article.title}
                                        </h3>
                                        <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-6">
                                            {article.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between border-t border-zinc-border pt-4 flex-wrap gap-2">
                                            <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-widest text-slate-400">
                                                <span className="flex items-center gap-1.5">
                                                    <User className="w-2.5 h-2.5" />{article.author.split(" ")[0]}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <Clock className="w-2.5 h-2.5" />{article.readTime}
                                                </span>
                                            </div>
                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                                {article.date}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ── Newsletter CTA ── */}
            <section className="bg-slate-900 border-b border-white/10">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
                    <div className="max-w-lg">
                        <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-4">
                            Stay In The Field
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white leading-tight">
                            Dispatches from<br />
                            <span className="text-white/25">the mountain.</span>
                        </h2>
                        <p className="text-slate-400 text-sm mt-4 leading-relaxed">
                            New articles from our guides, straight to your inbox. No marketing. No algorithms. Just writing from people who live at altitude.
                        </p>
                    </div>

                    {subscribed ? (
                        <div className="text-center lg:text-left">
                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary mb-2">You're In</p>
                            <p className="text-white font-black uppercase text-xl tracking-tight">First dispatch incoming.</p>
                        </div>
                    ) : (
                        <form
                            onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }}
                            className="flex flex-col sm:flex-row gap-0 w-full lg:w-auto lg:min-w-[420px]"
                        >
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                placeholder="your@email.com"
                                className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/30 px-5 py-4 text-sm focus:outline-none focus:border-primary"
                            />
                            <button
                                type="submit"
                                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-colors shrink-0"
                            >
                                <Mail className="w-3.5 h-3.5" />
                                Subscribe
                            </button>
                        </form>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
