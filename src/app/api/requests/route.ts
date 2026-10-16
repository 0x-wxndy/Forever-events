import { NextResponse } from "next/server";
import { saveRequest } from "@/lib/inbox";
import { sendFicheEmail } from "@/lib/fiche-email";
import { eventDisplayId } from "@/lib/format";
import { siteContact } from "@/lib/site-contact";
import { getCity, eventTypes } from "@/data/catalog";
import { readCatalog } from "@/lib/catalog-store";

export async function POST(request: Request) {
  const body = await request.json();

  if (!body?.name || !body?.phone || !Array.isArray(body?.vendors)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const id = crypto.randomUUID();
  const locale = body.locale === "en" ? "en" : "fr";

  await saveRequest({
    id,
    type: "event-request",
    createdAt: new Date().toISOString(),
    name: String(body.name),
    email: String(body.email || ""),
    phone: String(body.phone),
    eventType: body.eventType ? String(body.eventType) : undefined,
    eventDate: body.eventDate ? String(body.eventDate) : undefined,
    guests: body.guests ? String(body.guests) : undefined,
    message: body.message ? String(body.message) : undefined,
    citySlug: body.citySlug ? String(body.citySlug) : undefined,
    budget: body.budget ? String(body.budget) : undefined,
    vendors: body.vendors,
    status: "new",
  });

  const displayId = eventDisplayId(id);
  const catalog = await readCatalog();
  const city = getCity(String(body.citySlug || ""));
  const type = eventTypes.find((item) => item.slug === body.eventType);
  const origin = request.headers.get("origin") || siteContact.siteUrl;
  const ficheUrl = `${origin}/${locale === "en" ? "en/" : ""}my-event/events/${id}`;

  let emailed = false;
  if (body.email) {
    try {
      emailed = await sendFicheEmail({
        to: String(body.email),
        locale,
        displayId,
        name: String(body.name),
        phone: String(body.phone),
        eventType: type ? type.name[locale] : String(body.eventType || "—"),
        eventDate: String(body.eventDate || "—"),
        city: city ? city.name[locale] : String(body.citySlug || "—"),
        guests: String(body.guests || ""),
        budget: String(body.budget || ""),
        notes: String(body.message || ""),
        vendors: body.vendors.map((item: { vendorSlug: string; serviceSlug: string }) => ({
          name: catalog.vendors.find((entry) => entry.slug === item.vendorSlug)?.name || item.vendorSlug,
          service:
            catalog.services.find((entry) => entry.slug === item.serviceSlug)?.name[locale] ||
            item.serviceSlug,
        })),
        ficheUrl,
      });
    } catch {
      emailed = false;
    }
  }

  return NextResponse.json({ ok: true, id, displayId, emailed });
}
