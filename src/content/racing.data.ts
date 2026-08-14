export const performanceCascade = [
  {
    phase: 1,
    name: 'Optimal Performance',
    range: '0–1 Furlong',
    body: 'Muscles receive adequate oxygen. Energy production is efficient. Horse feels strong and powerful.',
    tag: 'Oxygen Supply Meets Demand',
    level: 100,
    color: '#006837',
    soft: '#d9f0e0',
    icon: 'o2',
    image: '/images/racing/cascade/phase-1-horse.jpg',
  },
  {
    phase: 2,
    name: 'Oxygen Demand Exceeds Supply',
    range: '1–2 Furlongs',
    body: 'Oxygen demand begins to outpace supply as pace increases.',
    tag: 'Oxygen Demand Exceeds Supply',
    level: 95,
    color: '#8cc63f',
    soft: '#eaf6d4',
    icon: 'scale',
    image: '/images/racing/cascade/phase-2-horse.jpg',
  },
  {
    phase: 3,
    name: 'Lactic Acid Accumulates',
    range: '2–4 Furlongs',
    body: 'Anaerobic metabolism increases. Lactic acid builds up in muscle tissues.',
    tag: 'Lactic Acid Accumulates',
    level: 82,
    color: '#fbb03b',
    soft: '#fdeed0',
    icon: 'molecule',
    image: '/images/racing/cascade/phase-3-horse.jpg',
  },
  {
    phase: 4,
    name: 'Cardiovascular Stress Increases',
    range: '4–5½ Furlongs',
    body: 'Heart rate and blood lactate rise. Cardiovascular system works harder to deliver limited oxygen.',
    tag: 'Cardiovascular Stress Increases',
    level: 65,
    color: '#f15a24',
    soft: '#fde0d4',
    icon: 'heart-pulse',
    image: '/images/racing/cascade/phase-4-horse.jpg',
  },
  {
    phase: 5,
    name: 'Performance Begins to Decline',
    range: '5½–6½ Furlongs',
    body: 'Fatigue sets in. Stride length shortens. Power and speed begin to fall.',
    tag: 'Performance Begins to Decline',
    level: 48,
    color: '#ed1c24',
    soft: '#fcd6d8',
    icon: 'chart-down',
    image: '/images/racing/cascade/phase-5-horse.jpg',
  },
  {
    phase: 6,
    name: 'Pulmonary Stress Develops',
    range: '6½–7½ Furlongs',
    body: 'Breathing becomes labored. Oxygen exchange efficiency declines.',
    tag: 'Pulmonary Stress Develops',
    level: 28,
    color: '#c1272d',
    soft: '#f3d4d6',
    icon: 'lungs',
    image: '/images/racing/cascade/phase-6-horse.jpg',
  },
  {
    phase: 7,
    name: 'Recovery Slows & Damage Accumulates',
    range: '7½+ Furlongs (Finish)',
    body: 'Severe fatigue. Recovery is slow. Long-term structural damage accumulates with repeated stress.',
    tag: 'Recovery Slows & Damage Accumulates',
    level: 8,
    color: '#662d91',
    soft: '#eadcf5',
    icon: 'clock',
    image: '/images/racing/cascade/phase-7-horse.jpg',
  },
];

const cascadeColumns = performanceCascade.length;
const cascadeDots = performanceCascade.map((phase, index) => ({
  x: Number((((index + 0.5) / cascadeColumns) * 100).toFixed(4)),
  y: 100 - phase.level,
  color: phase.color,
}));

/**
 * Geometry for the performance-level plot. The line lives in a 0–700 x 0–100
 * viewBox stretched to the plot box, while dots and ticks are positioned in
 * percentages so they stay locked to the seven phase columns above them.
 */
export const cascadePlot = {
  line: [
    ...cascadeDots.map((dot) => `${((dot.x / 100) * 700).toFixed(1)},${dot.y}`),
    '700,98',
  ].join(' '),
  dots: cascadeDots,
  dividers: Array.from({ length: cascadeColumns - 1 }, (_, index) =>
    Number((((index + 1) / cascadeColumns) * 100).toFixed(4)),
  ),
  ticks: [
    { label: 'Start', x: 0 },
    { label: '1', x: 14.2857 },
    { label: '2', x: 28.5714 },
    { label: '4', x: 42.8571 },
    { label: '5\u00bd', x: 57.1429 },
    { label: '6\u00bd', x: 71.4286 },
    { label: '7\u00bd', x: 85.7143 },
    { label: 'Finish', x: 100 },
  ],
};

