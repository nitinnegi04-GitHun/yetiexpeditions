import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ARTICLES, type ArticleBlock } from "../articles";
import { ArrowLeft, Clock, CalendarDays, Tag, ArrowRight } from "lucide-react";

interface PageProps {
    params: Promise<{ slug: string }>;
}

function renderBlock(block: ArticleBlock, i: number) {
    switch (block.type) {
        case 'h2':
            return (
                <h2 key={i} className="text-2xl md:text-3xl font-black uppercase tracking-tighter mt-14 mb-5 text-slate-900">
                    {block.text}
                </h2>
            );
        case 'p':
            return (
                <p key={i} className="text-slate-700 leading-relaxed text-base md:text-[17px] mb-6">
                    {block.text}
                </p>
            );
        case 'quote':
            return (
                <blockquote key={i} className="my-10 border-l-2 border-primary pl-6 md:pl-8">
                    <p className="text-xl md:text-2xl font-light italic text-slate-800 leading-relaxed">
                        &ldquo;{block.text}&rdquo;
                    </p>
                    {block.attribution && (
                        <cite className="block mt-4 text-[10px] font-black uppercase tracking-[0.25em] text-primary not-italic">
                            — {block.attribution}
                        </cite>
                    )}
                </blockquote>
            );
        case 'image':
            return (
                <figure key={i} className="my-10 border border-zinc-border">
                    <img
                        src={block.src}
                        alt={block.caption}
                        className="w-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        style={{ maxHeight: "420px" }}
                    />
                    <figcaption className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 border-t border-zinc-border bg-slate-50">
                        {block.caption}
                    </figcaption>
                </figure>
            );
        case 'divider':
            return <hr key={i} className="my-12 border-zinc-border" />;
        default:
            return null;
    }
}

export default async function ArticlePage({ params }: PageProps) {
    const { slug } = await params;
    const article = ARTICLES.find(a => a.slug === slug);
    if (!article) notFound();

    const related = ARTICLES.filter(a => a.slug !== slug && a.category === article.category).slice(0, 2);
    const others = related.length < 2
        ? [...related, ...ARTICLES.filter(a => a.slug !== slug && !related.includes(a)).slice(0, 2 - related.length)]
        : related;

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* ── Hero Image ── */}
            <section className="relative h-[55vh] w-full -mt-[88px]">
                <div
                    className="absolute inset-0 bg-cover bg-center grayscale brightness-75 hover:grayscale-0 transition-all duration-700"
                    style={{ backgroundImage: `url(${article.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 max-w-[1440px] mx-auto px-6 md:px-12 pb-10 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <span className="bg-primary text-white px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em]">
                            {article.category}
                        </span>
                        <span className="text-white/50 text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />{article.readTime}
                        </span>
                    </div>
                    <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-tight max-w-4xl">
                        {article.title}
                    </h1>
                </div>
            </section>

            {/* ── Split Layout: Sidebar + Body ── */}
            <div className="max-w-[1440px] mx-auto flex flex-col xl:flex-row">

                {/* ── Left Sidebar (sticky) ── */}
                <aside className="w-full xl:w-[340px] shrink-0 border-b xl:border-b-0 xl:border-r border-zinc-border bg-slate-50">
                    <div className="sticky top-[88px] p-8 md:p-10 flex flex-col gap-8">

                        {/* Back link */}
                        <Link
                            href="/journal"
                            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors"
                        >
                            <ArrowLeft className="w-3 h-3" /> Back to Journal
                        </Link>

                        {/* Author card */}
                        <div className="border-t border-zinc-border pt-8">
                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4">Written By</p>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-slate-200 border border-zinc-border shrink-0 overflow-hidden">
                                    <img
                                        src={article.image}
                                        alt={article.author}
                                        className="w-full h-full object-cover object-top grayscale"
                                    />
                                </div>
                                <div>
                                    <p className="font-black uppercase text-sm tracking-tight">{article.author}</p>
                                    <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1 leading-relaxed">{article.authorTitle}</p>
                                </div>
                            </div>
                        </div>

                        {/* Meta */}
                        <div className="border-t border-zinc-border pt-8 space-y-4">
                            <div className="flex items-center gap-3">
                                <CalendarDays className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Published</p>
                                    <p className="text-xs font-bold uppercase">{article.date}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Read Time</p>
                                    <p className="text-xs font-bold uppercase">{article.readTime}</p>
                                </div>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="border-t border-zinc-border pt-8">
                            <div className="flex items-center gap-2 mb-4">
                                <Tag className="w-3 h-3 text-slate-400" />
                                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Tags</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {article.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 border border-zinc-border text-slate-600 bg-white"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Share */}
                        <div className="border-t border-zinc-border pt-8">
                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4">Share</p>
                            <div className="flex gap-3">
                                {["X / Twitter", "Copy Link"].map(label => (
                                    <button
                                        key={label}
                                        className="text-[9px] font-black uppercase tracking-widest px-3 py-2 border border-zinc-border text-slate-600 hover:border-slate-900 hover:text-slate-900 transition-colors"
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>
                </aside>

                {/* ── Article Body ── */}
                <article className="flex-1 px-6 md:px-12 lg:px-16 py-14 max-w-3xl">

                    {/* Lede */}
                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light border-l-2 border-primary pl-6 mb-12">
                        {article.excerpt}
                    </p>

                    {/* Body blocks */}
                    <div>
                        {article.body.map((block, i) => renderBlock(block, i))}
                    </div>

                    {/* End mark */}
                    <div className="mt-16 flex items-center gap-4">
                        <div className="h-px flex-1 bg-zinc-border" />
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">End of Dispatch</span>
                        <div className="h-px flex-1 bg-zinc-border" />
                    </div>

                </article>
            </div>

            {/* ── Related Articles ── */}
            {others.length > 0 && (
                <section className="border-t border-zinc-border">
                    <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16">
                        <div className="flex items-end justify-between mb-10">
                            <div>
                                <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-2">Continue Reading</span>
                                <h2 className="text-3xl font-black uppercase tracking-tighter">More Dispatches</h2>
                            </div>
                            <Link
                                href="/journal"
                                className="hidden md:inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors group"
                            >
                                All Articles <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-border border border-zinc-border">
                            {others.map(rel => (
                                <Link
                                    key={rel.slug}
                                    href={`/journal/${rel.slug}`}
                                    className="bg-white flex gap-0 group hover:bg-slate-50 transition-colors"
                                >
                                    <div className="w-32 md:w-44 shrink-0 overflow-hidden">
                                        <img
                                            src={rel.image}
                                            alt={rel.title}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-between p-6 flex-1">
                                        <div>
                                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary block mb-2">{rel.category}</span>
                                            <h3 className="font-black uppercase text-sm tracking-tight leading-snug group-hover:text-primary transition-colors">
                                                {rel.title}
                                            </h3>
                                        </div>
                                        <div className="flex items-center gap-3 mt-4 text-[9px] font-bold uppercase tracking-widest text-slate-400">
                                            <span>{rel.date}</span>
                                            <span>·</span>
                                            <span>{rel.readTime}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </div>
    );
}
