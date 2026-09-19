import { NextResponse } from "next/server";
import { saveContact } from "@/lib/inbox";

export async function POST(request: Request) {
  const body = await request.json();

  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  await saveContact({
    id: crypto.randomUUID(),
    type: "contact",
    createdAt: new Date().toISOString(),
    name: String(body.name),
    email: String(body.email),
    phone: body.phone ? String(body.phone) : undefined,
    message: String(body.message),
  });

  return NextResponse.json({ ok: true });
}
