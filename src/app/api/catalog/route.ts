import { NextResponse } from "next/server";
import { readCatalog } from "@/lib/catalog-store";

export async function GET() {
  return NextResponse.json({ ok: true, ...(await readCatalog()) });
}
