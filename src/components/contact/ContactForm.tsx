"use client";

import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react";

export function ContactForm() {
  const t = useTranslations("contactPage");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setStatus("idle");
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          message: form.get("message"),
        }),
      });
      setStatus(response.ok ? "success" : "error");
    } catch {
      setStatus("error");
    } finally {
      setPending(false);
    }
  }

  if (status === "success") {
    return <p className="rounded-[1.5rem] bg-white p-6 text-sm text-dusty shadow-soft">{t("success")}</p>;
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-[1.8rem] bg-white p-6 shadow-soft">
      <label className="grid gap-1 text-sm">
        {t("name")}
        <input required name="name" className="rounded-full border border-rose/20 bg-ivory px-4 py-2.5 outline-none focus:border-rose" />
      </label>
      <label className="grid gap-1 text-sm">
        {t("email")}
        <input required type="email" name="email" className="rounded-full border border-rose/20 bg-ivory px-4 py-2.5 outline-none focus:border-rose" />
      </label>
      <label className="grid gap-1 text-sm">
        {t("phone")}
        <input name="phone" className="rounded-full border border-rose/20 bg-ivory px-4 py-2.5 outline-none focus:border-rose" />
      </label>
      <label className="grid gap-1 text-sm">
        {t("message")}
        <textarea required name="message" rows={5} className="rounded-3xl border border-rose/20 bg-ivory px-4 py-3 outline-none focus:border-rose" />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-rose-deep px-5 py-2.5 text-sm text-white disabled:opacity-60"
      >
        {t("send")}
      </button>
      {status === "error" && <p className="text-sm text-dusty">{t("error")}</p>}
    </form>
  );
}
