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

import { achieveData } from "@/app/api/achievements/route";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "../ui/pagination";

const Achievements = () => {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(achieveData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = achieveData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <Card className="@container/card">
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
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 lg:px-6">
          {currentItems.map((item) => (
            <Card key={item.id} className="flex flex-col pt-0">
              <div className="w-full relative aspect-[4/3]        ">
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

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                href="#"
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
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Card>
    </>
  );
};

export default Achievements;
