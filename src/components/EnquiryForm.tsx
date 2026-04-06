'use client';
import { useState } from 'react';
import { Send } from 'lucide-react';

export default function EnquiryForm({ trekName }: { trekName: string }) {
    const [form, setForm] = useState({
        name: '', email: '', phone: '', preferredDate: '', groupSize: '1', message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="py-16 text-center">
                <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-4">Enquiry Received</span>
                <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">We'll be in touch within 24 hours.</h3>
                <p className="text-slate-500 text-sm">Our expedition team will contact you at <span className="font-bold text-slate-900">{form.email}</span> to discuss your {trekName} adventure.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Full Name *</label>
                    <input
                        name="name" value={form.name} onChange={handleChange} required
                        className="w-full border border-zinc-border p-3 text-sm focus:outline-none focus:border-slate-900 bg-white"
                        placeholder="Your full name"
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Email Address *</label>
                    <input
                        type="email" name="email" value={form.email} onChange={handleChange} required
                        className="w-full border border-zinc-border p-3 text-sm focus:outline-none focus:border-slate-900 bg-white"
                        placeholder="your@email.com"
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Phone Number</label>
                    <input
                        type="tel" name="phone" value={form.phone} onChange={handleChange}
                        className="w-full border border-zinc-border p-3 text-sm focus:outline-none focus:border-slate-900 bg-white"
                        placeholder="+1 234 567 890"
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Preferred Date / Season</label>
                    <input
                        type="text" name="preferredDate" value={form.preferredDate} onChange={handleChange}
                        className="w-full border border-zinc-border p-3 text-sm focus:outline-none focus:border-slate-900 bg-white"
                        placeholder="e.g. March 2025 or Oct–Nov 2025"
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Group Size</label>
                    <select
                        name="groupSize" value={form.groupSize} onChange={handleChange}
                        className="w-full border border-zinc-border p-3 text-sm focus:outline-none focus:border-slate-900 bg-white"
                    >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                            <option key={n} value={n}>{n} {n === 1 ? 'person (solo)' : 'people'}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Message / Special Requirements</label>
                <textarea
                    name="message" value={form.message} onChange={handleChange} rows={4}
                    className="w-full border border-zinc-border p-3 text-sm focus:outline-none focus:border-slate-900 bg-white resize-none"
                    placeholder="Custom dates, dietary needs, prior experience, questions..."
                />
            </div>
            <div className="flex items-center gap-6">
                <button
                    type="submit"
                    className="inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-4 text-xs font-black uppercase tracking-widest hover:bg-primary transition-colors"
                >
                    <Send className="w-3.5 h-3.5" />
                    Submit Enquiry
                </button>
                <p className="text-[10px] text-slate-400 uppercase">All participants undergo fitness vetting before confirmation.</p>
            </div>
        </form>
    );
}
