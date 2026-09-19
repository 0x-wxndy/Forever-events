"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type EventSelection = {
  vendorSlug: string;
  serviceSlug: string;
  citySlug: string;
};

type EventState = {
  citySlug: string;
  selections: EventSelection[];
  setCity: (slug: string) => void;
  addVendor: (selection: EventSelection) => void;
  removeVendor: (vendorSlug: string) => void;
  clear: () => void;
  hasVendor: (vendorSlug: string) => boolean;
};

export const useEventStore = create<EventState>()(
  persist(
    (set, get) => ({
      citySlug: "oran",
      selections: [],
      setCity: (citySlug) => set({ citySlug }),
      addVendor: (selection) => {
        if (get().selections.some((item) => item.vendorSlug === selection.vendorSlug)) {
          return;
        }
        set({ selections: [...get().selections, selection] });
      },
      removeVendor: (vendorSlug) =>
        set({
          selections: get().selections.filter((item) => item.vendorSlug !== vendorSlug),
        }),
      clear: () => set({ selections: [] }),
      hasVendor: (vendorSlug) =>
        get().selections.some((item) => item.vendorSlug === vendorSlug),
    }),
    { name: "forever-my-event" },
  ),
);
