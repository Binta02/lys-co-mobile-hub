export function humanizeReservationType(raw: string): string {
  // ex: "formation-room-2025-06-05-morning"
  const parts = raw.split('-');
  const periodKey = parts.pop();      // "morning" ou "afternoon"
  parts.pop();                        // retire la date
  const base = parts.join(' ');      // "formation room" ou "location bureau"
  const periodMap: Record<string,string> = {
    morning:   'matin',
    afternoon: 'après-midi',
  };
  return `${base} ${periodMap[periodKey!] || periodKey}`;
}
