"use client";

import { Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { AssetField } from "@/components/admin/AssetField";
import { cities, type Localized, type Service, type Vendor, type VendorPackage } from "@/data/catalog";
import { localized } from "@/lib/format";
import type { Locale } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";

function emptyLocalized(): Localized {
  return { fr: "", en: "" };
}

function emptyPackage(): VendorPackage {
  return { name: emptyLocalized(), startingPrice: 0, details: emptyLocalized() };
}

function emptyVendor(serviceSlug: string): Vendor {
  return {
    slug: "",
    name: "",
    serviceSlug,
    citySlug: "oran",
    startingPrice: 0,
    bio: emptyLocalized(),
    coverImage: "",
    gallery: [],
    packages: [emptyPackage()],
    rating: 4.8,
    reviews: 0,
    badge: { fr: "Sélectionné", en: "Curated" },
  };
}

export function VendorForm({
  services,
  vendor,
}: {
  services: Service[];
  vendor?: Vendor;
}) {
  const t = useTranslations("admin");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const [form, setForm] = useState<Vendor>(
    vendor ?? emptyVendor(services[0]?.slug ?? ""),
  );
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const editing = Boolean(vendor);

  function patch(partial: Partial<Vendor>) {
    setForm((current) => ({ ...current, ...partial }));
  }

  function patchLocalized(key: "bio" | "badge", lang: "fr" | "en", value: string) {
    setForm((current) => ({ ...current, [key]: { ...current[key], [lang]: value } }));
  }

  function patchPackage(index: number, next: VendorPackage) {
    setForm((current) => ({
      ...current,
      packages: current.packages.map((item, i) => (i === index ? next : item)),
    }));
  }

  async function onSubmit() {
    if (!form.name.trim() || !form.serviceSlug) {
      setError(t("vendorRequired"));
      return;
    }
    setPending(true);
    setError("");
    const response = await fetch(
      editing ? `/api/admin/vendors/${vendor!.slug}` : "/api/admin/vendors",
      {
        method: editing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      },
    );
    setPending(false);
    if (!response.ok) {
      setError(t("saveFailed"));
      return;
    }
    router.push("/admin/vendors");
    router.refresh();
  }

  async function onDelete() {
    if (!vendor || !confirm(t("confirmDeleteVendor"))) return;
    setPending(true);
    const response = await fetch(`/api/admin/vendors/${vendor.slug}`, { method: "DELETE" });
    setPending(false);
    if (response.ok) {
      router.push("/admin/vendors");
      router.refresh();
    }
  }

  return (
    <div className="rounded-[1.8rem] bg-white p-6 shadow-soft">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm">
          {t("vendorName")}
          <input
            value={form.name}
            onChange={(event) => patch({ name: event.target.value })}
            className="field-input"
          />
        </label>
        <label className="grid gap-2 text-sm">
          {t("slug")}
          <input
            value={form.slug}
            onChange={(event) => patch({ slug: event.target.value })}
            className="field-input"
            placeholder={t("slugAuto")}
          />
        </label>
        <label className="grid gap-2 text-sm">
          {t("category")}
          <select
            value={form.serviceSlug}
            onChange={(event) => patch({ serviceSlug: event.target.value })}
            className="field-input"
          >
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {localized(service.name, locale)}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm">
          {t("city")}
          <select
            value={form.citySlug}
            onChange={(event) => patch({ citySlug: event.target.value })}
            className="field-input"
          >
            {cities.map((city) => (
              <option key={city.slug} value={city.slug}>
                {localized(city.name, locale)}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm">
          {t("startingPrice")}
          <input
            type="number"
            min={0}
            value={form.startingPrice || ""}
            onChange={(event) => patch({ startingPrice: Number(event.target.value) || 0 })}
            className="field-input"
          />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="grid gap-2 text-sm">
            {t("rating")}
            <input
              type="number"
              min={0}
              max={5}
              step={0.1}
              value={form.rating ?? ""}
              onChange={(event) => patch({ rating: Number(event.target.value) || 0 })}
              className="field-input"
            />
          </label>
          <label className="grid gap-2 text-sm">
            {t("reviews")}
            <input
              type="number"
              min={0}
              value={form.reviews ?? ""}
              onChange={(event) => patch({ reviews: Number(event.target.value) || 0 })}
              className="field-input"
            />
          </label>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm">
          {t("badgeFr")}
          <input
            value={form.badge?.fr ?? ""}
            onChange={(event) => patchLocalized("badge", "fr", event.target.value)}
            className="field-input"
          />
        </label>
        <label className="grid gap-2 text-sm">
          {t("badgeEn")}
          <input
            value={form.badge?.en ?? ""}
            onChange={(event) => patchLocalized("badge", "en", event.target.value)}
            className="field-input"
          />
        </label>
        <label className="grid gap-2 text-sm">
          {t("bioFr")}
          <textarea
            rows={4}
            value={form.bio.fr}
            onChange={(event) => patchLocalized("bio", "fr", event.target.value)}
            className="field-input"
          />
        </label>
        <label className="grid gap-2 text-sm">
          {t("bioEn")}
          <textarea
            rows={4}
            value={form.bio.en}
            onChange={(event) => patchLocalized("bio", "en", event.target.value)}
            className="field-input"
          />
        </label>
      </div>

      <div className="mt-6">
        <AssetField label={t("coverImage")} value={form.coverImage} onChange={(coverImage) => patch({ coverImage })} />
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-ink">{t("portfolio")}</h3>
          <button
            type="button"
            onClick={() => patch({ gallery: [...form.gallery, ""] })}
            className="inline-flex items-center gap-1 text-sm text-rose-deep"
          >
            <Plus className="h-4 w-4" /> {t("addImage")}
          </button>
        </div>
        <div className="mt-3 space-y-4">
          {form.gallery.map((src, index) => (
            <div key={`${index}-${src}`} className="flex items-start gap-2">
              <div className="flex-1">
                <AssetField
                  compact
                  label={`${t("portfolio")} ${index + 1}`}
                  value={src}
                  onChange={(url) =>
                    patch({
                      gallery: form.gallery.map((item, i) => (i === index ? url : item)),
                    })
                  }
                />
              </div>
              <button
                type="button"
                onClick={() => patch({ gallery: form.gallery.filter((_, i) => i !== index) })}
                className="mt-7 text-rose-deep"
                aria-label={t("remove")}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-ink">{t("packages")}</h3>
          <button
            type="button"
            onClick={() => patch({ packages: [...form.packages, emptyPackage()] })}
            className="inline-flex items-center gap-1 text-sm text-rose-deep"
          >
            <Plus className="h-4 w-4" /> {t("addPackage")}
          </button>
        </div>
        <div className="mt-3 space-y-4">
          {form.packages.map((item, index) => (
            <div key={index} className="rounded-2xl border border-rose/15 p-4">
              <div className="grid gap-3 md:grid-cols-2">
                <label className="grid gap-2 text-sm">
                  {t("packageNameFr")}
                  <input
                    value={item.name.fr}
                    onChange={(event) =>
                      patchPackage(index, { ...item, name: { ...item.name, fr: event.target.value } })
                    }
                    className="field-input"
                  />
                </label>
                <label className="grid gap-2 text-sm">
                  {t("packageNameEn")}
                  <input
                    value={item.name.en}
                    onChange={(event) =>
                      patchPackage(index, { ...item, name: { ...item.name, en: event.target.value } })
                    }
                    className="field-input"
                  />
                </label>
                <label className="grid gap-2 text-sm">
                  {t("startingPrice")}
                  <input
                    type="number"
                    min={0}
                    value={item.startingPrice || ""}
                    onChange={(event) =>
                      patchPackage(index, { ...item, startingPrice: Number(event.target.value) || 0 })
                    }
                    className="field-input"
                  />
                </label>
                <div className="flex items-end justify-end">
                  <button
                    type="button"
                    onClick={() =>
                      patch({ packages: form.packages.filter((_, i) => i !== index) })
                    }
                    className="inline-flex items-center gap-1 text-sm text-rose-deep"
                  >
                    <Trash2 className="h-4 w-4" /> {t("remove")}
                  </button>
                </div>
                <label className="grid gap-2 text-sm">
                  {t("packageDetailsFr")}
                  <textarea
                    rows={3}
                    value={item.details.fr}
                    onChange={(event) =>
                      patchPackage(index, {
                        ...item,
                        details: { ...item.details, fr: event.target.value },
                      })
                    }
                    className="field-input"
                  />
                </label>
                <label className="grid gap-2 text-sm">
                  {t("packageDetailsEn")}
                  <textarea
                    rows={3}
                    value={item.details.en}
                    onChange={(event) =>
                      patchPackage(index, {
                        ...item,
                        details: { ...item.details, en: event.target.value },
                      })
                    }
                    className="field-input"
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-rose-deep">{error}</p>}
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onSubmit}
          disabled={pending}
          className="rounded-full bg-rose-deep px-5 py-2.5 text-sm text-white disabled:opacity-60"
        >
          {pending ? t("saving") : t("save")}
        </button>
        {editing && (
          <button
            type="button"
            onClick={onDelete}
            disabled={pending}
            className="rounded-full border border-rose/25 px-5 py-2.5 text-sm text-rose-deep"
          >
            {t("deleteVendor")}
          </button>
        )}
      </div>
    </div>
  );
}
