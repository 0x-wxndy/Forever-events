"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import type { RequestStatus } from "@/lib/inbox";

const statuses: RequestStatus[] = ["new", "inProgress", "contacted", "confirmed"];

export function RequestActions({
  id,
  status,
  notes,
}: {
  id: string;
  status: RequestStatus;
  notes?: string;
}) {
  const t = useTranslations("admin");
  const router = useRouter();
  const [current, setCurrent] = useState(status);
  const [text, setText] = useState(notes ?? "");
  const [saved, setSaved] = useState(false);
  const [pending, setPending] = useState(false);

  async function save() {
    setPending(true);
    setSaved(false);
    const response = await fetch(`/api/admin/requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: current, notes: text }),
    });
    setPending(false);
    if (response.ok) {
      setSaved(true);
      router.refresh();
    }
  }

  return (
    <div className="mt-8 rounded-[1.6rem] bg-white p-6 shadow-soft">
      <label className="grid gap-2 text-sm">
        {t("status")}
        <select
          value={current}
          onChange={(event) => setCurrent(event.target.value as RequestStatus)}
          className="rounded-full border border-rose/20 bg-ivory px-4 py-2.5 outline-none"
        >
          {statuses.map((item) => (
            <option key={item} value={item}>
              {t(item)}
            </option>
          ))}
        </select>
      </label>
      <label className="mt-4 grid gap-2 text-sm">
        {t("notes")}
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={4}
          className="rounded-3xl border border-rose/20 bg-ivory px-4 py-3 outline-none"
        />
      </label>
      <button
        type="button"
        onClick={save}
        disabled={pending}
        className="mt-4 rounded-full bg-rose-deep px-5 py-2.5 text-sm text-white disabled:opacity-60"
      >
        {t("save")}
      </button>
      {saved && <p className="mt-2 text-sm text-dusty">{t("saved")}</p>}
    </div>
  );
}
