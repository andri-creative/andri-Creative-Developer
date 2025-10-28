"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export type Achievement = {
  id: string;
  title: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
  issuer: string;
  label: string;
  issueDate: string;
  description: string;
  category: string;
  level: string;
  tags: string[];
};

interface AchievementsProps {
  dataAchievements: Achievement[];
}
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "../ui/pagination";
import { achievementsData } from "@/lib/achievements-data";

const Achievements = ({ dataAchievements }: AchievementsProps) => {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const totalPages = Math.ceil(dataAchievements.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = dataAchievements.slice(startIndex, endIndex);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const SkeletonCard = () => (
    <Card className="flex flex-col pt-0">
      <Skeleton className="w-full h-0 pb-[75%] rounded-t-md" />{" "}
      {/* aspect-[4/3] */}
      <CardHeader className="space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-2/5" />
      </CardHeader>
    </Card>
  );

  return (
    <>
      <Card className="@container/card">
        {isLoading ? (
          <CardHeader className="gap-3 p-2 md:px-6 w-full">
            <Skeleton className="h-10 w-48 md:h-12 md:w-64" />
            <Skeleton className="h-5 w-72 md:w-96" />
            <Skeleton className="h-px w-full mt-3" />
          </CardHeader>
        ) : (
          <CardHeader className="gap-3 p-2 md:px-6 w-full">
            <CardTitle className="text-3xl md:text-4xl font-bold">
              Achievements
            </CardTitle>
            <CardDescription>
              A curated collection of certificates and badges I&#39;ve earned
              throughout my professional and academic journey.
            </CardDescription>
            <span className="block border-t border-dashed border-gray-800"></span>
          </CardHeader>
        )}
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 lg:px-6">
          {isLoading
            ? Array.from({ length: itemsPerPage }).map((_, i) => (
                <SkeletonCard key={`skeleton-${i}`} />
              ))
            : currentItems.map((item) => (
                <Card key={item.id} className="flex flex-col pt-0">
                  <div className="w-full relative aspect-[4/3]">
                    <Image
                      src={item.src}
                      fill
                      alt={item.title}
                      className="object-cover rounded-t-md"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {item.issuer}
                    </CardDescription>
                    <CardDescription className="text-xs">
                      {item.label}
                    </CardDescription>
                    <CardDescription className="text-sm">
                      {item.issueDate}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
        </CardContent>
        {/* Pagination - hanya muncul setelah loading */}
        {!isLoading && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  href="#"
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    className={currentPage === i + 1 ? "font-bold" : ""}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  href="#"
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </Card>
    </>
  );
};

export default Achievements;
