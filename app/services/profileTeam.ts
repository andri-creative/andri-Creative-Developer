// app/services/profileTeam.ts
export interface ProfileResponse {
  profile: {
    id: string;
    foto: string;
    bio: string;
    tahun: number;
    locationEdikasi: string;
    phone: string;
    lokasiUser: string;
    degree: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
    roles: Array<{
      id: string;
      title: string;
      createdAt: string;
      updatedAt: string;
    }>;
    tools: Array<{
      id: string;
      title: string;
      image: string;
      url: string;
      createdAt: string;
      updatedAt: string;
    }>;
    createdAt: string;
    updatedAt: string;
  };
}

export interface CreateProfileData {
  foto?: string;
  bio: string;
  tahun: number;
  locationEdikasi: string;
  phone: string;
  lokasiUser: string;
  degree: string;
  roles: string[];
  tools: string[];
}

class ProfileTeamService {
  private baseURL: string;

  constructor() {
    this.baseURL = "/api";
  }

  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem("team_token");
    // console.log("Token for request:", token); // Debug
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  // Data dummy untuk fallback
  private getDummyProfile(): ProfileResponse {
    return {
      profile: {
        id: "dummy-123",
        foto: "/foto/03.png",
        bio: "Fullstack Developer passionate about creating amazing web experiences",
        tahun: 2020,
        locationEdikasi: "Universitas Example",
        phone: "+62 812-3456-7890",
        lokasiUser: "Jakarta, Indonesia",
        degree: "Bachelor of Computer Science",
        user: {
          id: "user-dummy-123",
          name: "John Doe",
          email: "john.doe@example.com",
        },
        roles: [
          {
            id: "role-1",
            title: "Web Development",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: "role-2",
            title: "UI/UX Design",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
        tools: [
          {
            id: "tool-1",
            title: "React",
            image: "react.png",
            url: "/skills/01.png",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: "tool-2",
            title: "Next.js",
            image: "nextjs.png",
            url: "/skills/02.png",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: "tool-3",
            title: "TypeScript",
            image: "typescript.png",
            url: "/skills/03.png",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
  }

  async getProfile(): Promise<ProfileResponse> {
    try {
      // console.log("Fetching profile from:", `${this.baseURL}/team`);

      const response = await fetch(`${this.baseURL}/team`, {
        method: "GET",
        headers: this.getAuthHeaders(),
      });

      console.log("Response status:", response.status);

      // Jika response 404 atau 401, gunakan data dummy
      if (response.status === 404 || response.status === 401) {
        console.log("Using dummy data due to", response.status);
        return this.getDummyProfile();
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Jika data tidak ada atau profile kosong, gunakan dummy
      if (!data || !data.profile) {
        console.log("No profile data, using dummy");
        return this.getDummyProfile();
      }

      // console.log("Profile data received from API");
      return data;
    } catch (error) {
      console.error("Get profile error, using dummy data:", error);
      return this.getDummyProfile();
    }
  }

  async createProfile(data: CreateProfileData): Promise<any> {
    try {
      const response = await fetch(`${this.baseURL}/profile`, {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (error) {
      console.error("Create profile error:", error);
      throw error;
    }
  }

  async updateProfile(data: any) {
    const token = localStorage.getItem("team_token");

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "roles" || key === "tools") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value as any);
      }
    });

    const response = await fetch(`${this.baseURL}/team`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        // ❗ JANGAN TAMBAH Content-Type disini
      },
      body: formData,
    });

    if (!response.ok) {
      const errorResponse = await response.text();
      console.error("Update profile error response:", errorResponse);
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    return await response.json();
  }
}

export const profileTeamService = new ProfileTeamService();
export default profileTeamService;
