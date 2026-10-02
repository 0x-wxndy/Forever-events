"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type EventSelection = {
  vendorSlug: string;
  serviceSlug: string;
  citySlug: string;
};

export type EventActivity = {
  id: string;
  kind: "created" | "added" | "removed" | "submitted";
  vendorSlug?: string;
  at: string;
};

export type EventDetails = {
  name: string;
  phone: string;
  citySlug: string;
  eventDate: string;
  eventType: string;
  guests: string;
  budget: string;
  notes: string;
  email: string;
};

type EventState = {
  details: EventDetails;
  selections: EventSelection[];
  lastAdded: EventSelection | null;
  submitted: boolean;
  activity: EventActivity[];
  setDetails: (patch: Partial<EventDetails>) => void;
  startEvent: (patch: Partial<EventDetails>) => void;
  addVendor: (selection: EventSelection) => void;
  removeVendor: (vendorSlug: string) => void;
  clearLastAdded: () => void;
  markSubmitted: () => void;
  resetEvent: () => void;
};

export const emptyDetails: EventDetails = {
  name: "",
  phone: "",
  citySlug: "oran",
  eventDate: "",
  eventType: "",
  guests: "",
  budget: "",
  notes: "",
  email: "",
};

function activityItem(
  kind: EventActivity["kind"],
  vendorSlug?: string,
): EventActivity {
  return {
    id: crypto.randomUUID(),
    kind,
    vendorSlug,
    at: new Date().toISOString(),
  };
}

export function detailsComplete(details: EventDetails) {
  return Boolean(details.name.trim() && details.phone.trim() && details.eventDate);
}

export const useEventStore = create<EventState>()(
  persist(
    (set, get) => ({
      details: emptyDetails,
      selections: [],
      lastAdded: null,
      submitted: false,
      activity: [],
      setDetails: (patch) =>
        set({
          details: { ...get().details, ...patch },
          submitted: false,
        }),
      startEvent: (patch) => {
        const details = { ...get().details, ...patch };
        const alreadyCreated = get().activity.some((item) => item.kind === "created");
        set({
          details,
          submitted: false,
          activity: alreadyCreated
            ? get().activity
            : [activityItem("created"), ...get().activity].slice(0, 12),
        });
      },
      addVendor: (selection) => {
        if (get().selections.some((item) => item.vendorSlug === selection.vendorSlug)) {
          set({ lastAdded: selection });
          return;
        }
        set({
          selections: [...get().selections, selection],
          lastAdded: selection,
          submitted: false,
          activity: [activityItem("added", selection.vendorSlug), ...get().activity].slice(0, 12),
        });
      },
      removeVendor: (vendorSlug) =>
        set({
          selections: get().selections.filter((item) => item.vendorSlug !== vendorSlug),
          lastAdded: get().lastAdded?.vendorSlug === vendorSlug ? null : get().lastAdded,
          activity: [activityItem("removed", vendorSlug), ...get().activity].slice(0, 12),
        }),
      clearLastAdded: () => set({ lastAdded: null }),
      markSubmitted: () =>
        set({
          submitted: true,
          lastAdded: null,
          activity: [activityItem("submitted"), ...get().activity].slice(0, 12),
        }),
      resetEvent: () =>
        set({
          details: emptyDetails,
          selections: [],
          lastAdded: null,
          submitted: false,
          activity: [],
        }),
    }),
    {
      name: "forever-my-event",
      version: 2,
      partialize: (state) => ({
        details: state.details,
        selections: state.selections,
        submitted: state.submitted,
        activity: state.activity,
      }),
      migrate: (persisted) => {
        const previous = persisted as Partial<EventState> & { citySlug?: string };
        if (previous && !previous.details) {
          return {
            details: {
              ...emptyDetails,
              citySlug: previous.citySlug || "oran",
            },
            selections: previous.selections ?? [],
            lastAdded: null,
            submitted: false,
            activity: [],
          };
        }
        return previous as EventState;
      },
    },
  ),
);
