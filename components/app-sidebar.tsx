"use client";

import * as React from "react";
import { useEffect, useState } from "react";

import dataUrl from "@/lib/navbar-data";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Navtitle from "./nav-title";
import NavButtom from "./nav-buttom";
import { RatingStatistics } from "./Rating-Statistics";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [ratingStats, setRatingStats] = useState({
    total: 0,
    average: 0,
    distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  });

  const fetchRatingStats = async () => {
    try {
      const res = await fetch("/api/rating");
      const data = await res.json();

      if (data.success) {
        const stats = data.data;
        setRatingStats({
          total: stats.totalRating,
          average: parseFloat(stats.averageRating.toFixed(1)),
          distribution: stats.rantingDistribution,
        });
      }
    } catch (error) {
      console.error("Failed to fetch rating stats:", error);
    }
  };

  useEffect(() => {
    fetchRatingStats();

    // polling tiap 5 detik
    const interval = setInterval(fetchRatingStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const emoticons = ["😢", "😕", "😐", "😊", "😍"];

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Navtitle />
            <NavButtom />
            <NavUser user={dataUrl.user} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="relative">
        {/* <SiteStar /> */}
        <NavMain items={dataUrl.navMain} />

        <RatingStatistics ratingStats={ratingStats} emoticons={emoticons} />

        {/* Rating Statistics Section */}
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
