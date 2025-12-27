import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | GearGuard",
  description: "GearGuard Maintenance Management Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
