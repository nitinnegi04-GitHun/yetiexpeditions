import { Quote } from "lucide-react";

export default function QuoteSection() {
    return (
        <section className="w-full bg-slate-900 py-32 relative overflow-hidden">
            <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #E4E4E7 1px, transparent 0)", backgroundSize: "40px 40px" }}
            />
            <div className="max-w-[960px] mx-auto px-6 text-center relative z-10">
                <Quote className="text-primary w-12 h-12 mx-auto mb-8" />
                <h5 className="text-white text-3xl md:text-5xl font-light italic leading-tight tracking-tight">
                    "The mountains are not a place to conquer, but a place to rediscover what it means to be human under the strict guidance of nature."
                </h5>
                <div className="mt-12">
                    <p className="text-primary font-black uppercase tracking-[0.3em] text-sm">Reinhold Messner</p>
                    <p className="text-slate-500 text-[10px] uppercase mt-1">Alpine Legend</p>
                </div>
            </div>
        </section>
    );
}
