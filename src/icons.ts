/**
 * Hand-rolled line-icon set (original paths, not copied from any icon library)
 * so the UI never depends on external image assets or third-party glyphs.
 */
export const icons: Record<string, string> = {
  leaf: '<path d="M20 4c-9 0-15 6-15 14 0 1 .1 1.6.2 2C13 20 20 13 20 4Z"/><path d="M5.5 19.5 18 7"/>',
  'shield-check': '<path d="M12 3l7 3v6c0 4.8-3 8.4-7 9-4-.6-7-4.2-7-9V6l7-3Z"/><path d="M9 12l2 2 4-4"/>',
  flask: '<path d="M9 3h6"/><path d="M10 3v6.2L4.8 18a2 2 0 0 0 1.7 3h11a2 2 0 0 0 1.7-3L14 9.2V3"/><path d="M7.5 15h9"/>',
  beaker: '<path d="M9 2v6L4 19a1.6 1.6 0 0 0 1.4 2.4h13.2A1.6 1.6 0 0 0 20 19L15 8V2"/><path d="M9 2h6"/><path d="M6.5 15h11"/>',
  horseshoe: '<path d="M8 20 6 10a6 6 0 0 1 12 0l-2 10"/><circle cx="6.3" cy="19.7" r="1"/><circle cx="17.7" cy="19.7" r="1"/>',
  cart: '<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M3 4h2l2.2 11.2A2 2 0 0 0 9.2 17h8.6a2 2 0 0 0 2-1.6L21.5 8H6.2"/>',
  user: '<circle cx="12" cy="8" r="3.6"/><path d="M5 20c0-3.9 3.1-6.5 7-6.5s7 2.6 7 6.5"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.3-4.3"/>',
  menu: '<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>',
  close: '<path d="m5 5 14 14"/><path d="m19 5-14 14"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  'chevron-right': '<path d="m9 6 6 6-6 6"/>',
  star: '<path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.7Z"/>',
  check: '<path d="m5 13 4 4 10-10"/>',
  'arrow-right': '<path d="M4 12h16"/><path d="m13 5 7 7-7 7"/>',
  instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1"/>',
  facebook: '<path d="M14 21v-8h2.8l.4-3.4H14V7.4c0-1 .3-1.7 1.8-1.7H17V2.6C16.7 2.5 15.6 2.4 14.4 2.4c-2.6 0-4.4 1.6-4.4 4.5v2.7H7v3.4h3v8Z"/>',
  youtube: '<rect x="2.5" y="6" width="19" height="12" rx="3.5"/><path d="m10.5 9.7 5 2.3-5 2.3Z"/>',
  play: '<circle cx="12" cy="12" r="9"/><path d="m10 8.5 6 3.5-6 3.5Z"/>',
  download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/>',
  'file-text': '<path d="M7 3h7l4 4v14H7Z"/><path d="M14 3v4h4"/><path d="M9.5 13h5"/><path d="M9.5 16.5h5"/>',
  image: '<rect x="3" y="4.5" width="18" height="15" rx="2.5"/><circle cx="8.5" cy="10" r="1.6"/><path d="m4 17 5-5 4 4 3-3 4 4"/>',
  quote: '<path d="M8 9c-2 0-3.5 1.6-3.5 4S6 17 8 17c1 0 1.6-.5 1.6-.5S8 20 4.5 20"/><path d="M17 9c-2 0-3.5 1.6-3.5 4s1.5 4 3.5 4c1 0 1.6-.5 1.6-.5S17 20 13.5 20"/>',
  horse: '<path d="M16 4c1.8 0 3 1.4 3 3 0 1.1-.5 1.9-1.2 2.6L20 12l-2.3 1-.2 3-1.5 5h-2l.6-4.6-2-1.4-3 1-3.5 5H4l3-6-1-3.3C5.4 10.6 5 9.4 5 8c0-2.8 2.4-5 5.5-5 1.6 0 2.8.6 3.6 1.4C14.7 4.2 15.3 4 16 4Z"/>',
  calculator: '<rect x="5" y="2.5" width="14" height="19" rx="2.5"/><path d="M8 6.5h8"/><path d="M8 11h.01"/><path d="M12 11h.01"/><path d="M16 11h.01"/><path d="M8 15h.01"/><path d="M12 15h.01"/><path d="M16 15v3"/><path d="M8 19h.01"/><path d="M12 19h.01"/>',
  handshake: '<path d="m2 12 4-3 3 2 3-3 4 4 4-3 2 3-5 5-4-2-3 3-5-4Z"/>',
  bolt: '<path d="M13 2 5 14h5l-1 8 9-13h-6Z"/>',
};

export function renderIcon(name: string, className = 'w-6 h-6'): string {
  const path = icons[name] ?? icons.leaf;
  return `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
}
