interface TrustStat {
  _key: string
  label: string
  value: string
  description: string
}

const FALLBACK: TrustStat[] = [
  { _key: 'tm01', label: 'Guide Ratio',   value: '1:4',   description: 'Industry leading safety supervision for every trekker.' },
  { _key: 'tm02', label: 'Certification', value: 'WFR',   description: 'Wilderness First Responder certified lead guides.' },
  { _key: 'tm03', label: 'Group Limit',   value: 'MAX 8', description: 'Small groups ensure personalized care and flexibility.' },
  { _key: 'tm04', label: 'Experience',    value: '15YR+', description: 'Decades of navigating the world\'s most difficult terrain.' },
]

export default function TrustMatrix({ data }: { data?: TrustStat[] }) {
  const items = data?.length ? data : FALLBACK

  return (
    <section className="w-full border-b border-zinc-border bg-slate-50">
      <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4">
        {items.map((item, index) => (
          <div
            key={item._key}
            className={`p-6 md:p-12 flex flex-col gap-3 group hover:bg-white transition-colors border-zinc-border ${
              index === 0 ? "border-r border-b md:border-b-0" :
              index === 1 ? "border-b md:border-b-0 md:border-r" :
              index === 2 ? "border-r" : ""
            }`}
          >
            <span className="text-primary font-bold uppercase text-[10px] md:text-xs tracking-widest">{item.label}</span>
            <span className="text-4xl md:text-6xl font-black tracking-tighter">{item.value}</span>
            <p className="text-xs md:text-sm text-slate-500 leading-tight">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
