"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { profileTeamService, ProfileResponse } from "@/app/services/profileTeam"; 
// pastikan export ProfileResponse di profileTeam.ts (kamu sudah punya)

interface ProfileImgProps {
  profile?: ProfileResponse["profile"] | null;
  user?: ProfileResponse["profile"]["user"] | null;
}

export default function ProfileImg({ profile, user }: ProfileImgProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) return alert("Pilih gambar dulu!");
      if (!profile?.id) return alert("Profile ID tidak tersedia.");

      await profileTeamService.updateProfile({
        id: profile.id,
        foto: selectedFile,
      });

      alert("Foto berhasil diperbarui ✅");
      // idealnya update state lokal / refetch daripada reload
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Gagal upload foto ❌");
    }
  };

  // fallback src string (Next Image memerlukan string)
  const src =
    imagePreview ||
    (typeof profile?.foto === "string" && profile?.foto) ||
    "/foto/03.png";

  return (
    <div className="justify-self-center text-center">
      <Image
        src={src}
        alt={user?.name || "User Profile"}
        width={200}
        height={300}
        className="object-cover rounded-lg"
      />

      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-4" size="sm" variant="outline">
            Edit Foto
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload Foto Baru</DialogTitle>
            <DialogDescription>
              Pilih gambar dan lihat preview sebelum disimpan.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 items-center">
            <Image
              src={src}
              alt="Preview"
              width={150}
              height={200}
              className="rounded-md object-cover"
            />

            <Input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleUpload}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
