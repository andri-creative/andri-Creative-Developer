"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { profileServise } from "@/app/services/teamProfile";
import { Skeleton } from "@/components/ui/skeleton";

interface TeamMember {
  id: string | number;
  name: string;
  photo: string;
  roles: string[];
  description: string;
}

export const CardSenior = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await profileServise.getProfileAll();
        if (res?.success) {
          const formatted = res.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            photo: item.profile?.foto || "/default-avatar.png",
            roles: item.profile?.roles?.map((r: any) => r.title) || [],
            description: item.profile?.bio || "",
          }));
          setTeamMembers(formatted);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <CardSeniorSkeleton />;
  }

  return (
    <Swiper
      spaceBetween={30}
      loop={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 4 },
      }}
      modules={[Autoplay]}
      className="mySwiper w-full h-full"
    >
      {teamMembers.map((member) => (
        <SwiperSlide key={member.id}>
          <Link href={`/team/detail-team/${member.id}`}>
            <Card className="pt-0 cursor-pointer hover:shadow-lg transition-shadow">
              <div className="relative w-full h-96">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="rounded-t-lg object-cover object-[center_10%]"
                />
              </div>
              <CardContent className="p-4">
                <CardTitle className="text-lg font-bold">
                  {member.name}
                </CardTitle>
                <CardDescription className="text-sm">
                  {member.roles.join(" • ")}
                </CardDescription>
                <p className="text-sm text-gray-500 leading-relaxed pt-2">
                  {(() => {
                    const words = member.description.split(" ");
                    const preview = words.slice(0, 20).join(" ");
                    return preview + (words.length > 20 ? "..." : "");
                  })()}
                </p>
              </CardContent>
            </Card>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

// === SKELETON KHUSUS CARD SENIOR (untuk Swiper) ===
function CardSeniorSkeleton() {
  const slideCounts = [1, 2, 3, 4]; // xl: 4

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {slideCounts.map((_, i) => (
        <div key={`card-skeleton-${i}`} className="space-y-3">
          <Skeleton className="w-full h-96 rounded-t-lg bg-gray-200" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-6 w-3/4 rounded-md" />
            <Skeleton className="h-4 w-1/2 rounded-md" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-5/6 rounded-md" />
              <Skeleton className="h-4 w-4/5 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
