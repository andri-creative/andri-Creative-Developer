import * as React from "react";
import { IconBrandCodesandbox } from "@tabler/icons-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CardFeaturedSection,
  CardUser,
  SkillsEndTools,
} from "./card-featured-sections";
import {
  CardAchievements,
  CardChat,
  CardServices,
} from "./card-fearured-sections";

const tags = {
  pro: [
    { gambar: "/projeck/01.png" },
    { gambar: "/projeck/01.png" },
    { gambar: "/projeck/01.png" },
  ],
  user: [
    {
      gambar: "/foto/01.png",
    },
    {
      gambar: "/foto/02.png",
    },
    {
      gambar: "/foto/03.png",
    },
    {
      gambar: "/foto/04.png",
    },
    {
      gambar: "/foto/05.png",
    },
  ],
};

const CardFeaturedOne = () => {
  return (
    <>
      <Card className="@container/card">
        <CardHeader>
          <CardTitle className="scroll-m-20 text-3xl md:text-4xl font-extrabold tracking-wide text-balance gap-4 flex items-center">
            <IconBrandCodesandbox size={40} className="text-3xl md:text-4xl" />
            Featured Sections
          </CardTitle>
          <CardDescription>
            Explore everything I&#96;ve crafted, contributed, and accomplished.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
          <Card className="@container/card md:col-span-2 lg:col-span-2 ">
            <CardFeaturedSection data={tags.pro} />
          </Card>
          <Card className="@container/card">
            <CardUser data={tags.user} />
          </Card>
          <Card className="@container/card">
            <SkillsEndTools />
          </Card>
        </CardContent>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
          <CardAchievements />
          <CardChat />
          <CardServices />
        </CardContent>
      </Card>
    </>
  );
};

export default CardFeaturedOne;
