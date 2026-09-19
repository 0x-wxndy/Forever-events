import { redirect } from "@/i18n/navigation";
import { isAdminAuthed } from "@/lib/admin-auth";
import { AdminNav } from "@/components/admin/AdminNav";

export default async function AdminDashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(await isAdminAuthed())) {
    redirect({ href: "/admin/login", locale });
  }

  return (
    <div className="min-h-screen bg-ivory">
      <AdminNav />
      <div className="mx-auto max-w-6xl px-5 py-8">{children}</div>
    </div>
  );
}
