"use client";

import { useEffect, useState } from "react";
// import { useSkeleton } from "@/context/SkeletonProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="@container/card col-span-2">
      {loading ? (
        // Skeleton state
        <div className="p-4 space-y-4">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-60" />
          <Skeleton className="h-0.5 w-full" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ) : (
        // Konten asli
        <>
          <CardHeader className="gap-3 p-2 md:px-6 w-full">
            <CardTitle className="text-3xl md:text-4xl font-bold">
              About
            </CardTitle>
            <CardDescription>A brief introduction to who I am.</CardDescription>
            <span className="block border-t border-dashed border-gray-800"></span>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-gray-800 dark:text-gray-200 font-medium space-y-4 leading-relaxed text-justify">
              <p>
                I am an experienced and passionate Full-Stack Developer with a
                strong foundation in Informatics Engineering from University 17
                August 1945 Surabaya. I specialize in developing scalable,
                efficient, and user-centric digital solutions across platforms.
              </p>

              <p>
                On the frontend, I use React.js, Next.js, and Tailwind CSS to
                build responsive and accessible interfaces. On the backend, I
                work with Laravel, Express.js, and Golang to design and
                implement reliable services. I also integrate data visualization
                into projects, ensuring clarity and usability.
              </p>

              <p>
                I thrive in collaborative environments, take pride in being
                detail-oriented and adaptable, and am committed to continuous
                learning. My goal is to deliver high-performance applications
                that create meaningful impact for users and businesses.
              </p>

              <div className="pt-4">
                <p>Best regards,</p>
                <p className="text-3xl font-white-star text-green-400 italic">
                  Andri
                </p>
              </div>
            </CardDescription>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default About;
