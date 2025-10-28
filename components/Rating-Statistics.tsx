"use client";

import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface RatingStats {
  total: number;
  average: number;
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
}

interface RatingStatisticsProps {
  ratingStats: RatingStats;
  emoticons: string[];
}

export function RatingStatistics({
  ratingStats,
  emoticons,
}: RatingStatisticsProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Simulasi loading 3 detik (ganti dengan fetch API di production)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mt-6 mx-4">
      {isLoading ? (
        <RatingSkeleton />
      ) : (
        <RatingContent ratingStats={ratingStats} emoticons={emoticons} />
      )}
    </div>
  );
}

// === KONTEN UTAMA (Setelah Loading) ===
function RatingContent({ ratingStats, emoticons }: RatingStatisticsProps) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-4 shadow-sm">
      {/* Judul */}
      <h3 className="font-semibold text-blue-800 text-center mb-3 text-sm uppercase tracking-wide">
        Rating Statistics
      </h3>

      {/* Average Rating */}
      <div className="flex items-center justify-between mb-4 p-3 bg-white rounded-lg border border-blue-100">
        <div className="flex items-center space-x-2">
          <span className="text-lg">Star</span>
          <span className="text-sm font-medium text-blue-700">Average</span>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-blue-600">
            {ratingStats.average.toFixed(1)}/5
          </div>
          <div className="text-xs text-blue-500">
            {ratingStats.total} ratings
          </div>
        </div>
      </div>

      {/* Distribution */}
      <div className="space-y-2">
        <h4 className="text-xs font-medium text-blue-700 uppercase tracking-wide mb-2">
          Distribution
        </h4>

        {[5, 4, 3, 2, 1].map((rating) => {
          const count = ratingStats.distribution[rating as 1 | 2 | 3 | 4 | 5];
          const percentage =
            ratingStats.total > 0
              ? Math.round((count / ratingStats.total) * 100)
              : 0;

          return (
            <div
              key={rating}
              className="flex items-center justify-between text-sm"
            >
              {/* Emoticon + Rating */}
              <div className="flex items-center space-x-2 w-16">
                <span className="text-base">{emoticons[rating - 1]}</span>
                <span className="font-medium text-blue-700">{rating}</span>
              </div>

              {/* Progress Bar */}
              <div className="flex-1 mx-2">
                <div className="bg-blue-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              {/* Percentage */}
              <div className="w-12 text-right">
                <span className="text-xs font-medium text-blue-600">
                  {percentage}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// === SKELETON LOADING ===
function RatingSkeleton() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-4 shadow-sm animate-pulse">
      {/* Judul */}
      <div className="flex justify-center mb-3">
        <Skeleton className="h-5 w-48 rounded-md bg-blue-200" />
      </div>

      {/* Average Rating */}
      <div className="flex items-center justify-between mb-4 p-3 bg-white rounded-lg border border-blue-100">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-6 w-6 rounded-full bg-blue-200" />
          <Skeleton className="h-4 w-16 rounded-md bg-blue-200" />
        </div>
        <div className="text-right space-y-1">
          <Skeleton className="h-6 w-14 rounded-md bg-blue-200 ml-auto" />
          <Skeleton className="h-3 w-20 rounded-md bg-blue-200 ml-auto" />
        </div>
      </div>

      {/* Distribution Title */}
      <div className="mb-2">
        <Skeleton className="h-4 w-24 rounded-md bg-blue-200" />
      </div>

      {/* 5 Bar Skeleton */}
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => {
          // Random width untuk variasi visual
          const width = 20 + Math.random() * 60;

          return (
            <div key={i} className="flex items-center justify-between text-sm">
              {/* Emoticon + Rating */}
              <div className="flex items-center space-x-2 w-16">
                <Skeleton className="h-5 w-5 rounded-md bg-blue-200" />
                <Skeleton className="h-4 w-4 rounded-md bg-blue-200" />
              </div>

              {/* Progress Bar */}
              <div className="flex-1 mx-2">
                <div className="bg-blue-100 rounded-full h-2 overflow-hidden">
                  <Skeleton
                    className="h-full rounded-full bg-blue-300"
                    style={{
                      width: `${width}%`,
                      transition: "width 0.6s ease-out",
                      animationDelay: `${i * 100}ms`,
                    }}
                  />
                </div>
              </div>

              {/* Percentage */}
              <div className="w-12 text-right">
                <Skeleton className="h-4 w-8 rounded-md bg-blue-200 ml-auto" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
