"use client";

// import { type Icon } from "@tabler/icons-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FaArrowRightLong } from "react-icons/fa6";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ElementType;
  }[];
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <Link href={item.url} className="">
                  {loading ? (
                    <Skeleton className="h-8 w-full rounded-md" />
                  ) : (
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={cn(
                        isActive
                          ? "bg-primary text-primary-foreground translate-x-2 animate-wiggle-x"
                          : "hover:bg-accent hover:text-accent-foreground",
                        "cursor-pointer justify-between transition-transform duration-200 "
                      )}
                    >
                      <div className="flex gap-2 items-center">
                        <span className="w-6 h-6 flex items-center justify-center">
                          {item.icon && <item.icon className="w-full h-full" />}
                        </span>
                        <span>{item.title}</span>
                      </div>
                      {isActive ? <FaArrowRightLong className="mr-2 " /> : ""}
                    </SidebarMenuButton>
                  )}
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
