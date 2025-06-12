// src/utils/humanizeReservationType.ts
export function humanizeReservationType(raw: string): string {
  // Normalise la chaîne : remplace '-' par ' ' et condense les espaces
  const normalized = raw.replace(/-/g, ' ').replace(/\s+/g, ' ').trim();

  /*
   * Tente de capturer :
   * - slug (texte avant la date)
   * - date au format YYYY MM DD
   * - créneau (EN ou FR)
   */
  const match = normalized.match(
    /^(.+?)\s+\d{4}\s+\d{2}\s+\d{2}\s+(matin|après-midi|morning|afternoon)$/i
  );

  if (match) {
    let [, slugPart, periodKey] = match;
    slugPart = slugPart.trim();

    // Convertit le slug (avec espaces) en clé standard (avec '-')
    const slugKey = slugPart.toLowerCase().replace(/\s+/g, '-');

    // Mapping des slugs vers leurs libellés FR
    const nameMap: Record<string, string> = {
      'formation-room': 'Salle de formation',
      'location-bureau': 'Location bureau',
      'coworking-space': 'Espace coworking',
      // Ajoutez ici d'autres mappings si nécessaire
    };
    const base = nameMap[slugKey] ?? slugPart;

    // Mapping des créneaux (EN/FR) vers FR
    const periodMap: Record<string, string> = {
      morning: 'matin',
      afternoon: 'après-midi',
      matin: 'matin',
      'après-midi': 'après-midi',
    };
    const period = periodMap[periodKey.toLowerCase()] ?? periodKey;

    return `${base} ${period}`;
  }

  // Si pas de date/créneau, retourne la chaîne normalisée
  return normalized;
}
