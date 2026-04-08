'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQ {
    question: string;
    answer: string;
}

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="border-t border-zinc-border">
            {faqs.map((faq, i) => (
                <div key={i} className="border-b border-zinc-border">
                    <button
                        type="button"
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        className="w-full flex justify-between items-center p-6 md:p-8 text-left hover:bg-white transition-colors cursor-pointer"
                        style={{ touchAction: 'manipulation' }}
                    >
                        <span className="font-black uppercase text-sm tracking-tight pr-6">{faq.question}</span>
                        <ChevronDown
                            className={`w-4 h-4 shrink-0 transition-transform duration-200 ${openIndex === i ? 'rotate-180 text-primary' : 'text-slate-400'}`}
                        />
                    </button>
                    {openIndex === i && (
                        <div className="px-6 md:px-8 pb-6 text-slate-600 text-sm leading-relaxed border-t border-zinc-border bg-white">
                            <p className="pt-4">{faq.answer}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
