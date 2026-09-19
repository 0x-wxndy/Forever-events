import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/admin-auth";
import { listRequests } from "@/lib/inbox";

export async function GET() {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  return NextResponse.json({ ok: true, requests: await listRequests() });
}
