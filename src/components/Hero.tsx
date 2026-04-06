import Link from "next/link";

const IMAGE_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuDiHbmYyYGaTh5ARUWejOA5l9Z7E5DgvlQurzssXYqn0QWZD3Vmnp0Cj5WP12qOqtqJU1vQ6mvGfuEpwLkmf2pow3oQBcKucJRSfaCc7L-shf9FL_gTbJ9TQJ2sV5dburhHwpyRWJv1vnefycut3Af6X2nvKG074F1q0eFM4If8D1zhCPLyAfuGfMcZbbkWtXDhizuVVPZEu6taWsO_X0iyCFOt3sgaH4WkSYb4YBgc8Zb3niHk_MC3ZJ1spQ1bTh2dvQbNEUX9oq4";

export default function Hero() {
    return (
        <>
            <section className="w-full border-b border-zinc-border">
                <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row min-h-[80vh]">
                    {/* Left Content — full viewport height on mobile, half width on desktop */}
                    <div className="w-full md:w-1/2 flex flex-col justify-between md:justify-center min-h-[calc(100vh-60px)] md:min-h-0 px-6 pt-24 pb-16 md:p-24 border-b md:border-b-0 md:border-r border-zinc-border">
                        {/* Top group: badge + headline + paragraph + CTA */}
                        <div className="space-y-5 md:space-y-8">
                            <span className="inline-block bg-primary text-white px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] w-fit">
                                High Altitude Logistics
                            </span>
                            <h2 className="text-[15vw] md:text-8xl font-black md:leading-[.88] leading-[1.1] tracking-tighter text-slate-900 md:pt-0 uppercase">
                                <span className="text-[90px]">Safety.</span><br />Comfort.<br />The Himalayas.
                            </h2>
                            <p className="text-[20px] italic md:text-lg text-slate-600 leading-relaxed">
                                Experience the world&apos;s highest peaks with highly qualified guides and unmatched safety standards.
                            </p>
                            <Link href="/trek/everest-base-camp" className="inline-block md:w-auto text-center bg-slate-900 text-white px-8 py-4 md:px-10 md:py-4 text-xs md:text-sm font-bold uppercase tracking-[0.2em] hover:bg-primary transition-colors">
                                View Expeditions
                            </Link>
                        </div>
                        {/* Spacer — pushes content group toward top on mobile */}
                        <div />
                    </div>

                    {/* Right Image — desktop only */}
                    <div className="hidden md:block md:w-1/2 bg-slate-100 relative overflow-hidden group">
                        <div
                            className="absolute inset-0 bg-cover bg-center grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                            style={{ backgroundImage: `url('${IMAGE_URL}')` }}
                        />
                        <div className="absolute bottom-10 left-10 border-l-4 border-primary pl-4">
                            <p className="text-white text-xs font-bold uppercase tracking-widest">Mount Everest Base Camp</p>
                            <p className="text-white/70 text-[10px] uppercase">Coordinates: 28.0026° N, 86.8528° E</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile-only image — appears below hero on scroll */}
            <div className="md:hidden relative w-full h-[60vw] bg-slate-100 overflow-hidden border-b border-zinc-border">
                <div
                    className="absolute inset-0 bg-cover bg-center grayscale contrast-125"
                    style={{ backgroundImage: `url('${IMAGE_URL}')` }}
                />
                <div className="absolute bottom-6 left-6 border-l-4 border-primary pl-4">
                    <p className="text-white text-xs font-bold uppercase tracking-widest">Mount Everest Base Camp</p>
                    <p className="text-white/70 text-[10px] uppercase">Coordinates: 28.0026° N, 86.8528° E</p>
                </div>
            </div>
        </>
    );
}
