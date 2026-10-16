import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/admin-auth";
import { parseService } from "@/lib/catalog-parse";
import { readCatalog, upsertService } from "@/lib/catalog-store";

export async function POST(request: Request) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const body = (await request.json()) as Record<string, unknown>;
  const catalog = await readCatalog();
  const service = parseService(
    body,
    catalog.services.map((item) => item.slug),
  );
  if (!service.name.fr && !service.name.en) {
    return NextResponse.json({ ok: false, error: "name" }, { status: 400 });
  }

  await upsertService(service);
  return NextResponse.json({ ok: true, service });
}
