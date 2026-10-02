import { NextResponse } from "next/server";
import { saveRequest } from "@/lib/inbox";

export async function POST(request: Request) {
  const body = await request.json();

  if (!body?.name || !body?.phone || !Array.isArray(body?.vendors)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  await saveRequest({
    id: crypto.randomUUID(),
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

  return NextResponse.json({ ok: true });
}