export const cascadeSummary = [
  { label: 'Oxygen Demand Exceeds Supply', color: '#8cc63f' },
  { label: 'Lactic Acid Accumulates', color: '#fbb03b' },
  { label: 'Cardiovascular Stress Increases', color: '#f15a24' },
  { label: 'Performance Declines', color: '#ed1c24' },
  { label: 'Pulmonary Stress Develops', color: '#c1272d' },
  { label: 'Recovery Slows', color: '#9b5de5' },
  { label: 'Long-Term Structural Damage Accumulates', color: '#b98ce8' },
];

export const ownersTrainersFace = [
  { icon: 'stethoscope', title: 'Increased veterinary and rehabilitation costs' },
  { icon: 'chart-dollar', title: 'Loss of high-value equine assets' },
  { icon: 'horse-clock', title: 'Shortened competitive careers' },
  { icon: 'dollar-down', title: 'Reduced earnings potential' },
];

export const kidneyHomeostasisBanner = {
  titleLead: 'Kidney',
  titleAccent: 'Homeostasis',
  eyebrow: 'The Foundation of Performance',
  body: 'The kidney continually monitors and regulates the body’s essential systems—maintaining the physiological balance required for peak performance, efficient recovery, and long-term athletic health.',
  features: [
    { icon: 'kidney', title: 'Regulates 7 Vital Systems' },
    { icon: 'droplet', title: 'Maintains Physiological Balance' },
    { icon: 'heart-pulse', title: 'Supports Performance & Recovery' },
    { icon: 'shield-cross', title: 'Foundation of Long-Term Athletic Health' },
  ],
};

const kidneyRegulatorFunctions = [
  {
    id: 1,
    title: 'Blood Pressure Regulation',
    body: 'Helps maintain stable blood pressure by controlling fluid balance and vascular resistance.',
    icon: 'heart-pulse',
    tone: 'rose',
  },
  {
    id: 2,
    title: 'Red Blood Cell Regulation',
    body: 'The kidney produces erythropoietin (EPO) to stimulate red blood cell production for optimal oxygen-carrying capacity.',
    icon: 'cells',
    tone: 'rose',
  },
  {
    id: 3,
    title: 'Fluid Balance',
    body: 'Regulates water retention and loss to maintain proper hydration and blood volume.',
    icon: 'droplet',
    tone: 'sky',
  },
  {
    id: 4,
    title: 'Electrolyte Balance',
    body: 'Balances essential electrolytes to support nerve function, muscle contraction, and cellular health.',
    icon: 'molecule',
    tone: 'violet',
  },
  {
    id: 5,
    title: 'Acid-Base Balance',
    body: 'Maintains the body’s acid-base equilibrium for optimal enzyme function and muscle performance.',
    icon: 'gauge',
    tone: 'amber',
  },
  {
    id: 6,
    title: 'Oxygen Transport Support',
    body: 'By supporting red blood cell production and blood flow, the kidney plays a key role in delivering oxygen to working muscles.',
    icon: 'lungs',
    tone: 'sky',
  },
  {
    id: 7,
    title: 'Waste Clearance & Detoxification',
    body: 'Filters and removes metabolic waste, toxins, and byproducts of exercise to keep the body running efficiently.',
    icon: 'kidney',
    tone: 'rose',
  },
];

export const kidneyMasterRegulator = {
  titleLead: 'Kidney',
  titleAccent: 'Homeostasis',
  subtitle: "The Horse’s Master Regulator",
  body: 'The kidney continuously monitors, adjusts, and regulates essential functions to maintain balance in the body. When the kidney is supported, the whole horse performs, recovers, and thrives.',
  legendTitle: 'The Kidney Regulates',
  legendAccent: '7 Core Functions',
  functions: kidneyRegulatorFunctions,
  sideFunctions: kidneyRegulatorFunctions.slice(0, 4),
  bottomFunctions: kidneyRegulatorFunctions.slice(4),
};

