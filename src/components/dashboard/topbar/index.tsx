import TopbarProvider from "~/components/dashboard/topbar/topbar-provider";

export default function DashboardTopbar({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TopbarProvider>{children}</TopbarProvider>;
}
