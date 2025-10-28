"use client";
import { useRouter } from "next/navigation";
import { authService } from "@/app/services/authService";
import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await authService.logout();
    router.push("/team");
  };

  return (
    <DropdownMenuItem onClick={handleLogout}>
      Log out
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  );
}