export const oxygenTransport = {
  eyebrow: 'The Physiology of Oxygen Transport',
  titleStart: 'Oxygen Is the',
  titleAccent: 'Currency of Performance.',
  body: 'Every second of a race depends on the body’s ability to deliver oxygen efficiently from the lungs to working muscles. Healthy kidney homeostasis helps support the physiological systems that make this possible—regulating blood pressure, red blood cell activity, fluid balance, and circulation to help sustain aerobic performance and delay fatigue.',
  brand: 'VetroFit®',
  tagline: 'Support Physiology.',
  taglineAccent: 'Not Symptoms.',
  journeyTitle: 'The Journey of Oxygen',
  journey: [
    {
      step: 1,
      icon: 'lungs',
      title: 'Oxygen Inhaled',
      body: 'Oxygen enters the lungs with each breath.',
    },
    {
      step: 2,
      icon: 'cells',
      title: 'Oxygen Transported',
      body: 'Red blood cells carry oxygen through the bloodstream.',
    },
    {
      step: 3,
      icon: 'vessels',
      title: 'Oxygen Delivered',
      body: 'Oxygen is delivered to working muscles and organs.',
    },
    {
      step: 4,
      icon: 'fibers',
      title: 'Energy Produced',
      body: 'Oxygen fuels energy production for powerful, sustained performance.',
    },
  ],
  systemsTitle: 'Kidney Homeostasis Supports the Systems That Make Oxygen Delivery Possible',
  systems: [
    {
      icon: 'heart-pulse',
      title: 'Blood Pressure Regulation',
      body: 'Maintains the pressure needed to push oxygen-rich blood where it’s needed most.',
    },
    {
      icon: 'cells',
      title: 'Red Blood Cell Activity',
      body: 'Supports healthy RBC production and oxygen-carrying capacity.',
    },
    {
      icon: 'droplet',
      title: 'Fluid Balance',
      body: 'Maintains proper hydration and blood volume for optimal circulation.',
    },
    {
      icon: 'molecule',
      title: 'Electrolyte Balance',
      body: 'Supports nerve, muscle, and heart function for efficient performance.',
    },
  ],
  benefitsTitle: 'When Oxygen Delivery Is Optimized, Performance Is Maximized.',
  benefits: [
    {
      icon: 'gallop',
      title: 'Sustained Speed',
      body: 'Efficient oxygen delivery helps maintain speed longer.',
    },
    {
      icon: 'gauge',
      title: 'Delayed Fatigue',
      body: 'Better oxygen utilization helps delay the onset of fatigue.',
    },
    {
      icon: 'refresh',
      title: 'Faster Recovery',
      body: 'Supports quicker clearance of metabolic byproducts.',
    },
    {
      icon: 'shield-cross',
      title: 'Long-Term Resilience',
      body: 'Supports the body’s ability to adapt, repair, and thrive under athletic stress.',
    },
  ],
  peakLead: 'Healthy Kidneys. Efficient Oxygen.',
  peakAccent: 'Peak Performance.',
};

const kidneyDistressCallouts = [
  {
    title: 'Fluid & Electrolyte Imbalance',
    body: 'Loss of essential electrolytes and fluid can impair kidney regulation and muscle function.',
    icon: 'droplet',
    tone: 'blue',
  },
  {
    title: 'Reduced Oxygen Transport',
    body: 'Kidney distress can impact red blood cell production and oxygen delivery.',
    icon: 'cells',
    tone: 'orange',
  },
  {
    title: 'Early Fatigue',
    body: 'Imbalances in acid–base balance and waste clearance can lead to muscle fatigue and decreased performance.',
    icon: 'muscle',
    tone: 'blue',
  },
  {
    title: 'Waste Accumulation',
    body: 'When the kidney is overburdened, metabolic waste products can accumulate, slowing recovery and increasing inflammation.',
    icon: 'molecule',
    tone: 'orange',
  },
];

export const kidneyDistressBanner = {
  titleLead: 'Kidney',
  titleAccent: 'Distress',
  subtitle: 'Intense Exercise Places Extreme Demand on the Kidney’s Ability to Maintain Homeostasis',
  body: 'During training and racing, the kidney works harder than almost any other organ to keep the body in balance. When the demand exceeds its capacity, kidney distress can occur—affecting performance, recovery, and overall resilience.',
  stressorsTitle: 'Major Stressors',
  stressors: [
    { icon: 'clock', title: 'High Intensity Exercise' },
    { icon: 'thermometer', title: 'Heat & Humidity' },
    { icon: 'droplet', title: 'Dehydration' },
    { icon: 'o2', title: 'Metabolic Demand' },
    { icon: 'bolt', title: 'Electrolyte Losses' },
  ],
  callouts: kidneyDistressCallouts,
  sideCallouts: kidneyDistressCallouts.slice(0, 3),
  wasteCallout: kidneyDistressCallouts[3],
};

