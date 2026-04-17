import { Mountain, ArrowRight, ExternalLink, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";
import { client } from "@/sanity/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries/siteSettings";

const NAV_LINKS = [
  { label: "The Treks",   href: "/treks"   },
  { label: "Our Story",   href: "/our-story" },
  { label: "Journal",     href: "/journal" },
  { label: "Enquire Now", href: "#enquire" },
]

interface SiteSettings {
  siteName?: string
  siteTagline?: string
  contactEmail?: string
  contactPhone?: string
  whatsappNumber?: string
  officeAddress?: string
  instagram?: string
  linkedin?: string
  facebook?: string
  youtube?: string
  x?: string
}

export default async function Footer() {
  const s: SiteSettings = await client.fetch(SITE_SETTINGS_QUERY) ?? {}

  const socials = [
    { label: "Instagram", url: s.instagram },
    { label: "LinkedIn",  url: s.linkedin  },
    { label: "Facebook",  url: s.facebook  },
    { label: "YouTube",   url: s.youtube   },
    { label: "X",         url: s.x         },
  ].filter(item => item.url)

  const hasContact = s.contactPhone || s.contactEmail || s.whatsappNumber || s.officeAddress

  return (
    <footer className="w-full border-t border-zinc-border bg-white pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 border-b border-zinc-border pb-24">

        {/* ── Col 1: Brand ── */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Mountain className="text-primary w-6 h-6" />
            <h1 className="text-lg font-black tracking-tighter uppercase">
              {s.siteName ?? "Yeti Expeditions"}
            </h1>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed">
            {s.siteTagline
              ? s.siteTagline
              : "Swiss-standard alpine logistics serving the Himalayan range since 2008. Dedicated to sustainable tourism and elite safety protocols."
            }
          </p>

          {/* Social links */}
          {socials.length > 0 && (
            <div className="pt-2 space-y-2">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Follow</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {socials.map(({ label, url }) => (
                  <a
                    key={label}
                    href={url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-colors group/soc"
                  >
                    {label}
                    <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover/soc:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Col 2: Navigation ── */}
        <div>
          <h6 className="text-xs font-black uppercase tracking-[0.2em] mb-8">Navigation</h6>
          <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-slate-400">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="hover:text-slate-900 transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Col 3: Contact ── */}
        <div>
          <h6 className="text-xs font-black uppercase tracking-[0.2em] mb-8">Contact</h6>
          {hasContact ? (
            <ul className="space-y-5">
              {s.contactPhone && (
                <li>
                  <a
                    href={`tel:${s.contactPhone.replace(/\s/g, '')}`}
                    className="flex items-start gap-3 group"
                  >
                    <Phone className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors leading-relaxed">
                      {s.contactPhone}
                    </span>
                  </a>
                </li>
              )}
              {s.whatsappNumber && (
                <li>
                  <a
                    href={`https://wa.me/${s.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 group"
                  >
                    <MessageCircle className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-primary transition-colors leading-relaxed">
                      WhatsApp Us
                    </span>
                  </a>
                </li>
              )}
              {s.contactEmail && (
                <li>
                  <a
                    href={`mailto:${s.contactEmail}`}
                    className="flex items-start gap-3 group"
                  >
                    <Mail className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors leading-relaxed break-all">
                      {s.contactEmail}
                    </span>
                  </a>
                </li>
              )}
              {s.officeAddress && (
                <li className="flex items-start gap-3">
                  <MapPin className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 leading-relaxed whitespace-pre-line">
                    {s.officeAddress}
                  </span>
                </li>
              )}
            </ul>
          ) : (
            <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-slate-400">
              <li>Kathmandu, Nepal</li>
              <li>Leh, Ladakh</li>
              <li>Thimphu, Bhutan</li>
            </ul>
          )}
        </div>

        {/* ── Col 4: Newsletter ── */}
        <div>
          <h6 className="text-xs font-black uppercase tracking-[0.2em] mb-8">Newsletter</h6>
          <div className="flex border-b border-slate-900 pb-2">
            <input
              className="bg-transparent border-none focus:ring-0 text-sm w-full p-0 outline-none"
              placeholder="Email Address"
              type="email"
            />
            <ArrowRight className="text-slate-900 w-5 h-5 shrink-0" />
          </div>
          <p className="text-[10px] text-slate-400 mt-4 uppercase tracking-widest">
            Receive dispatch updates from the field.
          </p>
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center mt-12 gap-6">
        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
          <Link href="/privacy-protocol" className="hover:text-slate-900 transition-colors">Privacy Protocol</Link>
          <Link href="/terms-of-ascent" className="hover:text-slate-900 transition-colors">Terms of Ascent</Link>
          <Link href="/cookie-policy" className="hover:text-slate-900 transition-colors">Cookie Policy</Link>
        </div>
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">
          © {new Date().getFullYear()} {s.siteName ?? "Yeti Expeditions"}. All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}
