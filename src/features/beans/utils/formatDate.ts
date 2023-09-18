export default function formatDate(dateString: string | undefined): string | undefined {
  if (!dateString) {
    return;
  }
  const date: Date = new Date(dateString);
  return date.getTime() ? Intl.DateTimeFormat("pl-PL", {
    weekday: "long",
    year: "2-digit",
    month: "2-digit",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date) : undefined;
};
