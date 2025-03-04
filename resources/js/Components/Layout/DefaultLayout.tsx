import React from "react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "@/Shared/Sidebar";
import { BreadcrumbWithCustomSeparator } from "../Breadcrumb";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger />

            <BreadcrumbWithCustomSeparator />
          </div>
        </header>
        <main>
          <div className="pt-0 pb-4 pl-6 pr-8">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DefaultLayout;
