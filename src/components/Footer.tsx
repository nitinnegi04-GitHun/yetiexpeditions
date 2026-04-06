import { Mountain, ArrowRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full border-t border-zinc-border bg-white pt-24 pb-12 px-6 md:px-12">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 border-b border-zinc-border pb-24">
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Mountain className="text-primary w-6 h-6" />
                        <h1 className="text-lg font-black tracking-tighter uppercase">Yeti Expeditions</h1>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        Swiss-standard alpine logistics serving the Himalayan range since 2008. Dedicated to sustainable tourism and elite safety protocols.
                    </p>
                </div>
                <div>
                    <h6 className="text-xs font-black uppercase tracking-[0.2em] mb-8">Navigation</h6>
                    <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-slate-400">
                        <li><a className="hover:text-slate-900" href="#">The Treks</a></li>
                        <li><a className="hover:text-slate-900" href="#">Safety Gear</a></li>
                        <li><a className="hover:text-slate-900" href="#">Preparation</a></li>
                        <li><a className="hover:text-slate-900" href="#">Impact</a></li>
                    </ul>
                </div>
                <div>
                    <h6 className="text-xs font-black uppercase tracking-[0.2em] mb-8">Locations</h6>
                    <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-slate-400">
                        <li><a className="hover:text-slate-900" href="#">Kathmandu, NP</a></li>
                        <li><a className="hover:text-slate-900" href="#">Leh, Ladakh</a></li>
                        <li><a className="hover:text-slate-900" href="#">Zurich, CH</a></li>
                        <li><a className="hover:text-slate-900" href="#">Thimphu, BT</a></li>
                    </ul>
                </div>
                <div>
                    <h6 className="text-xs font-black uppercase tracking-[0.2em] mb-8">Newsletter</h6>
                    <div className="flex border-b border-slate-900 pb-2">
                        <input
                            className="bg-transparent border-none focus:ring-0 text-sm w-full p-0 outline-none"
                            placeholder="Email Address"
                            type="email"
                        />
                        <ArrowRight className="text-slate-900 w-5 h-5" />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-4 uppercase">Receive dispatch updates from the field.</p>
                </div>
            </div>
            <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center mt-12 gap-6">
                <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    <span>Privacy Protocol</span>
                    <span>Terms of Ascent</span>
                    <span>Cookie Policy</span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">
                    © 2024 Yeti Expeditions. Alpine Clarity Design System.
                </div>
            </div>
        </footer>
    );
}
