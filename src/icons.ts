/**
 * Hand-rolled line-icon set (original paths, not copied from any icon library)
 * so the UI never depends on external image assets or third-party glyphs.
 */
export const icons: Record<string, string> = {
  leaf: '<path d="M20 4c-9 0-15 6-15 14 0 1 .1 1.6.2 2C13 20 20 13 20 4Z"/><path d="M5.5 19.5 18 7"/>',
  'shield-check': '<path d="M12 3l7 3v6c0 4.8-3 8.4-7 9-4-.6-7-4.2-7-9V6l7-3Z"/><path d="M9 12l2 2 4-4"/>',
  trophy:
    '<path d="M8 4h8v3.2c0 2.4-1.6 4.4-4 4.8-2.4-.4-4-2.4-4-4.8V4Z"/><path d="M8 5.2H5.5A2.5 2.5 0 0 0 5.5 10c1 0 1.8-.4 2.3-1"/><path d="M16 5.2h2.5A2.5 2.5 0 0 1 18.5 10c-1 0-1.8-.4-2.3-1"/><path d="M12 12.2V15"/><path d="M9 20h6"/><path d="M10.5 15h3c.8 0 1.5.7 1.5 1.5v.8H9v-.8c0-.8.7-1.5 1.5-1.5Z"/>',
  'shield-bars':
    '<path d="M12 3l7 3v6c0 4.8-3 8.4-7 9-4-.6-7-4.2-7-9V6l7-3Z"/><path d="M9 10.5h6"/><path d="M9 13h6"/><path d="M9 15.5h6"/>',
  flask: '<path d="M9 3h6"/><path d="M10 3v6.2L4.8 18a2 2 0 0 0 1.7 3h11a2 2 0 0 0 1.7-3L14 9.2V3"/><path d="M7.5 15h9"/>',
  beaker: '<path d="M9 2v6L4 19a1.6 1.6 0 0 0 1.4 2.4h13.2A1.6 1.6 0 0 0 20 19L15 8V2"/><path d="M9 2h6"/><path d="M6.5 15h11"/>',
  mortar: '<path d="M5 14c0 3.5 3.1 6 7 6s7-2.5 7-6"/><path d="M4.5 14h15"/><path d="M8 14V9.5c0-1.2.7-2.2 2.2-2.8"/><path d="m14.5 4 2.2 5.2"/>',
  horseshoe: '<path d="M8 20 6 10a6 6 0 0 1 12 0l-2 10"/><circle cx="6.3" cy="19.7" r="1"/><circle cx="17.7" cy="19.7" r="1"/>',
  'horseshoe-check': '<path d="M8 20 6 10a6 6 0 0 1 12 0l-2 10"/><circle cx="6.3" cy="19.7" r="1"/><circle cx="17.7" cy="19.7" r="1"/><path d="m9.5 12.5 2 2 3.5-3.5"/>',
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
  'arrow-left': '<path d="M20 12H4"/><path d="m11 5-7 7 7 7"/>',
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
  stethoscope: '<path d="M6 4v7a4 4 0 0 0 8 0V4"/><path d="M6 4H4.5"/><path d="M14 4h1.5"/><path d="M18 12v2.5a3.5 3.5 0 1 1-7 0V13"/><circle cx="18" cy="8.5" r="2.5"/>',
  camera: '<path d="M4.5 8.5h2l1.4-2h8.2l1.4 2H19.5A1.5 1.5 0 0 1 21 10v8a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18v-8a1.5 1.5 0 0 1 1.5-1.5Z"/><circle cx="12" cy="14" r="3.2"/>',
  hands: '<path d="M8 11V7.5a1.5 1.5 0 0 1 3 0V11"/><path d="M11 10.5V6.8a1.5 1.5 0 0 1 3 0V11"/><path d="M14 10V7.2a1.5 1.5 0 0 1 3 0V13c0 3.2-2.2 5.5-5 6.5-2.8-1-5-3.3-5-6.5v-1"/><path d="M8 13.5c-1.2-.2-2-.9-2-2V9.2a1.2 1.2 0 0 1 2.4 0V12"/>',
  calculator: '<rect x="5" y="2.5" width="14" height="19" rx="2.5"/><path d="M8 6.5h8"/><path d="M8 11h.01"/><path d="M12 11h.01"/><path d="M16 11h.01"/><path d="M8 15h.01"/><path d="M12 15h.01"/><path d="M16 15v3"/><path d="M8 19h.01"/><path d="M12 19h.01"/>',
  handshake: '<path d="m2 12 4-3 3 2 3-3 4 4 4-3 2 3-5 5-4-2-3 3-5-4Z"/>',
  bolt: '<path d="M13 2 5 14h5l-1 8 9-13h-6Z"/>',
  heart: '<path d="M12 20s-7-4.4-9.2-8.2C1 9.2 2.2 6 5.4 6c1.9 0 3.1 1.1 3.8 2.1C10 7.1 11.2 6 13.1 6c3.2 0 4.4 3.2 2.6 5.8C19 15.6 12 20 12 20Z"/>',
  'shield-plus': '<path d="M12 3l7 3v6c0 4.8-3 8.4-7 9-4-.6-7-4.2-7-9V6l7-3Z"/><path d="M12 9v6"/><path d="M9 12h6"/>',
  refresh: '<path d="M20 11a8 8 0 1 1-2.2-5.5"/><path d="M20 4v5h-5"/><path d="M12 8v4l2.5 1.5"/>',
  'repair-cycle': '<path d="M12 8v8"/><path d="M8 12h8"/><path d="M19.4 10A8 8 0 1 0 18 16.5"/><path d="M19.4 6.5V10H16"/>',
  chart: '<path d="M4 19h16"/><path d="M7 16V11"/><path d="M12 16V7"/><path d="M17 16v-4"/><path d="m14 9 3-3 2 2"/>',
  orbit: '<circle cx="12" cy="12" r="2.2"/><circle cx="12" cy="12" r="6.5" stroke-dasharray="1.6 2.2"/><circle cx="12" cy="12" r="10" stroke-dasharray="1.2 2.8"/>',
  crosshair: '<circle cx="12" cy="12" r="7"/><path d="M12 3v3"/><path d="M12 18v3"/><path d="M3 12h3"/><path d="M18 12h3"/><circle cx="12" cy="12" r="1.6"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/><path d="m16.5 7.5 1.2-1.2"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
  phone: '<path d="M8.2 3.8 10 3l2.2 4.8-1.7 1a12.5 12.5 0 0 0 4.7 4.7l1-1.7L21 14l-.8 1.8c-.4.9-1.4 1.5-2.4 1.4C10.6 16.5 7.5 13.4 6.8 6.2c-.1-1 .5-2 1.4-2.4Z"/>',
  'map-pin': '<path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.8 2.5 4.2 5.5 4.2 9S14.8 18.5 12 21c-2.8-2.5-4.2-5.5-4.2-9S9.2 5.5 12 3Z"/>',
  'trend-down': '<path d="M4 7 10 13l3-3 7 7"/><path d="M17 10v7h-7"/>',
  'dollar-down': '<circle cx="12" cy="12" r="9"/><path d="M12 7v10"/><path d="M9.5 15c0 1.1 1.1 2 2.5 2s2.5-.9 2.5-2c0-3-5-2-5-5 0-1.1 1.1-2 2.5-2s2.5.9 2.5 2"/>',
  lungs: '<path d="M12 3v7"/><path d="M12 10c-2 0-3 2-3 5v3a2 2 0 0 1-4 0v-6c0-3 2-5 4-6"/><path d="M12 10c2 0 3 2 3 5v3a2 2 0 0 0 4 0v-6c0-3-2-5-4-6"/>',
  droplet: '<path d="M12 3c3 4 6 8 6 11.5A6 6 0 0 1 6 14.5C6 11 9 7 12 3Z"/>',
  scale: '<path d="M12 3v18"/><path d="M6 7h12"/><path d="M6 7 3.5 13a2.5 2.5 0 0 0 5 0Z"/><path d="M18 7l-2.5 6a2.5 2.5 0 0 0 5 0Z"/>',
  joint:
    '<path d="M7.2 6.2c-2.3 0-4.2 1.9-4.2 4.2s1.9 4.2 4.2 4.2c1.1 0 2.1-.4 2.8-1.2l4.8-4.8c.7-.8 1.7-1.2 2.8-1.2 2.3 0 4.2 1.9 4.2 4.2s-1.9 4.2-4.2 4.2c-1.1 0-2.1-.4-2.8-1.2"/><circle cx="12" cy="12" r="1.8"/>',
  'shield-flame':
    '<path d="M12 3l7 3v6c0 4.8-3 8.4-7 9-4-.6-7-4.2-7-9V6l7-3Z"/><path d="M12 15.8c1.7-1.9 2.6-3.3 2.6-4.6 0-1.2-.9-2-2-2-.6 0-1.1.3-1.5.8-.4-.5-.9-.8-1.5-.8-1.1 0-2 .8-2 2 0 1.3.9 2.7 2.6 4.6Z"/>',
  muscle:
    '<path d="M8.2 7.2c0-1.8 1.4-3.2 3.2-3.2.9 0 1.7.4 2.2 1 .6-.7 1.5-1.2 2.6-1.2 2 0 3.5 1.7 3.5 3.8 0 2.4-1.3 3.9-2.8 5.1L14.2 15v3.5h-3.4V15L8.2 12.5C6.9 11.4 6 9.9 6 8.2c0-.4.2-.7.5-.9"/><path d="M9.2 18.5h6.6"/><path d="M10.5 10.2c.6.8 1.5 1.3 2.5 1.3"/>',
  'shield-joint':
    '<path d="M12 3l7 3v6c0 4.8-3 8.4-7 9-4-.6-7-4.2-7-9V6l7-3Z"/><path d="M9.2 9.2c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5c.7 0 1.3-.3 1.7-.7l2.8-2.8c.4-.5 1-.7 1.7-.7 1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5c-.7 0-1.3-.3-1.7-.7"/><circle cx="12" cy="12" r="1.1"/>',
  stomach:
    '<path d="M9 5.5c0-1.2 1-2 2.4-2h1.2c2.2 0 3.6 1.5 3.6 3.6 0 1.3-.5 2.2-1.2 3.1l1.4 1.6c1.4 1.2 2.3 2.6 2.3 4.3 0 2.1-1.7 3.4-3.8 3.4h-3.2c-2.6 0-4.6-1.9-4.6-4.8 0-1.8.7-3 1.8-4.1L8 9.2C7.4 8.3 7 7.3 7 6.2"/><path d="M11.2 14.5c.5.6 1.2 1 2 1"/>',
  kidney:
    '<path d="M14.2 4.2c-3.1 0-5.6 3.5-5.6 7.8 0 2.4.8 4.5 2 5.8-.9.5-1.5 1.4-1.5 2.5 0 1.6 1.4 2.8 3.2 2.8 2.8 0 5-2.9 5-7.2 0-4.3-1.6-11.7-3.1-11.7Z"/>',
};

export function renderIcon(name: string, className = 'w-6 h-6'): string {
  if (name === 'star-solid') {
    return `<svg class="${className}" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.7Z"/></svg>`;
  }
  const path = icons[name] ?? icons.leaf;
  return `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
}
