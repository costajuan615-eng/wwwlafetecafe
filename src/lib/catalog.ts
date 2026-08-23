import { menu } from "@/data/menu";

export type CatalogItem = {
  id: string;
  name: string;
  category: string;
  priceCents: number;
  image?: string;
  description?: string;
};

export function priceToCents(price: string): number {
  const n = Number(price.replace(/[^0-9.]/g, ""));
  return Math.round((Number.isFinite(n) ? n : 0) * 100);
}

export function formatCents(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export function itemId(category: string, name: string): string {
  return `${category}::${name}`;
}

/** Flat, trusted catalog used for server-side re-pricing. */
export const catalog: CatalogItem[] = menu.flatMap((cat) =>
  cat.items.map((item) => ({
    id: itemId(cat.name, item.name),
    name: item.name,
    category: cat.name,
    priceCents: priceToCents(item.price),
    image: item.image,
    description: item.description,
  })),
);

export const catalogById = new Map(catalog.map((i) => [i.id, i]));

/** Texas / El Paso combined sales tax rate. */
export const TAX_RATE = 0.0825;

export function computeTotals(subtotalCents: number) {
  const taxCents = Math.round(subtotalCents * TAX_RATE);
  return { subtotalCents, taxCents, totalCents: subtotalCents + taxCents };
}
