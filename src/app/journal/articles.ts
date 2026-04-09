export type ArticleBlock =
    | { type: 'p'; text: string }
    | { type: 'h2'; text: string }
    | { type: 'quote'; text: string; attribution?: string }
    | { type: 'image'; src: string; caption: string }
    | { type: 'divider' };

export interface Article {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    tags: string[];
    author: string;
    authorTitle: string;
    date: string;
    readTime: string;
    featured: boolean;
    image: string;
    body: ArticleBlock[];
}

const IMG_A = "https://lh3.googleusercontent.com/aida-public/AB6AXuDiHbmYyYGaTh5ARUWejOA5l9Z7E5DgvlQurzssXYqn0QWZD3Vmnp0Cj5WP12qOqtqJU1vQ6mvGfuEpwLkmf2pow3oQBcKucJRSfaCc7L-shf9FL_gTbJ9TQJ2sV5dburhHwpyRWJv1vnefycut3Af6X2nvKG074F1q0eFM4If8D1zhCPLyAfuGfMcZbbkWtXDhizuVVPZEu6taWsO_X0iyCFOt3sgaH4WkSYb4YBgc8Zb3niHk_MC3ZJ1spQ1bTh2dvQbNEUX9oq4";
const IMG_B = "https://lh3.googleusercontent.com/aida/AOfcidW6Gc38U8OOYUBOpPfVS5VhIkLWJy9845TTSkVQPjHI-2pHux-WNn_tQ_bQYLQf0eTxUbO_TrjTbCOYT5_PAKoC6DNxKb_NMsyo365uR0bPBxgGgEX84fqaTV09W0zK6pmk-Ayw9R3QWgc-n7hOCE78UIUkEc_BGQ8uMs0rgMCaLWmUtyki6_E79F8143bh7crPfp8fwVWEukj5lhWaLEYFTqYCoWmjrDfRX7_fVLFSq-B3J3kOGvBygyE";

