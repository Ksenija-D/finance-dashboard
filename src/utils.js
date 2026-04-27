// shared formatting helpers

export const formatEur = (n) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n);

export const formatEurShort = (n) => {
  if (n >= 1_000_000) return `€${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `€${(n / 1_000).toFixed(1)}k`;
  return `€${n}`;
};

export const STATUS_COLORS = {
  Paid:    { bg: "#dcfce7", text: "#15803d", dot: "#22c55e" },
  Pending: { bg: "#fef9c3", text: "#a16207", dot: "#eab308" },
  Overdue: { bg: "#fee2e2", text: "#b91c1c", dot: "#ef4444" },
};
