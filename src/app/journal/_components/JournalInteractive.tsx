'use client';

import { useState } from "react";
import Link from "next/link";
import { Clock, User, Mail } from "lucide-react";
import { ARTICLES } from "../articles";

const CATEGORIES = ["All", "Expedition Reports", "Gear & Kit", "Training", "Altitude Science", "Community"];

export default function JournalInteractive() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const grid = ARTICLES.filter(a => !a.featured && (activeCategory === "All" || a.category === activeCategory));

    return (
        <>
            {/* ── Filter Bar ── */}
            <section className="border-b border-zinc-border sticky top-[52px] z-40 bg-white">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-4 flex items-center gap-3 overflow-x-auto">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 shrink-0">
                        Filter:
                    </span>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            type="button"
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
                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary mb-2">You&apos;re In</p>
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
        </>
    );
}
