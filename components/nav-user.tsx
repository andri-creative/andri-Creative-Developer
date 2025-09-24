"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    label: string;
    username: string;
    avatar: string;
    verified: string;
  };
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center justify-center h-full w-full">
        {loading ? (
          // SKELETON STATE
          <div className="flex flex-col items-center w-full gap-2">
            <Skeleton className="w-[100px] h-[100px] rounded-full" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-5 rounded-full" />
            </div>
            <Skeleton className="h-4 w-20" />
          </div>
        ) : (
          // DATA USER
          <div className="flex flex-col items-center w-full">
            <Avatar className="w-[100px] h-[100px]">
              <AvatarImage
                src={user.avatar}
                alt="@shadcn"
                className="object-cover object-top"
              />
              <AvatarFallback>{user.label}</AvatarFallback>
            </Avatar>
            <div className="w-full flex justify-center gap-2 items-center">
              <h1 className="font-bold text-lg">{user.name}</h1>
              <Avatar className="h-5 w-5">
                <AvatarImage src={user.verified} alt="@shadcn" />
                <AvatarFallback>{user.label}</AvatarFallback>
              </Avatar>
            </div>
            <p className="font-semibold text-sm">{user.username}</p>
          </div>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
