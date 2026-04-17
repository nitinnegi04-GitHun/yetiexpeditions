"use client"

import { useState } from "react"
import { X, ArrowRight } from "lucide-react"
import { PortableText, type PortableTextComponents } from "@portabletext/react"
import { highlightSweep } from "@/lib/highlightStyle"

interface Credential {
    code: string
    label: string
    sub: string
}

interface Props {
    name: string
    role: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bio: any[] | null
    quoteAttribution: string
    credentials: Credential[]
}

const bioComponents: PortableTextComponents = {
    marks: {
        strong: ({ children }: { children: React.ReactNode }) => (
            <strong className="font-bold text-slate-900">{children}</strong>
        ),
        em: ({ children }: { children: React.ReactNode }) => (
            <em className="italic">{children}</em>
        ),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        highlight: ({ children, value }: { children?: React.ReactNode; value?: any }) => (
            <span style={highlightSweep({ color: value?.color === 'primary' ? 'rgba(244,99,46,0.3)' : 'rgba(255,200,0,0.35)' })}>
                {children}
            </span>
        ),
    },
    block: {
        normal: ({ children }: { children?: React.ReactNode }) => (
            <p className="text-sm text-slate-500 leading-relaxed">{children}</p>
        ),
    },
}

export default function CoFounderModal({ name, role, bio, quoteAttribution, credentials }: Props) {
    const [open, setOpen] = useState(false)

    return (
        <>
            {/* Trigger */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                    — {quoteAttribution}
                </p>
                <button
                    onClick={() => setOpen(true)}
                    className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-primary border border-primary px-4 py-2 hover:bg-primary hover:text-white transition-colors w-fit"
                >
                    Know More About Me
                    <ArrowRight className="w-3 h-3" />
                </button>
            </div>

            {/* Modal */}
            {open && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
                    onClick={() => setOpen(false)}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

                    {/* Panel */}
                    <div
                        className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close */}
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-white border border-zinc-200 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors"
                            aria-label="Close"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="px-8 md:px-12 py-12">
                            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-6">
                                ▪ {role}
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-8 text-slate-900">
                                {name}
                            </h2>
                            <div className="space-y-3 mb-10">
                                {bio
                                    ? <PortableText value={bio} components={bioComponents} />
                                    : <p className="text-sm text-slate-500 leading-relaxed">Ex-Army. War battle casualty. Trained at the edges of the world — Siachen, Gulmarg, Manali — and returned to build something that passes that knowledge on.</p>
                                }
                            </div>
                            <div className="border-t border-zinc-200 pt-8">
                                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-5">Service Record</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-100 border border-zinc-100">
                                    {credentials.map((item) => (
                                        <div key={item.code} className="bg-white p-5 flex flex-col gap-2">
                                            <span className="text-[9px] font-black font-mono text-primary tracking-[0.25em] uppercase">{item.code}</span>
                                            <p className="text-sm font-bold uppercase tracking-tight text-slate-900 leading-snug">{item.label}</p>
                                            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{item.sub}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
