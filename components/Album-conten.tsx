"use client";

import { useEffect, useState } from "react";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import { Skeleton } from "@/components/ui/skeleton";
import { useSkeleton } from "@/context/SkeletonProvider";

type AlbumItem = {
  id: string;
  title: string;
  width: number;
  height: number;
  url: string;
  publicId: string;
};

type Photo = {
  src: string;
  width: number;
  height: number;
  alt?: string;
};

export default function MyAlbum() {
  const { loading } = useSkeleton();
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    fetch("/api/album")
      .then((res) => res.json())
      .then((data: AlbumItem[]) => {
        const mapped: Photo[] = data.map((item) => ({
          src: item.url,
          width: item.width,
          height: item.height,
          alt: item.title || "",
        }));
        setPhotos(mapped);
      })
      .catch((err) => {
        console.error("Gagal ambil data album:", err);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full text-white">
        <h2 className="text-2xl font-semibold mb-4">Album</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="w-full h-48 rounded-md" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full text-white">
      <h2 className="text-2xl font-semibold mb-4">Galeri Foto</h2>
      <RowsPhotoAlbum
        photos={photos}
        spacing={10}
        targetRowHeight={250}
        onClick={({ index, photo }) => {
          console.log("Klik foto ke:", index, photo);
        }}
      />
    </div>
  );
}
