'use client';

import { urlFor } from "@/sanity/image";

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative overflow-hidden border-b border-zinc-border" style={{ height: '280px' }}>
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover grayscale brightness-90 contrast-110 group-hover:grayscale-0 transition-all duration-700"
      />
    </div>
  );
}

interface Project {
  _key: string
  visible?: boolean
  category: string
  name: string
  tagline: string
  description: string
  stat: string
  statSub: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any
  ctaText: string
  ctaUrl?: string
}

interface SpecialProjectsData {
  sectionTagline?: string
  sectionHeading?: string
  sectionDescription?: string
  footerNote?: string
  projects?: Project[]
}

const FALLBACK_PROJECTS: Project[] = [
  {
    _key: 'sp01',
    category: 'Education',
    name: 'Schools Above The Clouds',
    tagline: 'Learning at altitude.',
    description: 'Partnering with local mountain communities to fund and construct classrooms in villages above 3,500m — places where children walk four hours each way just to learn. Every expedition booking contributes directly to this fund.',
    stat: '14 Schools Built',
    statSub: 'across the Khumbu & Annapurna regions',
    ctaText: 'Learn More',
    ctaUrl: '#',
  },
  {
    _key: 'sp02',
    category: 'Environment',
    name: 'Zero Trace Initiative',
    tagline: 'The mountain gives. We give back.',
    description: 'Our guides lead seasonal clean-up expeditions on the most heavily trafficked routes. We have removed over 4,200kg of waste from the Everest corridor alone since 2016 — oxygen canisters, abandoned tents, and years of negligence.',
    stat: '4,200 kg Removed',
    statSub: 'from Himalayan trails since 2016',
    ctaText: 'Learn More',
    ctaUrl: '#',
  },
  {
    _key: 'sp03',
    category: 'Community',
    name: 'Guide Legacy Fund',
    tagline: 'Honouring those who carry us up.',
    description: 'High-altitude guiding is one of the most dangerous professions on earth. Our legacy fund provides long-term healthcare, accident insurance, and higher-education scholarships for the families of every guide and porter we work with.',
    stat: '320+ Families',
    statSub: 'supported through the legacy fund',
    ctaText: 'Learn More',
    ctaUrl: '#',
  },
]

const FALLBACK_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDiHbmYyYGaTh5ARUWejOA5l9Z7E5DgvlQurzssXYqn0QWZD3Vmnp0Cj5WP12qOqtqJU1vQ6mvGfuEpwLkmf2pow3oQBcKucJRSfaCc7L-shf9FL_gTbJ9TQJ2sV5dburhHwpyRWJv1vnefycut3Af6X2nvKG074F1q0eFM4If8D1zhCPLyAfuGfMcZbbkWtXDhizuVVPZEu6taWsO_X0iyCFOt3sgaH4WkSYb4YBgc8Zb3niHk_MC3ZJ1spQ1bTh2dvQbNEUX9oq4",
  "https://lh3.googleusercontent.com/aida/AOfcidW6Gc38U8OOYUBOpPfVS5VhIkLWJy9845TTSkVQPjHI-2pHux-WNn_tQ_bQYLQf0eTxUbO_TrjTbCOYT5_PAKoC6DNxKb_NMsyo365uR0bPBxgGgEX84fqaTV09W0zK6pmk-Ayw9R3QWgc-n7hOCE78UIUkEc_BGQ8uMs0rgMCaLWmUtyki6_E79F8143bh7crPfp8fwVWEukj5lhWaLEYFTqYCoWmjrDfRX7_fVLFSq-B3J3kOGvBygyE",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDiHbmYyYGaTh5ARUWejOA5l9Z7E5DgvlQurzssXYqn0QWZD3Vmnp0Cj5WP12qOqtqJU1vQ6mvGfuEpwLkmf2pow3oQBcKucJRSfaCc7L-shf9FL_gTbJ9TQJ2sV5dburhHwpyRWJv1vnefycut3Af6X2nvKG074F1q0eFM4If8D1zhCPLyAfuGfMcZbbkWtXDhizuVVPZEu6taWsO_X0iyCFOt3sgaH4WkSYb4YBgc8Zb3niHk_MC3ZJ1spQ1bTh2dvQbNEUX9oq4",
]

export default function SpecialProjects({ data }: { data?: SpecialProjectsData }) {
  const tagline = data?.sectionTagline ?? 'Beyond The Trek'
  const heading = data?.sectionHeading ?? 'Our Special Projects'
  const description = data?.sectionDescription ?? 'We believe the mountains demand more than technical skill. They demand responsibility — to the land, the communities, and the people who live among them.'
  const footerNote = data?.footerNote ?? '1% of every expedition fee is directed to our special projects fund.'
  const allProjects = data?.projects?.length ? data.projects : FALLBACK_PROJECTS
  const projects = allProjects.filter(p => p.visible !== false)

  return (
    <section className="w-full border-t border-zinc-border bg-white">
      <div className="max-w-[1440px] mx-auto">

        {/* Section Header */}
        <div className="px-6 md:px-12 py-16 border-b border-zinc-border flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-3">
              {tagline}
            </span>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">
              {heading.includes(' ') ? (
                <>
                  {heading.split(' ').slice(0, 2).join(' ')}
                  <br />
                  <span className="text-slate-300">{heading.split(' ').slice(2).join(' ')}</span>
                </>
              ) : heading}
            </h2>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed max-w-sm md:text-right">
            {description}
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-border">
          {projects.map((project, i) => {
            const imageUrl = project.image
              ? urlFor(project.image).width(800).url()
              : FALLBACK_IMAGES[i] ?? FALLBACK_IMAGES[0]

            return (
              <div key={project._key} className="flex flex-col group hover:bg-slate-50 transition-colors">
                {/* Image */}
                <div className="relative">
                  <ProjectImage src={imageUrl} alt={project.name} />
                  <span className="absolute bottom-4 left-4 text-[9px] font-black uppercase tracking-[0.3em] text-white/70 pointer-events-none">
                    {project.category}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-slate-200 text-4xl font-black tracking-tighter transition-colors group-hover:text-primary/20">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary border border-primary/30 px-3 py-1">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tighter leading-tight mb-1">{project.name}</h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">{project.tagline}</p>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1 mb-4">{project.description}</p>
                  <div className="border-t border-zinc-border pt-4">
                    <p className="text-xl font-black tracking-tighter" style={{ color: '#f4632eff' }}>{project.stat}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">{project.statSub}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-border px-6 md:px-12 py-6">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest">{footerNote}</p>
        </div>

      </div>
    </section>
  )
}
