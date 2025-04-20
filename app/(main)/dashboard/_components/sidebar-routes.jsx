"use client";
import { BookOpen } from "lucide-react";
import { School } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { BookCheck } from "lucide-react";
import { Newspaper } from "lucide-react";
const routes = [
  {
    icon: BookCheck,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: BookOpen,
    label: "Application",
    href: "/application",
  },
  {
    icon: School,
    label: "All Application",
    href: "/dashboard/all-document",
  },
  {
    icon: Newspaper,
    label: "Application View",
    href: "/",
  },
];

export const SidebarRoutes = () => {
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