export const industryEffects = [
  { stat: '70–80%', body: 'of racehorses experience Exercise-Induced Pulmonary Hemorrhage (EIPH) at some point in their careers.' },
  { stat: '80–90%', body: 'show musculoskeletal stress markers linked to repeated high-intensity work.' },
  { stat: 'Premature retirement', body: 'often follows unresolved oxygen debt, inflammation, and recovery failure.' },
  { stat: 'Catastrophic injury risk', body: 'rises when physiological balance breaks down under peak load.' },
];

export const homeostasisSystems = [
  { icon: 'droplet', title: 'Red Blood Cell Regulation' },
  { icon: 'heart', title: 'Blood Pressure Regulation' },
  { icon: 'droplet', title: 'Fluid Balance' },
  { icon: 'lungs', title: 'Oxygen Transport & Utilization' },
  { icon: 'orbit', title: 'Electrolyte Balance' },
  { icon: 'scale', title: 'Acid–Base Balance' },
  { icon: 'refresh', title: 'Waste Removal & Detoxification' },
];

export const homeostasisImpact = [
  { icon: 'crosshair', title: 'Optimize', body: 'Kidney Function at the Source' },
  { icon: 'lungs', title: 'Enhance', body: 'Oxygen Delivery & Endurance' },
  { icon: 'bolt', title: 'Speed', body: 'Recovery Between Rounds & Races' },
  { icon: 'horse', title: 'Support', body: 'Peak Performance & Lasting Stamina' },
];

export const homeostasisComparison = {
  normal: {
    label: 'Normal State of Homeostasis',
    tagline: 'Well-Nourished · Hydrated · Balanced · Resilient',
    image: '/images/racing/comparison/kidney-normal.jpg',
    points: [
      { title: 'Optimal Blood Flow', body: 'Healthy circulation ensures efficient filtration and nutrient delivery.' },
      { title: 'Efficient Filtration', body: 'Removes waste products effectively while preserving essential nutrients.' },
      { title: 'Balanced Hydration & Electrolytes', body: 'Maintains fluid balance, electrolytes, and acid-base stability.' },
      { title: 'Supports Oxygen Transport', body: 'Produces erythropoietin (EPO) to support red blood cell production and oxygen delivery.' },
      { title: 'Strong Antioxidant Defense', body: 'Protects kidney cells from oxidative damage and supports recovery.' },
      { title: 'Acid-Base Balance', body: "Keeps the body's pH in the optimal range for peak performance." },
      { title: 'Overall Resilience', body: 'Supports endurance, recovery, and long-term health and soundness.' },
    ],
    resultTitle: 'Result: Optimal Performance',
    result: [
      'Efficient waste removal and toxin clearance',
      'Strong immunity and reduced inflammation',
      'Better endurance, faster recovery, and consistent performance',
      'Long-term protection of vital organs and musculoskeletal system',
    ],
  },
  stress: {
    label: 'Extreme Stress From Intense Training or Competition',
    tagline: 'Physiological Stress · Dehydration · Inflammation · Imbalance',
    image: '/images/racing/comparison/kidney-stress.jpg',
    points: [
      { title: 'Reduced Blood Flow', body: 'Vasoconstriction and dehydration limit oxygen and nutrient delivery.' },
      { title: 'Compromised Filtration', body: 'Waste and metabolic toxins accumulate, increasing systemic stress.' },
      { title: 'Electrolyte & Fluid Imbalance', body: 'Loss of critical electrolytes and fluid can lead to cramps, fatigue, and poor performance.' },
      { title: 'Reduced EPO Production', body: 'Lower red blood cell production leads to decreased oxygen transport and stamina.' },
      { title: 'Oxidative Stress & Inflammation', body: 'Excess free radicals and inflammation damage kidney tissue.' },
      { title: 'Acid-Base Disruption', body: 'Metabolic acidosis impairs muscle function, recovery, and overall performance.' },
      { title: 'Lower Resilience', body: 'Increased risk of fatigue, injury, poor recovery, and long-term health consequences.' },
    ],
    resultTitle: 'Result: Reduced Performance & Recovery',
    result: [
      'Toxin buildup and increased inflammation',
      'Poor hydration and electrolyte loss',
      'Decreased stamina, slower recovery, higher risk of injury',
      'Greater strain on the body and long-term organ damage',
    ],
  },
};

