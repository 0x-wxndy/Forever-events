import Image from "next/image";
import { redirect } from "@/i18n/navigation";
import { isAdminAuthed } from "@/lib/admin-auth";
import { AdminNav } from "@/components/admin/AdminNav";
import { listRequests } from "@/lib/inbox";
import { Link } from "@/i18n/navigation";

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
  const incoming = (await listRequests()).filter((item) => item.status === "new").length;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fff4f6]">
      <Image src="/images/hero.jpg" alt="" fill className="object-cover object-center opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#fff7f4]/70 via-[#fff4f6]/85 to-[#fff4f6]" />
      <div className="relative mx-auto max-w-[1400px] px-4 py-5">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <Link href="/admin" className="font-script text-4xl text-[#7a5346]">
              Forever <span className="text-rose-deep">♥</span>
            </Link>
            <p className="text-xs tracking-[0.2em] text-muted uppercase">Events</p>
          </div>
          <div className="rounded-full bg-white/80 px-4 py-2 text-sm text-dusty shadow-soft">
            Admin
          </div>
        </header>
        <div className="grid gap-6 lg:grid-cols-[15rem_1fr]">
          <AdminNav incoming={incoming} />
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
