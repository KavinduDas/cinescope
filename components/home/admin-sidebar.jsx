"use client";

import Link from "next/link";

import {
  BarChart,
  Film,
  Home,
  MessageSquare,
  Settings,
  User,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Logo from "../logo";
import { ModeToggle } from "../mode-toggle";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: Home,
      exact: true,
    },
    {
      title: "Movies",
      href: "/admin/movies",
      icon: Film,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Reviews",
      href: "/admin/reviews",
      icon: MessageSquare,
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: BarChart,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  const isActive = (item) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };
  return (
    <Sidebar className="border-r bg-primary/5 border-primary/30">
      <SidebarHeader className="flex flex-col">
        <div className="flex items-center p-2">
          <Logo className="w-8 h-8" />
          <h2 className="ml-2 text-xl font-bold">CineScope</h2>
          <div className="flex items-center ml-auto">
            <ModeToggle />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link
                      href={item.href}
                      className={isActive(item) ? "bg-primary/10" : ""}
                    >
                      {item.title}
                      <item.icon className="w-4 h-4" />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroupLabel>Account</SidebarGroupLabel>

        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Profile">
                <Link href="/admin/profile">
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Public Site">
                <Link href="/admin/profile">
                  <Film className="w-4 h-4" />
                  <span>Public Site</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
