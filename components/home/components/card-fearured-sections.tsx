import React, { useEffect, useState } from "react";
import Images from "next/image";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { PiCertificateThin } from "react-icons/pi";
import { PiChatCircleDotsLight } from "react-icons/pi";
import { LiaBookSolid } from "react-icons/lia";

export type Achievement = {
  id: number;
  title: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
  issuer: string;
  label: string;
  issueDate: string;
  description: string;
  category: string;
  level: string;
  link: string;
  tags: string[];
};

const CardAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    fetch("api/achievements")
      .then((res) => res.json())
      .then((data) => setAchievements(data))
      .catch((err) => console.error("Error fetching achievements:", err));
  }, []);

  return (
    <>
      <Card className="flex flex-col items-center text-center w-full p-4 h-full pt-6 pb-1 ">
        <CardHeader className="w-full">
          <CardTitle className="font-bold text-lg md:text-2xl text-center flex flex-col items-center">
            <span className="flex items-center justify-center p-3 border mb-2 rounded-lg bg-[#E9E9E9] dark:bg-[#464646] w-16 h-16">
              <PiCertificateThin className="w-8 h-8" />
            </span>
            Achievements
          </CardTitle>
          <p className="text-sm md:text-lg">
            Milestones from programs, projects, and communities.
          </p>
        </CardHeader>
        <CardContent className="w-full  p-0">
          <div className="h-64 relative w-full flex items-end justify-center">
            {achievements.map((item, index) => {
              const dynamicClass =
                index === 0
                  ? "object-cover rounded-md -rotate-12"
                  : index === 1
                  ? "object-cover rounded-md rotate-12"
                  : "object-cover rounded-md";
              return (
                <div
                  key={item.id}
                  className={`absolute top-10 z-40 hover:z-50 hover:scale-110 transition-transform duration-300
                  ${index === 0 ? "left-0" : index === 1 ? "right-0" : ""}`}
                >
                  <Images
                    src={item.src}
                    width={150}
                    height={75}
                    alt={item.title}
                    className={dynamicClass}
                  />
                </div>
              );
            })}
            <Images
              src="/achieve/folder.png"
              width={150}
              height={75}
              alt="oi"
              className="object-cover translate-y-[-20px]"
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

const CardChat = () => {
  return (
    <>
      <Card className="flex flex-col items-center text-center p-4 h-full pt-6 pb-1">
        <CardHeader className="w-full">
          <CardTitle className="font-bold text-lg md:text-2xl text-center flex flex-col items-center">
            <span className="flex mb-2 items-center justify-center p-3 border rounded-lg bg-[#E9E9E9] dark:bg-[#464646] w-16 h-16">
              <PiChatCircleDotsLight className="w-8 h-8" />
            </span>
            Chat Room
          </CardTitle>
          <p className="text-sm md:text-lg">
            Open space to talk and collaborate.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 overflow-y-auto flex-1 p-0  w-full mb-4">
          <div className="flex justify-start">
            <div className="max-w-[70%] rounded-xl bg-gray-200 dark:bg-gray-700 p-2 text-sm">
              Hi, how are you?
            </div>
          </div>

          <div className="flex justify-end">
            <div className="max-w-[70%] rounded-xl bg-violet-600 text-white p-2 text-sm text-end">
              I’m good, working on a project 😊
            </div>
          </div>

          <div className="flex justify-start">
            <div className="max-w-[70%] rounded-xl bg-gray-200 dark:bg-gray-700 p-2 text-sm">
              Can you build a website?
            </div>
          </div>

          <div className="flex justify-end">
            <div className="max-w-[70%] rounded-xl bg-violet-600 text-white p-2 text-sm">
              Of course 👍
            </div>
          </div>

          <div className="flex justify-start">
            <div className="max-w-[70%] rounded-xl bg-gray-200 dark:bg-gray-700 p-2 text-sm text-start">
              Awesome, can you share your portfolio?
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

const CardServices = () => {
  return (
    <>
      <Card className="@container/card md:col-span-2 lg:col-span-2 group w-full grid grid-cols-1 md:grid-cols-2 px-0 py-4 h-full pt-6 pb-1">
        <CardHeader className="w-full flex flex-col">
          <CardTitle className="font-bold text-lg md:text-2xl flex flex-col mb-3">
            <span className="flex mb-2 items-center justify-center p-3 border rounded-lg bg-[#E9E9E9] dark:bg-[#464646] w-16 h-16">
              <LiaBookSolid className="w-8 h-8" />
            </span>
            Services
          </CardTitle>
          <p className="text-sm md:text-lg">
            End-to-end solutions in web, mobile, AI, and design.
          </p>
        </CardHeader>

        <CardContent className="px-0">
          <div className="w-full p-3 h-full text-center flex flex-col items-center justify-center transition">
            <h1 className="font-bold text-4xl md:text-6xl mb-6 blur-sm hover:blur-none cursor-pointer transition">
              Web
            </h1>
            <h1 className="font-bold text-4xl md:text-6xl mb-6 blur-sm hover:blur-none cursor-pointer transition">
              Mobile
            </h1>
            <h1 className="font-bold text-4xl md:text-6xl mb-6 blur-sm hover:blur-none cursor-pointer transition">
              AI
            </h1>
            <h1 className="font-bold text-4xl md:text-6xl blur-sm hover:blur-none cursor-pointer transition">
              UI/UX
            </h1>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export { CardAchievements, CardChat, CardServices };
