// src/utils/humanizeReservationType.ts
export function humanizeReservationType(raw: string): string {
  // 1) on essaie d’extraire slug + créneau (avec ou sans date intermédiaire)
  //    ex: "formation-room-2025-06-07-morning"
  //    ou  "formation-room-journée"
  const m = raw.match(
    /^(.+?)(?:-\d{4}-\d{2}-\d{2})?-(morning|afternoon|journée(?: complète)?)$/
  );
  let slug: string, periodKey: string;

  if (m) {
    [, slug, periodKey] = m;
  } else {
    // fallback total : tout en minuscules, remplace - par espace
    const parts = raw.split('-');
    periodKey = parts.pop() || '';
    slug      = parts.join('-');
  }

  // 2) Map slug → FR
  const nameMap: Record<string, string> = {
    'formation-room':  'Salle de formation',
    'location-bureau': 'Location bureau',
    'coworking-space': 'Espace coworking',
    // … ajoutez les autres slugs…
  };
  const base = nameMap[slug] ?? slug.replace(/-/g, ' ');

  // 3) Map créneau → FR
  const periodMap: Record<string, string> = {
    morning:         'matin',
    afternoon:       'après-midi',
    journée:         'journée',
    'journée complète': 'journée complète',
  };
  const period = periodMap[periodKey] ?? periodKey.replace(/-/g, ' ');

  return `${base} ${period}`;
}
