import { NextRequest, NextResponse } from "next/server";
import api from "@/lib/axios";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await api.post("/api/auth/verify-otp", body);
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response?.data?.error || "OTP verification failed" },
      { status: error.response?.status || 500 }
    );
  }
}
