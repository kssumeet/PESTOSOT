/**
 * Service catalogue — the data source behind the dynamic /services/[slug] pages.
 * In a later phase this moves into the database + admin CMS; the page templates
 * already read from this typed shape, so the migration is drop-in.
 */
import {
  Bug,
  Rat,
  ShieldCheck,
  Sofa,
  Utensils,
  Bath,
  Home,
  type LucideIcon,
} from "lucide-react";

export type ServiceCategory = "pest-control" | "deep-cleaning";

export interface ProcessStep {
  title: string;
  desc: string;
}

export interface ServiceDetail {
  slug: string;
  name: string;
  category: ServiceCategory;
  icon: LucideIcon;
  popular?: boolean;
  /** Short one-liner for cards. */
  shortDesc: string;
  /** Hero sub-headline on the detail page. */
  tagline: string;
  priceFrom: string;
  /** Opening overview paragraph. */
  problem: string;
  causes: string[];
  signs: string[];
  process: ProcessStep[];
  benefits: string[];
  safety: string;
  faqs: { q: string; a: string }[];
  related: string[];
  metaTitle: string;
  metaDescription: string;
}

export const SERVICES: ServiceDetail[] = [
  {
    slug: "cockroach-control",
    name: "Cockroach Control",
    category: "pest-control",
    icon: Bug,
    popular: true,
    shortDesc: "Gel + flush-out treatment that targets nests, not just the roaches you see.",
    tagline: "Odourless gel treatment that wipes out the colony at its source.",
    priceFrom: "₹599",
    problem:
      "Cockroaches contaminate food, trigger allergies and multiply alarmingly fast — a single pair can produce thousands in a year. Our targeted programme breaks the breeding cycle instead of just scattering the ones you can see, so they don't come back a week later.",
    causes: [
      "Food residue and grease behind appliances and cabinets",
      "Moisture under sinks, near drains and in bathrooms",
      "Cracks, crevices and clutter that offer dark harbourage",
      "Roaches hitchhiking in via groceries, cartons and drains",
    ],
    signs: [
      "Live roaches scattering when you switch on the kitchen light",
      "Pepper-like droppings near skirting and inside drawers",
      "A musty, oily odour in cabinets",
      "Egg cases (oothecae) tucked into corners and hinges",
    ],
    process: [
      { title: "Inspection", desc: "We trace harbourage zones, entry points and moisture sources." },
      { title: "Targeted gel baiting", desc: "Pin-point, odourless gel placed where roaches feed and nest." },
      { title: "Flush-out & spray", desc: "Crack-and-crevice treatment for heavy infestations." },
      { title: "Follow-up", desc: "A review visit to confirm the colony is fully cleared." },
    ],
    benefits: [
      "Targets the nest — not just visible roaches",
      "Odourless gel; no need to vacate the kitchen",
      "Safe around food-prep areas when applied correctly",
      "Service warranty with free re-treatment",
    ],
    safety:
      "We use low-toxicity, government-approved gels and place them out of reach of children and pets. The treatment is odourless and your kitchen stays usable — your technician will note any simple precautions for your space.",
    faqs: [
      { q: "Do I need to empty my kitchen cabinets?", a: "For gel treatment, no full clear-out is needed. For a heavier flush-out spray we'll advise clearing a few key shelves; your technician guides you on the day." },
      { q: "How long until I stop seeing roaches?", a: "You'll usually notice a sharp drop within 3–5 days as bait works through the colony, with full control over the following one to two weeks." },
      { q: "Is the gel safe near food?", a: "Yes — it's applied as tiny dots in cracks and hidden areas, away from food-contact surfaces, using approved formulations." },
    ],
    related: ["ant-control", "kitchen-deep-cleaning", "rodent-control"],
    metaTitle: "Cockroach Control in Bangalore — Odourless Gel Treatment",
    metaDescription:
      "Safe, odourless cockroach control in Bangalore that targets the nest at its source. Certified technicians, free inspection and a service warranty. Book today.",
  },
  {
    slug: "termite-control",
    name: "Termite Control",
    category: "pest-control",
    icon: ShieldCheck,
    popular: true,
    shortDesc: "Anti-termite barrier & drill-fill-seal with up to a 5-year warranty.",
    tagline: "Protect your property from silent structural damage — guaranteed for years.",
    priceFrom: "₹2,499",
    problem:
      "Termites quietly eat through wood, furniture and even document storage long before you notice. Left untreated they cause serious, expensive structural damage. Our anti-termite treatment creates a chemical barrier that stops them at the foundation.",
    causes: [
      "Soil-to-wood contact and untreated foundations",
      "Moisture and water seepage near walls",
      "Wooden fixtures, frames and stored cardboard",
      "Existing colonies in or around the building",
    ],
    signs: [
      "Mud tubes climbing along walls and skirting",
      "Hollow-sounding or crumbling wood",
      "Discarded wings near windows after swarms",
      "Bubbling or cracked paint on wooden surfaces",
    ],
    process: [
      { title: "Survey", desc: "We map infestation paths, moisture and entry points." },
      { title: "Drill–fill–seal", desc: "Calibrated injection of anti-termite solution at floor and wall junctions." },
      { title: "Barrier treatment", desc: "A continuous chemical barrier around the treated zone." },
      { title: "Warranty & checks", desc: "Periodic monitoring within your warranty period." },
    ],
    benefits: [
      "Up to 5-year warranty on eligible packages",
      "Protects furniture and structure alike",
      "Minimal disruption with neat drill-and-seal",
      "Documented treatment for property records",
    ],
    safety:
      "Termiticides are applied at structural junctions and sealed, keeping living areas clean and safe. We use approved chemicals at correct dosages and advise short ventilation where relevant.",
    faqs: [
      { q: "How long does the treatment last?", a: "Depending on the package and construction, protection can last several years — eligible plans carry warranties of up to 5 years with periodic checks." },
      { q: "Will drilling damage my flooring?", a: "Holes are small, precisely placed at junctions, and neatly sealed after injection — they're barely noticeable once done." },
      { q: "Pre- or post-construction — which do I need?", a: "Pre-construction soil treatment is ideal for new builds; post-construction drill-fill-seal protects existing properties. We assess and recommend the right one." },
    ],
    related: ["rodent-control", "cockroach-control", "home-deep-cleaning"],
    metaTitle: "Termite Control in Bangalore — Up to 5-Year Warranty",
    metaDescription:
      "Anti-termite treatment in Bangalore with drill-fill-seal and barrier protection. Certified technicians, documented service and warranties up to 5 years. Book a free inspection.",
  },
  {
    slug: "rodent-control",
    name: "Rodent Control",
    category: "pest-control",
    icon: Rat,
    popular: true,
    shortDesc: "Bait stations, proofing and monitoring to keep rats and mice out for good.",
    tagline: "Stop the gnawing, contamination and wiring damage — humanely and for good.",
    priceFrom: "₹999",
    problem:
      "Rats and mice contaminate food, gnaw through wiring (a real fire risk) and spread disease. A reactive trap here and there rarely works — we combine baiting, trapping and proofing so they can't return.",
    causes: [
      "Accessible food waste and open storage",
      "Gaps under doors, around pipes and vents",
      "Cluttered store rooms and false ceilings",
      "Nearby drains, gardens and construction",
    ],
    signs: [
      "Droppings along walls and in cupboards",
      "Gnaw marks on wires, packaging and wood",
      "Scratching or scurrying sounds at night",
      "A persistent musky odour in enclosed spaces",
    ],
    process: [
      { title: "Inspection", desc: "We identify runways, nesting sites and entry gaps." },
      { title: "Bait & trap", desc: "Tamper-resistant bait stations and traps placed strategically." },
      { title: "Proofing", desc: "Sealing gaps and entry points to block re-entry." },
      { title: "Monitoring", desc: "Scheduled checks to confirm activity has stopped." },
    ],
    benefits: [
      "Combines control with long-term proofing",
      "Tamper-resistant stations safe for premises",
      "Reduces fire risk from gnawed wiring",
      "Ideal for homes, kitchens and warehouses",
    ],
    safety:
      "Bait is secured inside tamper-resistant stations placed away from children and pets. For sensitive areas we prioritise trapping and proofing over open bait.",
    faqs: [
      { q: "Do you use poison inside my home?", a: "We prefer secured bait stations and snap/live traps indoors, reserving baiting for safe, enclosed locations. Your technician chooses the safest mix for your space." },
      { q: "How do you stop them coming back?", a: "Proofing is central to our service — we seal entry gaps around pipes, doors and vents so the population can't re-establish." },
      { q: "Is one visit enough?", a: "Most cases need an initial treatment plus monitoring visits to confirm the activity has fully stopped, especially for larger infestations." },
    ],
    related: ["cockroach-control", "termite-control", "home-deep-cleaning"],
    metaTitle: "Rodent Control in Bangalore — Rats & Mice Removal",
    metaDescription:
      "Get rid of rats and mice in Bangalore with baiting, trapping and proofing that keeps them out. Safe, certified rodent control with monitoring. Book a free inspection.",
  },
  {
    slug: "bed-bug-control",
    name: "Bed Bug Control",
    category: "pest-control",
    icon: Bug,
    shortDesc: "Heat + targeted treatment that eliminates eggs and adults across cycles.",
    tagline: "Reclaim your sleep — a thorough, cycle-based treatment that ends the bites.",
    priceFrom: "₹1,499",
    problem:
      "Bed bugs hide in mattress seams, furniture joints and skirting, feeding at night and multiplying fast. Because eggs resist single treatments, we treat in cycles to break the lifecycle completely.",
    causes: [
      "Hitchhiking in via luggage, second-hand furniture and fabrics",
      "Cracks in beds, headboards and skirting",
      "Shared walls in apartments and hostels",
      "Cluttered bedrooms offering hiding spots",
    ],
    signs: [
      "Rows of small, itchy bites on exposed skin",
      "Tiny dark spots on bedsheets and seams",
      "A sweet, musty odour near the bed",
      "Live bugs or shed skins in mattress seams",
    ],
    process: [
      { title: "Inspection", desc: "We locate harbourage in seams, joints and crevices." },
      { title: "Targeted treatment", desc: "Application to all hiding zones, including furniture." },
      { title: "Second cycle", desc: "A follow-up treatment to eliminate newly hatched bugs." },
      { title: "Verification", desc: "A final check to confirm the infestation is cleared." },
    ],
    benefits: [
      "Cycle-based approach that kills eggs too",
      "Treats beds, furniture and surrounding zones",
      "Discreet, professional service",
      "Guidance to prevent re-introduction",
    ],
    safety:
      "We use approved formulations applied to harbourage points, not open surfaces. Your technician advises bedding laundering and short re-entry times so your room is safe to use.",
    faqs: [
      { q: "Why do I need more than one treatment?", a: "Bed bug eggs are resistant to many treatments, so a second cycle ensures newly hatched bugs are eliminated before they can breed." },
      { q: "Should I throw away my mattress?", a: "Usually not — most mattresses can be treated. We'll only advise replacement in severe, heavily damaged cases." },
      { q: "How should I prepare?", a: "Launder and hot-dry bedding, reduce clutter around the bed and give technicians access to furniture. We'll send a simple checklist on booking." },
    ],
    related: ["cockroach-control", "sofa-cleaning", "home-deep-cleaning"],
    metaTitle: "Bed Bug Control in Bangalore — Cycle-Based Treatment",
    metaDescription:
      "End bed bug bites with cycle-based treatment in Bangalore that eliminates eggs and adults. Discreet, certified service with verification. Book a free inspection.",
  },
  {
    slug: "mosquito-control",
    name: "Mosquito Control",
    category: "pest-control",
    icon: Bug,
    shortDesc: "Fogging, larviciding and source reduction for dengue-free spaces.",
    tagline: "Cut the bites and the disease risk with multi-stage mosquito management.",
    priceFrom: "₹899",
    problem:
      "Mosquitoes aren't just a nuisance — they spread dengue, malaria and chikungunya. We attack them at every stage, from breeding sites to adults, for lasting relief around your home or premises.",
    causes: [
      "Stagnant water in pots, drains and tanks",
      "Overgrown vegetation and shaded damp areas",
      "Open water storage and clogged gutters",
      "Nearby construction and waterlogging",
    ],
    signs: [
      "Frequent bites at dawn and dusk",
      "Visible larvae in standing water",
      "Swarms near gardens and stairwells",
      "Recurring itchy welts indoors",
    ],
    process: [
      { title: "Source survey", desc: "We identify breeding sites around the property." },
      { title: "Larviciding", desc: "Treating standing water to stop larvae maturing." },
      { title: "Fogging & misting", desc: "Knockdown of adult mosquitoes in key zones." },
      { title: "Prevention advice", desc: "Source-reduction guidance to keep numbers down." },
    ],
    benefits: [
      "Targets larvae and adults together",
      "Reduces dengue and malaria risk",
      "Suited to homes, gardens and campuses",
      "Outdoor and common-area programmes available",
    ],
    safety:
      "We use approved larvicides and fogging agents at controlled dosages, focusing on breeding sites and perimeters. Short re-entry guidance is provided for fogged areas.",
    faqs: [
      { q: "How long does relief last?", a: "Adult fogging gives quick relief; combined with larviciding and source reduction, results hold for weeks. Recurring outdoor programmes give the best long-term control." },
      { q: "Is fogging safe for my family?", a: "Yes, when done by trained technicians with approved agents. We advise a short re-entry window for treated areas." },
      { q: "Do you treat gardens and common areas?", a: "Absolutely — outdoor breeding sites are often the main source, so we treat gardens, drains and shared spaces for apartments and campuses." },
    ],
    related: ["home-deep-cleaning", "cockroach-control", "ant-control"],
    metaTitle: "Mosquito Control in Bangalore — Fogging & Larviciding",
    metaDescription:
      "Multi-stage mosquito control in Bangalore: larviciding, fogging and source reduction to cut bites and dengue risk. Certified, safe and effective. Book today.",
  },
  {
    slug: "ant-control",
    name: "Ant Control",
    category: "pest-control",
    icon: Bug,
    shortDesc: "Colony-level baiting that clears trails for good, not just the surface.",
    tagline: "Break the trail and the colony — no more ants marching through your kitchen.",
    priceFrom: "₹599",
    problem:
      "Spraying visible ants only scatters them; the colony survives and returns. Our bait-led approach lets workers carry treatment back to the nest, collapsing the colony at its source.",
    causes: [
      "Sweet and greasy food residue",
      "Cracks and gaps near windows and counters",
      "Indoor plants and moisture sources",
      "Outdoor nests with trails leading indoors",
    ],
    signs: [
      "Steady ant trails along walls and counters",
      "Clusters around food and bins",
      "Tiny soil mounds near entry points",
      "Winged ants during swarming season",
    ],
    process: [
      { title: "Trail mapping", desc: "We follow trails to entry points and likely nests." },
      { title: "Colony baiting", desc: "Targeted bait that workers carry back to the nest." },
      { title: "Crevice treatment", desc: "Treating entry points and harbourage zones." },
      { title: "Review", desc: "A follow-up to confirm the colony is gone." },
    ],
    benefits: [
      "Eliminates the colony, not just the trail",
      "Low-odour, kitchen-friendly application",
      "Targets multiple ant species",
      "Backed by a service warranty",
    ],
    safety:
      "Baits and treatments are placed at entry points and crevices, away from food-contact surfaces, using approved, low-odour products safe for occupied homes.",
    faqs: [
      { q: "Why not just spray the ants I see?", a: "Spraying kills surface ants but leaves the colony intact, so they return. Baiting reaches the nest and collapses it at the source." },
      { q: "How soon will trails disappear?", a: "Trails usually thin out within a few days as bait reaches the colony, with full control over one to two weeks." },
      { q: "Will it work for tiny 'sugar ants'?", a: "Yes — we match the bait to the species, including the small sugar ants common in Bangalore kitchens." },
    ],
    related: ["cockroach-control", "kitchen-deep-cleaning", "mosquito-control"],
    metaTitle: "Ant Control in Bangalore — Colony-Level Baiting",
    metaDescription:
      "Get rid of ant trails for good with colony-level baiting in Bangalore. Low-odour, kitchen-safe ant control backed by a warranty. Book a free inspection.",
  },
  {
    slug: "kitchen-deep-cleaning",
    name: "Kitchen Deep Cleaning",
    category: "deep-cleaning",
    icon: Utensils,
    popular: true,
    shortDesc: "Degreasing, descaling and sanitisation for a spotless, hygienic kitchen.",
    tagline: "From greasy chimney to sparkling counters — a hospital-grade kitchen reset.",
    priceFrom: "₹1,799",
    problem:
      "Kitchens accumulate grease, grime and bacteria in places everyday cleaning can't reach — behind appliances, inside chimneys and along tile grout. Our deep clean degreases, descales and sanitises every surface.",
    causes: [
      "Cooking grease building up on surfaces and chimneys",
      "Hard-water scaling on sinks and taps",
      "Grime in tile grout and corners",
      "Neglected appliance exteriors and cabinet tops",
    ],
    signs: [
      "Sticky residue on cabinets and backsplash",
      "Dull, scaled sinks and fittings",
      "Odours lingering after regular cleaning",
      "Discoloured grout and stovetop build-up",
    ],
    process: [
      { title: "Pre-inspection", desc: "We assess surfaces, appliances and problem areas." },
      { title: "Degrease & descale", desc: "Cutting through grease and hard-water scaling." },
      { title: "Detailing", desc: "Cabinets, tiles, grout, fittings and appliance exteriors." },
      { title: "Sanitise & finish", desc: "Surface sanitisation and a spotless final wipe-down." },
    ],
    benefits: [
      "Reaches grease and grime regular cleaning misses",
      "Hygienic, food-safe sanitisation",
      "Restores shine to fittings and surfaces",
      "Trained crew with professional-grade equipment",
    ],
    safety:
      "We use food-safe, surface-appropriate agents and sanitisers, leaving your kitchen ready to use. Eco-conscious products are available on request.",
    faqs: [
      { q: "How long does a kitchen deep clean take?", a: "Most kitchens take 3–5 hours depending on size and build-up. We'll give you a time estimate after a quick assessment." },
      { q: "Do you clean inside appliances?", a: "We clean appliance exteriors and accessible areas as standard; interior appliance cleaning can be added on request." },
      { q: "Is it safe for my surfaces?", a: "Yes — we match products to each surface (granite, steel, laminate, tile) to clean effectively without damage." },
    ],
    related: ["home-deep-cleaning", "cockroach-control", "bathroom-deep-cleaning"],
    metaTitle: "Kitchen Deep Cleaning in Bangalore — Degrease & Sanitise",
    metaDescription:
      "Professional kitchen deep cleaning in Bangalore: degreasing, descaling and food-safe sanitisation. Trained crew, spotless results. Book your slot today.",
  },
  {
    slug: "bathroom-deep-cleaning",
    name: "Bathroom Deep Cleaning",
    category: "deep-cleaning",
    icon: Bath,
    shortDesc: "Descaling, mould treatment and sanitisation for a fresh, hygienic bathroom.",
    tagline: "Banish hard-water stains, mould and odour for a hotel-fresh bathroom.",
    priceFrom: "₹999",
    problem:
      "Bathrooms harbour hard-water scaling, mould and bacteria in grout, fittings and corners. Our deep clean removes stubborn stains and sanitises every surface for genuine hygiene, not just a quick wipe.",
    causes: [
      "Hard-water scaling on tiles, taps and glass",
      "Mould and mildew in damp grout and corners",
      "Soap scum on fittings and screens",
      "Poor ventilation trapping moisture",
    ],
    signs: [
      "White scaling on taps, tiles and shower glass",
      "Black mould spots in grout and silicone",
      "Persistent damp odour",
      "Dull, stained fittings and floors",
    ],
    process: [
      { title: "Assessment", desc: "We check scaling, mould and problem zones." },
      { title: "Descale & treat", desc: "Removing hard-water deposits and treating mould." },
      { title: "Scrub & detail", desc: "Tiles, grout, fittings, glass and floors." },
      { title: "Sanitise", desc: "Surface sanitisation for a hygienic finish." },
    ],
    benefits: [
      "Removes stubborn scaling and mould",
      "Hygienic sanitisation of all surfaces",
      "Restores shine to fittings and glass",
      "Fresh, odour-free result",
    ],
    safety:
      "We use surface-safe descalers and sanitisers with proper ventilation, leaving the bathroom safe to use right after. Eco-friendly options are available.",
    faqs: [
      { q: "Can you remove old hard-water stains?", a: "In most cases yes — professional descalers lift long-standing scaling that household cleaners can't. Severely etched glass may have limits, which we'll flag upfront." },
      { q: "Do you treat mould as well as clean it?", a: "Yes, we treat mould at the source in grout and silicone, not just wipe the surface, and advise on ventilation to slow regrowth." },
      { q: "How long does it take?", a: "A standard bathroom takes 1.5–3 hours depending on size and build-up." },
    ],
    related: ["kitchen-deep-cleaning", "home-deep-cleaning", "mosquito-control"],
    metaTitle: "Bathroom Deep Cleaning in Bangalore — Descale & Sanitise",
    metaDescription:
      "Professional bathroom deep cleaning in Bangalore: descaling, mould treatment and sanitisation for a hotel-fresh result. Book your slot today.",
  },
  {
    slug: "sofa-cleaning",
    name: "Sofa & Upholstery Cleaning",
    category: "deep-cleaning",
    icon: Sofa,
    popular: true,
    shortDesc: "Deep-extraction shampoo that lifts stains, dust mites and odour.",
    tagline: "Revive tired upholstery — deep-extraction cleaning that brings fabric back to life.",
    priceFrom: "₹399",
    problem:
      "Sofas and upholstery trap dust, allergens, body oils and stains that surface cleaning can't reach. Our deep-extraction process lifts embedded dirt and odour, restoring fabric and improving indoor air quality.",
    causes: [
      "Daily use depositing body oils and sweat",
      "Dust, dust mites and pet dander settling in fabric",
      "Food and drink spills and stains",
      "Infrequent deep cleaning",
    ],
    signs: [
      "Dull, flattened or discoloured fabric",
      "Lingering odours from the cushions",
      "Visible stains and spots",
      "Sneezing or allergies when seated",
    ],
    process: [
      { title: "Fabric check", desc: "We identify fabric type and test for colour-fastness." },
      { title: "Vacuum & pre-treat", desc: "Removing loose dust and pre-treating stains." },
      { title: "Deep extraction", desc: "Shampoo and hot-water extraction of embedded dirt." },
      { title: "Dry & finish", desc: "Controlled drying and a refreshed, even finish." },
    ],
    benefits: [
      "Lifts stains, oils and dust mites",
      "Improves indoor air and reduces allergens",
      "Fabric-safe, colour-fastness tested",
      "Priced per seat — pay for what you need",
    ],
    safety:
      "We test for colour-fastness before cleaning and use fabric-appropriate, low-residue solutions. Controlled drying minimises any damp smell.",
    faqs: [
      { q: "How is sofa cleaning priced?", a: "Per seat, so you only pay for what you have — your technician confirms the seat count before starting." },
      { q: "How long until I can use the sofa?", a: "Typically a few hours to dry fully, depending on fabric, ventilation and weather. We use controlled drying to speed this up." },
      { q: "Will all stains come out?", a: "Most do. Very old or set-in stains may lighten rather than vanish entirely — we'll set realistic expectations after the fabric check." },
    ],
    related: ["home-deep-cleaning", "bed-bug-control", "kitchen-deep-cleaning"],
    metaTitle: "Sofa & Upholstery Cleaning in Bangalore — Deep Extraction",
    metaDescription:
      "Professional sofa and upholstery cleaning in Bangalore with deep-extraction shampoo that lifts stains, dust mites and odour. Priced per seat. Book today.",
  },
  {
    slug: "home-deep-cleaning",
    name: "Full Home Deep Cleaning",
    category: "deep-cleaning",
    icon: Home,
    shortDesc: "Top-to-bottom detailing for apartments and villas — move-in ready results.",
    tagline: "A complete top-to-bottom reset for your home — every room, every detail.",
    priceFrom: "₹4,499",
    problem:
      "Whether you're moving in, moving out or just want a genuine reset, regular cleaning leaves grime in the places that matter. Our full home deep clean details every room — floors, kitchen, bathrooms, fittings and surfaces.",
    causes: [
      "Accumulated dust on high and hidden surfaces",
      "Grease and scaling in kitchen and bathrooms",
      "Marks on walls, switches and skirting",
      "Build-up from a recent move or renovation",
    ],
    signs: [
      "Dust on fans, ledges and skirting",
      "Grime in kitchen and bathroom corners",
      "Dull floors and smudged fittings",
      "An overall 'lived-in' tiredness to the space",
    ],
    process: [
      { title: "Walk-through", desc: "We plan room-by-room scope and priorities." },
      { title: "Room detailing", desc: "Dusting, scrubbing and degreasing every zone." },
      { title: "Kitchen & baths", desc: "Specialised degreasing, descaling and sanitisation." },
      { title: "Final finish", desc: "Floors, fittings and a quality walk-through with you." },
    ],
    benefits: [
      "Every room detailed, not just surfaces",
      "Ideal for move-in, move-out and festivals",
      "Trained crew with professional equipment",
      "Optional sanitisation add-ons",
    ],
    safety:
      "We use surface-appropriate, low-residue products and sanitisers throughout, with eco-friendly options on request — safe for families, kids and pets.",
    faqs: [
      { q: "How long does a full home deep clean take?", a: "It depends on size and condition — a 2BHK typically takes most of a day with a multi-person crew. We'll estimate after a quick walk-through." },
      { q: "Is it good for a move-in or move-out?", a: "Perfectly — it's one of our most popular reasons to book, leaving the home genuinely move-in ready." },
      { q: "Do I need to provide anything?", a: "Just water and power access. We bring professional equipment and supplies." },
    ],
    related: ["kitchen-deep-cleaning", "bathroom-deep-cleaning", "sofa-cleaning"],
    metaTitle: "Full Home Deep Cleaning in Bangalore — Move-In Ready",
    metaDescription:
      "Top-to-bottom home deep cleaning in Bangalore for apartments and villas. Move-in / move-out ready results from a trained crew. Book your deep clean today.",
  },
];

const BY_SLUG = new Map(SERVICES.map((s) => [s.slug, s]));

export function getService(slug: string): ServiceDetail | undefined {
  return BY_SLUG.get(slug);
}

export function getRelated(slug: string): ServiceDetail[] {
  const svc = BY_SLUG.get(slug);
  if (!svc) return [];
  return svc.related.map((r) => BY_SLUG.get(r)).filter((s): s is ServiceDetail => Boolean(s));
}

export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  "pest-control": "Pest Control",
  "deep-cleaning": "Deep Cleaning",
};
