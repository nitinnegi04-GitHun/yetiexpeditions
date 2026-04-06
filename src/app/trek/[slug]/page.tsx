import { notFound } from "next/navigation";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrekDetails from "@/components/TrekDetails";

const BASE_URL = "https://www.yetiexpeditions.com";

const TREKS_DATA: Record<string, any> = {
    "everest-base-camp": {
        name: "Everest Base Camp",
        difficulty: "Moderate",
        duration: "14 Days",
        investment: "$3,400",
        altitude: "5,364m",
        season: "MAR-MAY",
        accommodation: "TEAHOUSE",
        groupSize: "MAX 08",
        bannerImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDiHbmYyYGaTh5ARUWejOA5l9Z7E5DgvlQurzssXYqn0QWZD3Vmnp0Cj5WP12qOqtqJU1vQ6mvGfuEpwLkmf2pow3oQBcKucJRSfaCc7L-shf9FL_gTbJ9TQJ2sV5dburhHwpyRWJv1vnefycut3Af6X2nvKG074F1q0eFM4If8D1zhCPLyAfuGfMcZbbkWtXDhizuVVPZEu6taWsO_X0iyCFOt3sgaH4WkSYb4YBgc8Zb3niHk_MC3ZJ1spQ1bTh2dvQbNEUX9oq4",
        itinerary: [
            {
                day: "01",
                title: "Kathmandu Arrival",
                content: "Arrival at Tribhuvan International Airport. Gear check and expedition briefing at the hotel. Final permits processing."
            },
            {
                day: "02",
                title: "Fly to Lukla / Trek to Phakding",
                content: "A scenic 35-minute mountain flight to Lukla (2,860m). Begin the 3-hour trek descending to the Dudh Koshi River and Phakding."
            },
            {
                day: "03",
                title: "Namche Bazaar Ascent",
                content: "Steep climb into the heart of Sherpa culture. Enter Sagarmatha National Park and cross high suspension bridges."
            },
            {
                day: "04",
                title: "Namche Acclimatisation",
                content: "Rest day at Namche (3,440m). Optional hike to Everest View Hotel for first sightings of Everest. SpO2 monitoring begins."
            },
            {
                day: "05",
                title: "Tengboche Monastery",
                content: "Trek through rhododendron forests to Tengboche (3,860m). Visit the famous monastery with Ama Dablam towering above."
            },
            {
                day: "06",
                title: "Dingboche",
                content: "Ascend through the Imja Valley to Dingboche (4,360m). First views of Lhotse's south face and Island Peak."
            },
            {
                day: "07",
                title: "Dingboche Acclimatisation",
                content: "Second acclimatisation day. Hike to Nagarjun Hill (5,100m) for panoramic Himalayan views. Return to Dingboche."
            },
            {
                day: "08",
                title: "Lobuche",
                content: "Trek via Dughla Pass and the memorials to lost climbers. Continue to Lobuche (4,940m)."
            },
            {
                day: "09",
                title: "Everest Base Camp",
                content: "The summit day. Trek to Gorak Shep (5,164m), drop packs, and continue to Everest Base Camp (5,364m). Return to Gorak Shep for overnight."
            },
            {
                day: "10",
                title: "Kala Patthar Sunrise",
                content: "Pre-dawn ascent of Kala Patthar (5,545m) for the most famous sunrise view of Everest. Descend to Pheriche."
            },
            {
                day: "11",
                title: "Namche Bazaar",
                content: "Long descent through familiar terrain. The body recovers quickly below 4,000m. Celebratory dinner in Namche."
            },
            {
                day: "12",
                title: "Lukla",
                content: "Final day of trekking. Reach Lukla and stay the night ready for your morning flight."
            },
            {
                day: "13",
                title: "Fly to Kathmandu",
                content: "Morning flight back to Kathmandu. Afternoon free for shopping or sightseeing. Expedition debrief dinner."
            },
            {
                day: "14",
                title: "Departure",
                content: "Transfer to the airport. Safe travels — you've stood at the foot of the world's highest mountain."
            }
        ],
        batches: [
            { date: "15 MAR - 28 MAR 2025", status: "Open", remaining: 5 },
            { date: "05 APR - 18 APR 2025", status: "Limited", remaining: 2 },
            { date: "12 MAY - 25 MAY 2025", status: "Open", remaining: 8 }
        ],
        included: [
            "Airport transfers (arrival & departure)",
            "Domestic flights Kathmandu–Lukla–Kathmandu",
            "All accommodation (teahouse/hotel)",
            "All meals during trek (breakfast, lunch, dinner)",
            "Experienced WFR-certified lead guide",
            "1 porter per 2 trekkers",
            "Sagarmatha National Park permit",
            "TIMS card",
            "Khumbu municipality conservation fee",
            "Emergency evacuation insurance",
            "Pulse oximeter & first aid kit"
        ],
        excluded: [
            "International flights to/from Nepal",
            "Nepal visa fees (~$50 USD)",
            "Personal travel insurance (mandatory)",
            "Personal trekking gear & clothing",
            "Tips for guide & porter",
            "Alcoholic beverages & soft drinks",
            "Hot showers & device charging fees",
            "Personal expenses & souvenirs"
        ],
        altitudeProfile: [
            { day: 1, label: "KTM", altitude: 1400 },
            { day: 2, label: "Lukla", altitude: 2860 },
            { day: 3, label: "Namche", altitude: 3440 },
            { day: 5, label: "Tengboche", altitude: 3860 },
            { day: 6, label: "Dingboche", altitude: 4360 },
            { day: 8, label: "Lobuche", altitude: 4940 },
            { day: 9, label: "EBC", altitude: 5364 },
            { day: 10, label: "KalaPatar", altitude: 5545 },
            { day: 11, label: "Namche", altitude: 3440 },
            { day: 12, label: "Lukla", altitude: 2860 },
            { day: 13, label: "KTM", altitude: 1400 }
        ],
        packingList: {
            "Clothing": [
                "Moisture-wicking base layers (×3)",
                "Fleece mid-layer jacket",
                "Down jacket (−20°C rated)",
                "Waterproof shell jacket & trousers",
                "Trekking trousers (×2)",
                "Thermal underwear (top & bottom)",
                "Wool/synthetic trekking socks (×5 pairs)",
                "Sun hat & warm beanie",
                "Balaclava",
                "Lightweight gloves + expedition mitts"
            ],
            "Footwear": [
                "Waterproof trekking boots (broken in)",
                "Camp sandals or lightweight shoes",
                "Gaiters"
            ],
            "Equipment": [
                "60–70L main trekking backpack",
                "20–30L day pack",
                "Trekking poles (collapsible)",
                "Sleeping bag (−15°C rated)",
                "Headlamp + spare batteries",
                "UV400 glacier sunglasses",
                "1L water bottles (×2)",
                "Water purification tablets / filter"
            ],
            "Medical": [
                "Altitude sickness medication (Diamox)",
                "Blister treatment kit",
                "Ibuprofen & paracetamol",
                "Oral rehydration salts",
                "Sunscreen SPF 50+",
                "Lip balm (high protection)",
                "Prescription medications"
            ]
        },
        physicalPrep: [
            {
                weeks: "16+ Weeks Out",
                focus: "Base Aerobic Fitness",
                description: "Build your aerobic base with 4–5 cardio sessions per week. Begin weekend hikes with a light daypack on varied terrain."
            },
            {
                weeks: "12 Weeks Out",
                focus: "Endurance Building",
                description: "Increase hike duration to 5–6 hours. Introduce stair climbing and hill repeats. Target 40km+ weekly activity."
            },
            {
                weeks: "8 Weeks Out",
                focus: "Load Carrying",
                description: "Progress to hiking with an 8–10kg pack. Practice back-to-back hiking days to simulate multi-day fatigue."
            },
            {
                weeks: "4 Weeks Out",
                focus: "Final Preparation",
                description: "Taper intensity. Finalize your kit, fully break in your boots. Prioritize sleep quality and nutrition."
            }
        ],
        testimonials: [
            {
                name: "Sarah M.",
                location: "London, UK",
                rating: 5,
                text: "The guides were exceptional. Their attention to safety and wellbeing made what could have been a daunting experience feel completely manageable. Summit day was life-changing.",
                batch: "EBC — March 2024"
            },
            {
                name: "James K.",
                location: "Sydney, AU",
                rating: 5,
                text: "Meticulous planning, zero compromises on safety. The acclimatisation schedule was perfectly paced. I'd done Kilimanjaro before — this was a different level of professionalism.",
                batch: "EBC — April 2023"
            },
            {
                name: "Priya R.",
                location: "Mumbai, IN",
                rating: 5,
                text: "First time above 5,000m. The twice-daily oximetry checks gave me real confidence. The teahouses were basic but warm, and the views are simply incomprehensible.",
                batch: "EBC — October 2023"
            }
        ],
        gallery: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDiHbmYyYGaTh5ARUWejOA5l9Z7E5DgvlQurzssXYqn0QWZD3Vmnp0Cj5WP12qOqtqJU1vQ6mvGfuEpwLkmf2pow3oQBcKucJRSfaCc7L-shf9FL_gTbJ9TQJ2sV5dburhHwpyRWJv1vnefycut3Af6X2nvKG074F1q0eFM4If8D1zhCPLyAfuGfMcZbbkWtXDhizuVVPZEu6taWsO_X0iyCFOt3sgaH4WkSYb4YBgc8Zb3niHk_MC3ZJ1spQ1bTh2dvQbNEUX9oq4",
            "https://lh3.googleusercontent.com/aida/AOfcidW6Gc38U8OOYUBOpPfVS5VhIkLWJy9845TTSkVQPjHI-2pHux-WNn_tQ_bQYLQf0eTxUbO_TrjTbCOYT5_PAKoC6DNxKb_NMsyo365uR0bPBxgGgEX84fqaTV09W0zK6pmk-Ayw9R3QWgc-n7hOCE78UIUkEc_BGQ8uMs0rgMCaLWmUtyki6_E79F8143bh7crPfp8fwVWEukj5lhWaLEYFTqYCoWmjrDfRX7_fVLFSq-B3J3kOGvBygyE",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDiHbmYyYGaTh5ARUWejOA5l9Z7E5DgvlQurzssXYqn0QWZD3Vmnp0Cj5WP12qOqtqJU1vQ6mvGfuEpwLkmf2pow3oQBcKucJRSfaCc7L-shf9FL_gTbJ9TQJ2sV5dburhHwpyRWJv1vnefycut3Af6X2nvKG074F1q0eFM4If8D1zhCPLyAfuGfMcZbbkWtXDhizuVVPZEu6taWsO_X0iyCFOt3sgaH4WkSYb4YBgc8Zb3niHk_MC3ZJ1spQ1bTh2dvQbNEUX9oq4",
            "https://lh3.googleusercontent.com/aida/AOfcidW6Gc38U8OOYUBOpPfVS5VhIkLWJy9845TTSkVQPjHI-2pHux-WNn_tQ_bQYLQf0eTxUbO_TrjTbCOYT5_PAKoC6DNxKb_NMsyo365uR0bPBxgGgEX84fqaTV09W0zK6pmk-Ayw9R3QWgc-n7hOCE78UIUkEc_BGQ8uMs0rgMCaLWmUtyki6_E79F8143bh7crPfp8fwVWEukj5lhWaLEYFTqYCoWmjrDfRX7_fVLFSq-B3J3kOGvBygyE",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDiHbmYyYGaTh5ARUWejOA5l9Z7E5DgvlQurzssXYqn0QWZD3Vmnp0Cj5WP12qOqtqJU1vQ6mvGfuEpwLkmf2pow3oQBcKucJRSfaCc7L-shf9FL_gTbJ9TQJ2sV5dburhHwpyRWJv1vnefycut3Af6X2nvKG074F1q0eFM4If8D1zhCPLyAfuGfMcZbbkWtXDhizuVVPZEu6taWsO_X0iyCFOt3sgaH4WkSYb4YBgc8Zb3niHk_MC3ZJ1spQ1bTh2dvQbNEUX9oq4",
            "https://lh3.googleusercontent.com/aida/AOfcidW6Gc38U8OOYUBOpPfVS5VhIkLWJy9845TTSkVQPjHI-2pHux-WNn_tQ_bQYLQf0eTxUbO_TrjTbCOYT5_PAKoC6DNxKb_NMsyo365uR0bPBxgGgEX84fqaTV09W0zK6pmk-Ayw9R3QWgc-n7hOCE78UIUkEc_BGQ8uMs0rgMCaLWmUtyki6_E79F8143bh7crPfp8fwVWEukj5lhWaLEYFTqYCoWmjrDfRX7_fVLFSq-B3J3kOGvBygyE"
        ],
        gettingThere: {
            arrival: "Fly into Tribhuvan International Airport (KTM), Kathmandu. Yeti Expeditions arranges airport pick-up. Hotel check-in and full gear check on Day 1.",
            visa: "Nepal visa on arrival for most nationalities. 15-day: $30 USD, 30-day: $50 USD. Bring 2 passport photos and cash. Obtain at KTM airport immigration on arrival.",
            domesticFlight: "A 35-minute scenic mountain flight from Kathmandu to Lukla (Tenzing-Hillary Airport, 2,860m). Flights are weather-dependent — early morning departures recommended."
        },
        accommodationDetails: [
            { location: "Kathmandu", type: "3-Star Hotel", nights: 2, notes: "En-suite bathroom, WiFi, hot water, Western meals available" },
            { location: "Phakding → Namche", type: "Teahouse", nights: 2, notes: "Twin-share rooms, squat toilets, basic Nepali meals" },
            { location: "Namche Bazaar", type: "Teahouse (Premium)", nights: 2, notes: "Best available rooms, charging facilities, hot showers" },
            { location: "Tengboche → Dingboche", type: "Teahouse", nights: 3, notes: "Cold rooms, electric blankets available, solar-heated water" },
            { location: "Lobuche → Gorak Shep", type: "Basic Teahouse", nights: 2, notes: "Most basic on route, limited menus at altitude" }
        ],
        permits: [
            {
                name: "Sagarmatha National Park Entry Permit",
                cost: "$30 USD",
                handledBy: "Yeti Expeditions",
                notes: "Required for all trekkers entering the park. Included in your trek fee."
            },
            {
                name: "TIMS Card",
                cost: "$20 USD",
                handledBy: "Yeti Expeditions",
                notes: "Trekkers' Information Management System card. Mandatory for all foreign trekkers. Included in your trek fee."
            },
            {
                name: "Khumbu Pasang Lhamu Municipality Fee",
                cost: "$10 USD",
                handledBy: "Yeti Expeditions",
                notes: "Local conservation and infrastructure fee collected at the trailhead. Included in your trek fee."
            }
        ],
        faqs: [
            {
                question: "What is the cancellation policy?",
                answer: "Full refund up to 60 days before departure. 50% refund between 30–60 days. No refund within 30 days of departure. We strongly recommend comprehensive travel insurance covering cancellation."
            },
            {
                question: "What fitness level is required?",
                answer: "You should be able to hike 6–8 hours daily carrying a 5–8kg daypack on uneven terrain. Strong aerobic fitness is essential. Prior high-altitude experience is beneficial but not mandatory — our pacing and acclimatisation protocols are designed for first-timers."
            },
            {
                question: "Is altitude sickness a serious concern?",
                answer: "Acute Mountain Sickness (AMS) is a real risk above 3,000m. Our itinerary is built with acclimatisation days at Namche and Dingboche. Guides perform twice-daily SpO2 and pulse checks. Diamox is carried on all trips and full evacuation protocols are active throughout."
            },
            {
                question: "What is the minimum age?",
                answer: "Minimum age is 16 years with parental consent. There is no upper age limit — we have guided trekkers in their 70s successfully. All participants undergo individual fitness assessment regardless of age."
            },
            {
                question: "Can I join as a solo traveller?",
                answer: "Absolutely. The majority of our groups are solo travellers who have joined a scheduled batch. Groups are capped at 8 to ensure quality and personal attention for everyone."
            },
            {
                question: "What if the Lukla flight is delayed by weather?",
                answer: "Weather delays at Tenzing-Hillary Airport are common, particularly in spring. We build buffer days into the itinerary. If extended delays are unavoidable, contingency plans including helicopter transfer are activated at additional cost."
            }
        ],
        relatedTreks: [
            { name: "Annapurna Circuit", slug: "annapurna-circuit", duration: "18 Days", altitude: "5,416m" }
        ]
    },
    "annapurna-circuit": {
        name: "Annapurna Circuit",
        difficulty: "Moderate",
        duration: "18 Days",
        investment: "$3,100",
        altitude: "5,416m",
        season: "OCT-DEC",
        accommodation: "LODGE",
        groupSize: "MAX 10",
        bannerImage: "https://lh3.googleusercontent.com/aida/AOfcidW6Gc38U8OOYUBOpPfVS5VhIkLWJy9845TTSkVQPjHI-2pHux-WNn_tQ_bQYLQf0eTxUbO_TrjTbCOYT5_PAKoC6DNxKb_NMsyo365uR0bPBxgGgEX84fqaTV09W0zK6pmk-Ayw9R3QWgc-n7hOCE78UIUkEc_BGQ8uMs0rgMCaLWmUtyki6_E79F8143bh7crPfp8fwVWEukj5lhWaLEYFTqYCoWmjrDfRX7_fVLFSq-B3J3kOGvBygyE",
        itinerary: [
            { day: "01", title: "Arrival in Kathmandu", content: "Transfer to your hotel and evening briefing." },
            { day: "02", title: "Drive to Syange", content: "Scenic drive through the hills of Nepal to the trek start point." }
        ],
        batches: [
            { date: "10 OCT - 28 OCT 2025", status: "Open", remaining: 10 }
        ],
        included: [
            "Airport transfers (arrival & departure)",
            "All accommodation (lodge)",
            "All meals during trek (breakfast, lunch, dinner)",
            "Experienced WFR-certified lead guide",
            "1 porter per 2 trekkers",
            "Annapurna Conservation Area Permit (ACAP)",
            "TIMS card",
            "Emergency evacuation insurance",
            "Pulse oximeter & first aid kit"
        ],
        excluded: [
            "International flights to/from Nepal",
            "Nepal visa fees (~$50 USD)",
            "Personal travel insurance (mandatory)",
            "Personal trekking gear & clothing",
            "Tips for guide & porter",
            "Alcoholic beverages & soft drinks",
            "Personal expenses & souvenirs"
        ],
        altitudeProfile: [
            { day: 1, label: "KTM", altitude: 1400 },
            { day: 2, label: "Syange", altitude: 1100 },
            { day: 4, label: "Chame", altitude: 2670 },
            { day: 6, label: "Manang", altitude: 3519 },
            { day: 8, label: "High Camp", altitude: 4850 },
            { day: 9, label: "Thorong La", altitude: 5416 },
            { day: 10, label: "Muktinath", altitude: 3760 },
            { day: 13, label: "Tatopani", altitude: 1190 },
            { day: 16, label: "Nayapul", altitude: 1070 },
            { day: 17, label: "Pokhara", altitude: 820 },
            { day: 18, label: "KTM", altitude: 1400 }
        ],
        packingList: {
            "Clothing": [
                "Moisture-wicking base layers (×3)",
                "Fleece mid-layer jacket",
                "Down jacket (−15°C rated)",
                "Waterproof shell jacket & trousers",
                "Trekking trousers (×2)",
                "Thermal underwear",
                "Trekking socks (×5 pairs)",
                "Sun hat & warm beanie",
                "Lightweight gloves"
            ],
            "Footwear": [
                "Waterproof trekking boots (broken in)",
                "Camp sandals",
                "Gaiters"
            ],
            "Equipment": [
                "60–70L main trekking backpack",
                "20–30L day pack",
                "Trekking poles",
                "Sleeping bag (−10°C rated)",
                "Headlamp + spare batteries",
                "UV400 sunglasses",
                "Water bottles (×2)",
                "Water purification tablets"
            ],
            "Medical": [
                "Altitude sickness medication (Diamox)",
                "Blister treatment kit",
                "Ibuprofen & paracetamol",
                "Oral rehydration salts",
                "Sunscreen SPF 50+",
                "Prescription medications"
            ]
        },
        physicalPrep: [
            {
                weeks: "16+ Weeks Out",
                focus: "Base Aerobic Fitness",
                description: "Build your aerobic base with 4–5 cardio sessions per week. Begin weekend hikes on varied terrain."
            },
            {
                weeks: "12 Weeks Out",
                focus: "Endurance Building",
                description: "Increase hike duration to 5–6 hours. Introduce hill repeats. Target 40km+ weekly activity."
            },
            {
                weeks: "8 Weeks Out",
                focus: "Load Carrying",
                description: "Hike with an 8–10kg pack. Practice consecutive hiking days to simulate multi-day fatigue."
            },
            {
                weeks: "4 Weeks Out",
                focus: "Final Preparation",
                description: "Taper intensity, finalize your kit and fully break in your boots. Focus on sleep and nutrition."
            }
        ],
        testimonials: [
            {
                name: "Tom B.",
                location: "Edinburgh, UK",
                rating: 5,
                text: "The Thorong La crossing was the hardest thing I've ever done — and the most rewarding. The guides' knowledge of pacing and altitude management was outstanding.",
                batch: "Annapurna — October 2023"
            },
            {
                name: "Mei L.",
                location: "Singapore",
                rating: 5,
                text: "18 days of staggering scenery. The circuit takes you through so many different landscapes and cultures. Yeti's logistics were flawless throughout.",
                batch: "Annapurna — November 2023"
            },
            {
                name: "Carlos M.",
                location: "Barcelona, ES",
                rating: 5,
                text: "I was nervous about the high pass but the team prepared us brilliantly. The acclimatisation days were perfectly placed. Would do it again in a heartbeat.",
                batch: "Annapurna — October 2022"
            }
        ],
        gallery: [
            "https://lh3.googleusercontent.com/aida/AOfcidW6Gc38U8OOYUBOpPfVS5VhIkLWJy9845TTSkVQPjHI-2pHux-WNn_tQ_bQYLQf0eTxUbO_TrjTbCOYT5_PAKoC6DNxKb_NMsyo365uR0bPBxgGgEX84fqaTV09W0zK6pmk-Ayw9R3QWgc-n7hOCE78UIUkEc_BGQ8uMs0rgMCaLWmUtyki6_E79F8143bh7crPfp8fwVWEukj5lhWaLEYFTqYCoWmjrDfRX7_fVLFSq-B3J3kOGvBygyE",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDiHbmYyYGaTh5ARUWejOA5l9Z7E5DgvlQurzssXYqn0QWZD3Vmnp0Cj5WP12qOqtqJU1vQ6mvGfuEpwLkmf2pow3oQBcKucJRSfaCc7L-shf9FL_gTbJ9TQJ2sV5dburhHwpyRWJv1vnefycut3Af6X2nvKG074F1q0eFM4If8D1zhCPLyAfuGfMcZbbkWtXDhizuVVPZEu6taWsO_X0iyCFOt3sgaH4WkSYb4YBgc8Zb3niHk_MC3ZJ1spQ1bTh2dvQbNEUX9oq4",
            "https://lh3.googleusercontent.com/aida/AOfcidW6Gc38U8OOYUBOpPfVS5VhIkLWJy9845TTSkVQPjHI-2pHux-WNn_tQ_bQYLQf0eTxUbO_TrjTbCOYT5_PAKoC6DNxKb_NMsyo365uR0bPBxgGgEX84fqaTV09W0zK6pmk-Ayw9R3QWgc-n7hOCE78UIUkEc_BGQ8uMs0rgMCaLWmUtyki6_E79F8143bh7crPfp8fwVWEukj5lhWaLEYFTqYCoWmjrDfRX7_fVLFSq-B3J3kOGvBygyE",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDiHbmYyYGaTh5ARUWejOA5l9Z7E5DgvlQurzssXYqn0QWZD3Vmnp0Cj5WP12qOqtqJU1vQ6mvGfuEpwLkmf2pow3oQBcKucJRSfaCc7L-shf9FL_gTbJ9TQJ2sV5dburhHwpyRWJv1vnefycut3Af6X2nvKG074F1q0eFM4If8D1zhCPLyAfuGfMcZbbkWtXDhizuVVPZEu6taWsO_X0iyCFOt3sgaH4WkSYb4YBgc8Zb3niHk_MC3ZJ1spQ1bTh2dvQbNEUX9oq4",
            "https://lh3.googleusercontent.com/aida/AOfcidW6Gc38U8OOYUBOpPfVS5VhIkLWJy9845TTSkVQPjHI-2pHux-WNn_tQ_bQYLQf0eTxUbO_TrjTbCOYT5_PAKoC6DNxKb_NMsyo365uR0bPBxgGgEX84fqaTV09W0zK6pmk-Ayw9R3QWgc-n7hOCE78UIUkEc_BGQ8uMs0rgMCaLWmUtyki6_E79F8143bh7crPfp8fwVWEukj5lhWaLEYFTqYCoWmjrDfRX7_fVLFSq-B3J3kOGvBygyE",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDiHbmYyYGaTh5ARUWejOA5l9Z7E5DgvlQurzssXYqn0QWZD3Vmnp0Cj5WP12qOqtqJU1vQ6mvGfuEpwLkmf2pow3oQBcKucJRSfaCc7L-shf9FL_gTbJ9TQJ2sV5dburhHwpyRWJv1vnefycut3Af6X2nvKG074F1q0eFM4If8D1zhCPLyAfuGfMcZbbkWtXDhizuVVPZEu6taWsO_X0iyCFOt3sgaH4WkSYb4YBgc8Zb3niHk_MC3ZJ1spQ1bTh2dvQbNEUX9oq4"
        ],
        gettingThere: {
            arrival: "Fly into Tribhuvan International Airport (KTM), Kathmandu. Yeti Expeditions arranges airport pick-up and overnight hotel. Drive to Syange trailhead on Day 2.",
            visa: "Nepal visa on arrival for most nationalities. 15-day: $30 USD, 30-day: $50 USD. Bring 2 passport photos and cash. Obtain at KTM airport on arrival.",
            domesticFlight: "No domestic flight required. The circuit begins with a scenic drive from Kathmandu to Syange (approx. 7 hours). The trek ends in Pokhara with a flight or bus back to Kathmandu."
        },
        accommodationDetails: [
            { location: "Kathmandu", type: "3-Star Hotel", nights: 1, notes: "En-suite bathroom, WiFi, hot water" },
            { location: "Syange → Chame", type: "Lodge", nights: 3, notes: "Basic twin rooms, shared bathrooms, local meals" },
            { location: "Chame → Manang", type: "Lodge (Better)", nights: 4, notes: "Improved facilities, some en-suite options available" },
            { location: "Manang", type: "Lodge (Premium)", nights: 2, notes: "Best on route, charging facilities, hot showers" },
            { location: "High Camp → Muktinath", type: "Basic Lodge", nights: 2, notes: "Cold, basic facilities near the high pass" },
            { location: "Muktinath → Nayapul", type: "Lodge", nights: 5, notes: "Comfortable lodges as altitude decreases" },
            { location: "Pokhara", type: "3-Star Hotel", nights: 1, notes: "Lakeside hotel, hot water, WiFi, celebratory dinner" }
        ],
        permits: [
            {
                name: "Annapurna Conservation Area Permit (ACAP)",
                cost: "$30 USD",
                handledBy: "Yeti Expeditions",
                notes: "Required for all trekkers in the Annapurna region. Included in your trek fee."
            },
            {
                name: "TIMS Card (Trekkers' Information Management System)",
                cost: "$20 USD",
                handledBy: "Yeti Expeditions",
                notes: "Mandatory for all foreign trekkers. Included in your trek fee."
            }
        ],
        faqs: [
            {
                question: "What is the cancellation policy?",
                answer: "Full refund up to 60 days before departure. 50% refund between 30–60 days. No refund within 30 days of departure. We strongly recommend comprehensive travel insurance covering cancellation."
            },
            {
                question: "How difficult is the Thorong La pass crossing?",
                answer: "Thorong La (5,416m) is a long, physically demanding day — typically 7–8 hours from High Camp. The key is proper acclimatisation, which our itinerary builds in at Manang. Our guides assess every trekker before the crossing day."
            },
            {
                question: "What is the best season for the Annapurna Circuit?",
                answer: "October to early December is the prime season — stable weather, clear skies, and excellent visibility. March to May (spring) is a solid second choice. Monsoon season (June–September) is not recommended."
            },
            {
                question: "Can I complete the full circuit?",
                answer: "Yes. Unlike some operators, we complete the full traditional circuit. Road construction has affected some sections but we route around it using original trails where possible to preserve the authentic experience."
            },
            {
                question: "Is the Annapurna Circuit suitable for beginners?",
                answer: "The circuit is achievable for fit beginners who have done adequate training. It is longer and more varied than EBC but the daily altitude gains are more gradual. Our 8-week training guide is specifically designed for first-timers."
            }
        ],
        relatedTreks: [
            { name: "Everest Base Camp", slug: "everest-base-camp", duration: "14 Days", altitude: "5,364m" }
        ]
    }
};

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return Object.keys(TREKS_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const trek = TREKS_DATA[slug];

    if (!trek) return {};

    const title = `${trek.name} Trek — ${trek.duration}, ${trek.altitude} | Yeti Expeditions`;
    const description = `Guided ${trek.name} trek: ${trek.duration}, reaching ${trek.altitude}. From ${trek.investment}. Max ${trek.groupSize} trekkers. WFR-certified guides. All permits, meals & accommodation included.`;
    const url = `${BASE_URL}/trek/${slug}`;

    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: {
            type: "website",
            url,
            title,
            description,
            images: [{ url: trek.bannerImage, width: 1200, height: 630, alt: `${trek.name} Trek — Yeti Expeditions` }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [trek.bannerImage],
        },
    };
}

