"use client";

import * as React from "react";

import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useThemeConfig } from "@/components/active-theme";

import { useRouter } from "next/navigation";

import dataUrl from "@/lib/navbar-data";

export default function SearchNav() {
  const { activeTheme } = useThemeConfig();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const filteredPages =
    dataUrl?.navMain.filter((page) =>
      page.title.toLowerCase().includes(query.toLowerCase())
    ) || [];

  React.useEffect(() => {
    setSelectedIndex(-1);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredPages.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev + 1 < filteredPages.length ? prev + 1 : 0
      );
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev - 1 >= 0 ? prev - 1 : filteredPages.length - 1
      );
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const page = filteredPages[selectedIndex];
      if (page && page.url) {
        router.push(page.url);
        setOpen(false);
      }
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) {
            setSelectedIndex(-1);
            setQuery("");
          }
        }}
      >
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="flex items-center justify-between w-64"
          >
            <span>Search documentation...</span>
            <Badge className="ml-2 pointer-events-none bg-transparent border text-gray-700 dark:text-gray-100 border-gray-700">
              Ctrl K
            </Badge>
          </Button>
        </DialogTrigger>

        <DialogContent className="[&>button]:hidden">
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <div className="relative w-full">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search..."
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-transparent focus-visible:border-none"
              />
            </div>
          </DialogHeader>
          <ScrollArea className="h-72 w-full">
            <h4 className="mb-4 text-sm leading-none font-medium px-3 text-gray-400">
              Pages
            </h4>
            {filteredPages.length > 0 ? (
              filteredPages.map((page, i) => (
                <React.Fragment key={page.title}>
                  <Link
                    href={page.url}
                    className={cn(
                      "w-full block px-3 py-2 rounded-lg text-sm transition-colors",
                      i === selectedIndex
                        ? activeTheme === "blue"
                          ? "bg-blue-600 text-white"
                          : activeTheme === "green"
                          ? "bg-green-600 text-white"
                          : activeTheme === "amber"
                          ? "bg-amber-600 text-white"
                          : "bg-gray-700 text-gray-100" // default
                        : activeTheme === "blue"
                        ? "hover:bg-blue-500 hover:text-white"
                        : activeTheme === "green"
                        ? "hover:bg-green-500 hover:text-white"
                        : activeTheme === "amber"
                        ? "hover:bg-amber-500 hover:text-white"
                        : "hover:bg-gray-700 hover:text-gray-100"
                    )}
                  >
                    {page.title}
                  </Link>

                  <Separator className="my-2" />
                </React.Fragment>
              ))
            ) : (
              <p className="text-sm text-gray-500">No results found.</p>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
