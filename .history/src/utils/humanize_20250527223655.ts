// src/utils/humanizeReservationType.ts
export function humanizeReservationType(raw: string): string {
  // Liste des clés de créneaux possibles, ordre important (journée complète avant journée)
  const periodKeys = [
    'journée complète',
    'journée',
    'afternoon',
    'morning',
  ];

  // On cherche la clé qui correspond à la fin de la chaîne "raw"
  for (const key of periodKeys) {
    if (raw.toLowerCase().endsWith(key)) {
      // Séparer le slug du créneau
      const baseRaw = raw.slice(0, raw.length - key.length).trim();
      // Si le slug se termine par un '-', on l'enlève
      const slug = baseRaw.endsWith('-')
        ? baseRaw.slice(0, baseRaw.length - 1)
        : baseRaw;

      // Map slug → libellé FR
      const nameMap: Record<string, string> = {
        'formation-room': 'Salle de formation',
        'location-bureau': 'Location bureau',
        'coworking-space': 'Espace coworking',
        // Ajoutez vos autres mappings de slug ici
      };
      const base = nameMap[slug] ?? slug.replace(/-/g, ' ');

      // Map créneau → FR
      const periodMap: Record<string, string> = {
        morning: 'matin',
        afternoon: 'après-midi',
        journée: 'journée',
        'journée complète': 'journée complète',
      };
      const period = periodMap[key] ?? key;

      return `${base} ${period}`;
    }
  }

  // Fallback : remplacer tous les '-' par un espace
  return raw.replace(/-/g, ' ');
}
