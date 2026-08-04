export const performanceCascade = [
  {
    phase: 1,
    name: 'Optimal Performance',
    range: '0–1 Furlong',
    body: 'Muscles receive adequate oxygen. Energy production is efficient. Horse feels strong and powerful.',
    tag: 'Oxygen Supply Meets Demand',
    level: 100,
  },
  {
    phase: 2,
    name: 'Oxygen Demand Exceeds Supply',
    range: '1–2 Furlongs',
    body: 'Oxygen demand begins to outpace supply as pace increases.',
    tag: 'Oxygen Demand Exceeds Supply',
    level: 92,
  },
  {
    phase: 3,
    name: 'Lactic Acid Accumulates',
    range: '2–4 Furlongs',
    body: 'Anaerobic metabolism increases. Lactic acid builds up in muscle tissues.',
    tag: 'Lactic Acid Accumulates',
    level: 78,
  },
  {
    phase: 4,
    name: 'Cardiovascular Stress Increases',
    range: '4–5½ Furlongs',
    body: 'Heart rate and blood lactate rise. Cardiovascular system works harder to deliver limited oxygen.',
    tag: 'Cardiovascular Stress Increases',
    level: 62,
  },
  {
    phase: 5,
    name: 'Performance Begins to Decline',
    range: '5½–6½ Furlongs',
    body: 'Fatigue sets in. Stride length shortens. Power and speed begin to fall.',
    tag: 'Performance Declines',
    level: 46,
  },
  {
    phase: 6,
    name: 'Pulmonary Stress Develops',
    range: '6½–7½ Furlongs',
    body: 'Breathing becomes labored. Oxygen exchange efficiency declines.',
    tag: 'Recovery Slows',
    level: 30,
  },
  {
    phase: 7,
    name: 'Recovery Slows & Damage Accumulates',
    range: '7½–8 Furlongs (Finish)',
    body: 'Severe fatigue. Recovery is slow. Long-term structural damage accumulates with repeated stress.',
    tag: 'Long-Term Structural Damage Accumulates',
    level: 18,
  },
];

export const ownersTrainersFace = [
  { icon: 'stethoscope', title: 'Increased veterinary and rehabilitation costs' },
  { icon: 'trend-down', title: 'Loss of high-value equine assets' },
  { icon: 'clock', title: 'Shortened competitive careers' },
  { icon: 'dollar-down', title: 'Reduced earnings potential' },
];

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
