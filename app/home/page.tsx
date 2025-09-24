"use client";

import { AppSidebar } from "@/components/app-sidebar";
import Featured from "@/components/home/featured";
import Home from "@/components/home/home";
import Skills from "@/components/home/skills";
// import Loader from "@/components/loader";

import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
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
              <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-1 lg:grid-cols-2 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                <Home />
              </div>
              <div className="px-4 lg:px-6 ">
                <Skills />
              </div>
              <div className="gap-4 px-4  lg:px-6 ">
                <Featured />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
