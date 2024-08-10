import Header from "@/Components/Header/Header";
import Sidebar from "@/Components/Sidebar/Sidebar";
import { ThemeProvider } from "@/Components/ThemeProvider";
import { Toaster } from "@/Components/ui/sonner";
import store from "@/states";
import React, { useState } from "react";
import { Provider } from "react-redux";

export default function DefaultLayout({ children }: any) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div>
          <div className="flex h-screen overflow-hidden">
            <Sidebar
              sidebarExpanded={sidebarExpanded}
              setSidebarExpanded={setSidebarExpanded}
            />
            <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
              <Header />
              <main>
                <div className="p-4 mx-auto max-w-screen md:p-4 2xl:p-4">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </div>
        <Toaster richColors />
      </ThemeProvider>
    </Provider>
  );
}
