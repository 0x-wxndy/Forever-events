import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type RequestStatus = "new" | "inProgress" | "contacted" | "confirmed";

export type RequestVendor = {
  vendorSlug: string;
  serviceSlug: string;
  citySlug: string;
};

export type EventRequest = {
  id: string;
  type: "event-request";
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  eventType?: string;
  eventDate?: string;
  guests?: string;
  message?: string;
  citySlug?: string;
  budget?: string;
  vendors: RequestVendor[];
  status: RequestStatus;
  notes?: string;
};

export type ContactMessage = {
  id: string;
  type: "contact";
  createdAt: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
};

const dataDir = path.join(process.cwd(), "data");
const requestsFile = path.join(dataDir, "requests.json");
const contactsFile = path.join(dataDir, "contacts.json");

async function readList<T>(file: string): Promise<T[]> {
  try {
    const raw = await readFile(file, "utf8");
    const parsed = JSON.parse(raw) as T[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeList<T>(file: string, items: T[]) {
  await mkdir(dataDir, { recursive: true });
  await writeFile(file, JSON.stringify(items, null, 2));
}

function withStatus(item: EventRequest): EventRequest {
  const raw = String(item.status || "new");
  const status: RequestStatus =
    raw === "closed" || raw === "inProgress"
      ? raw === "closed"
        ? "inProgress"
        : "inProgress"
      : raw === "contacted" || raw === "confirmed"
        ? raw
        : "new";
  return {
    ...item,
    vendors: item.vendors ?? [],
    status,
  };
}

export async function listRequests() {
  const items = await readList<EventRequest>(requestsFile);
  return items.map(withStatus).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getRequest(id: string) {
  const items = await listRequests();
  return items.find((item) => item.id === id) ?? null;
}

export async function saveRequest(entry: EventRequest) {
  const items = await listRequests();
  items.push(withStatus(entry));
  await writeList(requestsFile, items);
}

export async function updateRequest(
  id: string,
  patch: Partial<Pick<EventRequest, "status" | "notes">>,
) {
  const items = await listRequests();
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return null;
  items[index] = { ...items[index], ...patch };
  await writeList(requestsFile, items);
  return items[index];
}

export async function listContacts() {
  const items = await readList<ContactMessage>(contactsFile);
  return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function saveContact(entry: ContactMessage) {
  const items = await listContacts();
  items.unshift(entry);
  await writeList(contactsFile, items);
}
