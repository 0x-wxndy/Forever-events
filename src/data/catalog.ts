export type Localized = { fr: string; en: string };

export type City = {
  slug: string;
  name: Localized;
  available: boolean;
};

export type Service = {
  slug: string;
  name: Localized;
  tagline: Localized;
  description: Localized;
  image: string;
  icon: "camera" | "flower" | "cake" | "music" | "sparkles" | "map";
};

export type VendorPackage = {
  name: Localized;
  startingPrice: number;
  details: Localized;
};

export type Vendor = {
  slug: string;
  name: string;
  serviceSlug: string;
  citySlug: string;
  startingPrice: number;
  bio: Localized;
  coverImage: string;
  gallery: string[];
  packages: VendorPackage[];
};

export const cities: City[] = [
  { slug: "oran", name: { fr: "Oran", en: "Oran" }, available: true },
  {
    slug: "alger",
    name: { fr: "Alger", en: "Algiers" },
    available: false,
  },
  {
    slug: "constantine",
    name: { fr: "Constantine", en: "Constantine" },
    available: false,
  },
];

export const services: Service[] = [
  {
    slug: "photographers",
    name: { fr: "Photographes", en: "Photographers" },
    tagline: { fr: "Capturez votre histoire", en: "Capture your story" },
    description: {
      fr: "Des photographes sélectionnés pour raconter votre journée avec douceur, lumière et émotion.",
      en: "Curated photographers who tell your day with softness, light and emotion.",
    },
    image: "/images/photographers.jpg",
    icon: "camera",
  },
  {
    slug: "decorators",
    name: { fr: "Décorateurs", en: "Decorators" },
    tagline: { fr: "Transformer les espaces", en: "Transform spaces" },
    description: {
      fr: "Des univers floraux, des tables élégantes et une décoration qui ressemble à votre rêve.",
      en: "Floral worlds, elegant tables and décor that feels like your dream.",
    },
    image: "/images/decorators.jpg",
    icon: "flower",
  },
  {
    slug: "caterers",
    name: { fr: "Traiteurs", en: "Caterers" },
    tagline: { fr: "Des moments délicieux", en: "Delicious moments" },
    description: {
      fr: "Gâteaux, pâtisseries et menus de fête pensés pour les grandes tables algériennes.",
      en: "Cakes, pastries and celebration menus made for generous Algerian tables.",
    },
    image: "/images/caterers.jpg",
    icon: "cake",
  },
  {
    slug: "djs",
    name: { fr: "DJs", en: "DJs" },
    tagline: { fr: "Donnez le ton", en: "Set the vibe" },
    description: {
      fr: "Une ambiance musicale raffinée, du welcome drink jusqu’à la dernière danse.",
      en: "A refined musical atmosphere, from the welcome drink to the last dance.",
    },
    image: "/images/djs.jpg",
    icon: "music",
  },
  {
    slug: "makeup",
    name: { fr: "Maquilleurs", en: "Makeup Artists" },
    tagline: { fr: "Soyez au plus beau", en: "Feel your best" },
    description: {
      fr: "Maquillage et coiffure pour un regard lumineux, naturel et inoubliable.",
      en: "Makeup and hair for a luminous, natural and unforgettable look.",
    },
    image: "/images/makeup.jpg",
    icon: "sparkles",
  },
  {
    slug: "venues",
    name: { fr: "Lieux", en: "Venues" },
    tagline: { fr: "Trouvez le lieu parfait", en: "Find the perfect place" },
    description: {
      fr: "Villas, terrasses et salles sélectionnées à Oran pour des célébrations mémorables.",
      en: "Villas, terraces and halls in Oran, chosen for memorable celebrations.",
    },
    image: "/images/venues.jpg",
    icon: "map",
  },
];

