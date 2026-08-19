'use client';

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { trackCTA } from "@/lib/tracking/analytics";

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    trackCTA({ cta_name: 'newsletter_signup', location: 'footer' });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <p className="text-[11px] font-bold uppercase tracking-widest text-primary leading-relaxed">
        Signal received. You&apos;re on the dispatch list.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex border-b border-slate-900 pb-2">
      <input
        className="bg-transparent border-none focus:ring-0 text-sm w-full p-0 outline-none"
        placeholder="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" className="shrink-0 bg-transparent border-none p-0 cursor-pointer outline-none" aria-label="Subscribe">
        <ArrowRight className="text-slate-900 w-5 h-5" />
      </button>
    </form>
  );
}
