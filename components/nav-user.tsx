"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

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
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center justify-center h-full w-full ">
        <div className="flex flex-col items-center w-full">
          <Avatar className="w-[100px] h-[100px]">
            <AvatarImage src={user.avatar} alt="@shadcn" className="object-cover object-top" />
            <AvatarFallback>{user.label}</AvatarFallback>
          </Avatar>
          <div className="w-full flex justify-center gap-2  items-center">
            <h1 className="font-bold text-lg ">{user.name}</h1>
            <Avatar className="h-5 w-5">
              <AvatarImage src={user.verified} alt="@shadcn" />
              <AvatarFallback>{user.label}</AvatarFallback>
            </Avatar>
          </div>
          <p className="font-semibold text-sm">{user.username}</p>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
