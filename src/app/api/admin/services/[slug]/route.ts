import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/admin-auth";
import { parseService } from "@/lib/catalog-parse";
import { deleteService, readCatalog, upsertService } from "@/lib/catalog-store";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const { slug } = await params;
  const catalog = await readCatalog();
  const current = catalog.services.find((item) => item.slug === slug);
  if (!current) {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  const body = (await request.json()) as Record<string, unknown>;
  const service = parseService(
    { ...current, ...body, name: body.name ?? current.name },
    catalog.services.map((item) => item.slug),
    slug,
  );
  await upsertService(service, slug);
  return NextResponse.json({ ok: true, service });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const { slug } = await params;
  const result = await deleteService(slug);
  if (!result.ok) {
    return NextResponse.json({ ok: false, inUse: result.inUse }, { status: 409 });
  }
  return NextResponse.json({ ok: true });
}
