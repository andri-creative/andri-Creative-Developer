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


export type Education = {
  degree: string;
  institution: string;
  graduation_year: number;
  phone: string;
};

export type TeamMember = {
  id: number;
  name: string;
  photo: string;
  roles: string[];
  description: string;
  education: Education;
  location: string;
  level: string;
  tools: number[];
  email: string;
};

export type TeamData = {
  members: TeamMember[];
  education: Education[];
};

const CardSenior = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    fetch("/api/team")
      .then((res) => res.json())
      .then((data) => setTeamMembers(data));
  }, []);

  return (
    <Swiper
      spaceBetween={30}
      loop={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        640: {
          // sm
          slidesPerView: 1,
        },
        768: {
          // md
          slidesPerView: 2,
        },
        1024: {
          // lg
          slidesPerView: 3,
        },
        1280: {
          // xl
          slidesPerView: 4,
        },
      }}
      modules={[Autoplay]}
      className="mySwiper w-full h-full "
    >
      {teamMembers.map((member) => (
        <SwiperSlide key={member.id}>
          <Link href={`/team/detail-team/${member.id}`}>
            <Card className="pt-0">
              <div className="relative w-full h-96">
                <Image
                  src={member.photo}
                  alt={member.name + member.id}
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

const CardJunior = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            // sm
            slidesPerView: 1,
          },
          768: {
            // md
            slidesPerView: 2,
          },
          1024: {
            // lg
            slidesPerView: 3,
          },
          1280: {
            // xl
            slidesPerView: 4,
          },
        }}
        modules={[Autoplay]}
        className="mySwiper w-full h-full "
      >
        <SwiperSlide>
          <Card className="pt-0">
            <div className="relative w-full h-96">
              <Image
                src="/foto/01.png"
                alt="foto"
                fill
                className="rounded-t-lg object-cover object-[center_10%]"
              />
            </div>
            <CardContent className="p-4">
              <CardTitle className="text-lg font-bold">John Doe</CardTitle>
              <CardDescription className="text-sm">
                {[
                  "Software Engineer",
                  "Frontend Developer",
                  "Backend Specialist",
                ].join(" • ")}
              </CardDescription>
              <p className="text-sm text-gray-600 leading-relaxed pt-2">
                {(() => {
                  const words =
                    `John adalah seorang Software Engineer berpengalaman dengan keahlian
                        dalam membangun aplikasi web modern menggunakan Next.js, TypeScript,
                        dan berbagai teknologi backend. Ia selalu fokus pada clean code,
                        skalabilitas, dan performa aplikasi.`.split(" ");

                  const preview = words.slice(0, 20).join(" ");
                  return preview + (words.length > 20 ? "..." : "");
                })()}
              </p>
            </CardContent>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card className="pt-0">
            <div className="relative w-full h-96">
              <Image
                src="/foto/01.png"
                alt="foto"
                fill
                className="rounded-t-lg object-cover object-[center_10%]"
              />
            </div>
            <CardContent className="p-4">
              <CardTitle className="text-lg font-bold">John Doe</CardTitle>
              <CardDescription className="text-sm">
                {[
                  "Software Engineer",
                  "Frontend Developer",
                  "Backend Specialist",
                ].join(" • ")}
              </CardDescription>
              <p className="text-sm text-gray-600 leading-relaxed pt-2">
                {(() => {
                  const words =
                    `John adalah seorang Software Engineer berpengalaman dengan keahlian
                        dalam membangun aplikasi web modern menggunakan Next.js, TypeScript,
                        dan berbagai teknologi backend. Ia selalu fokus pada clean code,
                        skalabilitas, dan performa aplikasi.`.split(" ");

                  const preview = words.slice(0, 20).join(" ");
                  return preview + (words.length > 20 ? "..." : "");
                })()}
              </p>
            </CardContent>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card className="pt-0">
            <div className="relative w-full h-96">
              <Image
                src="/foto/01.png"
                alt="foto"
                fill
                className="rounded-t-lg object-cover object-[center_10%]"
              />
            </div>
            <CardContent className="p-4">
              <CardTitle className="text-lg font-bold">John Doe</CardTitle>
              <CardDescription className="text-sm">
                {[
                  "Software Engineer",
                  "Frontend Developer",
                  "Backend Specialist",
                ].join(" • ")}
              </CardDescription>
              <p className="text-sm text-gray-600 leading-relaxed pt-2">
                {(() => {
                  const words =
                    `John adalah seorang Software Engineer berpengalaman dengan keahlian
                        dalam membangun aplikasi web modern menggunakan Next.js, TypeScript,
                        dan berbagai teknologi backend. Ia selalu fokus pada clean code,
                        skalabilitas, dan performa aplikasi.`.split(" ");

                  const preview = words.slice(0, 20).join(" ");
                  return preview + (words.length > 20 ? "..." : "");
                })()}
              </p>
            </CardContent>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card className="pt-0">
            <div className="relative w-full h-96">
              <Image
                src="/foto/01.png"
                alt="foto"
                fill
                className="rounded-t-lg object-cover object-[center_10%]"
              />
            </div>
            <CardContent className="p-4">
              <CardTitle className="text-lg font-bold">John Doe</CardTitle>
              <CardDescription className="text-sm">
                {[
                  "Software Engineer",
                  "Frontend Developer",
                  "Backend Specialist",
                ].join(" • ")}
              </CardDescription>
              <p className="text-sm text-gray-600 leading-relaxed pt-2">
                {(() => {
                  const words =
                    `John adalah seorang Software Engineer berpengalaman dengan keahlian
                        dalam membangun aplikasi web modern menggunakan Next.js, TypeScript,
                        dan berbagai teknologi backend. Ia selalu fokus pada clean code,
                        skalabilitas, dan performa aplikasi.`.split(" ");

                  const preview = words.slice(0, 20).join(" ");
                  return preview + (words.length > 20 ? "..." : "");
                })()}
              </p>
            </CardContent>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card className="pt-0">
            <div className="relative w-full h-96">
              <Image
                src="/foto/01.png"
                alt="foto"
                fill
                className="rounded-t-lg object-cover object-[center_10%]"
              />
            </div>
            <CardContent className="p-4">
              <CardTitle className="text-lg font-bold">John Doe</CardTitle>
              <CardDescription className="text-sm">
                {[
                  "Software Engineer",
                  "Frontend Developer",
                  "Backend Specialist",
                ].join(" • ")}
              </CardDescription>
              <p className="text-sm text-gray-600 leading-relaxed pt-2">
                {(() => {
                  const words =
                    `John adalah seorang Software Engineer berpengalaman dengan keahlian
                        dalam membangun aplikasi web modern menggunakan Next.js, TypeScript,
                        dan berbagai teknologi backend. Ia selalu fokus pada clean code,
                        skalabilitas, dan performa aplikasi.`.split(" ");

                  const preview = words.slice(0, 20).join(" ");
                  return preview + (words.length > 20 ? "..." : "");
                })()}
              </p>
            </CardContent>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card className="pt-0">
            <div className="relative w-full h-96">
              <Image
                src="/foto/01.png"
                alt="foto"
                fill
                className="rounded-t-lg object-cover object-[center_10%]"
              />
            </div>
            <CardContent className="p-4">
              <CardTitle className="text-lg font-bold">John Doe</CardTitle>
              <CardDescription className="text-sm">
                {[
                  "Software Engineer",
                  "Frontend Developer",
                  "Backend Specialist",
                ].join(" • ")}
              </CardDescription>
              <p className="text-sm text-gray-600 leading-relaxed pt-2">
                {(() => {
                  const words =
                    `John adalah seorang Software Engineer berpengalaman dengan keahlian
                        dalam membangun aplikasi web modern menggunakan Next.js, TypeScript,
                        dan berbagai teknologi backend. Ia selalu fokus pada clean code,
                        skalabilitas, dan performa aplikasi.`.split(" ");

                  const preview = words.slice(0, 20).join(" ");
                  return preview + (words.length > 20 ? "..." : "");
                })()}
              </p>
            </CardContent>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card className="pt-0">
            <div className="relative w-full h-96">
              <Image
                src="/foto/01.png"
                alt="foto"
                fill
                className="rounded-t-lg object-cover object-[center_10%]"
              />
            </div>
            <CardContent className="p-4">
              <CardTitle className="text-lg font-bold">John Doe</CardTitle>
              <CardDescription className="text-sm">
                {[
                  "Software Engineer",
                  "Frontend Developer",
                  "Backend Specialist",
                ].join(" • ")}
              </CardDescription>
              <p className="text-sm text-gray-600 leading-relaxed pt-2">
                {(() => {
                  const words =
                    `John adalah seorang Software Engineer berpengalaman dengan keahlian
                        dalam membangun aplikasi web modern menggunakan Next.js, TypeScript,
                        dan berbagai teknologi backend. Ia selalu fokus pada clean code,
                        skalabilitas, dan performa aplikasi.`.split(" ");

                  const preview = words.slice(0, 20).join(" ");
                  return preview + (words.length > 20 ? "..." : "");
                })()}
              </p>
            </CardContent>
          </Card>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export { CardSenior, CardJunior };