export const ARTICLES: Article[] = [
    {
        slug: "anatomy-of-acclimatisation",
        title: "The Anatomy of a Perfect Acclimatisation Day",
        excerpt: "Most trekkers treat rest days as wasted days. Our lead guide explains why the hours spent doing nothing above 4,000m are the most important of your entire expedition.",
        category: "Altitude Science",
        tags: ["Acclimatisation", "AMS", "High Altitude", "Safety"],
        author: "Lakpa Rita Sherpa",
        authorTitle: "Lead Expedition Guide · IFMGA Certified",
        date: "12 Mar 2025",
        readTime: "8 min read",
        featured: true,
        image: IMG_A,
        body: [
            { type: 'p', text: "Every season, without exception, I watch the same thing happen. A group arrives in Namche Bazaar, acclimatisation day scheduled, and within two hours someone is asking me when we can start moving again. They have flights booked. They have targets. They have paid for fourteen days and they intend to fill every one of them with forward progress." },
            { type: 'p', text: "This is the most dangerous attitude you can bring to altitude. Not fear — impatience." },
            { type: 'h2', text: "What Actually Happens at Altitude" },
            { type: 'p', text: "When you ascend above 3,000m, your body enters a physiological negotiation with its environment. The partial pressure of oxygen drops. Each breath delivers less O₂ to your bloodstream. Your body responds by increasing breathing rate, raising heart rate, and over the following 24–72 hours, beginning to produce more red blood cells." },
            { type: 'p', text: "That last part — the red blood cell production — is what takes time. You cannot rush it. No supplement, no breathing technique, no amount of fitness will accelerate the haematological adaptation your body needs to perform safely at 5,000m. The only currency is time." },
            { type: 'quote', text: "Fitness gets you to Base Camp. Patience gets you back down.", attribution: "Lakpa Rita Sherpa" },
            { type: 'h2', text: "The 24-Hour Rule" },
            { type: 'p', text: "Our standard protocol at Yeti is simple: for every 1,000m gained above 3,000m, we spend a minimum of one full rest day before ascending further. At Namche (3,440m), we rest. At Dingboche (4,360m), we rest. These are non-negotiable points in our itinerary — not suggestions." },
            { type: 'p', text: "On an acclimatisation day, we do conduct a short hike — typically 200–300m above the sleeping altitude. This is the 'climb high, sleep low' principle. The higher excursion stimulates adaptation; returning to sleep lower consolidates it. It is not a compromise. It is the protocol." },
            { type: 'image', src: IMG_B, caption: "Namche Bazaar at dawn — the acclimatisation hub of the Khumbu Valley." },
            { type: 'h2', text: "What Our Guides Watch For" },
            { type: 'p', text: "Twice daily — morning and evening — we check blood oxygen saturation and pulse rate. A SpO₂ reading below 80% at rest above 4,000m is a concern. Below 75% is an evacuation consideration. We also ask each trekker to score their sleep quality, appetite, and headache level on a simple 1–10 scale." },
            { type: 'p', text: "The Lake Louise Score — a standard AMS diagnostic tool — is administered every morning. If a trekker scores above 3, they do not ascend that day. This is non-negotiable. In sixteen years and over 6,200 trekkers, we have never lost a client to altitude sickness. These protocols are why." },
            { type: 'quote', text: "The mountain does not care about your schedule. It only cares whether you are ready.", attribution: "Dawa Gyalje Sherpa" },
            { type: 'h2', text: "The Right Mindset" },
            { type: 'p', text: "When a trekker tells me they feel fine and want to push on, I ask them one question: how do you know? You have never been here before. Your body has no frame of reference. The fact that you feel fine right now tells me nothing about how you will feel at 5,000m tomorrow." },
            { type: 'p', text: "A perfect acclimatisation day looks, from the outside, like nothing. You eat well. You drink three litres of water. You walk slowly for two hours. You sleep. You do not check your watch. And somewhere inside your circulatory system, quietly and without fanfare, your body is doing the most important work of the entire expedition." },
        ],
    },
    {
        slug: "khumbu-icefall-guide-perspective",
        title: "The Khumbu Icefall: A Guide's Perspective",
        excerpt: "Fourteen crossings. Each one different. Each one demanding complete presence. This is what the icefall actually looks like from the inside.",
        category: "Expedition Reports",
        tags: ["Khumbu", "Icefall", "Everest", "Technical Terrain"],
        author: "Lakpa Rita Sherpa",
        authorTitle: "Lead Expedition Guide · IFMGA Certified",
        date: "28 Feb 2025",
        readTime: "12 min read",
        featured: false,
        image: IMG_B,
        body: [
            { type: 'p', text: "The first time I crossed the Khumbu Icefall, I was nineteen years old. My uncle was leading the rope. He told me not to look up, not to look down, and not to slow down on the ladders. He said the icefall respects speed and punishes hesitation." },
            { type: 'p', text: "Twenty-six years later, I tell my clients exactly the same thing." },
            { type: 'h2', text: "What the Icefall Actually Is" },
            { type: 'p', text: "The Khumbu Icefall is a 600-metre section of glacier on the lower slopes of Everest that moves, on average, one metre per day. It is not stable. It does not sleep. The seracs — ice towers some the size of apartment buildings — calve without warning. The crevasses shift overnight. A route that was safe at 4am may be compromised by 9am as solar radiation weakens the ice." },
            { type: 'quote', text: "Every crossing is the first crossing. Familiarity is the thing most likely to kill you here.", attribution: "Lakpa Rita Sherpa" },
            { type: 'h2', text: "The Icefall Doctors" },
            { type: 'p', text: "What most expedition clients don't know is that a team called the Icefall Doctors — elite route-fixers employed collectively by expedition companies — rebuilds the route through the icefall every single season. They place the aluminium ladders across crevasses. They fix the ropes. They move the route around newly formed hazards." },
            { type: 'p', text: "These men work at 5,400–6,000m, often in the dark, for weeks before the climbing season opens. They are among the most skilled high-altitude workers on the planet and they are systematically underpaid and underacknowledged. When you cross the icefall safely, you are walking on their work." },
            { type: 'image', src: IMG_A, caption: "Fixed ropes and ladder crossings in the Khumbu Icefall — rebuilt every season by the Icefall Doctors." },
            { type: 'h2', text: "Fourteen Crossings" },
            { type: 'p', text: "My fourteenth crossing was in the spring of 2019. A serac the size of a house had calved overnight, 200 metres above the standard route. The Icefall Doctors had rerouted at 3am. We crossed in silence. Nobody spoke until we reached Camp I." },
            { type: 'p', text: "That is what the icefall demands. Not courage — awareness. The willingness to be completely, utterly present for every step of a two-hour crossing. The moment your mind drifts to what comes next, to whether you'll make the summit, to what you'll eat at Base Camp — that is the moment the mountain can take you." },
        ],
    },
    {
        slug: "vo2-max-altitude",
        title: "What Your VO₂ Max Actually Means at Altitude",
        excerpt: "A VO₂ max of 55 at sea level tells you very little about how you'll perform at 5,000m. Here's the science our guides use to assess trekker readiness.",
        category: "Altitude Science",
        tags: ["VO2 Max", "Physiology", "Fitness", "Altitude"],
        author: "Dawa Gyalje Sherpa",
        authorTitle: "High Altitude Specialist · WFR Certified",
        date: "14 Feb 2025",
        readTime: "6 min read",
        featured: false,
        image: IMG_A,
        body: [
            { type: 'p', text: "Clients arrive with their fitness tracker data and tell me their VO₂ max is 58. They want to know if that's good enough for Everest Base Camp. I tell them the same thing every time: it's a useful data point, and it tells me almost nothing about how you'll do above 4,000m." },
            { type: 'h2', text: "The Sea-Level Problem" },
            { type: 'p', text: "VO₂ max measures the maximum rate at which your body can consume oxygen during exercise — typically expressed in ml/kg/min. At sea level, where the air is dense and oxygen-rich, this number is meaningful. Elite endurance athletes sit at 70+. Fit recreational trekkers are typically 45–60." },
            { type: 'p', text: "At 5,000m, however, barometric pressure drops to roughly 54% of sea level. Every breath delivers approximately half the oxygen it would at the coast. Your effective VO₂ max — the amount of oxygen your body can actually use — drops by a similar proportion. A sea-level VO₂ max of 55 becomes, in practice, something closer to 30 at Everest Base Camp." },
            { type: 'quote', text: "Everyone becomes a beginner above 4,500m. The fittest trekker in the group is not immune to altitude sickness.", attribution: "Dawa Gyalje Sherpa" },
            { type: 'h2', text: "What We Actually Measure" },
            { type: 'p', text: "At Yeti, we track SpO₂ — blood oxygen saturation — as our primary physiological indicator on trek. A healthy adult at sea level sits at 95–100%. At Namche Bazaar (3,440m), 88–92% is normal. At Base Camp (5,364m), 80–85% is expected." },
            { type: 'p', text: "What matters is not the absolute number but the trend and the spread across the group. A trekker whose SpO₂ drops 10 points overnight while sleeping is a concern. A trekker who maintains 88% at 4,500m while another is at 78% — that difference is actionable. That is the data that drives our acclimatisation decisions." },
        ],
    },
    {
        slug: "12-week-ebc-training",
        title: "The 12-Week EBC Training Protocol",
        excerpt: "Not a generic fitness plan. This is the exact programme our guides recommend to clients who have 3 months to prepare for Everest Base Camp.",
        category: "Training",
        tags: ["Training", "EBC", "Preparation", "Fitness"],
        author: "Mingma Tshering",
        authorTitle: "Route & Safety Director · IFMGA / WFR",
        date: "01 Feb 2025",
        readTime: "10 min read",
        featured: false,
        image: IMG_B,
        body: [
            { type: 'p', text: "The question I receive more than any other from prospective clients is: how fit do I need to be? The honest answer is: fitter than you think, but differently fit than you expect." },
            { type: 'p', text: "EBC is not a technical climb. There are no crampons, no ropes, no vertical faces. But it is 14 days of sustained effort at progressive altitude, carrying a 6–8kg daypack, on uneven terrain, in variable weather. The physical demand is relentless and aerobic. This protocol addresses exactly that." },
            { type: 'h2', text: "Weeks 1–4: Building the Base" },
            { type: 'p', text: "The foundation is aerobic capacity. Four to five sessions per week: three runs or cycles, one long hike, one strength session. The long hike is non-negotiable and should be on actual hills if possible. Start at 2 hours with a light pack and build to 4 hours by week 4." },
            { type: 'p', text: "Strength work focuses on posterior chain — glutes, hamstrings, lower back — and single-leg stability. Step-ups, Romanian deadlifts, Bulgarian split squats. These are the muscles that protect your knees on steep descents after hours of climbing." },
            { type: 'quote', text: "The descent from Gorak Shep to Pheriche is what breaks people. Train your quads to brake, not just to push.", attribution: "Mingma Tshering" },
            { type: 'h2', text: "Weeks 5–8: Load Carrying" },
            { type: 'p', text: "Introduce your actual trekking pack. Start with 6kg and build to 10kg on the long weekend hikes. The goal is not just physical conditioning but neuromuscular adaptation — your body learning to balance and move efficiently under load on uneven ground." },
            { type: 'h2', text: "Weeks 9–12: Back-to-Back Days" },
            { type: 'p', text: "The most important adaptation EBC demands is the ability to perform on consecutive days of effort. Begin scheduling back-to-back long hikes on Saturday and Sunday — 4 hours each day, with a loaded pack. By week 12, you should be able to hike 5–6 hours on two consecutive days and feel tired but functional, not destroyed." },
            { type: 'image', src: IMG_A, caption: "Trail simulation training — loaded pack, elevation gain, consecutive days." },
        ],
    },
    {
        slug: "what-guides-actually-carry",
        title: "Gear Breakdown: What Our Guides Actually Carry",
        excerpt: "Forget the sponsored gear lists. We emptied Lakpa's summit pack and photographed every single item. This is what 25 years of high-altitude experience looks like in kit form.",
        category: "Gear & Kit",
        tags: ["Gear", "Equipment", "Packing", "Guides"],
        author: "Lakpa Rita Sherpa",
        authorTitle: "Lead Expedition Guide · IFMGA Certified",
        date: "18 Jan 2025",
        readTime: "7 min read",
        featured: false,
        image: IMG_A,
        body: [
            { type: 'p', text: "Everyone wants to know what gear the guides use. The assumption is that we have access to the best equipment, that we know something the sponsored athletes don't. The truth is simpler: after 25 years, you learn to carry less and choose better." },
            { type: 'h2', text: "The Pack Itself" },
            { type: 'p', text: "I carry a 28-litre daypack on trek. Not 40L, not 60L. Twenty-eight litres. In my experience, the size of the pack determines the volume of unnecessary items you carry. A smaller pack forces better decisions." },
            { type: 'h2', text: "Medical Kit" },
            { type: 'p', text: "This is where I carry the most. A pulse oximeter — always. Diamox, dexamethasone, and nifedipine for altitude emergencies. Aspirin. Blister kit. Compression bandages. SAM splint. Oral rehydration salts. The medical kit is the one area where I do not compromise on weight." },
            { type: 'quote', text: "Everything else in your pack is optional. The medical kit is not.", attribution: "Lakpa Rita Sherpa" },
            { type: 'h2', text: "Clothing System" },
            { type: 'p', text: "Three layers, always. A merino base layer that I have been wearing for eight years — it still works perfectly. A mid-layer fleece. A hardshell that I almost never use but carry everywhere above 4,000m because the weather changes in minutes. I do not carry a down jacket on trek unless we are going above 5,000m." },
            { type: 'h2', text: "Navigation & Communication" },
            { type: 'p', text: "A Garmin inReach satellite communicator is my most important piece of non-medical kit. Not for navigation — I know these trails. For emergency communication when the weather closes in and mobile signals disappear. If something goes wrong with a client, I need to reach Base Camp operations within minutes, not hours." },
        ],
    },
    {
        slug: "guide-kitchen-trail-food",
        title: "Inside the Guide Kitchen: What We Eat on the Trail",
        excerpt: "Dal bhat twice a day isn't tradition — it's performance nutrition. We break down the caloric science behind our guides' diet and why they eat the same meal every evening.",
        category: "Community",
        tags: ["Nutrition", "Mountain Culture", "Trail Food", "Community"],
        author: "Dawa Gyalje Sherpa",
        authorTitle: "High Altitude Specialist · WFR Certified",
        date: "05 Jan 2025",
        readTime: "5 min read",
        featured: false,
        image: IMG_B,
        body: [
            { type: 'p', text: "Clients ask me why I eat dal bhat every evening when there are pasta, pizza, and yak burgers on the teahouse menu. I tell them: because my grandfather ate dal bhat every evening, and he guided at altitude until he was 67 years old." },
            { type: 'h2', text: "The Nutritional Case" },
            { type: 'p', text: "Dal bhat — lentil soup served over rice with vegetable curry and pickles — delivers approximately 700–900 calories per serving. It provides complex carbohydrates for sustained energy, plant-based protein for muscle repair, and micronutrients from the vegetable sides. It is also, critically, easy to digest at altitude." },
            { type: 'p', text: "Above 4,000m, your digestive system slows. Rich, fatty, protein-heavy meals that your body handles easily at sea level become a burden at altitude. The gut requires more blood flow to digest complex proteins — blood that your body would rather route to your brain and muscles. Dal bhat sidesteps this problem entirely." },
            { type: 'quote', text: "The best trail food is the food your body already knows how to process. At altitude, familiar is fast.", attribution: "Dawa Gyalje Sherpa" },
            { type: 'h2', text: "What the Research Says" },
            { type: 'p', text: "A 2018 study on high-altitude guide physiology found that traditional Himalayan diets — high in complex carbohydrates, moderate in protein, low in saturated fat — correlate with better SpO₂ maintenance at altitude compared to Western high-protein diets. This is not surprising to anyone who has spent significant time in the Khumbu." },
            { type: 'p', text: "For our trekkers, we recommend adopting the dal bhat approach from Namche onwards. Not because it tastes better than pizza — it might not, depending on who you ask — but because it works. And at 4,500m, what works is the only thing that matters." },
        ],
    },
    {
        slug: "monsoon-trekking-case-for-it",
        title: "Monsoon Trekking: The Case for Going Against the Season",
        excerpt: "Every serious guide has a secret: the trails are empty in July. We make the case for monsoon trekking in Ladakh — and explain exactly why the risks are overstated.",
        category: "Expedition Reports",
        tags: ["Monsoon", "Ladakh", "Off-Season", "Markha Valley"],
        author: "Mingma Tshering",
        authorTitle: "Route & Safety Director · IFMGA / WFR",
        date: "22 Dec 2024",
        readTime: "9 min read",
        featured: false,
        image: IMG_A,
        body: [
            { type: 'p', text: "In July, the trail to Everest Base Camp is a queue. Teahouses are full. Prices double. The path itself — worn to a motorway by a century of expeditions — is crowded with people who have come to say they were there." },
            { type: 'p', text: "In July, the Markha Valley in Ladakh is empty. The sky is blue — Ladakh sits in a rain shadow that the monsoon cannot penetrate. The wildflowers are out. The river crossings are higher, yes, but manageable with the right guide. And you will share a campsite with no one." },
            { type: 'h2', text: "Why People Avoid It" },
            { type: 'p', text: "The word 'monsoon' triggers avoidance. It implies wet, grey, miserable. For most of India and Nepal, this is accurate — the monsoon delivers significant rainfall from June to September and makes trail conditions genuinely difficult." },
            { type: 'p', text: "Ladakh is the exception. The Trans-Himalayan region sits north of the main Himalayan range, geographically shielded from the Bay of Bengal moisture system that drives the Indian monsoon. Annual rainfall in Leh is approximately 100mm — drier than London." },
            { type: 'quote', text: "The monsoon is not one thing. It is a system. And some of the best trekking on the planet sits outside it.", attribution: "Mingma Tshering" },
            { type: 'h2', text: "The Real Risks" },
            { type: 'p', text: "I am not telling you monsoon Ladakh is risk-free. River crossings on the Markha are significantly higher in July and August due to glacial melt combined with any residual precipitation. Flash flooding in side valleys is possible. Road access to trailheads can be disrupted." },
            { type: 'p', text: "These are real risks, managed by experience and preparation. We have run Markha Valley expeditions in July and August for eleven consecutive years without serious incident. The key is flexible itinerary design, satellite communication, and guides who know when to wait and when to move." },
            { type: 'image', src: IMG_B, caption: "Markha Valley in high summer — empty trails and peak wildflower bloom." },
        ],
    },
];
