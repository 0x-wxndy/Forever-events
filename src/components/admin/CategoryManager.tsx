"use client";

import { Pencil, Plus, Trash2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { AssetField } from "@/components/admin/AssetField";
import type { Localized, Service, ServiceIcon } from "@/data/catalog";
import { localized } from "@/lib/format";
import type { Locale } from "@/i18n/routing";
import { useRouter } from "@/i18n/navigation";

const icons: ServiceIcon[] = ["camera", "flower", "cake", "music", "sparkles", "map"];

function emptyLocalized(): Localized {
  return { fr: "", en: "" };
}

function emptyService(): Service {
  return {
    slug: "",
    name: emptyLocalized(),
    tagline: emptyLocalized(),
    description: emptyLocalized(),
    image: "",
    icon: "sparkles",
  };
}

export function CategoryManager({
  services,
  vendorCounts,
}: {
  services: Service[];
  vendorCounts: Record<string, number>;
}) {
  const t = useTranslations("admin");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const [draft, setDraft] = useState<Service | null>(null);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function save(service: Service, previousSlug?: string) {
    if (!service.name.fr && !service.name.en) {
      setError(t("categoryRequired"));
      return;
    }
    setPending(true);
    setError("");
    const response = await fetch(
      previousSlug ? `/api/admin/services/${previousSlug}` : "/api/admin/services",
      {
        method: previousSlug ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(service),
      },
    );
    setPending(false);
    if (!response.ok) {
      setError(t("saveFailed"));
      return;
    }
    setDraft(null);
    setEditingSlug(null);
    setCreating(false);
    router.refresh();
  }

  async function remove(slug: string) {
    if (!confirm(t("confirmDeleteCategory"))) return;
    setPending(true);
    setError("");
    const response = await fetch(`/api/admin/services/${slug}`, { method: "DELETE" });
    setPending(false);
    if (response.status === 409) {
      setError(t("categoryInUse"));
      return;
    }
    if (!response.ok) {
      setError(t("saveFailed"));
      return;
    }
    router.refresh();
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={() => {
            setCreating(true);
            setEditingSlug(null);
            setDraft(emptyService());
          }}
          className="inline-flex items-center gap-2 rounded-full bg-rose-deep px-4 py-2.5 text-sm text-white"
        >
          <Plus className="h-4 w-4" /> {t("addCategory")}
        </button>
      </div>
      {error && <p className="mb-4 text-sm text-rose-deep">{error}</p>}
      <div className="space-y-4">
        {creating && draft && (
          <CategoryForm
            service={draft}
            pending={pending}
            onChange={setDraft}
            onSave={() => save(draft)}
            onCancel={() => {
              setCreating(false);
              setDraft(null);
            }}
          />
        )}
        {services.map((service) =>
          editingSlug === service.slug && draft ? (
            <CategoryForm
              key={service.slug}
              service={draft}
              pending={pending}
              onChange={setDraft}
              onSave={() => save(draft, service.slug)}
              onCancel={() => {
                setEditingSlug(null);
                setDraft(null);
              }}
            />
          ) : (
            <article key={service.slug} className="flex flex-wrap items-center gap-4 rounded-[1.6rem] bg-white p-5 shadow-soft">
              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-[0.18em] text-muted">{service.icon}</p>
                <h2 className="font-serif text-2xl text-ink">{localized(service.name, locale)}</h2>
                <p className="mt-1 text-sm text-muted">{localized(service.tagline, locale)}</p>
                <p className="mt-2 text-xs text-dusty">
                  {vendorCounts[service.slug] ?? 0} {t("vendors")}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCreating(false);
                    setEditingSlug(service.slug);
                    setDraft(service);
                  }}
                  className="inline-flex items-center gap-1 rounded-full border border-rose/20 px-3 py-2 text-sm text-dusty"
                >
                  <Pencil className="h-3.5 w-3.5" /> {t("edit")}
                </button>
                <button
                  type="button"
                  onClick={() => remove(service.slug)}
                  className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm text-rose-deep"
                >
                  <Trash2 className="h-3.5 w-3.5" /> {t("delete")}
                </button>
              </div>
            </article>
          ),
        )}
      </div>
    </div>
  );
}

function CategoryForm({
  service,
  pending,
  onChange,
  onSave,
  onCancel,
}: {
  service: Service;
  pending: boolean;
  onChange: (service: Service) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  const t = useTranslations("admin");

  function patchName(lang: "fr" | "en", value: string) {
    onChange({ ...service, name: { ...service.name, [lang]: value } });
  }

  return (
    <article className="rounded-[1.6rem] bg-white p-5 shadow-soft">
      <div className="grid gap-3 md:grid-cols-2">
        <label className="grid gap-2 text-sm">
          {t("nameFr")}
          <input
            value={service.name.fr}
            onChange={(event) => patchName("fr", event.target.value)}
            className="field-input"
          />
        </label>
        <label className="grid gap-2 text-sm">
          {t("nameEn")}
          <input
            value={service.name.en}
            onChange={(event) => patchName("en", event.target.value)}
            className="field-input"
          />
        </label>
        <label className="grid gap-2 text-sm">
          {t("taglineFr")}
          <input
            value={service.tagline.fr}
            onChange={(event) =>
              onChange({ ...service, tagline: { ...service.tagline, fr: event.target.value } })
            }
            className="field-input"
          />
        </label>
        <label className="grid gap-2 text-sm">
          {t("taglineEn")}
          <input
            value={service.tagline.en}
            onChange={(event) =>
              onChange({ ...service, tagline: { ...service.tagline, en: event.target.value } })
            }
            className="field-input"
          />
        </label>
        <label className="grid gap-2 text-sm md:col-span-2">
          {t("descriptionFr")}
          <textarea
            rows={3}
            value={service.description.fr}
            onChange={(event) =>
              onChange({
                ...service,
                description: { ...service.description, fr: event.target.value },
              })
            }
            className="field-input"
          />
        </label>
        <label className="grid gap-2 text-sm md:col-span-2">
          {t("descriptionEn")}
          <textarea
            rows={3}
            value={service.description.en}
            onChange={(event) =>
              onChange({
                ...service,
                description: { ...service.description, en: event.target.value },
              })
            }
            className="field-input"
          />
        </label>
        <label className="grid gap-2 text-sm">
          {t("icon")}
          <select
            value={service.icon}
            onChange={(event) => onChange({ ...service, icon: event.target.value as ServiceIcon })}
            className="field-input"
          >
            {icons.map((icon) => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm">
          {t("slug")}
          <input
            value={service.slug}
            onChange={(event) => onChange({ ...service, slug: event.target.value })}
            className="field-input"
            placeholder={t("slugAuto")}
          />
        </label>
      </div>
      <div className="mt-4">
        <AssetField
          label={t("coverImage")}
          value={service.image}
          onChange={(image) => onChange({ ...service, image })}
        />
      </div>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={onSave}
          disabled={pending}
          className="rounded-full bg-rose-deep px-4 py-2 text-sm text-white disabled:opacity-60"
        >
          {pending ? t("saving") : t("save")}
        </button>
        <button type="button" onClick={onCancel} className="rounded-full px-4 py-2 text-sm text-dusty">
          {t("cancel")}
        </button>
      </div>
    </article>
  );
}
