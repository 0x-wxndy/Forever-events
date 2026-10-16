import { getTranslations } from "next-intl/server";
import { VendorForm } from "@/components/admin/VendorForm";
import { Link } from "@/i18n/navigation";
import { readCatalog } from "@/lib/catalog-store";

export default async function NewVendorPage() {
  const t = await getTranslations("admin");
  const { services } = await readCatalog();

  return (
    <div>
      <Link href="/admin/vendors" className="text-sm text-dusty hover:text-rose-deep">
        ← {t("backVendors")}
      </Link>
      <h1 className="mt-3 font-serif text-4xl text-ink">{t("addVendor")}</h1>
      <p className="mt-1 text-sm text-muted">{t("vendorFormLead")}</p>
      <div className="mt-6">
        <VendorForm services={services} />
      </div>
    </div>
  );
}
