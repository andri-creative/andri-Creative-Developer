import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconCode } from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const data = Array.from({ length: 33 }, (_, i) => ({
  title: "Skllis",
  img: `/skills/${String(i + 1).padStart(2, "0")}.png`,
}));

type Tool = {
  id: number;
  name: string;
  icons: string;
};

const CardSkills = () => {
  const [loading, setLoading] = useState(true);
  const [tools, setTools] = useState<Tool[]>([]);

  useEffect(() => {
    fetch("/api/tools")
      .then((res) => res.json())
      .then((data) => setTools(data));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Card className="@container/card">
        <CardHeader className="mb-4 p-2 md:px-6">
          {loading ? (
            <>
              <Skeleton className="h-6 w-[200px] rounded-full mb-4" />
              <Skeleton className="h-6 w-[80px] rounded-full mb-4" />
            </>
          ) : (
            <>
              <CardTitle className="scroll-m-20 text-3xl md:text-4xl font-extrabold tracking-wide text-balance gap-4 flex items-center">
                <IconCode size={40} className="text-3xl md:text-4xl" />
                Skills
              </CardTitle>
              <CardDescription>My professional skills.</CardDescription>
            </>
          )}
        </CardHeader>
        <div className="w-full py-4 px-2 p-2 md:px-6">
          <div className=" overflow-hidden p-4">
            <div className="animate-marquee flex gap-6 w-max">
              {tools.map((item) => (
                <div key={item.id} className="relative">
                  <div className=" absolute -top-2 -right-2 h-18 w-18 md:h-20 md:w-20 rounded-full bg-gray-300 dark:bg-gray-700" />
                  {loading ? (
                    <Skeleton className="h-18 w-18 md:h-20 md:w-20 rounded-full" />
                  ) : (
                    <Avatar className="h-18 w-18 md:h-20 md:w-20 p-4 rounded-full border border-gray-300 dark:border-gray-600 backdrop-blur-sm bg-white/60 dark:bg-white/20 shadow-md dark:shadow-none relative z-10">
                      <AvatarImage src={item.icons} alt={item.name} />
                      <AvatarFallback>{item.name}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className=" overflow-hidden p-4">
            <div className="animate-marquee-balik flex gap-6 w-max">
              {[...Array(2)].map((_, repeatIndex) =>
                data.map((item, index) => (
                  <div key={`${repeatIndex}-${index}`} className="relative">
                    <div className="absolute -top-2 -left-2 h-18 w-18 md:h-20 md:w-20 rounded-full bg-gray-300 dark:bg-gray-700" />
                    {loading ? (
                      <Skeleton className="h-18 w-18 md:h-20 md:w-20 rounded-full" />
                    ) : (
                      <Avatar className="h-18 w-18 md:h-20 md:w-20 p-4 rounded-full border border-gray-300 dark:border-gray-600 backdrop-blur-sm bg-white/60 dark:bg-white/20 shadow-md dark:shadow-none relative z-10">
                        <AvatarImage src={item.img} alt={item.title} />
                        <AvatarFallback>{item.title}</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default CardSkills;
