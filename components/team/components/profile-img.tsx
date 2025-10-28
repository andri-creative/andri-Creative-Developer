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

import profileTeamService from "@/app/services/profileTeam";

export default function ProfileImg({ profile, user }: any) {
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

      await profileTeamService.updateProfile({
        id: profile.id, // ⬅️ WAJIB, karena PUT perlu ID
        foto: selectedFile, // ⬅️ Name harus `foto`
      });

      alert("Foto berhasil diperbarui ✅");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Gagal upload foto ❌");
    }
  };

  return (
    <div className="justify-self-center text-center">
      <Image
        src={imagePreview || profile?.foto || "/foto/03.png"}
        alt={user?.name || "User Profile"}
        width={200}
        height={300}
        className="object-cover rounded-lg"
      />

      {/* BUTTON OPEN DIALOG */}
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

          {/* PREVIEW DI DALAM DIALOG */}
          <div className="flex flex-col gap-4 items-center">
            <Image
              src={imagePreview || profile?.foto || "/foto/03.png"}
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
