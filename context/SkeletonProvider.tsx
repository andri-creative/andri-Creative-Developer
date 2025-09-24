"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface SkeletonContextType {
  loading: boolean;
  duration: number;
}

const SkeletonContext = createContext<SkeletonContextType | undefined>(
  undefined
);

export function SkeletonProvider({
  children,
  duration = 3000,
}: {
  children: ReactNode;
  duration?: number;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <SkeletonContext.Provider value={{ loading, duration }}>
      {children}
    </SkeletonContext.Provider>
  );
}

export const useSkeleton = () => {
  const context = useContext(SkeletonContext);
  if (!context) {
    throw new Error("useSkeleton harus digunakan di dalam SkeletonProvider");
  }
  return context;
};
