import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/admin-auth";
import { parseVendor } from "@/lib/catalog-parse";
import { readCatalog, upsertVendor } from "@/lib/catalog-store";

export async function POST(request: Request) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const body = (await request.json()) as Record<string, unknown>;
  const catalog = await readCatalog();
  const vendor = parseVendor(
    body,
    catalog.vendors.map((item) => item.slug),
  );
  if (!vendor.name || !vendor.serviceSlug) {
    return NextResponse.json({ ok: false, error: "required" }, { status: 400 });
  }
  if (!catalog.services.some((item) => item.slug === vendor.serviceSlug)) {
    return NextResponse.json({ ok: false, error: "service" }, { status: 400 });
  }

  await upsertVendor(vendor);
  return NextResponse.json({ ok: true, vendor });
}
