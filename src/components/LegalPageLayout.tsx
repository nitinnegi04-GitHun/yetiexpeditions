import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { sharedMarks } from "@/lib/portableTextComponents";
import { ArrowLeft } from "lucide-react";

const portableTextComponents: PortableTextComponents = {
    block: {
        h2: ({ children }) => (
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mt-14 mb-4 text-slate-900 border-t border-zinc-border pt-10 first:border-t-0 first:pt-0">
                {children}
            </h2>
        ),
        h3: ({ children }) => (
            <h3 className="text-lg md:text-xl font-black uppercase tracking-tight mt-8 mb-3 text-slate-800">
                {children}
            </h3>
        ),
        normal: ({ children }) => (
            <p className="text-slate-600 leading-relaxed text-base mb-5">
                {children}
            </p>
        ),
    },
    list: {
        bullet: ({ children }) => (
            <ul className="space-y-2 mb-5 pl-4">
                {children}
            </ul>
        ),
        number: ({ children }) => (
            <ol className="space-y-2 mb-5 pl-4 list-decimal">
                {children}
            </ol>
        ),
    },
    listItem: {
        bullet: ({ children }) => (
            <li className="text-slate-600 leading-relaxed text-base flex gap-3">
                <span className="text-primary mt-1.5 shrink-0">—</span>
                <span>{children}</span>
            </li>
        ),
        number: ({ children }) => (
            <li className="text-slate-600 leading-relaxed text-base">
                {children}
            </li>
        ),
    },
    marks: sharedMarks,
};

interface LegalPageLayoutProps {
    eyebrow: string;
    title: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content: any[] | null;
    lastUpdated?: string;
}

export default function LegalPageLayout({ eyebrow, title, content, lastUpdated }: LegalPageLayoutProps) {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero */}
            <section className="border-b border-zinc-border bg-slate-50 pt-32 pb-16 px-6 md:px-12">
                <div className="max-w-[1440px] mx-auto">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-primary transition-colors mb-10"
                    >
                        <ArrowLeft className="w-3 h-3" />
                        Back to Home
                    </Link>
                    <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">
                        {eyebrow}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-slate-900">
                        {title}
                    </h1>
                    {lastUpdated && (
                        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mt-6">
                            Last updated: {lastUpdated}
                        </p>
                    )}
                </div>
            </section>

            {/* Content */}
            <section className="px-6 md:px-12 py-16 md:py-24">
                <div className="max-w-[860px] mx-auto">
                    {content && content.length > 0 ? (
                        <PortableText value={content} components={portableTextComponents} />
                    ) : (
                        <p className="text-slate-400 text-sm">Content coming soon.</p>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
