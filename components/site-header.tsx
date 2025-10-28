"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "./mode-toggle";
import SearchNav from "./shearch-nav";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) relative">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        {loading ? (
          <>
            {/* Skeleton saat loading */}
            <Skeleton className="w-8 h-8 rounded" />
            <Separator
              orientation="vertical"
              className="mx-2 data-[orientation=vertical]:h-4"
            />
            <Skeleton className="h-8 w-40 rounded-md" />
            <div className="ml-auto flex items-center gap-2">
              <Skeleton className="w-8 h-8 rounded-full" />
            </div>
          </>
        ) : (
          <>
            {/* Konten asli saat tidak loading */}
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mx-2 data-[orientation=vertical]:h-4"
            />
            <div>
              <SearchNav />
            </div>
            <div className="ml-auto flex items-center gap-2">
              <ModeToggle />
            </div>
          </>
        )}
      </div>
      {/* <SiteStar /> */}
    </header>
  );
}
