export interface ProfileTeam {
  success: boolean;
  data: Array<{
    id: string;
    name: string | null;
    email: string;
    isActive: boolean;
    createdAt: string;
    profile: {
      id: string;
      foto?: string | null;
      bio?: string | null;
      tahun?: number | null;
      locationEdikasi?: string | null;
      phone?: string | null;
      lokasiUser?: string | null;
      degree?: string | null;
      userTeamId: string;
      createdAt: string;
      updatedAt: string;
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
    } | null;
  }>;
}

export interface ProfileTeamById {
  success: boolean;
  data: {
    id: string;
    name: string | null;
    email: string;
    isActive: boolean;
    createdAt: string;
    profile: {
      id: string;
      foto?: string | null;
      bio?: string | null;
      tahun?: number | null;
      locationEdikasi?: string | null;
      phone?: string | null;
      lokasiUser?: string | null;
      degree?: string | null;
      userTeamId: string;
      createdAt: string;
      updatedAt: string;
      roles: Array<{
        id: string;
        title: string;
      }>;
      tools: Array<{
        id: string;
        title: string;
        image: string;
        url: string;
      }>;
    } | null;
  } | null;
}

class ProfileService {
  private baseURL = "/api";

  constructor() {
    this.baseURL = "/api";
  }

  async getProfileAll(): Promise<ProfileTeam | null> {
    try {
      const response = await fetch(`${this.baseURL}/profile-team`, {
        method: "GET",
      });
      const data: ProfileTeam = await response.json();
      return data;
    } catch (error) {
      console.error("Get profile error, using dummy data:", error);
      return null;
    }
  }

  async getById(id: string): Promise<ProfileTeamById | null> {
    try {
      const response = await fetch(`${this.baseURL}/profile-team/${id}`, {
        method: "GET",
      });

      const data: ProfileTeamById = await response.json();
      return data;
    } catch (error) {
      console.error("Get profile by id error:", error);
      return null;
    }
  }
}

export const profileServise = new ProfileService();
export default profileServise;