export const vendors: Vendor[] = [
  {
    slug: "atelier-nour",
    name: "Atelier Nour",
    serviceSlug: "photographers",
    citySlug: "oran",
    startingPrice: 45000,
    bio: {
      fr: "Photographie de mariage douce et lumineuse, entre portraits intimes et grands moments de fête.",
      en: "Soft, luminous wedding photography, from intimate portraits to the big celebration moments.",
    },
    coverImage: "/images/photographers.jpg",
    gallery: [
      "/images/photographers.jpg",
      "/images/vendor-photo-1.jpg",
      "/images/about-bride.jpg",
    ],
    packages: [
      {
        name: { fr: "Essentiel", en: "Essential" },
        startingPrice: 45000,
        details: {
          fr: "6 heures, un photographe, 300 photos retouchées.",
          en: "6 hours, one photographer, 300 edited photos.",
        },
      },
      {
        name: { fr: "Signature", en: "Signature" },
        startingPrice: 75000,
        details: {
          fr: "Journée complète, deux photographes, album offert.",
          en: "Full day, two photographers, complimentary album.",
        },
      },
    ],
  },
  {
    slug: "lumiere-doran",
    name: "Lumière d’Oran",
    serviceSlug: "photographers",
    citySlug: "oran",
    startingPrice: 55000,
    bio: {
      fr: "Un regard cinématographique sur vos célébrations, avec une lumière chaude et des images intemporelles.",
      en: "A cinematic eye on your celebration, with warm light and timeless images.",
    },
    coverImage: "/images/vendor-photo-1.jpg",
    gallery: [
      "/images/vendor-photo-1.jpg",
      "/images/photographers.jpg",
      "/images/vendor-photo-2.jpg",
    ],
    packages: [
      {
        name: { fr: "Cérémonie", en: "Ceremony" },
        startingPrice: 55000,
        details: {
          fr: "Couverture de la cérémonie et des portraits de couple.",
          en: "Ceremony coverage and couple portraits.",
        },
      },
    ],
  },
  {
    slug: "yasmina-atelier",
    name: "Yasmina Atelier",
    serviceSlug: "decorators",
    citySlug: "oran",
    startingPrice: 80000,
    bio: {
      fr: "Décoration florale sur-mesure, arches, tables et scénographie pour des mariages d’une grande douceur.",
      en: "Bespoke floral décor, arches, tables and scenography for softly luxurious weddings.",
    },
    coverImage: "/images/decorators.jpg",
    gallery: [
      "/images/decorators.jpg",
      "/images/vendor-decor-1.jpg",
      "/images/venues.jpg",
    ],
    packages: [
      {
        name: { fr: "Table de rêve", en: "Dream table" },
        startingPrice: 80000,
        details: {
          fr: "Centre de table, chemin de table et composition principale.",
          en: "Centerpieces, table runner and main floral composition.",
        },
      },
      {
        name: { fr: "Scénographie complète", en: "Full scenography" },
        startingPrice: 180000,
        details: {
          fr: "Arche, entrée, tables, photobooth et coins lounge.",
          en: "Arch, entrance, tables, photo corner and lounge styling.",
        },
      },
    ],
  },
  {
    slug: "bloom-and-co",
    name: "Bloom & Co",
    serviceSlug: "decorators",
    citySlug: "oran",
    startingPrice: 70000,
    bio: {
      fr: "Un atelier de fleurs et de lumière, spécialiste des palettes blush, ivoire et champagne.",
      en: "A floral and lighting studio, specialised in blush, ivory and champagne palettes.",
    },
    coverImage: "/images/vendor-decor-1.jpg",
    gallery: ["/images/vendor-decor-1.jpg", "/images/decorators.jpg"],
    packages: [
      {
        name: { fr: "Floral", en: "Floral" },
        startingPrice: 70000,
        details: {
          fr: "Bouquets, compositions et installation du jour J.",
          en: "Bouquets, arrangements and day-of installation.",
        },
      },
    ],
  },
  {
    slug: "maison-el-bahia",
    name: "Maison El Bahia",
    serviceSlug: "caterers",
    citySlug: "oran",
    startingPrice: 120000,
    bio: {
      fr: "Traiteur raffiné : pâtisseries traditionnelles, gâteau de mariage et menus de réception.",
      en: "Refined catering: traditional pastries, wedding cake and reception menus.",
    },
    coverImage: "/images/caterers.jpg",
    gallery: ["/images/caterers.jpg", "/images/vendor-cater-1.jpg"],
    packages: [
      {
        name: { fr: "Gâteau & pâtisseries", en: "Cake & pastries" },
        startingPrice: 120000,
        details: {
          fr: "Pièce montée, plateau sucré et service.",
          en: "Wedding cake, sweet platters and service.",
        },
      },
    ],
  },
  {
    slug: "le-palais-traiteur",
    name: "Le Palais Traiteur",
    serviceSlug: "caterers",
    citySlug: "oran",
    startingPrice: 150000,
    bio: {
      fr: "Grande table oranais : couscous de fête, grillades et service élégant pour 100 à 400 invités.",
      en: "A generous Oran table: festive couscous, grills and elegant service for 100 to 400 guests.",
    },
    coverImage: "/images/vendor-cater-1.jpg",
    gallery: ["/images/vendor-cater-1.jpg", "/images/caterers.jpg"],
    packages: [
      {
        name: { fr: "Réception", en: "Reception" },
        startingPrice: 150000,
        details: {
          fr: "Menu complet à partir de 100 convives.",
          en: "Full menu from 100 guests.",
        },
      },
    ],
  },
  {
    slug: "dj-amine",
    name: "DJ Amine",
    serviceSlug: "djs",
    citySlug: "oran",
    startingPrice: 35000,
    bio: {
      fr: "Mariages, fiançailles et soirées : un mix élégant entre chaâbi, hits et ambiances lounge.",
      en: "Weddings, engagements and evenings: an elegant mix of chaabi, hits and lounge.",
    },
    coverImage: "/images/djs.jpg",
    gallery: ["/images/djs.jpg"],
    packages: [
      {
        name: { fr: "Soirée", en: "Evening" },
        startingPrice: 35000,
        details: {
          fr: "4 heures, matériel lumière inclus.",
          en: "4 hours, lighting equipment included.",
        },
      },
    ],
  },
  {
    slug: "pulse-events",
    name: "Pulse Events",
    serviceSlug: "djs",
    citySlug: "oran",
    startingPrice: 40000,
    bio: {
      fr: "Animation complète avec DJ, micro et une playlist construite avec vous.",
      en: "Full entertainment with DJ, microphone and a playlist built with you.",
    },
    coverImage: "/images/djs.jpg",
    gallery: ["/images/djs.jpg", "/images/venues.jpg"],
    packages: [
      {
        name: { fr: "Animation", en: "Entertainment" },
        startingPrice: 40000,
        details: {
          fr: "DJ + animation de piste jusqu’à 6 heures.",
          en: "DJ + dancefloor hosting up to 6 hours.",
        },
      },
    ],
  },
  {
    slug: "glam-by-lina",
    name: "Glam by Lina",
    serviceSlug: "makeup",
    citySlug: "oran",
    startingPrice: 15000,
    bio: {
      fr: "Maquillage mariée lumineux, peau parfaite et essais à l’atelier avant le grand jour.",
      en: "Luminous bridal makeup, perfected skin, and a studio trial before the big day.",
    },
    coverImage: "/images/makeup.jpg",
    gallery: ["/images/makeup.jpg", "/images/about-bride.jpg"],
    packages: [
      {
        name: { fr: "Mariée", en: "Bridal" },
        startingPrice: 15000,
        details: {
          fr: "Essai + jour J, maquillage et coiffage.",
          en: "Trial + wedding day, makeup and hair.",
        },
      },
    ],
  },
  {
    slug: "sofia-beaute",
    name: "Sofia Beauté",
    serviceSlug: "makeup",
    citySlug: "oran",
    startingPrice: 18000,
    bio: {
      fr: "Beauté de cérémonie pour la mariée et ses invitée d’honneur, à domicile ou en salon.",
      en: "Ceremony beauty for the bride and her guests of honour, at home or in studio.",
    },
    coverImage: "/images/makeup.jpg",
    gallery: ["/images/makeup.jpg"],
    packages: [
      {
        name: { fr: "Cortège", en: "Party" },
        startingPrice: 18000,
        details: {
          fr: "Mariée + 2 invitée, déplacement inclus à Oran.",
          en: "Bride + 2 guests, travel in Oran included.",
        },
      },
    ],
  },
  {
    slug: "villa-celeste",
    name: "Villa Céleste",
    serviceSlug: "venues",
    citySlug: "oran",
    startingPrice: 200000,
    bio: {
      fr: "Villa avec terrasse, jardin et vue, pour des réceptions intimistes ou des fêtes jusqu’à 250 invités.",
      en: "A villa with terrace, garden and view, for intimate receptions or celebrations up to 250 guests.",
    },
    coverImage: "/images/venues.jpg",
    gallery: ["/images/venues.jpg", "/images/about-bride.jpg", "/images/decorators.jpg"],
    packages: [
      {
        name: { fr: "Journée villa", en: "Villa day" },
        startingPrice: 200000,
        details: {
          fr: "Location de 10h à minuit, coordination sur place.",
          en: "Hire from 10am to midnight, on-site coordination.",
        },
      },
    ],
  },
  {
    slug: "terrasse-medina",
    name: "Terrasse Medina",
    serviceSlug: "venues",
    citySlug: "oran",
    startingPrice: 180000,
    bio: {
      fr: "Une terrasse élégante en bord de mer, lumière dorée et dîners sous les étoiles.",
      en: "An elegant seaside terrace, golden light and dinners under the stars.",
    },
    coverImage: "/images/venues.jpg",
    gallery: ["/images/venues.jpg", "/images/photographers.jpg"],
    packages: [
      {
        name: { fr: "Soirée mer", en: "Sea evening" },
        startingPrice: 180000,
        details: {
          fr: "Terrasse, éclairage et espace cocktail.",
          en: "Terrace, lighting and cocktail space.",
        },
      },
    ],
  },
];

export const eventTypes: { slug: string; name: Localized }[] = [
  { slug: "wedding", name: { fr: "Mariage", en: "Wedding" } },
  { slug: "engagement", name: { fr: "Fiançailles", en: "Engagement" } },
  { slug: "henna", name: { fr: "Henné", en: "Henna" } },
  { slug: "birthday", name: { fr: "Anniversaire", en: "Birthday" } },
  { slug: "other", name: { fr: "Autre célébration", en: "Other celebration" } },
];

export function getService(slug: string) {
  return services.find((item) => item.slug === slug);
}

export function getVendor(slug: string) {
  return vendors.find((item) => item.slug === slug);
}

export function getCity(slug: string) {
  return cities.find((item) => item.slug === slug);
}

export function vendorsFor(serviceSlug: string, citySlug = "oran") {
  return vendors.filter(
    (vendor) => vendor.serviceSlug === serviceSlug && vendor.citySlug === citySlug,
  );
}
