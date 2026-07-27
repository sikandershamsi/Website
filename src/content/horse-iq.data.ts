export interface HorseIQItem {
  type: 'podcast' | 'video' | 'white-paper' | 'infographic';
  title: string;
  description: string;
  meta: string;
}

export const horseIQItems: HorseIQItem[] = [
  {
    type: 'podcast',
    title: 'The Kidney Connection: Oxygen Transport & Recovery',
    description: 'Our nutrition team unpacks why kidney homeostasis is the most overlooked lever in equine performance.',
    meta: 'Podcast · 32 min',
  },
  {
    type: 'podcast',
    title: 'Root Cause vs. Symptom Management in Equine Nutrition',
    description: 'A conversation on why treating the biology beats masking discomfort for long-term soundness.',
    meta: 'Podcast · 28 min',
  },
  {
    type: 'podcast',
    title: 'Ask Ava: Your Equine Nutrition Questions Answered',
    description: 'Listener questions on feeding rates, loading doses, and combining VetroFlex with other supplements.',
    meta: 'Podcast · 21 min',
  },
  {
    type: 'video',
    title: 'How Collagen Peptides Support Cartilage Repair',
    description: 'A visual breakdown of hydrolyzed Type II collagen and its role in joint health.',
    meta: 'Video · 6 min',
  },
  {
    type: 'video',
    title: 'Feeding Guide: Getting VetroFen Dosing Right',
    description: 'Step-by-step walkthrough of loading, maintenance, and intense-use feeding rates.',
    meta: 'Video · 4 min',
  },
  {
    type: 'video',
    title: 'Inside the CleanSport+ Testing Process',
    description: 'A look at how every qualifying product is screened for NOPS and HSPS contamination.',
    meta: 'Video · 8 min',
  },
  {
    type: 'white-paper',
    title: 'Kidney Homeostasis and Athletic Performance in the Racehorse',
    description: 'A review of the seven physiological systems regulated by the equine kidney and their effect on performance.',
    meta: 'White Paper · 14 pages',
  },
  {
    type: 'white-paper',
    title: 'Hydrolyzed Collagen Type II: A Review of the Evidence',
    description: 'Summarizing the research behind collagen peptide supplementation for joint and connective tissue health.',
    meta: 'White Paper · 10 pages',
  },
  {
    type: 'white-paper',
    title: 'Natural Alternatives to NSAIDs in Long-Term Inflammation Management',
    description: 'Examining plant-derived anti-inflammatory compounds including Scutellaria baicalensis and Acacia catechu.',
    meta: 'White Paper · 12 pages',
  },
  {
    type: 'infographic',
    title: 'The Seven Systems Regulated by the Equine Kidney',
    description: 'A visual map of oxygen transport, hydration, electrolyte balance, and more.',
    meta: 'Infographic',
  },
  {
    type: 'infographic',
    title: 'Anatomy of a Stride: Forces Through the Joint',
    description: 'Illustrating how every stride generates forces of up to three times body weight.',
    meta: 'Infographic',
  },
  {
    type: 'infographic',
    title: 'VetroFlex vs. VetroFen vs. VetroFit: At a Glance',
    description: 'A side-by-side comparison of ingredients, benefits, and ideal use cases.',
    meta: 'Infographic',
  },
];
