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
  primaryIngredientsPanel?: string;
  primaryIngredientsCallouts?: { icon: string; text: string }[];
  comparisonPanel?: string;
  descriptionShowcase?: {
    brandLine: string;
    headline: { text: string; accent?: boolean | 'blue' | 'orange' }[];
    intro: string;
    benefits: { icon: string; html: string }[];
    anatomyImage: string;
    lungsHealthy: { image: string; label: string };
    lungsEiph: { image: string; label: string };
    productLabel?: string;
    outcomesLabel?: string;
    impactLabel?: string;
  };
  kidneyShowcase?: {
    tagline: string;
    intro: string;
    syringeImage: string;
    controlHeading: string;
    controlBody: string;
    helpsHeading: string;
    benefits: { icon: string; html: string }[];
    diagramImage: string;
    callouts: { num: number; title: string; body: string; slot: string }[];
  };
  comparisonShowcase?: {
    body: string;
    subheadlineLead: string;
    subheadlineAccent: string;
    heroImage: string;
    features: { icon: string; label: string }[];
    disclaimer: string;
    rows: { ourImage: string; otherImage: string }[];
  };
  inflammationShowcase?: {
    brandLine: string;
    headline: { text: string; accent?: boolean }[];
    intro: string;
    productLabel: string;
    outcomesLabel: string;
    impactLabel: string;
    anatomyImage: string;
    tissueHealthy: { image: string; barLabel: string; tagLabel: string };
    tissueInflamed: { image: string; barLabel: string; tagLabel: string };
    callouts: { icon: string; html: string }[];
  };
  controlShowcase?: {
    brandLine?: string;
    tagline: string;
    intro: string;
    productImage: string;
    controlHeading: string;
    controlBody: string;
    helpsHeading: string;
    benefits: { icon: string; html: string }[];
    diagramImage: string;
    callouts: { num: number; title: string; body: string; slot: string }[];
  };
  physiologyBenefits?: {
    title: string;
    disclaimer: string;
    columns: string[];
    variant?: 'vetrofen' | 'vetroflex';
    callouts?: { icon: string; text: string }[];
    rows: {
      icon: string;
      system: string;
      nutrition: string;
      physiology: string[];
      performance: string[];
      wellness: string[];
    }[];
  };
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
    name: 'Cartilage & Connective Tissue',
    short: 'Cartilage Repair',
    strapline: 'Strength | Mobility | Longevity',
    accent: 'blue',
    accentLabel: 'Strength | Mobility | Longevity',
    summary:
      'Advanced nutrition that supports the body\u2019s natural ability to repair, rebuild, and protect cartilage and connective tissue\u2014for comfort and long-term healthy performance, every day. For years to come.',
    image: '/images/shop/categories/cartilage.jpg',
    panel: '/images/shop/categories/cartilage-panel.jpg',
    rangeLine: 'VetroFlex\u00ae Range | Joint + Connective Tissue Support',
    cta: 'Shop Category',
    benefits: [
      { icon: 'joint', title: 'Repair', body: 'Damaged Cartilage' },
      { icon: 'orbit', title: 'Strengthen', body: 'Strong Connective Tissue' },
      { icon: 'shield-check', title: 'Protect', body: 'Joints from Wear & Tear' },
      { icon: 'horse', title: 'Perform', body: 'Better Mobility & Performance' },
    ],
    icons: ['Repair Damaged Cartilage', 'Rebuild Stronger Connective Tissue', 'Protect Long-Term Joint Health', 'Perform Better Mobility & Performance'],
  },
  {
    slug: 'inflammation-pain-management',
    name: 'Inflammation & Pain Management',
    short: 'Inflammation Relief',
    strapline: 'Comfort | Mobility | Recovery',
    accent: 'red',
    accentLabel: 'NSAID Alternative',
    summary:
      'Targeted support that helps moderate inflammation and discomfort\u2014so your horse can move freely, recover faster, and perform at its best.',
    image: '/images/shop/categories/inflammation.jpg',
    panel: '/images/shop/categories/inflammation-panel.jpg',
    rangeLine: 'VetroFen\u00ae Range | Inflammation & Pain Management',
    cta: 'Shop Category',
    benefits: [
      { icon: 'crosshair', title: 'Target', body: 'Inflammation at the Source' },
      { icon: 'shield-check', title: 'Reduce', body: 'Swelling & Discomfort' },
      { icon: 'horse', title: 'Restore', body: 'Natural Mobility & Flexibility' },
      { icon: 'clock', title: 'Support', body: 'Long-Term Joint Health' },
    ],
    icons: ['Target Inflammation at the Source', 'Reduce Swelling & Discomfort', 'Restore Natural Mobility & Flexibility', 'Support Long-Term Joint Health'],
  },
  {
    slug: 'kidney-homeostasis-oxygen-recovery',
    name: 'Kidney Homeostasis',
    short: 'Oxygen. Endurance. Recovery.',
    strapline: 'Balance | Performance | Recovery',
    accent: 'gold',
    accentLabel: 'Oxygen Transport',
    summary:
      'Support the kidneys\u2014your horse\u2019s homeostasis engine. VetroFit\u00ae helps maintain fluid balance, regulate electrolytes, transport oxygen, and remove waste\u2014so your horse can perform, recover, and thrive every day.',
    image: '/images/shop/categories/kidney.jpg',
    panel: '/images/shop/categories/kidney-panel.jpg',
    rangeLine: 'VetroFit\u00ae Range | Kidney Homeostasis & Oxygen Transport',
    cta: 'Shop Category',
    benefits: [
      { icon: 'lungs', title: 'Oxygen Transport', body: 'Oxygen Delivery Where It Matters Most' },
      { icon: 'kidney', title: 'Balance', body: 'Fluid & Electrolyte Homeostasis' },
      { icon: 'bolt', title: 'Performance', body: 'Enhanced Stamina, Endurance & Output' },
      { icon: 'horse', title: 'Recovery', body: 'Faster Recovery & Lasting Vitality' },
    ],
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
    descriptionShowcase: {
      brandLine: 'Vetro Collection by animalife™',
      headline: [
        { text: 'Stronger Joints.' },
        { text: 'Restored Mobility.', accent: true },
        { text: 'Built to Last.', accent: 'blue' },
      ],
      intro:
        'A structurally targeted, veterinary-grade nutraceutical engineered to repair cartilage, strengthen connective tissue, and restore soundness for lasting performance longevity.',
      benefits: [
        {
          icon: '/images/vetroflex/desc/benefit-icon-0.png',
          html: 'Drives true <strong>cartilage &amp; connective tissue</strong> repair.',
        },
        {
          icon: '/images/vetroflex/desc/benefit-icon-1.png',
          html: 'Improves durability across <strong>joints, tendons, ligaments, and spine</strong>.',
        },
        {
          icon: '/images/vetroflex/desc/benefit-icon-2.png',
          html: 'Limits <strong>oxidative damage</strong> and progressive degeneration.',
        },
        {
          icon: '/images/vetroflex/desc/benefit-icon-3.png',
          html: 'Supports long-term <strong>soundness</strong> and performance longevity.',
        },
      ],
      anatomyImage: '/images/vetroflex/desc/anatomy-horse.jpg',
      lungsHealthy: {
        image: '/images/vetroflex/desc/cartilage-healthy.jpg',
        label: 'Healthy Cartilage',
      },
      lungsEiph: {
        image: '/images/vetroflex/desc/cartilage-damaged.jpg',
        label: 'Damaged Cartilage',
      },
      productLabel: 'What It Is',
      outcomesLabel: 'What It Delivers',
      impactLabel: 'Why It Wins',
    },
    controlShowcase: {
      tagline: 'Complete Joint & Connective Tissue Support',
      intro:
        'A comprehensive formula designed to help support cartilage repair, joint function, and connective tissue integrity for long-term mobility and performance.',
      productImage: '/images/vetroflex/control/product-tub.jpg',
      controlHeading: "Supporting the Body's Natural Control Center",
      controlBody:
        'VetroFlex® is scientifically formulated to support the joints, cartilage, and connective tissues—key components of the equine movement system.',
      helpsHeading: 'VetroFlex® helps support the internal structures needed for:',
      benefits: [
        {
          icon: 'horse',
          html: '<strong>Stronger joints and cartilage</strong> — Supports repair and resilience',
        },
        {
          icon: 'heart',
          html: '<strong>Improved mobility and performance</strong> — Helps maintain healthy movement',
        },
        {
          icon: 'shield-check',
          html: '<strong>Long-term joint health and comfort</strong> — Supports connective tissue integrity',
        },
      ],
      diagramImage: '/images/vetroflex/control/horse-diagram.jpg',
      callouts: [
        {
          num: 1,
          title: 'Cartilage Repair & Maintenance',
          body: 'Supports the repair and maintenance of healthy cartilage for lasting joint function.',
          slot: 'top',
        },
        {
          num: 2,
          title: 'Joint Comfort & Mobility',
          body: 'Helps maintain joint comfort, flexibility, and a full range of motion.',
          slot: 'top-right',
        },
        {
          num: 3,
          title: 'Connective Tissue Strength',
          body: 'Supports tendons, ligaments, and fascia for strength and resilience.',
          slot: 'right',
        },
        {
          num: 4,
          title: 'Inflammation Balance',
          body: 'Helps support a normal inflammatory response for joint and tissue health.',
          slot: 'bottom-right',
        },
        {
          num: 5,
          title: 'Shock Absorption & Cushioning',
          body: 'Supports synovial fluid and joint cushioning for impact protection.',
          slot: 'bottom',
        },
        {
          num: 6,
          title: 'Bone Health Support',
          body: 'Provides key minerals that support bone density and skeletal strength.',
          slot: 'bottom-left',
        },
        {
          num: 7,
          title: 'Long-Term Performance',
          body: 'Supports the structural integrity needed for endurance, soundness, and peak performance.',
          slot: 'left',
        },
      ],
    },
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
    comparisonShowcase: {
      body: 'Most joint supplements work on the surface—providing temporary lubrication to reduce friction. But real joint health starts beneath the surface. VetroFlex delivers undenatured (native) Collagen Type II peptides that interact with your horse\u2019s immune system to help stimulate cartilage repair and support long-term joint integrity.',
      subheadlineLead: 'Some products only mask the problem.',
      subheadlineAccent: 'VetroFlex helps repair it.',
      heroImage: '/images/vetroflex/compare/hero-horse.jpg',
      features: [
        { icon: '/images/vetroflex/compare/bar-icon-0.png', label: 'Supports Cartilage Repair & Renewal' },
        { icon: '/images/vetroflex/compare/bar-icon-1.png', label: 'Maintains Joint Structure & Strength' },
        { icon: '/images/vetroflex/compare/bar-icon-2.png', label: 'Supports Long-Term Soundness' },
        { icon: '/images/vetroflex/compare/bar-icon-3.png', label: 'Backed by Science Trusted by Professionals' },
      ],
      disclaimer: 'VetroFlex® is a nutritional supplement for horses. Results may vary.',
      rows: [
        {
          ourImage: '/images/vetroflex/compare/row0-our.png',
          otherImage: '/images/vetroflex/compare/row0-other.png',
        },
        {
          ourImage: '/images/vetroflex/compare/row1-our.png',
          otherImage: '/images/vetroflex/compare/row1-other.png',
        },
        {
          ourImage: '/images/vetroflex/compare/row2-our.png',
          otherImage: '/images/vetroflex/compare/row2-other.png',
        },
        {
          ourImage: '/images/vetroflex/compare/row3-our.png',
          otherImage: '/images/vetroflex/compare/row3-other.png',
        },
      ],
    },
    keyIngredients: [
      'Hydrolyzed Collagen Peptides (Type II)',
      'Fructooligosaccharides (FOS)',
      'Apple Cider Vinegar',
      'Manganese, Copper & Zinc',
      'Biotin, Methionine, Garlic, Vitamin E, Selenium',
    ],
    primaryIngredients: [
      { name: 'Hydrolyzed Collagen Peptides (Type II)', origin: 'Bovine', image: '/images/ingredients/vetroflex/hydrolyzed-collagen.jpg' },
      { name: 'Fructooligosaccharides (FOS)', origin: 'Plant', image: '/images/ingredients/vetroflex/fos.jpg' },
      { name: 'Apple Cider Vinegar', origin: 'Apple', image: '/images/ingredients/vetroflex/apple-cider-vinegar.jpg' },
      { name: 'Manganese (Mn)', origin: 'Mineral', image: '/images/ingredients/vetroflex/manganese.jpg' },
      { name: 'Copper (Cu)', origin: 'Mineral', image: '/images/ingredients/vetroflex/copper.jpg' },
      { name: 'Zinc (Zn)', origin: 'Mineral', image: '/images/ingredients/vetroflex/zinc.jpg' },
      { name: 'Biotin', origin: 'Synthetic', image: '/images/ingredients/vetroflex/biotin.jpg' },
      { name: 'Methionine', origin: 'Synthetic', image: '/images/ingredients/vetroflex/methionine.jpg' },
      { name: 'Garlic', origin: 'Plant', image: '/images/ingredients/vetroflex/garlic.jpg' },
      { name: 'Vitamin E', origin: 'Synthetic', image: '/images/ingredients/vetroflex/vitamin-e.jpg' },
      { name: 'Selenium', origin: 'Mineral', image: '/images/ingredients/vetroflex/selenium.jpg' },
    ],
    primaryIngredientsFooter: 'Targeted Nutrition for Cartilage Repair | Joint Comfort & Flexibility | Long-Term Joint Health & Soundness',
    primaryIngredientsCallouts: [
      { icon: 'crosshair', text: 'Targeted Nutrition for Cartilage Repair' },
      { icon: 'joint', text: 'Joint Comfort & Flexibility' },
      { icon: 'horse', text: 'Long-Term Joint Health & Soundness' },
    ],
    physiologyBenefits: {
      title: 'VetroFlex® Physiological Support & Performance Benefits',
      disclaimer:
        'VetroFlex® is a nutritional supplement and not intended to diagnose, treat, cure, or prevent any disease.',
      variant: 'vetroflex',
      columns: [
        'Physiological System',
        'Key Nutritional Support',
        'How VetroFlex® Helps Support Physiology',
        'Performance Benefits',
        'Long-Term Wellness',
      ],
      callouts: [
        { icon: 'crosshair', text: 'Targeted Nutrition for Cartilage Repair' },
        { icon: 'joint', text: 'Joint Comfort & Flexibility' },
        { icon: 'horse', text: 'Long-Term Joint Health & Soundness' },
      ],
      rows: [
        {
          icon: 'joint',
          system: 'Cartilage Repair & Regeneration',
          nutrition: 'Hydrolyzed Collagen Peptides (Type II), Vitamin C, Manganese (Mn), Copper (Cu), Zinc (Zn)',
          physiology: [
            'Provides bioavailable building blocks for cartilage repair',
            'Supports collagen synthesis and cartilage matrix formation',
            'Supports chondrocyte health and cartilage cellular function',
          ],
          performance: [
            'Supports joint function and flexibility',
            'Encourages healthy cartilage repair',
            'Improves mobility and stride comfort',
            'Promotes consistency in training and competition',
          ],
          wellness: [
            'Helps maintain cartilage strength and elasticity',
            'Supports connective tissue health',
            'Promotes long-term soundness and active longevity',
          ],
        },
        {
          icon: 'shield-joint',
          system: 'Connective Tissue Integrity',
          nutrition: 'Hydrolyzed Collagen Peptides (Type II), Methionine, Zinc (Zn), Copper (Cu), Vitamin C',
          physiology: [
            'Supports collagen cross-linking and connective tissue strength',
            'Supports tendons, ligaments and joint capsule integrity',
            'Provides essential cofactors for tissue repair and maintenance',
          ],
          performance: [
            'Supports tendon and ligament strength',
            'Improves joint stability',
            'Enhances overall structural integrity',
            'Supports athletic performance and injury resilience',
          ],
          wellness: [
            'Supports long-term connective tissue health',
            'Helps reduce the risk of soft tissue injury',
            'Promotes lifelong soundness',
          ],
        },
        {
          icon: 'stomach',
          system: 'Gut Health & Nutrient Absorption',
          nutrition: 'Fructooligosaccharides (FOS), Apple Cider Vinegar',
          physiology: [
            'Supports a healthy gut microbiome and digestive environment',
            'Promotes beneficial bacteria growth',
            'Enhances nutrient absorption and digestive efficiency',
          ],
          performance: [
            'Supports optimal nutrient utilization',
            'Promotes digestive comfort',
            'Helps maintain energy and condition',
            'Supports performance consistency',
          ],
          wellness: [
            'Supports long-term digestive health',
            'Promotes overall gut balance',
            'Supports immune function',
          ],
        },
        {
          icon: 'shield-plus',
          system: 'Antioxidant Protection',
          nutrition: 'Vitamin E, Selenium, Garlic',
          physiology: [
            'Helps neutralize free radicals and oxidative stress',
            'Supports cellular health and mitochondrial function',
            'Supports immune system function',
          ],
          performance: [
            'Supports muscle recovery',
            'Reduces exercise-induced oxidative stress',
            'Supports overall performance and training tolerance',
          ],
          wellness: [
            'Promotes long-term cellular health',
            'Supports healthy aging',
            'Supports tissue resilience and repair capacity',
          ],
        },
        {
          icon: 'droplet',
          system: 'Tissue Nourishment & Metabolism',
          nutrition: 'Methionine, Biotin, Manganese (Mn), Zinc (Zn)',
          physiology: [
            'Supports protein synthesis and tissue repair',
            'Supports healthy skin, hooves and connective tissues',
            'Supports normal metabolic function',
          ],
          performance: [
            'Supports tissue repair and adaptation',
            'Promotes healthy skin and hoof quality',
            'Supports strength and athletic output',
          ],
          wellness: [
            'Supports strong, resilient tissues',
            'Promotes healthy skin and coat',
            'Supports hoof integrity',
          ],
        },
        {
          icon: 'refresh',
          system: 'Joint Comfort & Mobility',
          nutrition: 'Apple Cider Vinegar, Garlic, Omega-3 Support (through overall formulation synergy)',
          physiology: [
            'Supports a balanced inflammatory response',
            'Promotes joint comfort and mobility',
            'Supports synovial fluid quality and joint lubrication',
          ],
          performance: [
            'Enhances mobility and stride comfort',
            'Supports flexibility and range of motion',
            'Promotes willingness to perform',
          ],
          wellness: [
            'Supports long-term joint comfort',
            'Helps maintain an active lifestyle',
            'Promotes overall quality of life',
          ],
        },
      ],
    },
    supports: ['Cartilage Health', 'Tendons & Ligaments', 'Joint Comfort', 'Structural Integrity', 'Long-Term Soundness'],
    ingredientBenefits: [
      {
        ingredient:
          'Hydrolyzed Collagen Peptides (Type II), Fructooligosaccharides (FOS), Apple Cider Vinegar, Manganese (Mn), Copper (Cu), Zinc (Zn), Biotin, Methionine, Garlic, Vitamin E, Selenium.',
        benefit:
          'A targeted blend of bioavailable building blocks, prebiotics, organic acids, essential minerals, sulfur amino acids, antioxidants and botanicals that support cartilage repair, collagen synthesis, connective tissue integrity, gut health, and nutrient absorption.',
        performance:
          'Supports joint function and flexibility, encourages healthy cartilage repair, improves mobility and stride comfort, promotes consistency in training and competition, and helps maintain optimal performance.',
        wellness:
          'Helps maintain cartilage strength and elasticity, supports connective tissue health, promotes long-term soundness and active longevity, and helps reduce the risk of age-related joint degeneration.',
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
        "A premium botanical nutritional formulation developed to support the horse's natural inflammatory response, tissue resilience, and long-term mobility.",
      points: [
        'VetroFen® combines scientifically selected plant-derived ingredients to provide targeted nutritional support for healthy inflammatory balance, joint comfort, and recovery.',
      ],
    },
    outcomes: {
      summary: 'Supports Comfort. Mobility. Recovery',
      points: [
        'Supports a healthy inflammatory response following exercise',
        'Helps maintain joint comfort and freedom of movement',
        "Supports the body's natural tissue repair and recovery processes",
        'Supports long-term musculoskeletal wellness',
      ],
    },
    impact: {
      summary: 'A Physiology-First Approach to Long-Term Wellness',
      points: [
        'Supports everyday mobility and athletic comfort',
        'Suitable for long-term daily nutritional support',
        'Supports recovery following normal exercise',
        'FEI competition compliant',
      ],
    },
    animalifeDifference:
      'Many products are formulated to address the signs of discomfort. VetroFen® was formulated to support the physiological processes that help maintain a healthy inflammatory response, tissue integrity, and long-term mobility.',
    inflammationShowcase: {
      brandLine: 'Vetro Collection by animalife®',
      headline: [
        { text: 'Natural Relief' },
        { text: 'Proven Performance', accent: true },
      ],
      intro:
        'A fast-acting, natural anti-inflammatory designed to target pain at its source without the risks associated with traditional NSAIDs.',
      productLabel: 'What It Is',
      outcomesLabel: 'What It Delivers',
      impactLabel: 'Why It Wins',
      anatomyImage: '/images/vetrofen/desc/anatomy-horse.jpg',
      tissueHealthy: {
        image: '/images/vetrofen/desc/tissue-healthy.jpg',
        barLabel: 'Healthy',
        tagLabel: 'Normal',
      },
      tissueInflamed: {
        image: '/images/vetrofen/desc/tissue-inflamed.jpg',
        barLabel: 'Diseased',
        tagLabel: 'Inflammation',
      },
      callouts: [
        {
          icon: '/images/vetrofen/desc/callout-icon-0.png',
          html: 'Designed to Reduce chronic inflammation and oxidative damage at the cellular level.',
        },
        {
          icon: '/images/vetrofen/desc/callout-icon-1.png',
          html: 'Alternative to NSAID\'s with <strong class="text-red-600">NO SIDE EFFECTS</strong>',
        },
        {
          icon: '/images/vetrofen/desc/callout-icon-2.png',
          html: 'High bioavailability formulation for rapid absorption.',
        },
      ],
    },
    controlShowcase: {
      brandLine: 'Vetro Collection by animalife®',
      tagline: 'Natural Inflammation & Pain Management',
      intro:
        'A fast-acting, completely natural supplement scientifically formulated to target inflammation, support comfort, and promote recovery.',
      productImage: '/images/vetrofen/control/product-tub.jpg',
      controlHeading: "Supporting the Body's Natural Control Center",
      controlBody:
        "VetroFen® is formulated with powerful natural ingredients to help calm inflammation, ease discomfort, and support the body's recovery process.",
      helpsHeading: 'VetroFen® helps support:',
      benefits: [
        {
          icon: 'horse',
          html: '<strong>Reduced inflammation and pain</strong> – Supports comfort and mobility.',
        },
        {
          icon: 'heart',
          html: '<strong>Faster recovery and performance</strong> – Helps your horse bounce back quicker.',
        },
        {
          icon: 'shield-check',
          html: '<strong>Long-term health and well-being</strong> – Safe for extended use and daily support.',
        },
      ],
      diagramImage: '/images/vetrofen/control/horse-diagram.jpg',
      callouts: [
        {
          num: 1,
          title: 'Fast-Acting Inflammation Response',
          body: 'Helps quickly reduce inflammation and discomfort.',
          slot: 'top',
        },
        {
          num: 2,
          title: 'Joint Comfort & Flexibility',
          body: 'Supports joint comfort, flexibility, and a full range of motion.',
          slot: 'top-right',
        },
        {
          num: 3,
          title: 'Muscle Recovery & Soreness Relief',
          body: 'Helps reduce muscle soreness and supports faster recovery.',
          slot: 'right',
        },
        {
          num: 4,
          title: 'Natural Pain Relief',
          body: 'Provides natural comfort without the side effects of NSAIDs.',
          slot: 'bottom-right',
        },
        {
          num: 5,
          title: 'Antioxidant Support',
          body: 'Helps combat oxidative stress and supports overall cell health and recovery.',
          slot: 'bottom',
        },
        {
          num: 6,
          title: 'Supports Active Lifestyle',
          body: 'Ideal for performance horses, intense training, and daily activity.',
          slot: 'bottom-left',
        },
        {
          num: 7,
          title: 'Long-Term Wellness',
          body: 'Safe for long-term use to maintain comfort and support healthy inflammatory balance.',
          slot: 'left',
        },
      ],
    },
    physiologyPanel: {
      heading: "Supporting Physiology. Not Simply Managing Symptoms.",
      body: 'VetroFen® was developed to support the body’s natural inflammatory processes rather than simply masking their effects. By targeting the physiological systems involved in inflammation, tissue protection, cellular resilience, and recovery, its carefully balanced formulation helps promote comfort, mobility, athletic performance, and long-term wellness. The following chart demonstrates how this physiology-first approach supports the horse at every level.',
    },
    comparison: {
      headline: 'Not All Inflammatory Supplements Are Created Equal.',
      subheadline: 'Some products mask inflammation. VetroFen helps support a healthy inflammatory response.',
      intro: [
        'Some products only mask the problem. VetroFen targets inflammation at the root without the risks of NSAIDs.',
        'Most anti-inflammatory products mask pain by blocking symptoms but may carry serious side effects. VetroFen uses powerful botanical ingredients to help reduce inflammation at the source, support comfort and mobility, and promote long-term joint health—naturally and safely.',
        'VetroFen helps your horse feel better today—and stay sound for tomorrow.',
      ],
      ourLabel: 'VetroFen®',
      ourSubLabel: 'Botanical Extracts Supporting Healthy Inflammatory Response',
      otherLabel: 'Other Brands',
      otherSubLabel: 'NSAIDs & Steroids Suppressing Inflammation',
      rows: [
        {
          title: "Supports the Body's Natural Response",
          body: 'Helps modulate the inflammatory response, encouraging balanced healing and long-term comfort.',
          otherTitle: 'Suppresses Inflammation',
          otherBody: 'Blocks inflammation to mask symptoms, which can delay or reduce the natural healing process.',
        },
        {
          title: 'Promotes Tissue Recovery & Repair',
          body: "Supports the body's natural ability to repair damaged tissues and maintain joint integrity.",
          otherTitle: 'Does Not Promote Tissue Healing',
          otherBody: 'Does not contribute to tissue repair and may slow or inhibit the healing process.',
        },
        {
          title: 'Supports Long-Term Joint Comfort',
          body: 'Encourages healthy joint function and mobility without compromising long-term health.',
          otherTitle: 'Risk of Long-Term Side Effects',
          otherBody: 'May cause gastric ulceration, kidney stress, and other adverse effects with prolonged use.',
        },
        {
          title: 'Natural, Safe & Competition Legal',
          body: 'FEI & USEF compliant with a proven record of safety and efficacy.',
          otherTitle: 'Restricted & Risky for Competition',
          otherBody: 'Many are prohibited substances with withdrawal times and potential for positive tests.',
        },
      ],
    },
    comparisonShowcase: {
      body: 'VetroFen® is formulated with botanical extracts that help support the body’s natural inflammatory processes and tissue recovery—so horses can stay comfortable, mobile, and competing without the trade-offs of NSAIDs and steroids.',
      subheadlineLead: 'Some products mask inflammation.',
      subheadlineAccent: 'VetroFen helps support a healthy inflammatory response.',
      heroImage: '/images/vetrofen/compare/hero-horse.jpg',
      features: [
        { icon: '/images/vetrofen/compare/bar-icon-0.png', label: 'Supports a Healthy Inflammatory Response' },
        { icon: '/images/vetrofen/compare/bar-icon-1.png', label: 'Promotes Tissue Recovery' },
        { icon: '/images/vetrofen/compare/bar-icon-2.png', label: 'Improves Comfort & Mobility' },
        { icon: '/images/vetrofen/compare/bar-icon-3.png', label: 'Backed by Science Trusted by Professionals' },
      ],
      disclaimer: 'VetroFen® is a nutritional supplement for horses. Results may vary.',
      rows: [
        {
          ourImage: '/images/vetrofen/compare/row0-our.png',
          otherImage: '/images/vetrofen/compare/row0-other.png',
        },
        {
          ourImage: '/images/vetrofen/compare/row1-our.png',
          otherImage: '/images/vetrofen/compare/row1-other.png',
        },
        {
          ourImage: '/images/vetrofen/compare/row2-our.png',
          otherImage: '/images/vetrofen/compare/row2-other.png',
        },
        {
          ourImage: '/images/vetrofen/compare/row3-our.png',
          otherImage: '/images/vetrofen/compare/row3-other.png',
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
      { name: 'Vitamin C (Ascorbic Acid)', origin: 'UK', image: '/images/ingredients/vetrofen/vitamin-c.jpg' },
      { name: 'MSM (Methylsulfonylmethane)', origin: 'USA', image: '/images/ingredients/vetrofen/msm.jpg' },
      { name: 'Hyaluronic Acid', origin: 'USA', image: '/images/ingredients/vetrofen/hyaluronic-acid.jpg' },
    ],
    primaryIngredientsFooter: 'Targeted Nutrition for Inflammation Control | Comfort & Mobility | Long-Term Wellness',
    primaryIngredientsCallouts: [
      { icon: 'crosshair', text: 'Targeted Nutrition for Inflammation Control' },
      { icon: 'joint', text: 'Comfort & Mobility' },
      { icon: 'shield-check', text: 'Long-Term Wellness' },
    ],
    physiologyBenefits: {
      title: 'VetroFen® Physiological Support & Performance Benefits',
      disclaimer:
        'VetroFen® is a nutritional supplement and not intended to diagnose, treat, cure, or prevent any disease.',
      variant: 'vetrofen',
      columns: [
        'Physiological System',
        'Key Nutritional Support',
        'How VetroFen® Helps Support Physiology',
        'Performance Benefits',
        'Long-Term Wellness',
      ],
      callouts: [
        { icon: 'crosshair', text: 'Targeted Nutrition for a Healthy Inflammatory Response' },
        { icon: 'joint', text: 'Comfort & Mobility Without Compromise' },
        { icon: 'shield-check', text: 'Long-Term Health Naturally Supported' },
      ],
      rows: [
        {
          icon: 'shield-flame',
          system: 'Healthy Inflammatory Response',
          nutrition: 'Scutellaria Baicalensis Extract (Baicalin), Acacia Catechu Extracts (Catechins)',
          physiology: [
            'Supports a balanced inflammatory response',
            'Helps modulate key inflammatory mediators',
            'Promotes natural resolution of inflammation',
            'Supports tissue repair and recovery',
          ],
          performance: [
            'Helps maintain comfort and mobility',
            'Supports performance during periods of inflammation',
            'Promotes faster recovery between training and competition',
            'Supports consistent performance',
          ],
          wellness: [
            'Supports long-term joint and soft tissue health',
            'Helps manage chronic inflammation naturally',
            'Promotes overall tissue resilience and longevity',
          ],
        },
        {
          icon: 'joint',
          system: 'Joint Comfort & Mobility',
          nutrition: 'Scutellaria Baicalensis Extract (Baicalin), Acacia Catechu Extracts (Catechins)',
          physiology: [
            'Helps reduce inflammatory mediators associated with joint discomfort',
            'Supports synovial fluid quality and joint lubrication',
            'Supports healthy cartilage and connective tissue environment',
          ],
          performance: [
            'Enhances mobility and range of motion',
            'Supports flexibility and stride efficiency',
            'Promotes willingness to perform',
            'Supports comfort during training and competition',
          ],
          wellness: [
            'Supports long-term joint integrity',
            'Helps maintain connective tissue strength and elasticity',
            'Promotes active longevity and soundness',
          ],
        },
        {
          icon: 'muscle',
          system: 'Muscle Comfort & Recovery',
          nutrition: 'Scutellaria Baicalensis Extract (Baicalin), Acacia Catechu Extracts (Catechins)',
          physiology: [
            'Helps modulate inflammatory response in muscle tissue',
            'Supports reduction of exercise-induced muscle soreness',
            'Promotes natural recovery processes',
          ],
          performance: [
            'Supports muscle comfort and relaxation',
            'Reduces post-exercise stiffness',
            'Promotes faster recovery',
            'Supports optimal training consistency',
          ],
          wellness: [
            'Supports long-term muscle health',
            'Helps reduce cumulative stress on muscles',
            'Promotes overall physical resilience',
          ],
        },
        {
          icon: 'shield-check',
          system: 'Antioxidant & Cellular Protection',
          nutrition: 'Scutellaria Baicalensis Extract (Baicalin), Acacia Catechu Extracts (Catechins)',
          physiology: [
            'Provides potent antioxidant protection',
            'Helps neutralize free radicals',
            'Supports cellular health and integrity',
            'Helps protect tissues from oxidative stress',
          ],
          performance: [
            'Supports endurance and stamina',
            'Helps maintain cellular energy production',
            'Supports optimal athletic output',
            'Supports recovery under stress',
          ],
          wellness: [
            'Promotes long-term cellular health',
            'Supports healthy aging and tissue resilience',
            'Helps reduce oxidative damage over time',
          ],
        },
        {
          icon: 'stomach',
          system: 'Gastric Comfort & Gut Health',
          nutrition: 'Acacia Catechu Extracts (Catechins)',
          physiology: [
            'Supports a healthy gastric environment',
            'Helps maintain normal gut function',
            'Supports mucosal integrity',
            'Helps reduce irritation and oxidative stress in the gut',
          ],
          performance: [
            'Supports appetite and nutrient absorption',
            'Enhances overall comfort',
            'Supports performance consistency',
            'Helps maintain hydration and electrolyte balance',
          ],
          wellness: [
            'Supports long-term gastric health',
            'Promotes digestive comfort',
            'Supports overall gut balance and immunity',
          ],
        },
        {
          icon: 'refresh',
          system: 'Recovery & Adaptation',
          nutrition: 'Scutellaria Baicalensis Extract (Baicalin), Acacia Catechu Extracts (Catechins)',
          physiology: [
            'Supports the body\u2019s natural recovery and adaptation',
            'Helps modulate stress response',
            'Supports immune system function',
          ],
          performance: [
            'Supports faster recovery between efforts',
            'Helps maintain performance during stressful periods',
            'Promotes readiness for training and competition',
          ],
          wellness: [
            'Supports long-term health and resilience',
            'Helps maintain immune balance',
            'Promotes lifelong performance potential',
          ],
        },
      ],
    },
    supports: ['Healthy Inflammatory Response', 'Comfort & Mobility', 'Recovery Following Exercise', 'Performance Longevity', 'Overall Wellness'],
    ingredientBenefits: [
      {
        ingredient:
          'Scutellaria Baicalensis Extract (Baicalin); Acacia Catechu Extracts (Catechins)',
        benefit:
          'Powerful botanical extracts with well-studied bioactive compounds and antioxidant properties. Baicalin helps inhibit inflammatory mediators. Catechins support immune balance and help protect tissues from oxidative stress and damage.',
        performance:
          'Supports a healthy inflammatory response and reduces swelling associated with strenuous activity. Helps increase joint comfort, muscle recovery, and overall mobility. Promotes optimal performance and trainability with greater ease.',
        wellness:
          'Promotes long-term joint and soft tissue health. Supports connective tissue integrity and resilience. Helps manage chronic inflammation naturally. Safe for long-term use and supports consistent well-being and longevity.',
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
    descriptionShowcase: {
      brandLine: 'Vetro Collection by animalife®',
      headline: [
        { text: 'MORE OXYGEN.' },
        { text: 'LESS FATIGUE.', accent: true },
        { text: 'FASTER RECOVERY.', accent: true },
      ],
      intro:
        'A natural performance-optimization nutraceutical engineered to enhance oxygen delivery, aerobic efficiency, and recovery in high-intensity equine athletes.',
      benefits: [
        {
          icon: '/images/vetrofit/desc/benefit-icon-0.png',
          html: 'Enhances <strong>red blood cell</strong> production and hemoglobin efficiency.',
        },
        {
          icon: '/images/vetrofit/desc/benefit-icon-1.png',
          html: 'Improves <strong>oxygen delivery</strong> to working muscle.',
        },
        {
          icon: '/images/vetrofit/desc/benefit-icon-2.png',
          html: 'Reduces <strong>lactic acid</strong> buildup and oxidative stress.',
        },
        {
          icon: '/images/vetrofit/desc/benefit-icon-3.png',
          html: 'Shortens <strong>post-training</strong> and <strong>post-race</strong> recovery cycles.',
        },
      ],
      anatomyImage: '/images/vetrofit/desc/anatomy-horse.jpg',
      lungsHealthy: {
        image: '/images/vetrofit/desc/lungs-healthy.jpg',
        label: 'Healthy Lungs',
      },
      lungsEiph: {
        image: '/images/vetrofit/desc/lungs-eiph.jpg',
        label: 'Exercise-Induced Pulmonary Hemorrhage',
      },
    },
    kidneyShowcase: {
      tagline: 'Kidney Support & Performance Optimization',
      intro:
        'A scientifically formulated nutritional supplement designed to support kidney function, oxygen transport, stamina, and recovery.',
      syringeImage: '/images/vetrofit/kidney/syringe.jpg',
      controlHeading: "Supporting the Body's Natural Control Center",
      controlBody:
        "VetroFit® is formulated to support healthy kidney physiology, helping maintain the body's natural balance during intense exercise and stress.",
      helpsHeading: 'VetroFit® helps support:',
      benefits: [
        {
          icon: '/images/vetrofit/kidney/benefit-icon-0.png',
          html: '<strong>Enhanced stamina and endurance</strong> – Supports oxygen transport and efficient energy use',
        },
        {
          icon: '/images/vetrofit/kidney/benefit-icon-1.png',
          html: '<strong>Faster recovery and hydration balance</strong> – Supports fluid balance and electrolyte regulation',
        },
        {
          icon: '/images/vetrofit/kidney/benefit-icon-2.png',
          html: '<strong>Optimal kidney health and detoxification</strong> – Supports waste clearance and overall performance',
        },
      ],
      diagramImage: '/images/vetrofit/kidney/horse-diagram.jpg',
      callouts: [
        {
          num: 1,
          title: 'Red Blood Cell Support',
          body: 'Supports healthy red blood cell production to enhance oxygen delivery to muscles.',
          slot: 'top',
        },
        {
          num: 2,
          title: 'Detox & Waste Clearance',
          body: 'Supports kidney function to help remove waste and metabolic toxins.',
          slot: 'top-right',
        },
        {
          num: 3,
          title: 'Electrolyte Balance',
          body: 'Helps maintain the proper balance of essential minerals for optimal nerve, muscle, and heart function.',
          slot: 'right',
        },
        {
          num: 4,
          title: 'Fluid Balance & Hydration',
          body: 'Supports proper hydration and fluid balance for blood volume, circulation, and performance.',
          slot: 'bottom-right',
        },
        {
          num: 5,
          title: 'Acid-Base Balance',
          body: 'Helps maintain optimal pH balance for peak performance.',
          slot: 'bottom',
        },
        {
          num: 6,
          title: 'Blood Pressure Support',
          body: 'Maintains healthy blood pressure and vascular function during exercise and stress.',
          slot: 'bottom-left',
        },
        {
          num: 7,
          title: 'Stamina & Metabolic Support',
          body: 'Supports energy metabolism, reduces fatigue, and helps sustain stamina for maximum performance.',
          slot: 'left',
        },
      ],
    },
    physiologyPanel: {
      heading: 'Every Ingredient Has a Purpose. Every Purpose Supports Performance.',
      body: 'Unlike traditional supplements that emphasize isolated ingredients, VetroFit® is formulated as an integrated nutritional system. Each ingredient is selected for its specific physiological role, working synergistically to support healthy kidney homeostasis and the interconnected biological processes that power performance, recovery, and long-term athletic health.',
    },
    comparison: {
      headline: 'Not All Performance Supplements Are Created Equal.',
      subheadline: 'Some products mask the problem. VetroFit helps support kidney homeostasis and performance.',
      intro: [
        'Feel the Difference.',
        'VetroFit supports kidney homeostasis using electrolytes, amino acids, antioxidants & cofactors.',
        'Other brands often rely on stimulants and general additives that may only mask fatigue.',
      ],
      ourLabel: 'VetroFit®',
      ourSubLabel: 'Electrolytes, Amino Acids, Antioxidants & Cofactors — Supporting Kidney Homeostasis',
      otherLabel: 'Other Brands',
      otherSubLabel: 'Stimulants & General Additives That May Only Mask Fatigue',
      rows: [
        {
          title: 'Supports Kidney Homeostasis',
          body: "Provides targeted nutritional support for the kidney's 7 key homeostatic functions.",
          otherTitle: 'Does Not Target Kidney Function',
          otherBody: 'Does not provide specific nutritional support for kidney homeostasis or regulation.',
        },
        {
          title: 'Supports Healthy Red Blood Cell Production',
          body: 'Includes essential nutrients that support healthy red blood cell production for optimal oxygen transport.',
          otherTitle: 'Does Not Support RBC Production',
          otherBody: 'Does not provide nutrients that support healthy red blood cell production.',
        },
        {
          title: 'Supports Aerobic Oxygen Transport',
          body: 'Supports efficient oxygen delivery to muscles for stamina, endurance and peak performance.',
          otherTitle: 'May Stimulate Without Improving Oxygen Use',
          otherBody: 'Often increases stimulants without improving oxygen transport or cellular efficiency.',
        },
        {
          title: 'Supports Recovery & Electrolyte Balance',
          body: 'Helps support fluid balance, electrolyte regulation, and recovery after intense effort.',
          otherTitle: 'May Cause Imbalance or Crash',
          otherBody: 'High stimulants or sugars may lead to electrolyte loss, dehydration, and post-race fatigue.',
        },
        {
          title: 'Natural, Safe & Competition Legal',
          body: 'FEI & USEF compliant with a proven record of safety and efficacy.',
          otherTitle: 'Risk of Prohibited Substances',
          otherBody: 'Some products contain ingredients with withdrawal times or risk positive tests.',
        },
      ],
    },
    comparisonShowcase: {
      body: 'Most performance supplements focus on symptoms or rely on stimulants. VetroFit® is built differently — using nutritional components that support kidney function, healthy red blood cell production, oxygen transport, and recovery so horses can perform and rebound more efficiently.',
      subheadlineLead: 'Some products mask the problem.',
      subheadlineAccent: 'VetroFit helps support kidney homeostasis and performance.',
      heroImage: '/images/vetrofit/compare/hero-horse.jpg',
      features: [
        { icon: '/images/vetrofit/compare/bar-icon-0.png', label: 'Supports Kidney Homeostasis' },
        { icon: '/images/vetrofit/compare/bar-icon-1.png', label: 'Supports Oxygen Transport' },
        { icon: '/images/vetrofit/compare/bar-icon-2.png', label: 'Supports Endurance & Recovery' },
        { icon: '/images/vetrofit/compare/bar-icon-3.png', label: 'Backed by Science Trusted by Professionals' },
      ],
      disclaimer: 'VetroFit® is a nutritional supplement for horses. Results may vary.',
      rows: [
        {
          ourImage: '/images/vetrofit/compare/row0-our.png',
          otherImage: '/images/vetrofit/compare/row0-other.png',
        },
        {
          ourImage: '/images/vetrofit/compare/row1-our.png',
          otherImage: '/images/vetrofit/compare/row1-other.png',
        },
        {
          ourImage: '/images/vetrofit/compare/row2-our.png',
          otherImage: '/images/vetrofit/compare/row2-other.png',
        },
        {
          ourImage: '/images/vetrofit/compare/row3-our.png',
          otherImage: '/images/vetrofit/compare/row3-other.png',
        },
        {
          ourImage: '/images/vetrofit/compare/row4-our.png',
          otherImage: '/images/vetrofit/compare/row4-other.png',
        },
      ],
    },
    keyIngredients: ['Omega-3 (Linseed Oil)', 'Superoxide Dismutase (Melon Extract)', 'Chelated Iron, Copper, Manganese, Zinc, Selenium', 'Amino Acids (Lysine, Methionine)', 'B-Vitamins'],
    primaryIngredients: [
      { name: 'Water', origin: 'Other', image: '/images/ingredients/vetrofit/water.jpg' },
      { name: 'Omega-3 Linseed Oil', origin: 'Plant', image: '/images/ingredients/vetrofit/omega-3-linseed-oil.jpg' },
      { name: 'SOD Melon Extract', origin: 'Plant', image: '/images/ingredients/vetrofit/sod-melon-extract.jpg' },
      { name: 'Vitamin E (Tocopherol)', origin: 'Synthetic', image: '/images/ingredients/vetrofit/vitamin-e.jpg' },
      { name: 'Vitamin B1 (Thiamine Mononitrate)', origin: 'Synthetic', image: '/images/ingredients/vetrofit/vitamin-b1.jpg' },
      { name: 'Vitamin B2 (Riboflavin)', origin: 'Synthetic', image: '/images/ingredients/vetrofit/vitamin-b2.jpg' },
      { name: 'Folate (Folic Acid)', origin: 'Synthetic', image: '/images/ingredients/vetrofit/folate.jpg' },
      { name: 'Niacinamide (Vitamin B3)', origin: 'Synthetic', image: '/images/ingredients/vetrofit/niacinamide.jpg' },
      { name: 'D-Panthenol (Provitamin B5)', origin: 'Synthetic', image: '/images/ingredients/vetrofit/d-panthenol.jpg' },
      { name: 'Vitamin B6 (Pyridoxine HCl)', origin: 'Synthetic', image: '/images/ingredients/vetrofit/vitamin-b6.jpg' },
      { name: 'Vitamin B2 (Riboflavin Sodium Phosphate)', origin: 'Synthetic', image: '/images/ingredients/vetrofit/vitamin-b2-rsp.jpg' },
      { name: 'Vitamin K3 (Menadione Sodium Bisulfite)', origin: 'Synthetic', image: '/images/ingredients/vetrofit/vitamin-k3.jpg' },
      { name: 'Vitamin A/D (Cholecalciferol)', origin: 'Synthetic', image: '/images/ingredients/vetrofit/vitamin-ad.jpg' },
      { name: 'Vitamin B12 (Cyanocobalamin)', origin: 'Synthetic', image: '/images/ingredients/vetrofit/vitamin-b12.jpg' },
      { name: 'Chelated Minerals (Fe, Cu, Mn, Zn, Se)', origin: 'Mineral', image: '/images/ingredients/vetrofit/chelated-minerals.jpg' },
      { name: 'Lysine', origin: 'Synthetic', image: '/images/ingredients/vetrofit/lysine.jpg' },
      { name: 'Methionine', origin: 'Synthetic', image: '/images/ingredients/vetrofit/methionine.jpg' },
    ],
    primaryIngredientsFooter:
      'Targeted Nutrition for Kidney Support & Oxygen Transport | Supports Kidney Homeostasis & Fluid-Electrolyte Balance | Promotes Recovery, Endurance & Overall Wellness',
    primaryIngredientsCallouts: [
      { icon: 'crosshair', text: 'Targeted Nutrition for Kidney Support & Oxygen Transport' },
      { icon: 'kidney', text: 'Supports Kidney Homeostasis & Fluid-Electrolyte Balance' },
      { icon: 'shield-plus', text: 'Promotes Recovery, Endurance & Overall Wellness' },
    ],
    comparisonPanel: '/images/vetrofit/comparison-panel.jpg',
    physiologyBenefits: {
      title: 'VetroFit® Physiological Support & Performance Benefits',
      disclaimer: 'VetroFit® is a nutritional supplement and not intended to diagnose, treat, cure, or prevent any disease.',
      columns: [
        'Physiological System',
        'Key Nutritional Support',
        'How VetroFit® Helps Support Physiology',
        'Performance Benefits',
        'Long-Term Wellness',
      ],
      rows: [
        {
          icon: 'kidney',
          system: 'Kidney Homeostasis',
          nutrition: 'Omega-3 Linseed, Vitamins, Chelated Minerals',
          physiology: [
            'Supports kidney function and filtration',
            'Helps maintain fluid & electrolyte balance',
            'Supports acid-base & metabolic homeostasis during intense exercise',
          ],
          performance: [
            'Supports hydration and recovery',
            'Helps maintain physiological balance under stress',
            'Supports overall endurance capacity',
          ],
          wellness: [
            'Helps maintain healthy kidney function',
            'Promotes resilience and overall physiological balance',
          ],
        },
        {
          icon: 'lungs',
          system: 'Oxygen Transport',
          nutrition: 'Iron, B Vitamins, Amino Acids',
          physiology: [
            'Supports healthy red blood cell production',
            'Supports efficient oxygen utilization',
            'Promotes aerobic capacity',
          ],
          performance: [
            'Enhances endurance and stamina',
            'Supports efficient oxygen delivery to working muscles',
            'Promotes sustained performance',
          ],
          wellness: [
            'Promotes healthy oxygen-carrying capacity',
            'Supports vitality throughout training and competition',
          ],
        },
        {
          icon: 'heart-pulse',
          system: 'Cardiovascular Function',
          nutrition: 'Omega-3, Selenium, Chelated Minerals',
          physiology: [
            'Supports healthy circulation',
            'Supports vascular function',
            'Helps maintain cardiovascular efficiency',
          ],
          performance: [
            'Helps sustain cardiovascular performance',
            'Supports efficient blood flow',
            'Promotes exercise tolerance',
          ],
          wellness: [
            'Supports long-term heart and circulatory health',
            'Promotes cardiovascular resilience',
          ],
        },
        {
          icon: 'bolt',
          system: 'Cellular Energy & Metabolism',
          nutrition: 'B Vitamins, Amino Acids, Trace Minerals',
          physiology: [
            'Supports cellular energy production',
            'Supports nutrient utilization',
            'Supports normal metabolic function',
          ],
          performance: [
            'Supports efficient energy production',
            'Promotes stamina and power',
            'Supports optimal athletic output',
          ],
          wellness: [
            'Helps maintain metabolic efficiency',
            'Supports long-term vitality',
          ],
        },
        {
          icon: 'shield-check',
          system: 'Antioxidant Defense',
          nutrition: 'Superoxide Dismutase (SOD), Vitamin E, Selenium',
          physiology: [
            'Helps neutralize free radicals',
            'Helps protect cells from oxidative stress',
            'Supports cellular integrity',
          ],
          performance: [
            'Supports muscle recovery',
            'Reduces oxidative stress',
            'Supports cellular protection',
          ],
          wellness: [
            'Promotes long-term cellular health',
            'Supports healthy aging and tissue resilience',
          ],
        },
        {
          icon: 'droplet',
          system: 'Fluid & Electrolyte Balance',
          nutrition: 'Electrolytes, Chelated Minerals',
          physiology: [
            'Supports hydration status',
            'Helps maintain electrolyte balance',
            'Supports neuromuscular function',
          ],
          performance: [
            'Supports recovery and hydration',
            'Supports muscle function',
            'Promotes exercise tolerance',
          ],
          wellness: [
            'Helps maintain fluid and electrolyte balance long-term',
            'Supports overall physiological stability',
          ],
        },
        {
          icon: 'refresh',
          system: 'Recovery Physiology',
          nutrition: 'Complete VetroFit® Formulation',
          physiology: [
            'Supports the body\u2019s natural recovery processes',
            'Supports tissue repair and adaptation',
            'Supports immune function',
          ],
          performance: [
            'Helps horses recover efficiently between efforts',
            'Supports readiness for training and competition',
          ],
          wellness: [
            'Supports long-term performance consistency',
            'Promotes athletic longevity',
          ],
        },
      ],
    },
    supports: ['Oxygen Delivery', 'Recovery', 'Cardiovascular Efficiency', 'Electrolyte Balance', 'Energy Production', 'Kidney Function', 'Competitive Performance'],
    ingredientBenefits: [
      {
        ingredient:
          'Water, Omega-3 Linseed Oil, SOD Melon Extract, Vitamin E (Tocopherol), Vitamin B1 (Thiamine Mononitrate), Vitamin B2 (Riboflavin), Folate (Folic Acid), Niacinamide (Vitamin B3), D-Panthenol (Provitamin B5), Vitamin B6 (Pyridoxine HCl), Vitamin B2 (Riboflavin Sodium Phosphate), Vitamin K3 (Menadione Sodium Bisulfite), Vitamin A/D (Cholecalciferol), Vitamin B12 (Cyanocobalamin), Chelated Minerals (Fe, Cu, Mn, Zn, Se), Lysine, Methionine',
        benefit:
          'A comprehensive blend of vitamins, minerals, essential amino acids, antioxidants and electrolytes that support oxygen transport, red blood cell production, energy metabolism, kidney homeostasis, fluid and electrolyte balance, acid-base balance, immune function and recovery.',
        performance:
          'Supports healthy kidney function and circulation, enhances aerobic oxygen transport and red blood cell regulation, helps maintain hydration and electrolyte balance, supports energy production and utilization, reduces fatigue, and promotes faster recovery and sustained performance.',
        wellness:
          'Helps maintain kidney health and proper fluid balance, supports cardiovascular and metabolic health, promotes long-term soundness and vitality, enhances resilience to physical stress, and supports overall wellness and longevity.',
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
