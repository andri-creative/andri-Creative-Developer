"use client";

import { IconBrandSpotify } from "@tabler/icons-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

const NavButtom = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex justify-between items-center mb-3">
      {loading ? (
        <>
          {/* Skeleton hanya saat loading */}
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </>
      ) : (
        <>
          {/* Tombol asli saat loading = false */}
          <Link
            href=""
            className="flex gap-2 items-center border px-3 py-1 rounded-full border-gray-400 bg-gray-200"
          >
            <span className="h-2 w-2 bg-green-500 rounded-full" />
            <span className="text-sm font-mon dark:text-gray-900">
              Hire Me!
            </span>
          </Link>

          <Link href="" className="px-1 py-1 rounded-full bg-gray-200">
            <IconBrandSpotify className="text-green-500" />
          </Link>
        </>
      )}
    </div>
  );
};

export default NavButtom;
