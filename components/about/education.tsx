"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { LuGraduationCap } from "react-icons/lu";
import CardEducation from "./components/card-education";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

const Education = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card>
      <CardHeader className="w-full">
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
        ) : (
          <>
            <CardTitle className="font-bold text-lg md:text-2xl flex items-center">
              <span className="me-3">
                <LuGraduationCap />
              </span>
              Education
            </CardTitle>
            <CardDescription>My educational journey.</CardDescription>
          </>
        )}
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ) : (
          <CardEducation />
        )}
      </CardContent>
    </Card>
  );
};

export default Education;
