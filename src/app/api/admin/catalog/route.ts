import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/admin-auth";
import { readCatalog } from "@/lib/catalog-store";

export async function GET() {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json({ ok: true, ...(await readCatalog()) });
}
