export const performanceCascade = [
  {
    phase: 1,
    name: 'Optimal Performance',
    range: '0–1 Furlong',
    body: 'Muscles receive adequate oxygen. Energy production is efficient. Horse feels strong and powerful.',
    tag: 'Oxygen Supply Meets Demand',
    level: 100,
    color: '#006837',
    soft: '#d4eddc',
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
    soft: '#e8f2d4',
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
    soft: '#fbecd0',
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
    soft: '#fbd9cb',
    icon: 'heart',
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
    soft: '#f8d0d1',
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
    soft: '#efd0d2',
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
    soft: '#e4d4ef',
    icon: 'clock',
    image: '/images/racing/cascade/phase-7-horse.jpg',
  },
];

export const cascadeSummary = [
  { label: 'Oxygen Demand Exceeds Supply', color: '#8cc63f' },
  { label: 'Lactic Acid Accumulates', color: '#fbb03b' },
  { label: 'Cardiovascular Stress Increases', color: '#f15a24' },
  { label: 'Performance Declines', color: '#ed1c24' },
  { label: 'Pulmonary Stress Develops', color: '#c1272d' },
  { label: 'Recovery Slows', color: '#662d91' },
  { label: 'Long-Term Structural Damage Accumulates', color: '#7b3fa8' },
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
  },
  {
    id: 2,
    title: 'Red Blood Cell Regulation',
    body: 'The kidney produces erythropoietin (EPO) to stimulate red blood cell production for optimal oxygen-carrying capacity.',
    icon: 'droplet',
  },
  {
    id: 3,
    title: 'Fluid Balance',
    body: 'Regulates water retention and loss to maintain proper hydration and blood volume.',
    icon: 'droplet',
  },
  {
    id: 4,
    title: 'Electrolyte Balance',
    body: 'Balances essential electrolytes to support nerve function, muscle contraction, and cellular health.',
    icon: 'orbit',
  },
  {
    id: 5,
    title: 'Acid-Base Balance',
    body: 'Maintains the body’s acid-base equilibrium for optimal enzyme function and muscle performance.',
    icon: 'scale',
  },
  {
    id: 6,
    title: 'Oxygen Transport Support',
    body: 'By supporting red blood cell production and blood flow, the kidney plays a key role in delivering oxygen to working muscles.',
    icon: 'lungs',
  },
  {
    id: 7,
    title: 'Waste Clearance & Detoxification',
    body: 'Filters and removes metabolic waste, toxins, and byproducts of exercise to keep the body running efficiently.',
    icon: 'kidney',
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
      icon: 'droplet',
      title: 'Oxygen Transported',
      body: 'Red blood cells carry oxygen through the bloodstream.',
    },
    {
      step: 3,
      icon: 'orbit',
      title: 'Oxygen Delivered',
      body: 'Oxygen is delivered to working muscles and organs.',
    },
    {
      step: 4,
      icon: 'muscle',
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
      icon: 'molecule',
      title: 'Red Blood Cell Activity',
      body: 'Supports healthy RBC production and oxygen-carrying capacity.',
    },
    {
      icon: 'droplet',
      title: 'Fluid Balance',
      body: 'Maintains proper hydration and blood volume for optimal circulation.',
    },
    {
      icon: 'orbit',
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
  peak: 'Healthy Kidneys. Efficient Oxygen. Peak Performance.',
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
    points: [
      { title: 'Optimal Blood Flow', body: 'Healthy circulation ensures efficient filtration and nutrient delivery.' },
      { title: 'Efficient Filtration', body: 'Removes waste products effectively while preserving essential nutrients.' },
      { title: 'Balanced Hydration & Electrolytes', body: 'Maintains fluid balance, electrolytes, and acid-base stability.' },
      { title: 'Supports Oxygen Transport', body: 'Produces erythropoietin (EPO) to support red blood cell production and oxygen delivery.' },
      { title: 'Strong Antioxidant Defense', body: 'Protects kidney cells from oxidative damage and supports recovery.' },
      { title: 'Acid-Base Balance', body: "Keeps the body's pH in the optimal range for peak performance." },
      { title: 'Overall Resilience', body: 'Supports endurance, recovery, and long-term health and soundness.' },
    ],
    result: ['Efficient waste removal and toxin clearance', 'Strong immunity and reduced inflammation', 'Better endurance, faster recovery, and consistent performance', 'Long-term protection of vital organs and musculoskeletal system'],
  },
  stress: {
    label: 'Extreme Stress From Intense Training or Competition',
    tagline: 'Physiological Stress · Dehydration · Inflammation · Imbalance',
    points: [
      { title: 'Reduced Blood Flow', body: 'Vasoconstriction and dehydration limit oxygen and nutrient delivery.' },
      { title: 'Compromised Filtration', body: 'Waste and metabolic toxins accumulate, increasing systemic stress.' },
      { title: 'Electrolyte & Fluid Imbalance', body: 'Loss of critical electrolytes and fluid can lead to cramps, fatigue, and poor performance.' },
      { title: 'Reduced EPO Production', body: 'Lower red blood cell production leads to decreased oxygen transport and stamina.' },
      { title: 'Oxidative Stress & Inflammation', body: 'Excess free radicals and inflammation damage kidney tissue.' },
      { title: 'Acid-Base Disruption', body: 'Metabolic acidosis impairs muscle function, recovery, and overall performance.' },
      { title: 'Lower Resilience', body: 'Increased risk of fatigue, injury, poor recovery, and long-term health consequences.' },
    ],
    result: ['Toxin buildup and increased inflammation', 'Poor hydration and electrolyte loss', 'Decreased stamina, slower recovery, higher risk of injury', 'Greater strain on the body and long-term organ damage'],
  },
};
