/**
 * Registry of admin-editable "section archetypes." Each Page document holds an ordered
 * list of Section subdocuments; `type` picks which entry here governs how that section
 * is rendered and how its admin edit form works. Phase 1 only populates the 5 types
 * Home needs — Phase 2 extends this as the other ~22 pages migrate onto the same model.
 */
export interface SectionTypeDefinition {
  type: string;
  label: string;
  /** Admin form partial under views/admin/pages/sections/ used to edit this section's `data`. */
  adminPartial: string;
  /** Validates/coerces a raw admin form submission into the section's `data` shape. */
  parseFormData: (body: Record<string, unknown>) => Record<string, unknown>;
}

function toArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (value === undefined || value === null || value === '') return [];
  return [String(value)];
}

/** Home's "Horse Truths" numbered statements: { n, title, body }[] */
const horseTruthsType: SectionTypeDefinition = {
  type: 'horse-truths',
  label: 'Horse Truths (numbered statements)',
  adminPartial: 'pages/sections/_horse-truths',
  parseFormData: (body) => {
    const titles = toArray(body.title);
    const bodies = toArray(body.body);
    return {
      items: titles.map((title, i) => ({ n: i + 1, title, body: bodies[i] ?? '' })),
    };
  },
};

/** Home's "Our Standards" icon grid: { icon, title, line1, line2, body }[] */
const standardsType: SectionTypeDefinition = {
  type: 'standards',
  label: 'Standards (icon grid)',
  adminPartial: 'pages/sections/_standards',
  parseFormData: (body) => {
    const icons = toArray(body.icon);
    const titles = toArray(body.title);
    const line1s = toArray(body.line1);
    const line2s = toArray(body.line2);
    const bodies = toArray(body.body);
    return {
      items: icons.map((icon, i) => ({
        icon,
        title: titles[i] ?? '',
        line1: line1s[i] ?? '',
        line2: line2s[i] ?? '',
        body: bodies[i] ?? '',
      })),
    };
  },
};

/** Testimonial slider: { product, quote, author }[] */
const testimonialSliderType: SectionTypeDefinition = {
  type: 'testimonial-slider',
  label: 'Testimonial Slider',
  adminPartial: 'pages/sections/_testimonial-slider',
  parseFormData: (body) => {
    const products = toArray(body.product);
    const quotes = toArray(body.quote);
    const authors = toArray(body.author);
    return {
      items: quotes.map((quote, i) => ({ product: products[i] ?? '', quote, author: authors[i] ?? '' })),
    };
  },
};

/** Curated "Featured Products" picker: { slug, trademark, category, tagline, price, image }[] */
const productPickerType: SectionTypeDefinition = {
  type: 'product-picker',
  label: 'Featured Products',
  adminPartial: 'pages/sections/_product-picker',
  parseFormData: (body) => {
    const slugs = toArray(body.slug);
    const trademarks = toArray(body.trademark);
    const categories = toArray(body.category);
    const taglines = toArray(body.tagline);
    const prices = toArray(body.price);
    const images = toArray(body.image);
    return {
      items: slugs.map((slug, i) => ({
        slug,
        trademark: trademarks[i] ?? '',
        category: categories[i] ?? '',
        tagline: taglines[i] ?? '',
        price: Number(prices[i]) || 0,
        image: images[i] ?? '',
      })),
    };
  },
};

/** Featured ingredients strip: { name, origin, image }[] */
const ingredientGridType: SectionTypeDefinition = {
  type: 'ingredient-grid',
  label: 'Featured Ingredients',
  adminPartial: 'pages/sections/_ingredient-grid',
  parseFormData: (body) => {
    const names = toArray(body.name);
    const origins = toArray(body.origin);
    const images = toArray(body.image);
    return {
      items: names.map((name, i) => ({ name, origin: origins[i] ?? '', image: images[i] ?? '' })),
    };
  },
};

export const SECTION_TYPES: Record<string, SectionTypeDefinition> = {
  [horseTruthsType.type]: horseTruthsType,
  [standardsType.type]: standardsType,
  [testimonialSliderType.type]: testimonialSliderType,
  [productPickerType.type]: productPickerType,
  [ingredientGridType.type]: ingredientGridType,
};

export function getSectionType(type: string): SectionTypeDefinition | undefined {
  return SECTION_TYPES[type];
}
