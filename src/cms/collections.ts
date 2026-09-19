// Payload collections (PostgreSQL).
// The public site currently reads src/data/catalog.ts with the same shape.

export const payloadCollections = [
  {
    slug: "cities",
    fields: ["name", "available"],
  },
  {
    slug: "services",
    fields: ["name", "tagline", "description", "image", "icon"],
    localized: true,
  },
  {
    slug: "vendors",
    fields: [
      "name",
      "service",
      "city",
      "startingPrice",
      "bio",
      "coverImage",
      "gallery",
      "packages",
    ],
    localized: ["bio", "packages"],
  },
  {
    slug: "event-requests",
    fields: [
      "name",
      "email",
      "phone",
      "city",
      "eventType",
      "eventDate",
      "guests",
      "message",
      "vendors",
      "status",
    ],
  },
  {
    slug: "contact-messages",
    fields: ["name", "email", "phone", "message"],
  },
] as const;
