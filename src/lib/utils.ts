// Shared utilities used across the app

/** Converts a price in cents to a formatted string (e.g. 2999 → "29,99 €") */
export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}
