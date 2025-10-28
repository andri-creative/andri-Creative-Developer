"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { BsFillPinFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
export type Tool = {
  id: string;
  title: string;
  image: string;
  url: string;
  createdAt: string;
  updatedAt: string;
};

export type ProjectData = {
  id: string;
  title: string;
  description: string;
  image: string;
  status: boolean;
  techStack: string[];
  features: string[];
  role?: string;
  demoUrl?: string;
  repoUrl?: string;
  tools: Tool[];
  createdAt: string;
  updatedAt: string;
};

interface ProjectsProps {
  projects: ProjectData[];
}

const Projects = ({ projects }: ProjectsProps) => {
  const getStatusString = (status: boolean): "active" | "inactive" => {
    return status ? "active" : "inactive";
  };
  const [isLoading, setIsLoading] = useState(true);

  // Simulasi loading 3 detik
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Map projects dengan status string
  const projectsWithStringStatus = projects.map((project) => ({
    ...project,
    statusString: getStatusString(project.status),
  }));

  const sortedProjects = [...projectsWithStringStatus].sort((a, b) => {
    if (a.statusString === "active" && b.statusString !== "active") return -1;
    if (a.statusString !== "active" && b.statusString === "active") return 1;
    return 0;
  });

  // Jumlah skeleton = jumlah proyek atau minimal 3
  const skeletonCount = Math.max(sortedProjects.length, 3);

  return (
    <>
      <Card className="@container/card">
        {isLoading ? (
          <CardHeader className="gap-3 p-2 md:px-6 w-full">
            <Skeleton className="h-10 w-48 md:h-12 md:w-64 rounded-md" />
            <Skeleton className="h-5 w-80 md:w-96 rounded-md" />
            <Skeleton className="h-px w-full mt-3 bg-gray-300" />
          </CardHeader>
        ) : (
          <CardHeader className="gap-3 p-2 md:px-6 w-full">
            <CardTitle className="text-3xl md:text-4xl font-bold">
              Projects
            </CardTitle>
            <CardDescription>
              A showcase of both private and open-source projects I&#39;ve built
              or contributed to.
            </CardDescription>
            <span className="block border-t border-dashed border-gray-800"></span>
          </CardHeader>
        )}
        <CardContent className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-5 px-4 lg:px-6">
          {isLoading
            ? Array.from({ length: skeletonCount }).map((_, i) => (
                <ProjectSkeletonCard key={`skeleton-${i}`} index={i} />
              ))
            : sortedProjects.map((item) => (
                <Link key={item.id} href={`/projects/${item.id}`}>
                  <Card className="pt-0 relative hover:shadow-lg transition-shadow">
                    {item.statusString === "active" && (
                      <div className="absolute z-20 top-0 right-0 bg-blue-500 text-gray-100 rounded-tr-md rounded-bl-md">
                        <CardTitle className="text-sm font-bold flex px-4 py-1 items-center justify-between text-center">
                          <BsFillPinFill />
                          <span className="ms-2">Featured</span>
                        </CardTitle>
                      </div>
                    )}
                    <div className="w-full relative aspect-[4/3]">
                      <Image
                        src={item.image}
                        fill
                        alt={item.title}
                        className="object-cover rounded-t-md"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription className="text-sm break-words">
                        {(() => {
                          const words = item.description.split(" ");
                          const preview = words.slice(0, 15).join(" ");
                          return preview + (words.length > 15 ? "..." : "");
                        })()}
                      </CardDescription>
                      <div className="flex flex-wrap gap-3 py-2">
                        {item.tools && item.tools.length > 0 ? (
                          item.tools.map((tool) => (
                            <Avatar
                              key={tool.id}
                              className="rounded-md w-10 h-10"
                            >
                              <AvatarImage
                                src={tool.url}
                                alt={tool.title}
                                className="object-contain p-1"
                              />
                              <AvatarFallback className="text-xs">
                                {tool.title.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          ))
                        ) : (
                          <p className="text-xs text-gray-500">No tools</p>
                        )}
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
        </CardContent>
      </Card>
    </>
  );
};

function ProjectSkeletonCard({ index }: { index: number }) {
  return (
    <div className="relative">
      {/* Featured Badge Skeleton */}
      {index === 0 && (
        <div className="absolute z-20 top-0 right-0">
          <Skeleton className="h-8 w-28 rounded-tr-md rounded-bl-md bg-blue-400" />
        </div>
      )}

      {/* Image Skeleton */}
      <Skeleton className="w-full h-0 pb-[75%] rounded-t-md bg-gray-200" />

      <CardHeader className="space-y-3 pt-4">
        {/* Title */}
        <Skeleton className="h-6 w-3/4 rounded-md" />

        {/* Description */}
        <div className="space-y-1">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-5/6 rounded-md" />
          <Skeleton className="h-4 w-2/3 rounded-md" />
        </div>

        {/* Tools */}
        <div className="flex flex-wrap gap-3 py-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton
              key={i}
              className="w-10 h-10 rounded-md"
              style={{ animationDelay: `${(index * 4 + i) * 80}ms` }}
            />
          ))}
        </div>
      </CardHeader>
    </div>
  );
}

export default Projects;