function buildTrekSchemas(trek: any, slug: string) {
    const url = `${BASE_URL}/trek/${slug}`;

    const touristTripSchema = {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        name: `${trek.name} Trek`,
        description: `Guided ${trek.name} trek: ${trek.duration}, reaching ${trek.altitude}. From ${trek.investment}. Max ${trek.groupSize} trekkers.`,
        url,
        touristType: "Adventure Travelers",
        itinerary: trek.itinerary?.map((day: any) => ({
            "@type": "TouristAttraction",
            name: day.title,
            description: day.content,
        })),
        offers: {
            "@type": "Offer",
            price: trek.investment.replace(/[^0-9]/g, ""),
            priceCurrency: "USD",
            url,
            availability: "https://schema.org/InStock",
        },
        provider: {
            "@type": "TravelAgency",
            name: "Yeti Expeditions",
            url: BASE_URL,
        },
        subjectOf: trek.batches?.map((batch: any) => ({
            "@type": "Event",
            name: `${trek.name} Trek — ${batch.date}`,
            startDate: batch.date.split(" - ")[0],
            endDate: batch.date.split(" - ")[1],
            eventStatus: batch.status === "Open" ? "https://schema.org/EventScheduled" : "https://schema.org/EventScheduled",
            remainingAttendeeCapacity: batch.remaining,
            organizer: {
                "@type": "TravelAgency",
                name: "Yeti Expeditions",
                url: BASE_URL,
            },
            offers: {
                "@type": "Offer",
                price: trek.investment.replace(/[^0-9]/g, ""),
                priceCurrency: "USD",
                url,
            },
        })),
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
            { "@type": "ListItem", position: 2, name: "Treks", item: `${BASE_URL}/#treks` },
            { "@type": "ListItem", position: 3, name: trek.name, item: url },
        ],
    };

    const faqSchema = trek.faqs?.length
        ? {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: trek.faqs.map((faq: any) => ({
                  "@type": "Question",
                  name: faq.question,
                  acceptedAnswer: { "@type": "Answer", text: faq.answer },
              })),
          }
        : null;

    const reviewSchema = trek.testimonials?.length
        ? {
              "@context": "https://schema.org",
              "@type": "Product",
              name: `${trek.name} Trek`,
              description: `Guided ${trek.name} trek by Yeti Expeditions`,
              url,
              aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "5",
                  bestRating: "5",
                  worstRating: "1",
                  ratingCount: trek.testimonials.length,
              },
              review: trek.testimonials.map((t: any) => ({
                  "@type": "Review",
                  reviewRating: { "@type": "Rating", ratingValue: t.rating, bestRating: 5 },
                  author: { "@type": "Person", name: t.name },
                  reviewBody: t.text,
                  datePublished: t.batch,
              })),
          }
        : null;

    return [touristTripSchema, breadcrumbSchema, faqSchema, reviewSchema].filter(Boolean);
}

export default async function TrekPage({ params }: PageProps) {
    const { slug } = await params;
    const trek = TREKS_DATA[slug];

    if (!trek) {
        notFound();
    }

    const schemas = buildTrekSchemas(trek, slug);

    return (
        <main className="min-h-screen">
            {schemas.map((schema, i) => (
                <script
                    key={i}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
            <Navbar />

            {/* Trek Hero */}
            <section className="relative h-[70vh] w-full -mt-[88px]">
                <div
                    className="absolute inset-0 bg-cover bg-center grayscale brightness-75 transition-all duration-700 hover:grayscale-0"
                    style={{ backgroundImage: `url(${trek.bannerImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 max-w-[1440px] mx-auto p-8 md:p-16 flex flex-col items-start gap-4">
                    <span className="bg-primary text-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">Expedition Dispatch</span>
                    <h1 className="text-white text-5xl md:text-7xl font-black uppercase tracking-tighter">{trek.name}</h1>
                </div>
            </section>

            <TrekDetails trek={trek} />

            <Footer />
        </main>
    );
}
