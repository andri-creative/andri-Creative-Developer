"use client";

import { AppSidebar } from "@/components/app-sidebar";

import { SiteHeader } from "@/components/site-header";
import Team from "@/components/team/team";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

// import Loader from "@/components/loader";
// import { useEffect, useState } from "react";

export default function Page() {
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => setLoading(false), 5000);
  //   return () => clearTimeout(timer);
  // }, []);

  // if (loading) {
  //   return <Loader />;
  // }

  return (
    <>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <div className="grid grid-cols-1 gap-4 px-4 lg:px-6">
                  <Team />
                </div>
                <div className="px-4 lg:px-6 "></div>
                <div className="gap-4 px-4  lg:px-6 "></div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
