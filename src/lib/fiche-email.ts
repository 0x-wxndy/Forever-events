import { siteContact } from "@/lib/site-contact";

type FicheMail = {
  to: string;
  locale: "fr" | "en";
  displayId: string;
  name: string;
  phone: string;
  eventType: string;
  eventDate: string;
  city: string;
  guests: string;
  budget: string;
  notes: string;
  vendors: { name: string; service: string }[];
  ficheUrl: string;
};

export async function sendFicheEmail(data: FicheMail) {
  const key = process.env.RESEND_API_KEY;
  if (!key || !data.to) return false;

  const isFr = data.locale === "fr";
  const vendorLines = data.vendors
    .map((item) => `• ${item.name} — ${item.service}`)
    .join("\n");
  const contactLines = [
    siteContact.email && `${isFr ? "Email" : "Email"}: ${siteContact.email}`,
    siteContact.phone && `${isFr ? "Téléphone" : "Phone"}: ${siteContact.phone}`,
    siteContact.whatsapp && `WhatsApp: ${siteContact.whatsapp}`,
  ]
    .filter(Boolean)
    .join("\n");

  const text = isFr
    ? `Bonjour ${data.name},

Voici votre fiche d’événement Forever Events.

Référence : ${data.displayId}
Date : ${data.eventDate}
Ville : ${data.city}
Type : ${data.eventType}
Invités : ${data.guests || "—"}
Budget : ${data.budget || "—"}
Notes : ${data.notes || "—"}

Prestataires :
${vendorLines || "—"}

Consulter la fiche : ${data.ficheUrl}

Nous confirmons les détails avec vous, puis contactons les prestataires.

${contactLines}

Forever Events`
    : `Hello ${data.name},

Here is your Forever Events event sheet.

Reference: ${data.displayId}
Date: ${data.eventDate}
City: ${data.city}
Type: ${data.eventType}
Guests: ${data.guests || "—"}
Budget: ${data.budget || "—"}
Notes: ${data.notes || "—"}

Vendors:
${vendorLines || "—"}

View your sheet: ${data.ficheUrl}

We will confirm the details with you, then contact the vendors.

${contactLines}

Forever Events`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.MAIL_FROM || `Forever Events <${siteContact.email}>`,
      to: [data.to],
      subject: isFr
        ? `Votre fiche d’événement ${data.displayId}`
        : `Your event sheet ${data.displayId}`,
      text,
    }),
  });

  return response.ok;
}
