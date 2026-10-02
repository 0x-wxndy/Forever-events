import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/admin-auth";
import { updateRequest, type RequestStatus } from "@/lib/inbox";

const statuses: RequestStatus[] = ["new", "inProgress", "contacted", "confirmed"];

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const patch: { status?: RequestStatus; notes?: string } = {};

  if (body?.status) {
    if (!statuses.includes(body.status)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    patch.status = body.status;
  }
  if (typeof body?.notes === "string") {
    patch.notes = body.notes;
  }

  const updated = await updateRequest(id, patch);
  if (!updated) {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  return NextResponse.json({ ok: true, request: updated });
}
