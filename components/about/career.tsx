import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { IoBriefcaseOutline } from "react-icons/io5";

import CardCareer from "./components/card-career-data.";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

const Career = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Card>
        <CardHeader className="w-full">
          {loading ? (
            // Skeleton hanya untuk header (judul & deskripsi)
            <div className="space-y-2">
              <Skeleton className="h-6 w-32" /> {/* Judul skeleton */}
              <Skeleton className="h-4 w-48" /> {/* Deskripsi skeleton */}
            </div>
          ) : (
            <>
              <CardTitle className="font-bold text-lg md:text-2xl flex items-center">
                <span className="me-3">
                  <IoBriefcaseOutline />
                </span>
                Career
              </CardTitle>
              <CardDescription>My professional journey.</CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent>
          <CardCareer />
        </CardContent>
      </Card>
    </>
  );
};

export default Career;
