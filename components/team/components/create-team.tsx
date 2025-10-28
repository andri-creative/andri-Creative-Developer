// app/(team)/profile-team/team/edit/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { TiArrowBackOutline } from "react-icons/ti";
import { profileTeamService } from "@/app/services/profileTeam";
import { authService } from "@/app/services/authService";

// Interface untuk master data
interface Role {
  id: string;
  title: string;
}

interface Tool {
  id: string;
  title: string;
  image?: string;
  url?: string;
}

export default function CreateEditTeam() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Data master
  const [roles, setRoles] = useState<Role[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);

  // Form state untuk profile
  const [form, setForm] = useState({
    bio: "",
    tahun: new Date().getFullYear(),
    locationEdikasi: "",
    phone: "",
    lokasiUser: "",
    degree: "",
  });

  // Form state untuk user (nama dan email)
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
  });

  // Selected items
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);

  // Existing profile data
  const [existingProfile, setExistingProfile] = useState<any>(null);

  // Fetch master data
  useEffect(() => {
    fetchMasterData();
    fetchExistingProfile();
  }, []);

  const fetchMasterData = async () => {
    try {
      // Fetch roles
      const rolesRes = await fetch("http://localhost:8000/api/roles");
      const rolesData = await rolesRes.json();
      setRoles(rolesData.role || []);

      // Fetch tools
      const toolsRes = await fetch("http://localhost:8000/api/tools");
      const toolsData = await toolsRes.json();
      setTools(toolsData || []);
    } catch (err) {
      console.error("Error fetching master data:", err);
    }
  };

  const fetchExistingProfile = async () => {
    try {
      const result = await profileTeamService.getProfile();

      // Jika ada profile yang sudah ada, isi form dengan data tersebut
      if (result.profile && !result.profile.id?.includes("dummy")) {
        setExistingProfile(result.profile);

        const profile = result.profile;
        setForm({
          bio: profile.bio || "",
          tahun: profile.tahun || new Date().getFullYear(),
          locationEdikasi: profile.locationEdikasi || "",
          phone: profile.phone || "",
          lokasiUser: profile.lokasiUser || "",
          degree: profile.degree || "",
        });

        // Set user form data
        setUserForm({
          name: profile.user?.name || "",
          email: profile.user?.email || "",
        });

        // Set selected roles dan tools
        setSelectedRoles(profile.roles?.map((r: any) => r.id) || []);
        setSelectedTools(profile.tools?.map((t: any) => t.id) || []);
      } else {
        // Jika tidak ada profile, ambil data user dari localStorage atau sumber lain
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        setUserForm({
          name: userData.name || "",
          email: userData.email || "",
        });
      }
    } catch (error) {
      console.log("Error fetching existing profile:", error);
    }
  };

  // Handlers untuk profile form
  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Handlers untuk user form
  const handleUserChange = (field: string, value: string) => {
    setUserForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleRole = (roleId: string) => {
    setSelectedRoles((prev) =>
      prev.includes(roleId)
        ? prev.filter((id) => id !== roleId)
        : [...prev, roleId]
    );
  };

  const toggleTool = (toolId: string) => {
    setSelectedTools((prev) =>
      prev.includes(toolId)
        ? prev.filter((id) => id !== toolId)
        : [...prev, toolId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const profileData = {
        ...form,
        roles: selectedRoles,
        tools: selectedTools,
      };

      let profileResult;

      if (existingProfile) {
        // UPDATE
        profileResult = await profileTeamService.updateProfile({
          id: existingProfile.id,
          ...profileData,
        });
      } else {
        // CREATE
        profileResult = await profileTeamService.createProfile({
          ...profileData,
        });
      }

      const userResult = await authService.updateProfile({
        name: userForm.name,
        email: userForm.email,
      });

      if (userResult.success) {
        const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...currentUser,
            name: userForm.name,
            email: userForm.email,
          })
        );
      }

      router.push("/profile-team/team");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Error saving profile!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-4">
      <div className="container max-w-2xl">
        <Card className="p-6">
          <CardHeader>
            <Link href="/profile-team/team">
              <span className="flex gap-3 items-center text-blue-600 hover:text-blue-800">
                <TiArrowBackOutline />
                Back to Profile
              </span>
            </Link>
            <h1 className="text-2xl font-bold mt-4">
              {existingProfile ? "Edit Profile" : "Create Profile"}
            </h1>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User Information - Nama dan Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <Input
                    value={userForm.name}
                    placeholder="Your full name"
                    onChange={(e) => handleUserChange("name", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={userForm.email}
                    placeholder="your.email@example.com"
                    onChange={(e) => handleUserChange("email", e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                <Textarea
                  value={form.bio}
                  placeholder="Tell us about yourself..."
                  rows={3}
                  onChange={(e) => handleChange("bio", e.target.value)}
                />
              </div>

              {/* Roles */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  Development Roles
                </label>
                <div className="flex flex-wrap gap-2 mb-1">
                  {roles.map((role) => (
                    <Badge
                      key={role.id}
                      variant={
                        selectedRoles.includes(role.id) ? "default" : "outline"
                      }
                      className="cursor-pointer px-3 py-1 text-sm font-normal transition-all"
                      onClick={() => toggleRole(role.id)}
                    >
                      {role.title}
                      {selectedRoles.includes(role.id) && " ✓"}
                    </Badge>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground">
                  Selected: {selectedRoles.length} of {roles.length} roles
                </div>
              </div>

              {/* Tools */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  Tools & Technologies
                </label>
                <div className="flex flex-wrap gap-2 mb-1">
                  {tools.map((tool) => (
                    <Badge
                      key={tool.id}
                      variant={
                        selectedTools.includes(tool.id) ? "default" : "outline"
                      }
                      className="cursor-pointer px-3 py-1 text-sm font-normal transition-all"
                      onClick={() => toggleTool(tool.id)}
                    >
                      {tool.title}
                      {selectedTools.includes(tool.id) && " ✓"}
                    </Badge>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground">
                  Selected: {selectedTools.length} of {tools.length} tools
                </div>
              </div>

              {/* Education */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Education Institution
                  </label>
                  <Input
                    value={form.locationEdikasi}
                    placeholder="University Name"
                    onChange={(e) =>
                      handleChange("locationEdikasi", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Graduation Year
                  </label>
                  <Input
                    type="number"
                    value={form.tahun}
                    onChange={(e) =>
                      handleChange("tahun", parseInt(e.target.value))
                    }
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone
                  </label>
                  <Input
                    value={form.phone}
                    placeholder="+62 812-3456-7890"
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Degree
                  </label>
                  <Input
                    value={form.degree}
                    placeholder="Bachelor of Computer Science"
                    onChange={(e) => handleChange("degree", e.target.value)}
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Location
                </label>
                <Input
                  value={form.lokasiUser}
                  placeholder="Jakarta, Indonesia"
                  onChange={(e) => handleChange("lokasiUser", e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <Button type="submit" size="lg" disabled={isLoading}>
                  {isLoading
                    ? "Saving..."
                    : existingProfile
                    ? "Update Profile"
                    : "Create Profile"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
