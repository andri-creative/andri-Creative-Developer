"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "../../components/ui/pagination";
import { achievementsData } from "@/lib/achievements-data";
import { Document, Page, pdfjs } from "react-pdf";
// import "react-pdf/dist/esm/Page/TextLayer.css";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// Worker untuk react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export type Achievement = {
  id: number;
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
  link: string;
  tags: string[];
};

const PdfViewer = ({ src }: { src: string }) => (
  <div className="w-full h-[300px] overflow-auto border rounded-md">
    <Document file={src}>
      <Page pageNumber={1} width={400} />
    </Document>
  </div>
);

const Achievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setAchievements(achievementsData as Achievement[]);
  }, []);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(achievements.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = achievements.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <Card className="@container/card bg-amber-300">
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
            <div className="w-full relative aspect-[4/3]">
              {item.src.toLowerCase().endsWith(".pdf") ? (
                <PdfViewer src={item.src} />
              ) : (
                <Image
                  src={item.src}
                  fill
                  alt={item.title}
                  className="object-cover rounded-t-md"
                />
              )}
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
  );
};

export default Achievements;
