'use client';
import { useState } from 'react';
import { Info } from 'lucide-react';

export default function PriceTooltip() {
    const [show, setShow] = useState(false);
    return (
        <div
            className="relative inline-flex items-center ml-1 shrink-0"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >
            <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
            {show && (
                <div
                    className="absolute bottom-full right-0 mb-3 z-50 pointer-events-none"
                    style={{ width: '220px' }}
                >
                    <div className="bg-slate-900 text-white px-4 py-3">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Pricing Note</p>
                        <p className="text-[11px] leading-relaxed text-slate-300" style={{ whiteSpace: 'normal' }}>
                            Price applies to batches of 5+ trekkers. Smaller groups available on request — pricing varies.
                        </p>
                    </div>
                    <span className="block w-0 h-0 ml-auto mr-1" style={{ borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '6px solid #0f172a' }} />
                </div>
            )}
        </div>
    );
}
