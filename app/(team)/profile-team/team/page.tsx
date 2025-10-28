"use client";

import Link from "next/link";
import { TiArrowBackOutline } from "react-icons/ti";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import DropMenuUser from "@/components/team/components/DropdownMen-Team";

import { profileTeamService } from "@/app/services/profileTeam";
import ProfileImg from "@/components/team/components/profile-img";

import { ProfileResponse } from "@/app/services/profileTeam";

export default function TeamProfilePage() {
  const [data, setData] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const result = await profileTeamService.getProfile();
      setData(result);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const profile = data?.profile;
  const user = data?.profile?.user;
  // const profileFoto = data?.profile?.foto;

  return (
    <div className="flex justify-center items-center py-4">
      <div className="container flex w-auto">
        <Card className="px-6">
          <div className="border-b-2 border-gray-500 border-dashed flex items-center gap-3 pb-1 justify-between">
            <Link href="/team">
              <span className="flex gap-3 items-center">
                <TiArrowBackOutline />
                Back
              </span>
            </Link>
            <div className="flex gap-3">
              <DropMenuUser />
            </div>
          </div>

          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center px-0">
            <div className="col-span-2">
              <h1 className="text-3xl font-bold mb-2">About</h1>
              <span className="border-b-[2px] border-dashed flex mb-4"></span>
              <CardTitle className="text-2xl font-bold mb-2">
                {user?.name || "Nama User"}
              </CardTitle>
              <CardDescription className="text-md mb-3">
                {profile?.bio || "Belum ada bio"}
              </CardDescription>

              {/* Roles */}
              <h2 className="text-xl font-bold mb-2">Roles</h2>
              <span className="border-b-[2px] border-dashed flex mb-4"></span>
              <div className="flex flex-wrap gap-2 mb-3">
                {profile?.roles?.map((role: any) => (
                  <span
                    key={role.id}
                    className="bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-bold"
                  >
                    {role.title || "Belum Memilih"}
                  </span>
                ))}
              </div>

              {/* Tools */}
              <h2 className="text-xl font-bold mb-2">Tools</h2>
              <span className="border-b-[2px] border-dashed flex mb-4"></span>
              <div className="flex flex-wrap gap-2 mb-3">
                {profile?.tools?.map((tool: any) => (
                  <div
                    key={tool.id}
                    className="flex items-center gap-2 bg-blue-200 dark:bg-gray-700 rounded-full text-sm font-semibold"
                  >
                    <Image
                      src={tool.url || "/skills/01.png"}
                      alt={tool.title}
                      className="w-10 h-10 p-2 object-cover rounded-full"
                      width={40}
                      height={40}
                      onError={(e) => {
                        e.currentTarget.src = "/skills/01.png";
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Education */}
              <h2 className="text-xl font-bold mb-2">Education</h2>
              <span className="border-b-[2px] border-dashed flex mb-4"></span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {profile?.degree && (
                  <span className="bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm">
                    🎓 {profile.degree}
                  </span>
                )}
                {profile?.locationEdikasi && (
                  <span className="bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm">
                    🏫 {profile.locationEdikasi}
                  </span>
                )}
                {profile?.tahun && (
                  <span className="bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm">
                    📅 {profile.tahun}
                  </span>
                )}
                {profile?.phone && (
                  <span className="bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm">
                    📞 {profile.phone}
                  </span>
                )}
              </div>
            </div>

            {/* Profile Image - FIXED */}
            <ProfileImg profile={profile} user={user} />
          </CardContent>

          <CardContent className="px-0">
            {/* Location */}
            <div>
              <h2 className="text-xl font-bold mb-2">Location</h2>
              <span className="border-b-[2px] border-dashed flex mb-4"></span>
              <p className="text-md mb-3">
                {profile?.lokasiUser || "Lokasi belum diisi"}
              </p>
            </div>

            {/* Contact Form */}
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-2">Contact</h2>
              <span className="border-b-[2px] border-dashed flex mb-4"></span>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    placeholder="Write your message..."
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