export const vetrofitRacingBanner = {
  brand: 'Animalife',
  product: 'Vetrofit',
  tagline: 'Fast-Acting. Targeted. Results.',
  timingValue: '2–4',
  timingUnit: 'Hours',
  timingNote: 'Before Competition',
  features: [
    { icon: 'kidney', title: 'Supports Healthy Kidney Function' },
    { icon: 'scale', title: 'Maintains Physiological Balance' },
    { icon: 'horse', title: 'Supports Peak Performance & Efficient Recovery' },
  ],
};

export const scienceBehindVetrofit = {
  titleLead: 'The Science Behind',
  titleAccent: 'VetroFit',
  tagline: 'Nature. Research. Results.',
  body: 'We combine the wisdom of nature with advanced nutritional science to create targeted formulations that deliver real, measurable results.',
  image: '/images/racing/science/hero.jpg',
  pillars: [
    {
      icon: 'leaf',
      title: 'Support Natural Regulation',
      text: 'Promote balance through the body\u2019s own intelligent systems.',
    },
    {
      icon: 'shield-plus',
      title: 'Enhance the Body\u2019s Defenses',
      text: 'Strengthen resilience and help defend the animal\u2019s daily demands.',
    },
    {
      icon: 'refresh',
      title: 'Support Natural Repair',
      text: 'Nourish tissues and systems so the body can repair and adapt.',
    },
    {
      icon: 'horse-solid',
      title: 'Support Physiological Balance',
      text: 'Maintain optimal function for sustained performance and recovery.',
    },
    {
      icon: 'chart',
      title: 'Drive Long-Term Results',
      text: 'Sustainable health today for a lifetime of vitality, longevity and beyond.',
    },
    {
      icon: 'moon-ring',
      title: 'Backed by Science & Nature',
      text: 'Formulated with proven research and the finest natural ingredients.',
    },
  ],
};

export const physiologyToFormulation = {
  title: 'From Physiology to Formulation',
  body:
    'Every ingredient in VetroFit\u00ae is selected for a defined physiological purpose. Together, they form a highly bioavailable nutritional system that supports healthy kidney homeostasis\u2014the foundation for efficient oxygen transport, cardiovascular performance, metabolic balance, hydration, and recovery.',
};

export const brandsVsAnimalife = {
  image: '/images/racing/why/hero.jpg',
  before: 'Most brands focus on what the horse is experiencing',
  after: 'Animalife focuses on why it happens',
  features: [
    { icon: 'kidney', title: 'Supports Kidney Function' },
    { icon: 'scale', title: 'Maintains Physiological Balance' },
    { icon: 'gallop', title: 'Supports Peak Performance & Efficient Recovery' },
  ],
};

export const performanceEvaluationBanner = {
  image: '/images/racing/evaluation/hero.jpg',
  eyebrow: 'VetroFit® Performance Evaluation Program',
  title: 'Feel the Difference.',
  subtitle: 'Better Balance. Better Performance. Better Recovery.',
  body: 'Join a select group of professional trainers and owners evaluating VetroFit®—a nutraceutical designed to support kidney homeostasis, physiological balance for optimized performance, recovery and long term wellness.',
  aside: {
    line1: 'Scientific Nutrition.',
    line2: 'Real-World Results.',
    line3: 'Better Outcomes.',
  },
  benefits: [
    { icon: 'kidney', title: 'Supports Kidney Health' },
    { icon: 'droplet', title: 'Optimizes Physiological Balance' },
    { icon: 'gallop', title: 'Ultra Fast Acting' },
    { icon: 'heart-pulse', title: 'Promotes Faster Recovery' },
  ],
  cta: {
    href: '/racing/performance-evaluation',
    lead: 'Applications Now Open',
    sub: 'For a Limited Number of Stables.',
    tagline: 'Your experience. Our science.',
    taglineAccent: 'Better outcomes for every horse.',
  },
};
