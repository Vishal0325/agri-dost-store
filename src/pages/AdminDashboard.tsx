
import React from "react";
import { Link, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Home, Layers, LayoutGrid, BarChart3, FileText } from "lucide-react";
import SectionsPage from "@/pages/admin/SectionsPage";
import CategoriesPage from "@/pages/admin/CategoriesPage";
import DataPage from "@/pages/admin/DataPage";
import PagesPage from "@/pages/admin/PagesPage";

const sidebarItems = [
  { title: "Dashboard", icon: Home, path: "/admin" },
  { title: "Sections", icon: Layers, path: "/admin/sections" },
  { title: "Categories", icon: LayoutGrid, path: "/admin/categories" },
  { title: "Data", icon: BarChart3, path: "/admin/data" },
  { title: "Pages", icon: FileText, path: "/admin/pages" },
];

export default function AdminDashboard() {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted">
        {/* Sidebar */}
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarItems.map(item => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton asChild isActive={location.pathname === item.path}>
                        <Link to={item.path}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        {/* Main content */}
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<div className="text-2xl font-bold">Welcome to the Admin Dashboard</div>} />
            <Route path="sections" element={<SectionsPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="data" element={<DataPage />} />
            <Route path="pages" element={<PagesPage />} />
            {/* Default fallback */}
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </main>
      </div>
    </SidebarProvider>
  );
}
