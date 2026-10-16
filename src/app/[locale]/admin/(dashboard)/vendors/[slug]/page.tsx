import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { VendorForm } from "@/components/admin/VendorForm";
import { Link } from "@/i18n/navigation";
import { readCatalog } from "@/lib/catalog-store";

export default async function EditVendorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = await getTranslations("admin");
  const catalog = await readCatalog();
  const vendor = catalog.vendors.find((item) => item.slug === slug);
  if (!vendor) notFound();

  return (
    <div>
      <Link href="/admin/vendors" className="text-sm text-dusty hover:text-rose-deep">
        ← {t("backVendors")}
      </Link>
      <h1 className="mt-3 font-serif text-4xl text-ink">{vendor.name}</h1>
      <p className="mt-1 text-sm text-muted">{t("vendorFormLead")}</p>
      <div className="mt-6">
        <VendorForm services={catalog.services} vendor={vendor} />
      </div>
    </div>
  );
}
