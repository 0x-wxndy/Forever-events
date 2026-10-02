import type { Localized } from "@/data/catalog";

export type VendorMeta = {
  rating: number;
  reviews: number;
  badge: Localized;
};

export const vendorMeta: Record<string, VendorMeta> = {
  "atelier-nour": {
    rating: 4.9,
    reviews: 132,
    badge: { fr: "Pro & Créatif", en: "Pro & Creative" },
  },
  "lumiere-doran": {
    rating: 4.8,
    reviews: 218,
    badge: { fr: "Mieux noté", en: "Best Rated" },
  },
  "pure-shots": {
    rating: 4.9,
    reviews: 76,
    badge: { fr: "Style romantique", en: "Romantic Style" },
  },
  "eternal-captures": {
    rating: 4.7,
    reviews: 90,
    badge: { fr: "Moderne & artistique", en: "Modern & Artistic" },
  },
  "yasmina-atelier": {
    rating: 4.8,
    reviews: 84,
    badge: { fr: "Décor de rêve", en: "Dream décor" },
  },
  "bloom-and-co": {
    rating: 4.7,
    reviews: 61,
    badge: { fr: "Palette blush", en: "Blush palette" },
  },
  "maison-el-bahia": {
    rating: 4.8,
    reviews: 64,
    badge: { fr: "Saveurs d’Oran", en: "Oran flavours" },
  },
  "le-palais-traiteur": {
    rating: 4.6,
    reviews: 41,
    badge: { fr: "Grande table", en: "Grand table" },
  },
  "dj-amine": {
    rating: 4.8,
    reviews: 110,
    badge: { fr: "Ambiance", en: "Set the vibe" },
  },
  "pulse-events": {
    rating: 4.7,
    reviews: 55,
    badge: { fr: "Piste complète", en: "Full dancefloor" },
  },
  "glam-by-lina": {
    rating: 4.9,
    reviews: 88,
    badge: { fr: "Lumière mariée", en: "Bridal glow" },
  },
  "sofia-beaute": {
    rating: 4.8,
    reviews: 73,
    badge: { fr: "Cérémonie", en: "Ceremony" },
  },
  "villa-celeste": {
    rating: 4.9,
    reviews: 39,
    badge: { fr: "Vue & jardin", en: "View & garden" },
  },
  "terrasse-medina": {
    rating: 4.7,
    reviews: 28,
    badge: { fr: "Bord de mer", en: "Seaside" },
  },
};

export function getVendorMeta(slug: string): VendorMeta {
  return (
    vendorMeta[slug] ?? {
      rating: 4.8,
      reviews: 24,
      badge: { fr: "Sélectionné", en: "Curated" },
    }
  );
}
