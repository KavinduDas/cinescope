import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/home/admin-sidebar";

export default function AdminLayout({ children }) {
  return (
    <SidebarProvider>
      {/* Sidebar selection */}
      <AdminSidebar />

      {/* Main content section */}
      <SidebarInset>
        <header className="sticky top-0 z-50 border-b bg-background">
          <div className="flex items-center justify-between h-16 px-4 ">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>

            {/*  User DropDown Navigation */}
            <div className="flex items-center justify-center w-12 h-12 bg-red-500 rounded-full">
              Dummy
            </div>
          </div>
        </header>
        <div className="flex-1 p-4 md:p-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
