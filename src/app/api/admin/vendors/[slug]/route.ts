import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/admin-auth";
import { parseVendor } from "@/lib/catalog-parse";
import { deleteVendor, readCatalog, upsertVendor } from "@/lib/catalog-store";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const { slug } = await params;
  const catalog = await readCatalog();
  const current = catalog.vendors.find((item) => item.slug === slug);
  if (!current) {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  const body = (await request.json()) as Record<string, unknown>;
  const vendor = parseVendor({ ...current, ...body }, catalog.vendors.map((item) => item.slug), slug);
  if (!catalog.services.some((item) => item.slug === vendor.serviceSlug)) {
    return NextResponse.json({ ok: false, error: "service" }, { status: 400 });
  }

  await upsertVendor(vendor, slug);
  return NextResponse.json({ ok: true, vendor });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const { slug } = await params;
  await deleteVendor(slug);
  return NextResponse.json({ ok: true });
}
