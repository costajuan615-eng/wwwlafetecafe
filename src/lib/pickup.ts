/** Business hours + pickup slot helpers. Edit HOURS to change availability. */

export const LEAD_MINUTES = 25;
export const SLOT_MINUTES = 15;
export const MAX_DAYS_AHEAD = 6;

/** 0 = Sunday … 6 = Saturday. `null` means closed that day. */
export const HOURS: Record<number, { open: string; close: string } | null> = {
  0: { open: "08:00", close: "15:00" },
  1: { open: "07:00", close: "21:00" },
  2: { open: "07:00", close: "21:00" },
  3: { open: "07:00", close: "21:00" },
  4: { open: "07:00", close: "21:00" },
  5: { open: "07:00", close: "21:00" },
  6: { open: "08:00", close: "21:00" },
};

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function isOpenAt(date: Date): boolean {
  const day = HOURS[date.getDay()];
  if (!day) return false;
  const minutes = date.getHours() * 60 + date.getMinutes();
  return minutes >= toMinutes(day.open) && minutes <= toMinutes(day.close) - SLOT_MINUTES;
}

export function nextAsapTime(now = new Date()): Date {
  return new Date(now.getTime() + LEAD_MINUTES * 60 * 1000);
}

export function upcomingDays(now = new Date()): Date[] {
  const days: Date[] = [];
  for (let i = 0; i <= MAX_DAYS_AHEAD; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    d.setHours(0, 0, 0, 0);
    if (HOURS[d.getDay()]) days.push(d);
  }
  return days;
}

/** 15-minute pickup slots for a given day, filtered to the future + lead time. */
export function slotsForDay(day: Date, now = new Date()): Date[] {
  const hours = HOURS[day.getDay()];
  if (!hours) return [];
  const earliest = nextAsapTime(now).getTime();
  const slots: Date[] = [];
  for (let m = toMinutes(hours.open); m <= toMinutes(hours.close) - SLOT_MINUTES; m += SLOT_MINUTES) {
    const slot = new Date(day);
    slot.setHours(Math.floor(m / 60), m % 60, 0, 0);
    if (slot.getTime() >= earliest) slots.push(slot);
  }
  return slots;
}

export function formatDayLabel(d: Date, now = new Date()): string {
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const diff = Math.round((d.getTime() - today.getTime()) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

export function formatTime(d: Date): string {
  return d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

export function formatPickupStamp(iso: string): string {
  const d = new Date(iso);
  return `${formatDayLabel(d)} at ${formatTime(d)}`;
}
