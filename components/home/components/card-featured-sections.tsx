import * as React from "react";

import { LuGalleryVerticalEnd } from "react-icons/lu";
import { Separator } from "@/components/ui/separator";
import { ScrollAreaCustom } from "@/components/ui/scroll-area";
import Image from "next/image";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconUser } from "@tabler/icons-react";
import { StackedCarousel } from "./stackedcarousel";
import { Skeleton } from "@/components/ui/skeleton";

import {
  AvatarFallback,
  AvatarImage,
  AvatarSkills,
} from "@/components/ui/avatar";
import { IconComponents } from "@tabler/icons-react";

const data = Array.from({ length: 33 }, (_, i) => ({
  title: "Skllis",
  img: `/skills/${String(i + 1).padStart(2, "0")}.png`,
}));

type CardFeaturedSectionProps = {
  data: { gambar: string }[];
};

type CardUserProps = {
  data: { gambar: string }[];
};

const CardFeaturedSection: React.FC<CardFeaturedSectionProps> = ({ data }) => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulasikan loading selama 3 detik
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="px-6 py-6">
          {loading ? (
            <div className="flex flex-col space-y-3">
              {/* Skeleton untuk ikon */}
              <Skeleton className="w-16 h-16 rounded-lg" />
              {/* Skeleton untuk judul */}
              <Skeleton className="w-40 h-6" />
              {/* Skeleton untuk deskripsi */}
              <Skeleton className="w-56 h-4" />
            </div>
          ) : (
            <>
              <span className="flex items-center justify-center p-3 border text-center rounded-lg bg-[#E9E9E9] dark:bg-[#464646] w-16 h-16 mb-2">
                <LuGalleryVerticalEnd className="w-8 h-8" />
              </span>
              <h1 className="font-bold text-lg md:text-2xl">
                Projects Showcase
              </h1>
              <p>A selection of real apps built to solve real problems.</p>
            </>
          )}
        </div>

        <div className="px-6">
          <ScrollAreaCustom className="h-96 no-scrollbar border-0 rounded-lg">
            {data.map((item, index) => (
              <React.Fragment key={index}>
                <Image
                  src={item.gambar}
                  alt={`gambar-${index}`}
                  width={400}
                  height={200}
                  className="object-contain border-3 rounded-lg"
                />
                <Separator className="my-2" />
              </React.Fragment>
            ))}
          </ScrollAreaCustom>
        </div>
      </div>
    </>
  );
};

const CardUser: React.FC<CardUserProps> = ({ data }) => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulasikan loading selama 3 detik
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center text-center h-full">
        <CardHeader className="w-full">
          {loading ? (
            <div className="flex flex-col items-center space-y-3 w-full">
              {/* Skeleton untuk icon */}
              <Skeleton className="w-16 h-16 rounded-lg" />
              {/* Skeleton untuk judul */}
              <Skeleton className="w-28 h-5" />
              {/* Skeleton untuk deskripsi */}
              <Skeleton className="w-36 h-4" />
            </div>
          ) : (
            <>
              <CardTitle className="font-bold text-lg md:text-2xl flex flex-col items-center">
                <span className="flex items-center justify-center p-3 border rounded-lg bg-[#E9E9E9] dark:bg-[#464646] w-16 h-16 mb-2">
                  <IconUser className="w-8 h-8" />
                </span>
                About Me
              </CardTitle>
              <p className="text-sm md:text-lg">Who I am and what I do.</p>
            </>
          )}
        </CardHeader>

        <CardContent className="flex flex-col items-center justify-center w-full">
          {loading ? (
            // 🔹 Skeleton tampil saat loading
            <div className="flex flex-col items-center space-y-3 w-full">
              <Skeleton className="w-52 h-72 rounded-md" />{" "}
            </div>
          ) : (
            <StackedCarousel images={data} />
          )}
        </CardContent>
      </div>
    </>
  );
};

const SkillsEndTools = () => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulasikan loading selama 3 detik
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center text-center h-full ">
        <CardHeader className="w-full mb-3">
          {loading ? (
            <div className="flex flex-col items-center space-y-3 w-full">
              {/* Skeleton untuk icon */}
              <Skeleton className="w-16 h-16 rounded-lg" />
              {/* Skeleton untuk judul */}
              <Skeleton className="w-28 h-5" />
              {/* Skeleton untuk deskripsi */}
              <Skeleton className="w-36 h-4" />
            </div>
          ) : (
            <>
              <CardTitle className="font-bold text-lg md:text-2xl flex flex-col items-center ">
                <span className="flex items-center justify-center p-3 border rounded-lg bg-[#E9E9E9] dark:bg-[#464646] w-16 h-16 mb-2">
                  <IconComponents className="w-8 h-8" />
                </span>
                Skills & Tools
              </CardTitle>
              <p className="text-sm md:text-lg">
                Covering mobile, web, AI, and UI/UX technologies.
              </p>
            </>
          )}
        </CardHeader>
        <CardContent className="flex flex-col items-center relative justify-center px-0 md:px-6 w-full">
          <div className="py-4 w-full overflow-hidden mb-4">
            <div className="flex animate-marquee gap-6 w-max">
              {[...Array(2)].map((_, repeatIndex) =>
                data.map((item, index) => (
                  <div key={`${repeatIndex}-${index}`} className="relative">
                    <div
                      className=" absolute -top-1 -right-1 
                        h-12 w-12 rounded-full 
                        bg-gray-300 dark:bg-gray-700"
                    />
                    <AvatarSkills
                      className=" h-12 w-12 p-2 rounded-full border
                        border-gray-300 dark:border-gray-600
                        backdrop-blur-sm
                        bg-white/60 dark:bg-white/20
                        shadow-md dark:shadow-none
                        relative z-10"
                    >
                      <AvatarImage src={item.img} alt={item.title} />
                      <AvatarFallback>{item.title}</AvatarFallback>
                    </AvatarSkills>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="p-4  w-full overflow-hidden ">
            <div className="flex animate-marquee-balik gap-6 w-max">
              {[...Array(2)].map((_, repeatIndex) =>
                data.map((item, index) => (
                  <div key={`${repeatIndex}-${index}`} className="relative">
                    <div
                      className=" absolute -top-1 -left-1 
                        h-12 w-12 rounded-full 
                        bg-gray-300 dark:bg-gray-700"
                    />
                    <AvatarSkills
                      className=" h-12 w-12 p-2 rounded-full border
                        border-gray-300 dark:border-gray-600
                        backdrop-blur-sm
                        bg-white/60 dark:bg-white/20
                        shadow-md dark:shadow-none
                        relative z-10"
                    >
                      <AvatarImage src={item.img} alt={item.title} />
                      <AvatarFallback>{item.title}</AvatarFallback>
                    </AvatarSkills>
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </div>
    </>
  );
};

export { CardFeaturedSection, CardUser, SkillsEndTools };
