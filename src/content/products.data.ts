export interface FeedingRow {
  size: string;
  weight: string;
  [key: string]: string;
}

export interface FaqItem {
  question: string;
  answer: string;
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
  keyIngredients: string[];
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
    image: '/images/shop/cartilage-horse.jpg',
    icons: ['Repair Damaged Cartilage', 'Rebuild Stronger Connective Tissue', 'Protect Long-Term Joint Health', 'Perform Better Mobility & Performance'],
  },
  {
    slug: 'inflammation-pain-management',
    name: 'Inflammation & Pain Relief (NSAID Alternative)',
    short: 'Inflammation Relief',
    strapline: 'Inflammation & Pain Management',
    summary:
      'Lasting comfort begins by supporting the body’s natural inflammatory response. A long-term, natural alternative to routine NSAID use that supports mobility, comfort and recovery.',
    image: '/images/shop/inflammation-horse.jpg',
    icons: ['Target Inflammation at the Source', 'Reduce Swelling & Discomfort', 'Restore Natural Mobility & Flexibility', 'Support Long-Term Joint Health'],
  },
  {
    slug: 'kidney-homeostasis-oxygen-recovery',
    name: 'Kidney Homeostasis Management',
    short: 'Oxygen. Endurance. Recovery.',
    strapline: 'Kidney Homeostasis • Oxygen Transport & Recovery',
    summary:
      'Performance begins long before the muscles go to work. The kidneys regulate red blood cell count, oxygen transport, fluid regulation, electrolyte balance, and recovery.',
    image: '/images/shop/oxygen-horse.jpg',
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
    keyIngredients: [
      'Hydrolyzed Collagen Peptides (Type II)',
      'Prebiotic FOS (Fructooligosaccharides)',
      'MSM',
      'Vitamins A, D3, E, K, C',
      'Biotin, Methionine, L-Carnitine',
    ],
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
    keyIngredients: ['Scutellaria baicalensis extract', 'Acacia catechu extract', 'SOBF Bioavailability Technology'],
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
    keyIngredients: ['Omega-3 (Linseed Oil)', 'Superoxide Dismutase (Melon Extract)', 'Chelated Iron, Copper, Manganese, Zinc, Selenium', 'Amino Acids (Lysine, Methionine)', 'B-Vitamins'],
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
