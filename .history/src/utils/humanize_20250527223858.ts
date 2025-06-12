// src/utils/humanizeReservationType.ts
export function humanizeReservationType(raw: string): string {
  // Normalise la chaîne : remplace '-' par ' ' et condense les espaces
  const normalized = raw.replace(/-/g, ' ').replace(/\s+/g, ' ').trim();

  // Essaie de capturer : slug (texte avant la date), date et créneau (EN ou FR)
  const match = normalized.match(/^(.+?)\s+\d{4}\s+\d{2}\s+\d{2}\s+(matin|après-midi|morning|afternoon)$/i);
  if (match) {
    let [, slugPart, periodKey] = match;
    slugPart = slugPart.trim();

    // Map slug → clé standard (avec '-')
    const slugKey = slugPart.toLowerCase().replace(/\s+/g, '-');

    // Map slugKey → libellé FR
    const nameMap: Record<string, string> = {
      'formation-room': 'Salle de formation',
      'location-bureau': 'Location bureau',
      'coworking-space': 'Espace coworking',
      // ajoutez vos autres mappings ici
    };
    const base = nameMap[slugKey] ?? slugPart;

    // Map créneau (EN/FR) → FR
    const periodMap: Record<string, string> = {
      morning: 'matin',
      afternoon: 'après-midi',
      matin: 'matin',
      'après-midi': 'après-midi',
    };
    const period = periodMap[periodKey.toLowerCase()] ?? periodKey;

    return `${base} ${period}`;
  }

  // Fallback : on retourne la version normalisée
  return normalized;
}
