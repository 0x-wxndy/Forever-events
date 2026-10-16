import { VendorsBoard } from "@/components/admin/VendorsBoard";
import { readCatalog } from "@/lib/catalog-store";

export default async function AdminVendorsPage() {
  const catalog = await readCatalog();
  return <VendorsBoard services={catalog.services} vendors={catalog.vendors} />;
}
