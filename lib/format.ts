const eur = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
  useGrouping: "always",
});

// Prezzo indicativo di un servizio:
// - min + max  -> "€ 5.800 – € 7.500"
// - solo min   -> "da € 5.800"
// - nessuno    -> nota libera o "Su preventivo"
export function formatServicePrice(
  priceMin: number | null | undefined,
  priceMax: number | null | undefined,
  priceNote?: string | null,
): string {
  if (typeof priceMin === "number" && typeof priceMax === "number") {
    return `${eur.format(priceMin)} – ${eur.format(priceMax)}`;
  }
  if (typeof priceMin === "number") {
    return `da ${eur.format(priceMin)}`;
  }
  return priceNote?.trim() || "Su preventivo";
}
