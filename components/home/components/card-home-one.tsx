"use client";

import { useState, useEffect } from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheckIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import Tilt from "react-parallax-tilt";
import { Skeleton } from "@/components/ui/skeleton";

import Image from "next/image";

const HomeCardTitle = () => {
  const [loading, setLoading] = useState(true);

  // simulasi loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Card className="@container/card md:col-span-2 lg:col-span-2">
        <CardHeader>
          {loading ? (
            <>
              <Skeleton className="h-8 w-full max-w-[180px] mb-2" />
              <Skeleton className="h-10 w-full max-w-[220px] mb-3" />
              <Skeleton className="h-5 w-1/2" />
            </>
          ) : (
            <>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                Hi, I&#39;am{" "}
                <span className="inline-block animate-wave">👋</span>
              </CardTitle>
              <h1 className="cardscroll-m-20 text-3xl md:text-4xl font-extrabold tracking-tight text-balance">
                Andrianto
              </h1>
              <ul className="lg:flex gap-10 ml-6 list-disc mb-4 text-sm md:text-lg">
                <li>Based in Surabaya, Indonesia 🇮🇩</li>
                <li>Onsite</li>
              </ul>
            </>
          )}
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          {loading ? (
            <>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-[90%] mb-2" />
              <Skeleton className="h-4 w-[80%]" />
            </>
          ) : (
            <div className="flex flex-col gap-2 text-muted-foreground">
              <p>
                I am a{" "}
                <span className="font-medium">Full-Stack Web Developer</span>{" "}
                with a strong foundation in Informatics Engineering and a
                passion for creating impactful digital solutions.
              </p>
              <p>
                I specialize in{" "}
                <span className="font-medium">
                  Laravel, React.js, Express.js, and Next.js
                </span>{" "}
                building applications that balance efficient back-end logic with
                clean and engaging front-end design.
              </p>
              <p>
                My focus is on{" "}
                <span className="font-medium">
                  scalability, performance, and user experience
                </span>
                , ensuring every project delivers real value for both users and
                businesses.
              </p>
            </div>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

const HomeCardFoto = () => {
  const [loading, setLoading] = useState(true);

  // simulasi loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Card className="@container/card p-0">
        <Tilt
          glareEnable={true}
          glareMaxOpacity={0.4}
          glareColor="#00f0ff"
          glarePosition="all"
          scale={1.05}
          transitionSpeed={2000}
          className="w-full rounded-lg overflow-hidden"
        >
          <div className="relative w-full h-full min-h-[400px]">
            {loading ? (
              <Skeleton className="absolute inset-0 w-full h-full rounded-lg" />
            ) : (
              <>
                <Image
                  src="/foto/01.png"
                  alt="foto"
                  fill
                  className={`object-cover rounded-lg aspect-square object-top transition-opacity duration-500 ${
                    loading ? "opacity-0" : "opacity-100"
                  }`}
                  onLoadingComplete={() => setLoading(false)}
                />
              </>
            )}
          </div>
        </Tilt>
      </Card>
    </>
  );
};

const HomeCardWords = () => {
  const [loading, setLoading] = useState(true);

  // simulasi loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Card
        className="relative h-full flex flex-col justify-between p-4 
      bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white 
      overflow-hidden rounded-2xl hover:shine"
      >
        {loading ? (
          <>
            {/* Badge Skeleton */}
            <Skeleton className="h-6 w-[80px] rounded-full mb-4" />

            {/* Blockquote 1 */}
            <div className="space-y-2 mb-4">
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[75%]" />
            </div>

            {/* Blockquote 2 */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-[85%]" />
              <Skeleton className="h-4 w-[70%]" />
            </div>
          </>
        ) : (
          <>
            <Badge
              variant="secondary"
              className="bg-blue-500 text-white dark:bg-blue-600"
            >
              <BadgeCheckIcon className="mr-1" />
              Words
            </Badge>

            <blockquote className="border-l-2 pl-6 italic">
              &quot; In which situations do they work best, when do they fail
              us, and how can we determine whether we need them or should steer
              clear?&quot;
            </blockquote>
            <blockquote className="border-l-2 pl-6 italic">
              &quot;When does something become our greatest ally, when does it
              let us down, and how can we know whether to embrace it or let it
              go?&quot;
            </blockquote>

            <blockquote className="border-l-2 pl-6 italic">
              &quot;I can debug thousands of errors, but I can’t debug this
              feeling for you 😅💻❤️.&quot;
            </blockquote>
          </>
        )}
      </Card>
    </>
  );
};

export { HomeCardTitle, HomeCardFoto, HomeCardWords };
