import { NextRequest, NextResponse } from "next/server";
import api from "@/lib/axios";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await api.post("/api/auth/verify-otp", body);
    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "response" in error) {
      const err = error as {
        response?: { data?: { error?: string }; status?: number };
      };
      return NextResponse.json(
        { error: err.response?.data?.error || "OTP verification failed" },
        { status: err.response?.status || 500 }
      );
    }

    // Fallback untuk error selain Axios
    return NextResponse.json(
      { error: "Unexpected error occurred" },
      { status: 500 }
    );
  }
}
