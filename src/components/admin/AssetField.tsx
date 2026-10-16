"use client";

import { ImagePlus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

function Preview({ src }: { src: string }) {
  if (!src) {
    return <div className="grid h-full w-full place-items-center text-muted">—</div>;
  }
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return <img src={src} alt="" className="h-full w-full object-cover" />;
  }
  return <Image src={src} alt="" fill className="object-cover" />;
}

export function AssetField({
  label,
  value,
  onChange,
  compact,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  compact?: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

  async function onFile(file?: File) {
    if (!file) return;
    setBusy(true);
    setError(false);
    const data = new FormData();
    data.set("file", file);
    const response = await fetch("/api/admin/uploads", { method: "POST", body: data });
    setBusy(false);
    if (!response.ok) {
      setError(true);
      return;
    }
    const payload = (await response.json()) as { url?: string };
    if (payload.url) onChange(payload.url);
  }

  return (
    <label className="grid gap-2 text-sm">
      {label}
      <div className={cn("flex gap-3", compact ? "items-center" : "items-start")}>
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl bg-blush/40",
            compact ? "h-16 w-16 shrink-0" : "h-28 w-40",
          )}
        >
          <Preview src={value} />
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="field-input"
            placeholder="/images/… or upload"
          />
          <div className="flex flex-wrap gap-2">
            <label className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-rose/20 bg-white px-3 py-1.5 text-xs text-dusty">
              <ImagePlus className="h-3.5 w-3.5" />
              {busy ? "…" : "Upload"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={(event) => onFile(event.target.files?.[0])}
              />
            </label>
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs text-rose-deep"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          {error && <p className="text-xs text-rose-deep">Could not upload that file.</p>}
        </div>
      </div>
    </label>
  );
}
