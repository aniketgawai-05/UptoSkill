// Generic helper utilities for the LMS
export const formatCurrency = (value: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(value);

export const formatDate = (input: string | Date) => {
  const date = typeof input === "string" ? new Date(input) : input;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const truncate = (text: string, max = 120) =>
  text.length > max ? `${text.slice(0, max).trim()}…` : text;

export const calcProgress = (completed: number, total: number) =>
  total === 0 ? 0 : Math.round((completed / total) * 100);

export const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
