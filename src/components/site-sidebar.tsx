'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LineChart, Users, ShoppingBag, Gavel } from 'lucide-react';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { AmplifyAdvisorIcon } from '@/components/icons';

const links = [
  { href: '/dashboard', label: 'Dashboard', icon: Home, tooltip: 'Dashboard' },
  { href: '/dashboard/recommendations', label: 'Recommendations', icon: ShoppingBag, tooltip: 'Product Recommendations' },
  { href: '/dashboard/trends', label: 'Trend Analysis', icon: LineChart, tooltip: 'Sales Trend Analysis' },
  { href: '/dashboard/segmentation', label: 'Segmentation', icon: Users, tooltip: 'Customer Segmentation' },
  { href: '/dashboard/negotiation', label: 'Negotiation', icon: Gavel, tooltip: 'AI Negotiation Tool' },
];

export function SiteSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <AmplifyAdvisorIcon className="size-8 shrink-0 text-primary" />
          <span className="text-xl font-headline font-semibold">Amplify Advisor</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {links.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === link.href}
                className="justify-start"
                tooltip={link.tooltip}
              >
                <Link href={link.href}>
                  <link.icon className="size-5" />
                  <span>{link.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
