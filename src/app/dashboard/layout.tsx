import { SidebarInset } from '@/components/ui/sidebar';
import { SiteSidebar } from '@/components/site-sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteSidebar />
      <SidebarInset>{children}</SidebarInset>
    </>
  );
}
