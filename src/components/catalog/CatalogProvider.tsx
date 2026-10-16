"use client";

import { createContext, useContext } from "react";
import type { LiveCatalog } from "@/lib/catalog-store";

const CatalogContext = createContext<LiveCatalog>({ services: [], vendors: [] });

export function CatalogProvider({
  catalog,
  children,
}: {
  catalog: LiveCatalog;
  children: React.ReactNode;
}) {
  return <CatalogContext.Provider value={catalog}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  return useContext(CatalogContext);
}

export function useLiveService(slug?: string | null) {
  const { services } = useCatalog();
  return slug ? services.find((item) => item.slug === slug) ?? null : null;
}

export function useLiveVendor(slug?: string | null) {
  const { vendors } = useCatalog();
  return slug ? vendors.find((item) => item.slug === slug) ?? null : null;
}
