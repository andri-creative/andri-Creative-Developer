// app/services/authService.ts

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface VerifyOtpData {
  email: string;
  otp: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: any;
  token?: string;
}

class AuthService {
  private baseURL: string;

  constructor() {
    this.baseURL = "/api/auth/team";
  }

  /**
   * Register new team member
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseURL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: result.message || "Registration failed",
        };
      }

      return {
        success: true,
        message: result.message || "Registration successful",
        data: result.data,
      };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        message: "Network error occurred during registration",
      };
    }
  }

  /**
   * Login team member
   */
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseURL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: result.message || "Login failed",
        };
      }

      // Simpan token jika ada
      if (result.token) {
        localStorage.setItem("team_token", result.token);
      }

      return {
        success: true,
        message: result.message || "Login successful",
        data: result.data,
        token: result.token,
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: "Network error occurred during login",
      };
    }
  }

  /**
   * Verify OTP for email verification
   */
  async verifyOtp(data: VerifyOtpData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseURL}/verify`, {
        // Perhatikan: verify-otp bukan verify
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Cek content-type sebelum parse JSON
      const contentType = response.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Non-JSON response:", text);
        return {
          success: false,
          message: "Server returned non-JSON response",
        };
      }

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: result.message || "OTP verification failed",
        };
      }

      return {
        success: true,
        message: result.message || "OTP verified successfully",
        data: result.data,
      };
    } catch (error) {
      console.error("OTP verification error:", error);
      return {
        success: false,
        message: "Network error occurred during OTP verification",
      };
    }
  }
  /**
   * Resend OTP
   */
  async resendOtp(email: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseURL}/resend-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: result.message || "Failed to resend OTP",
        };
      }

      return {
        success: true,
        message: result.message || "OTP resent successfully",
      };
    } catch (error) {
      console.error("Resend OTP error:", error);
      return {
        success: false,
        message: "Network error occurred while resending OTP",
      };
    }
  }

  /**
   * Logout team member
   */
  async logout(): Promise<void> {
    try {
      const token = this.getToken();
      await fetch(`${this.baseURL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (typeof window !== "undefined") {
        localStorage.removeItem("team_token");
      }
    } catch (error) {
      console.error("Logout error:", error);
      if (typeof window !== "undefined") {
        localStorage.removeItem("team_token");
      }
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("team_token");
    }
    return false;
  }

  /**
   * Get current token
   */
  getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("team_token");
    }
    return null;
  }

  /**
   * Update user profile (name and email)
   */
  async updateProfile(data: {
    name: string;
    email: string;
  }): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseURL}/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(this.getToken() && {
            Authorization: `Bearer ${this.getToken()}`,
          }),
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: result.message || "Profile update failed",
        };
      }

      return {
        success: true,
        message: result.message || "Profile updated successfully",
        data: result.data,
      };
    } catch (error) {
      console.error("Update profile error:", error);
      return {
        success: false,
        message: "Network error occurred during profile update",
      };
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;
