"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

export default function AdminLoginPage() {
  const t = useTranslations("admin");
  const router = useRouter();
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(false);
    const form = new FormData(event.currentTarget);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: form.get("password") }),
    });

    setPending(false);
    if (!response.ok) {
      setError(true);
      return;
    }
    router.replace("/admin");
  }

  return (
    <section className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5">
      <p className="font-script text-4xl text-dusty">Forever Events</p>
      <h1 className="mt-3 font-serif text-4xl text-ink">{t("loginTitle")}</h1>
      <p className="mt-2 text-sm text-muted">{t("loginLead")}</p>
      <form onSubmit={onSubmit} className="mt-8 rounded-[1.8rem] bg-white p-6 shadow-soft">
        <label className="grid gap-2 text-sm">
          {t("password")}
          <input
            type="password"
            name="password"
            required
            autoFocus
            className="rounded-full border border-rose/20 bg-ivory px-4 py-2.5 outline-none focus:border-rose"
          />
        </label>
        <button
          type="submit"
          disabled={pending}
          className="mt-5 w-full rounded-full bg-rose-deep py-2.5 text-sm text-white disabled:opacity-60"
        >
          {t("signIn")}
        </button>
        {error && <p className="mt-3 text-sm text-dusty">{t("invalid")}</p>}
      </form>
    </section>
  );
}
