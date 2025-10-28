"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CardSenior } from "./components/card-team";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

const Team = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulasi loading 3 detik
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="@container/card">
      {/* HEADER DENGAN SKELETON */}
      {isLoading ? (
        <CardHeader className="gap-3 p-2 md:px-6 w-full space-y-4">
          {/* Judul Utama */}
          <Skeleton className="h-10 w-48 md:h-12 md:w-64 rounded-md" />
          {/* Deskripsi (2 baris) */}
          <Skeleton className="h-5 w-96 md:w-full max-w-2xl rounded-md" />
          <Skeleton className="h-5 w-80 md:w-96 rounded-md" />
          {/* Tombol */}
          <div className="flex justify-start">
            <Skeleton className="h-12 w-48 rounded-full" />
          </div>
          {/* Garis Pemisah */}
          <Skeleton className="h-px w-full bg-gray-300" />
          {/* Sub Judul */}
          <Skeleton className="h-10 w-64 mx-auto rounded-md" />
          <Skeleton className="h-5 w-80 md:w-96 mx-auto rounded-md" />
        </CardHeader>
      ) : (
        <CardHeader className="gap-3 p-2 md:px-6 w-full">
          <CardTitle className="text-3xl md:text-4xl font-bold">
            Our Team
          </CardTitle>
          <CardDescription>
            Meet the brilliant minds behind our success. A collaborative
            ecosystem where experience and fresh perspectives unite to create
            extraordinary results.
          </CardDescription>
          <div className="flex justify-start">
            <Link href="/auth/team/login">
              <Button
                className="group flex items-center gap-2 px-6 py-3 rounded-full
                         bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                         text-white font-semibold text-sm
                         shadow-lg hover:shadow-xl
                         transition-all duration-300 transform hover:scale-105"
              >
                <span>Join Our Team</span>
                <IoIosArrowRoundForward className="text-xl transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          <span className="block border-t border-dashed border-gray-800"></span>
          <CardTitle className="text-3xl md:text-4xl font-bold text-center">
            Technical Leadership
          </CardTitle>
          <CardDescription className="text-center">
            Seasoned experts overseeing architecture and delivery of
            enterprise-grade solutions.
          </CardDescription>
        </CardHeader>
      )}

      {/* CONTENT: CARD SENIOR */}
      <CardContent className="px-4 lg:px-6">
        {isLoading ? <SeniorSwiperSkeleton /> : <CardSenior />}
      </CardContent>
    </Card>
  );
};

// === SKELETON UNTUK SWIPER ===
function SeniorSwiperSkeleton() {
  const slideCounts = [1, 2, 3, 4]; // lg: 3, xl: 4

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {slideCounts.map((_, i) => (
          <SeniorCardSkeleton key={`skeleton-${i}`} index={i} />
        ))}
      </div>
    </div>
  );
}

// === SKELETON CARD TUNGGAL ===
function SeniorCardSkeleton({ index }: { index: number }) {
  return (
    <div className="space-y-3">
      {/* Gambar */}
      <Skeleton className="w-full h-96 rounded-t-lg bg-gray-200" />

      {/* Konten */}
      <div className="p-4 space-y-2">
        {/* Nama */}
        <Skeleton className="h-6 w-3/4 rounded-md" />

        {/* Role */}
        <Skeleton className="h-4 w-1/2 rounded-md" />

        {/* Deskripsi (3 baris) */}
        <div className="space-y-1">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-5/6 rounded-md" />
          <Skeleton className="h-4 w-4/5 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export default Team;
