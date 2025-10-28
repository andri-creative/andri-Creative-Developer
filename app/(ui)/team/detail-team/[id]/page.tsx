// app/(team)/profile-team/team/[id]/page.tsx
"use client";

import DetailTeam from "@/components/team/detail-team";
import { useEffect, useState } from "react";
import { profileServise } from "@/app/services/teamProfile";
import { Member } from "@/components/team/detail-team";

export default function TeamDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await profileServise.getById(id);

        if (res?.success && res.data) {
          const item = res.data;

          const formatted: Member = {
            id: item.id,
            name: item.name || "No Name",
            photo: item.profile?.foto || "/foto/03.png",
            roles: item.profile?.roles?.map((r) => r.title) || [],
            description: item.profile?.bio || "No bio available",
            email: item.email,
            education: {
              degree: item.profile?.degree || "",
              institution: item.profile?.locationEdikasi || "",
              graduation_year: item.profile?.tahun || undefined,
              phone: item.profile?.phone || "",
            },
            location: item.profile?.lokasiUser || "",
            tools:
              item.profile?.tools?.map((tool) => ({
                id: tool.id,
                title: tool.title,
                image: tool.image,
                url: tool.url,
              })) || [],
          };

          setMember(formatted);
        } else {
          console.error("Failed to fetch profile data");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-600">Profile not found</h2>
        <p className="text-gray-500 mt-2">
          The team member you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
      <DetailTeam member={member} />
    </div>
  );
}
