import { NextResponse } from "next/server";
import { adminPassword, setAdminSession } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = await request.json();
  if (String(body?.password ?? "") !== adminPassword()) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  await setAdminSession();
  return NextResponse.json({ ok: true });
}
