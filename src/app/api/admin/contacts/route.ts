import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/admin-auth";
import { listContacts } from "@/lib/inbox";

export async function GET() {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  return NextResponse.json({ ok: true, contacts: await listContacts() });
}
