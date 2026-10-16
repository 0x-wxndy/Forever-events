export const siteContact = {
  email:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
    process.env.CONTACT_EMAIL ||
    "hello@for-everevents.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || process.env.CONTACT_PHONE || "",
  whatsapp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || process.env.CONTACT_WHATSAPP || "",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://for-everevents.com",
};
