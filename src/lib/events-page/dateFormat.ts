/** Convert a stored event date string to `YYYY-MM-DD` for `<input type="date">`. */
export function parseEventDateValue(date: string): Date | null {
  if (!date) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const [year, month, day] = date.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed;
}

export function eventDateToInputValue(date: string): string {
  if (!date) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;

  const parsed = parseEventDateValue(date);
  if (!parsed) return "";

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Format a date-picker value (`YYYY-MM-DD`) for display on the public site. */
export function eventDateFromInputValue(iso: string): string {
  if (!iso) return "";

  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;

  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/** Convert a stored past-event date to `YYYY-MM` for `<input type="month">`. */
export function eventMonthToInputValue(date: string): string {
  const parsed = parseEventDateValue(date);
  if (!parsed) return "";

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

/** Format a month-picker value (`YYYY-MM`) for past events on the public site. */
export function eventMonthFromInputValue(iso: string): string {
  if (!iso) return "";

  const [year, month] = iso.split("-").map(Number);
  if (!year || !month) return iso;

  const date = new Date(year, month - 1, 1);
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

/** Milliseconds since epoch for an upcoming event, using its date and optional time. */
export function getUpcomingEventInstant(event: {
  date: string;
  time: string;
}): number | null {
  const date = parseEventDateValue(event.date);
  if (!date) return null;

  const time = parseEventTime(event.time);
  if (time) {
    date.setHours(time.hours, time.minutes, 0, 0);
  } else {
    date.setHours(23, 59, 59, 999);
  }

  return date.getTime();
}

const DISPLAY_TIME_RE =
  /^(\d{1,2}):(\d{2})\s*(AM|PM)?(?:\s+(.+))?$/i;

/** Timezone label after the clock time, e.g. "Pacific" in `9:00 AM Pacific`. */
export function eventTimeGetSuffix(time: string): string {
  const match = time.trim().match(DISPLAY_TIME_RE);
  return match?.[4]?.trim() || "Pacific";
}

function parseEventTime(time: string): { hours: number; minutes: number } | null {
  if (!time) return null;

  if (/^\d{2}:\d{2}$/.test(time)) {
    const [hours, minutes] = time.split(":").map(Number);
    return { hours, minutes };
  }

  const match = time.trim().match(DISPLAY_TIME_RE);
  if (!match) return null;

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3]?.toUpperCase();

  if (period === "PM" && hours < 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  return { hours, minutes };
}

/** Convert a stored event time string to `HH:mm` for `<input type="time">`. */
export function eventTimeToInputValue(time: string): string {
  const parsed = parseEventTime(time);
  if (!parsed) return "";

  const hours = String(parsed.hours).padStart(2, "0");
  const minutes = String(parsed.minutes).padStart(2, "0");
  return `${hours}:${minutes}`;
}

/** Format a time-picker value (`HH:mm`) for display on the public site. */
export function eventTimeFromInputValue(iso: string, existingTime = ""): string {
  if (!iso) return "";

  const [hours24, minutes] = iso.split(":").map(Number);
  if (Number.isNaN(hours24) || Number.isNaN(minutes)) return iso;

  const period = hours24 >= 12 ? "PM" : "AM";
  let hour12 = hours24 % 12;
  if (hour12 === 0) hour12 = 12;

  const clock = `${hour12}:${String(minutes).padStart(2, "0")} ${period}`;
  const suffix = eventTimeGetSuffix(existingTime);
  return suffix ? `${clock} ${suffix}` : clock;
}

/** Replace the timezone label while keeping the selected clock time. */
export function eventTimeWithSuffix(time: string, suffix: string): string {
  const inputValue = eventTimeToInputValue(time);
  if (!inputValue) return suffix.trim();

  const clock = eventTimeFromInputValue(inputValue, "");
  const trimmed = suffix.trim();
  return trimmed ? `${clock} ${trimmed}` : clock;
}
