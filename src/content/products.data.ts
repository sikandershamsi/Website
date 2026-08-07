export interface FeedingRow {
  size: string;
  weight: string;
  [key: string]: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ProductWhatItIs {
  summary: string;
  points: string[];
}

export interface ProductOutcomes {
  summary: string;
  points: string[];
}

export interface ProductImpact {
  summary?: string;
  points: string[];
}

export interface PhysiologyPanel {
  heading: string;
  body: string;
}

export interface ComparisonRow {
  title: string;
  body: string;
  otherTitle: string;
  otherBody: string;
}

export interface Comparison {
  headline: string;
  subheadline: string;
  intro: string[];
  ourLabel: string;
  ourSubLabel: string;
  otherLabel: string;
  otherSubLabel: string;
  rows: ComparisonRow[];
}

export interface Product {
  slug: string;
  name: string;
  trademark: string;
  category: string;
  categorySlug: string;
  tagline: string;
  price: number;
  size: string;
  heroStat: string;
  image: string;
  description: string;
  whatItIs: ProductWhatItIs;
  outcomes: ProductOutcomes;
  impact: ProductImpact;
  animalifeDifference: string;
  physiologyPanel: PhysiologyPanel;
  comparison: Comparison;
  keyIngredients: string[];
  primaryIngredients: { name: string; origin: string; image: string }[];
  primaryIngredientsFooter: string;
  supports: string[];
  ingredientBenefits: {
    ingredient: string;
    benefit: string;
    performance: string;
    wellness: string;
  }[];
  feedingIntro: string[];
  feedingColumns: string[];
  feedingValueKeys: string[];
  feedingRows: FeedingRow[];
  feedingNotes: string[];
  faqs: FaqItem[];
  accent: string;
}

export const categories = [
  {
    slug: 'cartilage-joint-connective-tissue',
    name: 'Cartilage – Joint – Connective Tissue Repair',
    short: 'Cartilage Repair',
    strapline: 'Joint • Connective Tissue Repair',
    summary:
      'Healthy movement begins with healthy joints. Scientifically formulated to support the horse’s natural ability to repair cartilage, strengthen connective tissue, and support the structural integrity of the musculoskeletal system.',
    image: '/images/products/vetroflex-tub.webp',
    icons: ['Repair Damaged Cartilage', 'Rebuild Stronger Connective Tissue', 'Protect Long-Term Joint Health', 'Perform Better Mobility & Performance'],
  },
  {
    slug: 'inflammation-pain-management',
    name: 'Inflammation & Pain Relief (NSAID Alternative)',
    short: 'Inflammation Relief',
    strapline: 'Inflammation & Pain Management',
    summary:
      'Lasting comfort begins by supporting the body’s natural inflammatory response. A long-term, natural alternative to routine NSAID use that supports mobility, comfort and recovery.',
    image: '/images/products/vetrofen-tub.webp',
    icons: ['Target Inflammation at the Source', 'Reduce Swelling & Discomfort', 'Restore Natural Mobility & Flexibility', 'Support Long-Term Joint Health'],
  },
  {
    slug: 'kidney-homeostasis-oxygen-recovery',
    name: 'Kidney Homeostasis Management',
    short: 'Oxygen. Endurance. Recovery.',
    strapline: 'Kidney Homeostasis • Oxygen Transport & Recovery',
    summary:
      'Performance begins long before the muscles go to work. The kidneys regulate red blood cell count, oxygen transport, fluid regulation, electrolyte balance, and recovery.',
    image: '/images/products/vetrofit-syringe.webp',
    icons: ['Optimize Kidney Function at the Source', 'Enhance Oxygen Delivery & Endurance', 'Speed Recovery Between Rounds & Races', 'Support Peak Performance & Lasting Stamina'],
  },
];

export const products: Product[] = [
  {
    slug: 'vetroflex',
    name: 'VetroFlex',
    trademark: 'VetroFlex®',
    category: 'Cartilage – Joint – Connective Tissue Repair',
    categorySlug: 'cartilage-joint-connective-tissue',
    tagline: 'Joint, Cartilage & Connective Tissue Restoration',
    price: 79,
    size: '500g / 25 Days',
    heroStat: 'Hydrolyzed Collagen Type II',
    image: '/images/products/vetroflex-tub.webp',
    accent: 'orange',
    description:
      'Healthy movement begins with healthy joints. VetroFlex® is scientifically formulated to support the horse’s natural ability to repair cartilage, strengthen connective tissue, and support the structural integrity of the musculoskeletal system. By promoting long-term joint health rather than simply masking discomfort, VetroFlex helps horses move more freely, recover more effectively, and remain sound throughout every stage of life.',
    whatItIs: {
      summary: 'Root-cause focused nutraceutical that repairs cartilage and strengthens connective tissue.',
      points: [
        'Hydrolyzed collagen peptides match native equine collagen',
        'Stimulates endogenous collagen synthesis',
        'Competition-safe, non-prescriptive, repeat-use',
      ],
    },
    outcomes: {
      summary: 'Structural repair vs. symptom masking.',
      points: [
        'Rebuilds damaged cartilage & connective tissue',
        'Improves joint, tendon, ligament & spinal resilience',
        'Reduces oxidative stress and degeneration',
        'Extends soundness under sustained competitive load',
      ],
    },
    impact: {
      points: [
        'Extends competitive lifespan & peak earning years',
        'Reduces reliance on injections, drugs, vet intervention',
      ],
    },
    animalifeDifference:
      'All competitors manage symptoms and offer short term fixes. VetroFlex supports the horse’s natural ability to repair cartilage and strengthen connective tissue throughout the body.',
    physiologyPanel: {
      heading: 'Supporting the Physiology of Soundness',
      body: 'Cartilage and connective tissues are constantly adapting to the demands of training and competition. VetroFlex® provides the nutritional building blocks needed to support healthy cartilage repair, collagen synthesis, connective tissue integrity, and joint mobility. The chart below illustrates how these physiological systems contribute to athletic performance and long-term musculoskeletal health.',
    },
    comparison: {
      headline: 'Not All Joint Supplements Are Created Equal.',
      subheadline: 'Repairs the Cause. Not Just the Symptom.',
      intro: [
        'Some products only mask the problem. VetroFlex helps repair it.',
        'Most joint supplements work on the surface—providing temporary lubrication to reduce friction. But real joint health starts beneath the surface. VetroFlex delivers undenatured (native) Collagen Type II peptides that interact with your horse’s immune system to help stimulate cartilage repair and support long-term joint integrity.',
        'VetroFlex doesn’t just help your horse feel better today—it helps build a healthier tomorrow.',
      ],
      ourLabel: 'VetroFlex®',
      ourSubLabel: 'Collagen Type II Peptides — Repair & Restore Cartilage',
      otherLabel: 'Other Brands',
      otherSubLabel: 'Glucosamine, Chondroitin, HA & MSM — Lubrication Only',
      rows: [
        {
          title: 'Works Below the Surface',
          body: 'Undenatured Collagen Type II peptides signal the immune system to reduce inflammation and stimulate natural cartilage repair.',
          otherTitle: 'Works on the Surface Only',
          otherBody: 'Primarily adds temporary lubrication to reduce friction but does not stimulate the body to repair damaged cartilage.',
        },
        {
          title: 'Builds & Strengthens Cartilage',
          body: 'Supports the production of new collagen and proteoglycans—the essential building blocks of healthy cartilage.',
          otherTitle: 'Does Not Build New Cartilage',
          otherBody: 'These ingredients do not provide the signals or building blocks needed for the body to produce new, healthy cartilage.',
        },
        {
          title: 'Improves Joint Structure Over Time',
          body: 'Helps restore cartilage thickness and integrity for long-term joint function and resilience.',
          otherTitle: 'No Structural Improvement',
          otherBody: 'May provide short-term comfort but does not improve cartilage structure or prevent further degradation.',
        },
        {
          title: 'Long-Term Results',
          body: 'Addresses the root cause of joint degradation for lasting soundness, mobility, and performance.',
          otherTitle: 'Short-Term Relief',
          otherBody: 'Focuses on symptom management, not the underlying problem—results fade when supplementation stops.',
        },
      ],
    },
    keyIngredients: [
      'Hydrolyzed Collagen Peptides (Type II)',
      'Prebiotic FOS (Fructooligosaccharides)',
      'MSM',
      'Vitamins A, D3, E, K, C',
      'Biotin, Methionine, L-Carnitine',
    ],
    primaryIngredients: [
      { name: 'Hydrolyzed Collagen Type II', origin: 'Brazil', image: '/images/ingredients/vetroflex/hydrolyzed-collagen.jpg' },
      { name: 'ACV (Chondroitin)', origin: 'France', image: '/images/ingredients/vetroflex/acv-chondroitin.jpg' },
      { name: 'FOS (Fructooligosaccharides)', origin: 'Belgium', image: '/images/ingredients/vetroflex/fos.jpg' },
      { name: 'Manganese, Copper & Zinc', origin: 'Global', image: '/images/ingredients/vetroflex/manganese-copper-zinc.jpg' },
      { name: 'Biotin', origin: 'Switzerland', image: '/images/ingredients/vetroflex/biotin.jpg' },
      { name: 'Garlic', origin: 'USA', image: '/images/ingredients/vetroflex/garlic.jpg' },
      { name: 'Vitamin E', origin: 'Switzerland', image: '/images/ingredients/vetroflex/vitamin-e.jpg' },
      { name: 'Selenium', origin: 'USA', image: '/images/ingredients/vetroflex/selenium.jpg' },
      { name: 'Methionine', origin: 'China', image: '/images/ingredients/vetroflex/methionine.jpg' },
      { name: 'Lysine', origin: 'China', image: '/images/ingredients/vetroflex/lysine.jpg' },
    ],
    primaryIngredientsFooter: 'Targeted Nutrition for Joint Health | Cartilage Support | Long-Term Soundness',
    supports: ['Cartilage Health', 'Tendons & Ligaments', 'Joint Comfort', 'Structural Integrity', 'Long-Term Soundness'],
    ingredientBenefits: [
      {
        ingredient: 'Hydrolysed collagen peptides (Type II); Prebiotic FOS; Vitamins A, D3, E, K, C; Biotin; Methionine; MSM; L-carnitine',
        benefit: 'Collagen peptides directly support cartilage regeneration and connective tissue integrity. MSM reduces joint inflammation and supports mobility. Prebiotics improve gut health and nutrient absorption. L-carnitine enhances muscle energy metabolism.',
        performance: 'Improves joint flexibility and shock absorption under load. Enhances muscular efficiency and reduces fatigue during work. Supports quicker post-exercise recovery and reduced stiffness.',
        wellness: 'Promotes long-term cartilage repair and joint preservation. Supports hoof quality, connective tissue strength, and structural integrity. Enhances overall mobility and extends competitive lifespan.',
      },
    ],
    feedingIntro: [
      'Feed according to the rates shown below.',
      '1 level scoop (15 mL / 1 tablespoon) = approximately 5 g (0.18 oz).',
      'Always provide clean, fresh water and ensure hay or other forage is available at all times.',
      'In the field, horse owners, trainers, and veterinarians have reported that many horses begin showing improvement within 2–4 weeks of consistent use. Some horses may require 6–8 weeks or longer, depending on age, condition, and individual needs.',
      'For horses requiring additional support, a loading dose (double the recommended daily serving) may be fed for up to 10 days. When practical, divide the daily amount into morning (AM) and evening (PM) feedings.',
    ],
    feedingColumns: ['Horse Size', 'Approximate Weight', 'Maintenance', 'Intense Use'],
    feedingValueKeys: ['maintenance', 'intense'],
    feedingRows: [
      { size: 'Small', weight: 'Under 880 lb', maintenance: '3 scoops (≈ 0.54 oz / 15 g)', intense: '4 scoops (≈ 0.71 oz / 20 g)' },
      { size: 'Medium', weight: '880–1,320 lb', maintenance: '4 scoops (≈ 0.71 oz / 20 g)', intense: '5 scoops (≈ 0.88 oz / 25 g)' },
      { size: 'Large', weight: 'Over 1,320 lb', maintenance: '5 scoops (≈ 0.88 oz / 25 g)', intense: '6 scoops (≈ 1.06 oz / 30 g)' },
    ],
    feedingNotes: [
      'For animal use only.',
      'Feeding rates are intended as a general guide and may be adjusted based on the individual horse’s condition, workload, and nutritional requirements.',
      'Store in a cool, dry place away from direct sunlight. Reseal the container securely after each use.',
      'This product is a nutritional supplement and is not an FDA-approved veterinary drug.',
      'Results may vary. Product is intended to support normal joint health and mobility.',
      'Manufactured in a certified facility operating under stringent quality control standards.',
    ],
    faqs: [
      {
        question: 'What is Vetroflex Original and how is it given?',
        answer: 'Vetroflex Original is an equine supplement in the form of a fine powder, administered orally and best mixed with your horse’s feed. A tailored blend of naturally occurring peptides, it is a 100% natural horse joint supplement that helps protect equine joints from wear and tear, supports your horse’s natural ability to stay strong, sound and flexible, and naturally stimulates collagen and proteoglycan production.',
      },
      {
        question: 'How soon will my horse feel an effect from Vetroflex Original?',
        answer: 'This varies by horse, but most owners find Vetroflex Original provides a noticeable effect within 2 to 4 weeks, although some horses may take 6 to 8 weeks or longer. For fast results, use a loading serve — a double-daily serve for up to 10 days.',
      },
      {
        question: 'What about side effects?',
        answer: 'There are no known side effects with Vetroflex Original. It provides the body with collagen, a naturally occurring protein, to support cartilage production and equine joint care. Vetroflex is free from banned substances and can be used safely long term.',
      },
      {
        question: 'What are Vetroflex Original’s key ingredients?',
        answer: 'A targeted, completely natural proprietary peptide blend of hydrolysed collagen. The function of hydrolysed collagen has been studied extensively and has achieved GRAS (Generally Recognised As Safe) status from the FDA.',
      },
      {
        question: 'How long can I give my horse Vetroflex Original for?',
        answer: 'Vetroflex is a 100% natural equine joint supplement which can be fed long-term and will provide greater effect and joint care the longer it is used.',
      },
      {
        question: 'How should I store Vetroflex Original?',
        answer: 'Store in a cool place, keep out of direct sunlight, do not freeze, and use plastic containers and applicators rather than metal ones.',
      },
    ],
  },
  {
    slug: 'vetrofen',
    name: 'VetroFen',
    trademark: 'VetroFen®',
    category: 'Inflammation & Pain Management',
    categorySlug: 'inflammation-pain-management',
    tagline: 'Advanced Inflammation & Pain Management Support',
    price: 69,
    size: '105g / 30 Days',
    heroStat: 'Scutellaria Baicalensis + Acacia Catechu',
    image: '/images/products/vetrofen-tub.webp',
    accent: 'red',
    description:
      'VetroFen® combines powerful plant-derived ingredients with advanced nutritional science to help manage inflammation and discomfort naturally. Designed as a long-term alternative to routine NSAID use, VetroFen supports mobility, comfort, and recovery while working in harmony with the body’s natural healing processes — helping horses remain active, comfortable, and performing at their best.',
    whatItIs: {
      summary:
        'A natural, competition-safe alternative to NSAIDs designed to reduce chronic inflammation at the cellular level—enabling faster healing, mobility, and performance continuity, with no side effects.',
      points: [],
    },
    outcomes: {
      summary: 'Inflammation control without performance trade-offs.',
      points: [
        'Reduces chronic and exercise-induced inflammation',
        'Supports joint comfort, mobility, and freedom of movement',
        'Enables cellular repair processes to activate',
        'Improves willingness to train and compete consistently',
      ],
    },
    impact: {
      points: [
        'Reduces reliance on pharmaceutical intervention (NSAIDs)',
        'Lowers frequency of injections and drug use',
        'Supports preventative, daily-use compliance',
        'Improves training continuity and competitive availability',
      ],
    },
    animalifeDifference:
      'Unlike NSAIDs and steroids, VetroFen controls inflammation without compromising tissue repair, gastric health, or competition eligibility—making it suitable for continuous, long-term use.',
    physiologyPanel: {
      heading: "Supporting Physiology. Not Simply Managing Symptoms.",
      body: 'VetroFen® was developed to support the body’s natural inflammatory processes rather than simply masking their effects. By targeting the physiological systems involved in inflammation, tissue protection, cellular resilience, and recovery, its carefully balanced formulation helps promote comfort, mobility, athletic performance, and long-term wellness. The following chart demonstrates how this physiology-first approach supports the horse at every level.',
    },
    comparison: {
      headline: 'Not All Inflammation Supplements Are Created Equal.',
      subheadline: 'Effective & Safe. The NSAID Alternative.',
      intro: [
        'Some products only mask the problem. VetroFen targets inflammation at the root without the risks of NSAIDs.',
        'Most anti-inflammatory products mask pain by blocking symptoms but may carry serious side effects. VetroFen uses powerful botanical ingredients to help reduce inflammation at the source, support comfort and mobility, and promote long-term joint health—naturally and safely.',
        'VetroFen helps your horse feel better today—and stay sound for tomorrow.',
      ],
      ourLabel: 'VetroFen®',
      ourSubLabel: 'Botanical Anti-Inflammatory — Root-Cause Support',
      otherLabel: 'Other Brands',
      otherSubLabel: 'NSAIDs & Synthetic Products — Symptom Masking',
      rows: [
        {
          title: 'Targets Inflammation at the Source',
          body: 'Botanical ingredients help reduce inflammation at the root—supporting the body’s natural healing process.',
          otherTitle: 'Masks Pain & Inflammation',
          otherBody: 'NSAIDs only block pain signals—they do not address the underlying inflammation or support healing.',
        },
        {
          title: 'Supports Long-Term Joint Health',
          body: 'Promotes lasting comfort, mobility, and cartilage health without compromising the horse’s well-being.',
          otherTitle: 'Risk of Side Effects',
          otherBody: 'Long-term NSAID use can cause ulcers, kidney issues, and other serious side effects.',
        },
        {
          title: 'Safe for Long-Term Use',
          body: 'Gentle, natural ingredients that are safe for daily use and show benefits over time.',
          otherTitle: 'Not Ideal for Daily Use',
          otherBody: 'Many synthetic anti-inflammatories are not safe for prolonged use and can cause cumulative damage.',
        },
        {
          title: 'Supports Full Body Wellness',
          body: 'Helps reduce inflammation throughout the body for improved comfort and performance.',
          otherTitle: 'Focused Only on Pain',
          otherBody: 'Only targets pain signaling pathways without supporting overall inflammatory balance.',
        },
        {
          title: 'Competition Safe',
          body: 'FEI-compliant and free from banned substances.',
          otherTitle: 'Potential Risk',
          otherBody: 'Some NSAIDs may violate competition regulations.',
        },
      ],
    },
    keyIngredients: ['Scutellaria baicalensis extract', 'Acacia catechu extract', 'SOBF Bioavailability Technology'],
    primaryIngredients: [
      { name: 'Scutellaria Baicalensis', origin: 'China', image: '/images/ingredients/vetrofen/scutellaria-baicalensis.jpg' },
      { name: 'Acacia Catechu', origin: 'India', image: '/images/ingredients/vetrofen/acacia-catechu.jpg' },
      { name: 'Flaxseed Oil (Omega-3)', origin: 'Canada', image: '/images/ingredients/vetrofen/flaxseed-oil.jpg' },
      { name: 'Turmeric Extract', origin: 'India', image: '/images/ingredients/vetrofen/turmeric-extract.jpg' },
      { name: 'Boswellia Serrata Extract', origin: 'India', image: '/images/ingredients/vetrofen/boswellia-serrata.jpg' },
      { name: 'Ginger Root Extract', origin: 'India', image: '/images/ingredients/vetrofen/ginger-root.jpg' },
      { name: 'Black Pepper Extract (Piperine)', origin: 'India', image: '/images/ingredients/vetrofen/black-pepper.jpg' },
      { name: 'Vitamin C (Ascorbic Acid)', origin: 'USA', image: '/images/ingredients/vetrofen/vitamin-c.jpg' },
      { name: 'MSM (Methylsulfonylmethane)', origin: 'USA', image: '/images/ingredients/vetrofen/msm.jpg' },
      { name: 'Hyaluronic Acid', origin: 'USA', image: '/images/ingredients/vetrofen/hyaluronic-acid.jpg' },
    ],
    primaryIngredientsFooter: 'Targeted Nutrition for Inflammation Control | Comfort & Mobility | Long-Term Wellness',
    supports: ['Healthy Inflammatory Response', 'Comfort & Mobility', 'Recovery Following Exercise', 'Performance Longevity', 'Overall Wellness'],
    ingredientBenefits: [
      {
        ingredient: 'Scutellaria baicalensis extract; Acacia catechu extract (flavonoid-rich proprietary blend)',
        benefit: 'Potent natural anti-inflammatory action via flavonoids. Reduces pain, swelling, and oxidative stress at the cellular level. Supports joint comfort without reliance on NSAIDs. High bioavailability formulation for rapid absorption.',
        performance: 'Rapid relief from soreness, inflammation, and joint stress. Maintains comfort and mobility during intense training cycles. Enables consistent performance by minimizing pain-related limitations.',
        wellness: 'Supports joint health without long-term side effects associated with NSAIDs. Reduces chronic inflammation and oxidative damage. Improves quality of life and soundness in aging or high-performance horses.',
      },
    ],
    feedingIntro: [
      'Feed according to the rates shown below.',
      '1 heaped scoop = approximately 3.5 g (0.12 oz).',
      'Always provide clean, fresh water and ensure hay or other forage is available at all times.',
      'For horses requiring rapid support for joint comfort and mobility, feed the Initial Loading amount for up to 10 days, followed by the Intense Use amount until the desired response is achieved. Once the horse is comfortable and maintaining normal performance, transition to the Maintenance amount.',
      'For best results, divide the daily serving into morning (AM) and evening (PM) feedings whenever practical.',
    ],
    feedingColumns: ['Horse Size', 'Approximate Weight', 'Initial Loading (10 Days)', 'Maintenance', 'Intense Use'],
    feedingValueKeys: ['loading', 'maintenance', 'intense'],
    feedingRows: [
      { size: 'Small', weight: 'Under 880 lb', loading: '2 heaped scoops (≈ 0.25 oz / 7 g)', maintenance: '½ heaped scoop (≈ 0.06 oz / 1.75 g)', intense: '1 heaped scoop (≈ 0.12 oz / 3.5 g)' },
      { size: 'Average', weight: '880–1,320 lb', loading: '4 heaped scoops (≈ 0.49 oz / 14 g)', maintenance: '1 heaped scoop (≈ 0.12 oz / 3.5 g)', intense: '2 heaped scoops (≈ 0.25 oz / 7 g)' },
      { size: 'Large', weight: 'Over 1,320 lb', loading: '6 heaped scoops (≈ 0.74 oz / 21 g)', maintenance: '2 heaped scoops (≈ 0.25 oz / 7 g)', intense: '3 heaped scoops (≈ 0.37 oz / 10.5 g)' },
    ],
    feedingNotes: [
      'Not to be used in conjunction with NSAIDs (such as phenylbutazone/"Bute") unless directed by your veterinarian.',
      'For animal use only.',
      'Feeding rates are intended as general guidelines and may be adjusted based on the individual horse’s age, workload, condition, and nutritional needs.',
      'Store in a cool, dry place away from direct sunlight. Reseal the container securely after each use.',
      'This product is a nutritional supplement and is not an FDA-approved veterinary drug.',
    ],
    faqs: [
      {
        question: 'Is Vetrofen safe for competition horses?',
        answer: 'Vetrofen is free from Devil’s Claw and contains no prohibited substances, offering a safe alternative for horses competing under FEI and other governing body rules. Competitors remain responsible for complying with their own governing body regulations.',
      },
      {
        question: 'What is Vetrofen Intense and how is it given?',
        answer: 'Vetrofen Intense is a natural horse supplement with Scutellaria baicalensis and Acacia catechu that targets joint inflammation, recovery, comfort and wellbeing. It is a fine powder administered orally, best mixed with your horse’s feed.',
      },
      {
        question: 'How soon will my horse feel an effect from Vetrofen Intense?',
        answer: 'Many horses show a response within 4–5 days, while others may take 5–10 days. For fast results, use a loading serve for up to 10 days, or until a response is seen, followed by a maintenance serving.',
      },
      {
        question: 'Should Vetrofen Intense be given with NSAIDs such as Phenylbutazone?',
        answer: 'No — this could lead to side effects and reduce the effectiveness of Vetrofen Intense. If your horse is already on NSAIDs, reduce the dose by one third every third day over nine days before starting Vetrofen Intense at the maximum recommended serve. Always seek veterinary advice before making changes.',
      },
      {
        question: 'How long can I feed Vetrofen Intense for?',
        answer: 'There are no known side effects associated with long-term use, so it is safe to use for extended periods.',
      },
    ],
  },
  {
    slug: 'vetrofit',
    name: 'VetroFit',
    trademark: 'VetroFit®',
    category: 'Kidney Homeostasis – Oxygen Transport & Recovery',
    categorySlug: 'kidney-homeostasis-oxygen-recovery',
    tagline: 'Oxygen Transport, Endurance & Recovery Support',
    price: 59,
    size: '20ml Syringe',
    heroStat: 'Omega-3 + Superoxide Dismutase',
    image: '/images/products/vetrofit-syringe.webp',
    accent: 'gold',
    description:
      'The kidney is one of the most overlooked performance organs in the horse. VetroFit is scientifically formulated to nourish the physiological processes behind oxygen transport, fluid regulation, electrolyte balance, and recovery — helping horses maximize endurance, accelerate recovery, and maintain peak performance naturally.',
    whatItIs: {
      summary:
        'VetroFit® supports healthy kidney homeostasis - the efficient function of the interconnected systems responsible for monitoring & regulating seven key functions.',
      points: [],
    },
    outcomes: {
      summary: 'Healthy kidney homeostasis supports:',
      points: [
        'Oxygen transport and aerobic endurance',
        'Cardiovascular performance and circulation',
        'Fluid and electrolyte balance',
        'Acid-base regulation',
      ],
    },
    impact: {
      summary: "When the body's physiological systems work together efficiently, performance naturally follows.",
      points: [
        'Perform at their highest potential',
        'Recover more efficiently',
        'Train more consistently',
        'Maintain long-term athletic health',
      ],
    },
    animalifeDifference:
      'Most supplements support one system. VetroFit® supports the system that helps regulate them all.',
    physiologyPanel: {
      heading: 'Every Ingredient Has a Purpose. Every Purpose Supports Performance.',
      body: 'Unlike traditional supplements that emphasize isolated ingredients, VetroFit® is formulated as an integrated nutritional system. Each ingredient is selected for its specific physiological role, working synergistically to support healthy kidney homeostasis and the interconnected biological processes that power performance, recovery, and long-term athletic health.',
    },
    comparison: {
      headline: 'Not All Performance Supplements Are Created Equal.',
      subheadline: 'Kidney Health. Oxygen Transport. Peak Performance.',
      intro: [
        'Some products only stimulate. VetroFit supports the systems that drive endurance, recovery, and results.',
        'VetroFit is kidney-focused nutrition that supports oxygen transport and the body’s seven essential systems for peak performance and faster recovery—naturally and safely.',
        'VetroFit helps your horse perform at its best today—and recover stronger for tomorrow.',
      ],
      ourLabel: 'VetroFit®',
      ourSubLabel: 'Kidney-Centric Nutrition for Peak Performance & Recovery',
      otherLabel: 'Other Brands',
      otherSubLabel: 'Stimulants & General Performance Products',
      rows: [
        {
          title: 'Supports Kidney Homeostasis',
          body: 'Supports the kidneys in maintaining seven vital systems—improving oxygen transport, endurance, and recovery.',
          otherTitle: 'Does Not Support Kidney Function',
          otherBody: 'Most products ignore the kidneys, missing the root cause of reduced performance and slow recovery.',
        },
        {
          title: 'Supports More Efficient Oxygen Transport',
          body: 'Supports red blood cell regulation and optimal oxygen delivery to working muscles.',
          otherTitle: 'No Impact on Oxygen Delivery',
          otherBody: 'Stimulants may mask fatigue but do not improve oxygen transport or red blood cell function.',
        },
        {
          title: 'Improves Endurance & Stamina',
          body: 'Helps horses sustain performance longer with less fatigue and better energy efficiency.',
          otherTitle: 'Temporary Stimulation Only',
          otherBody: 'Many products provide a short-lived boost but can lead to a crash and increased fatigue.',
        },
        {
          title: 'Faster Recovery Between Races',
          body: 'Supports kidney function to remove waste, balance fluids, and restore the body more quickly.',
          otherTitle: 'Slower Recovery',
          otherBody: 'Does not address waste removal or fluid balance—leading to longer recovery times.',
        },
        {
          title: 'Safe, and Natural',
          body: 'Made with natural ingredients free of banned substances (FEI Clean Sport compliant).',
          otherTitle: 'Risky Ingredients',
          otherBody: 'Many stimulants contain banned substances or ingredients that carry competition risks.',
        },
      ],
    },
    keyIngredients: ['Omega-3 (Linseed Oil)', 'Superoxide Dismutase (Melon Extract)', 'Chelated Iron, Copper, Manganese, Zinc, Selenium', 'Amino Acids (Lysine, Methionine)', 'B-Vitamins'],
    primaryIngredients: [
      { name: 'Water', origin: 'Global', image: '/images/ingredients/vetrofit/water.jpg' },
      { name: 'Omega-3 Linseed Oil', origin: 'Canada', image: '/images/ingredients/vetrofit/omega-3-linseed-oil.jpg' },
      { name: 'SOD (Melon Extract)', origin: 'Japan', image: '/images/ingredients/vetrofit/sod-melon-extract.jpg' },
      { name: 'Vitamin E (Tocopherol)', origin: 'Switzerland', image: '/images/ingredients/vetrofit/vitamin-e.jpg' },
      { name: 'Vitamin B1 (Thiamine Mononitrate)', origin: 'Germany', image: '/images/ingredients/vetrofit/vitamin-b1.jpg' },
      { name: 'Vitamin B2 (Riboflavin)', origin: 'Germany', image: '/images/ingredients/vetrofit/vitamin-b2.jpg' },
      { name: 'Folate (Folic Acid)', origin: 'Switzerland', image: '/images/ingredients/vetrofit/folate.jpg' },
      { name: 'Niacinamide (Vitamin B3)', origin: 'Switzerland', image: '/images/ingredients/vetrofit/niacinamide.jpg' },
      { name: 'D-Panthenol (Provitamin B5)', origin: 'Switzerland', image: '/images/ingredients/vetrofit/d-panthenol.jpg' },
      { name: 'Vitamin B6 (Pyridoxine HCl)', origin: 'Germany', image: '/images/ingredients/vetrofit/vitamin-b6.jpg' },
      { name: 'Vitamin K3 (Menadione Sodium Bisulfite)', origin: 'China', image: '/images/ingredients/vetrofit/vitamin-k3.jpg' },
      { name: 'Vitamin A (Retinyl Acetate)', origin: 'Switzerland', image: '/images/ingredients/vetrofit/vitamin-a.jpg' },
      { name: 'Vitamin D3 (Cholecalciferol)', origin: 'Switzerland', image: '/images/ingredients/vetrofit/vitamin-d3.jpg' },
      { name: 'Vitamin B12 (Cyanocobalamin)', origin: 'Germany', image: '/images/ingredients/vetrofit/vitamin-b12.jpg' },
      { name: 'Chelated Minerals (Fe, Cu, Mn, Zn, Se)', origin: 'Global', image: '/images/ingredients/vetrofit/chelated-minerals.jpg' },
    ],
    primaryIngredientsFooter: 'Targeted Nutrition for Kidney Support | Oxygen Transport | Recovery & Endurance | Overall Performance',
    supports: ['Oxygen Delivery', 'Recovery', 'Cardiovascular Efficiency', 'Electrolyte Balance', 'Energy Production', 'Kidney Function', 'Competitive Performance'],
    ingredientBenefits: [
      {
        ingredient: 'Omega-3 (linseed oil); Superoxide Dismutase (melon extract); Vitamins A, B1, B2, B6, B12, C, D3, E, K; Chelated minerals (iron, copper, manganese, zinc, selenium); Amino acids (lysine, methionine)',
        benefit: 'Enhances oxygen transport via iron and B-vitamin support for red blood cell production. Strong antioxidant defense (SOD, vitamins C & E) reduces oxidative stress. Omega-3 supports cardiovascular function and reduces inflammation.',
        performance: 'Improves endurance and aerobic capacity through enhanced oxygen delivery. Delays fatigue and reduces lactic acid accumulation during exertion. Supports sustained energy output and mental focus during performance.',
        wellness: 'Supports cardiovascular health and circulatory efficiency. Reduces long-term oxidative stress and cellular damage. Enhances recovery cycles, promoting consistent performance longevity.',
      },
    ],
    feedingIntro: [
      'FOR COMPETITIONS, feed 30–60ml up to 8 hours before activity, but best 2–4 hours before.',
      'FOR INTENSE DAILY TRAINING & BUILDING UP, feed 5–10ml immediately before exercise to optimize daily performance.',
      'VetroFit contains a rich blend of specialized bio-available trace elements, vitamins, minerals, amino acids and antioxidants in a ratio optimized for improving the training and results of performance horses.',
      'Recommended to trial time of serving and amount to meet your own individual performance needs. Do not exceed 90ml in 24 hours. For ponies administer ½ the recommended serve.',
    ],
    feedingColumns: ['Horse Size', 'Approximate Weight', 'Competition', 'Intense Training'],
    feedingValueKeys: ['competition', 'intense'],
    feedingRows: [
      { size: 'All Sizes', weight: 'Ponies: ½ serve', competition: '30–60ml, 2–4 hrs before', intense: '5–10ml immediately before exercise' },
    ],
    feedingNotes: [
      'Horses and ponies: administer orally, 1 syringe the night before and 1 syringe 2–3 hours prior to activity (½ amount for small ponies).',
      'Not to be used in conjunction with NSAIDs such as Bute (Phenylbutazone) as this could lead to side effects.',
      'For animal use only. Serve provided as a guide only; exact serve is dependent on the individual animal.',
      'Store in a cool dry place out of direct sunlight. Replace lid after use.',
      'This product is not a veterinary medicine subject to authorization.',
    ],
    faqs: [
      {
        question: 'What role does the kidney play in performance?',
        answer: 'The kidneys regulate seven essential physiological systems that influence oxygen transport, hydration, electrolyte balance, acid-base balance, antioxidant defense, recovery, and overall athletic performance — making them one of the most overlooked performance organs in the horse.',
      },
      {
        question: 'Can VetroFit be used alongside NSAIDs?',
        answer: 'VetroFit should not be used in conjunction with NSAIDs such as Bute (Phenylbutazone), as this could lead to side effects. Always consult your veterinarian before making any changes to your horse’s regimen.',
      },
      {
        question: 'How much can I feed in 24 hours?',
        answer: 'Do not exceed 90ml in any 24-hour period. For ponies, administer half the recommended serve.',
      },
    ],
  },
];

export function findProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function productsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}
