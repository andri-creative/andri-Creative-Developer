"use client";

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

interface ImageItem {
  gambar: string;
}

interface AlbumItem {
  id: string;
  title: string;
  width: number;
  height: number;
  url: string;
  publicId: string;
  createdAt: string;
  updatedAt: string;
}

const CardFeaturedOne = () => {
  const [tags, setTags] = React.useState<{
    pro: ImageItem[];
    user: ImageItem[];
  }>({
    pro: [
      { gambar: "/projeck/01.png" },
      { gambar: "/projeck/01.png" },
      { gambar: "/projeck/01.png" },
    ],
    user: [],
  });

  React.useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const res = await fetch("/api/album");
        if (!res.ok) throw new Error("Failed to fetch album");

        const data: AlbumItem[] = await res.json();

        // Hanya ambil gambar dengan tinggi > lebar (portrait)
        const filtered = data.filter((item) => item.height > item.width);

        // Map ke format { gambar: url }
        const images = filtered.map((item) => ({
          gambar: item.url,
        }));

        setTags((prev) => ({
          ...prev,
          user: images,
        }));

        // console.log("album (portrait only):", filtered);
      } catch (err) {
        console.error("Error fetching album:", err);
      }
    };

    fetchAlbum();
  }, []);

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
