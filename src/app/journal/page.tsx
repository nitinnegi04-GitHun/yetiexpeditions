import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JournalInteractive from "./_components/JournalInteractive";
import { ArrowRight, Clock, User, CalendarDays } from "lucide-react";
import { ARTICLES } from "./articles";

export default function JournalPage() {
    const featured = ARTICLES.find(a => a.featured)!;

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
                        Unfiltered writing from the guides, the trails, and the people who live among the mountains. No sponsored content. No gear reviews we didn&apos;t earn.
                    </p>
                </div>
            </section>

            {/* ── Featured Article ── */}
            <section className="border-b border-zinc-border">
                <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row">
                    <div className="w-full lg:w-1/2 overflow-hidden" style={{ minHeight: "420px" }}>
                        <img
                            src={featured.image}
                            alt={featured.title}
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            style={{ minHeight: "420px" }}
                        />
                    </div>
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

            {/* ── Filter + Grid + Newsletter (client) ── */}
            <JournalInteractive />

            <Footer />
        </div>
    );
}
