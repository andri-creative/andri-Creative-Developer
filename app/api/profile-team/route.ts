import { NextRequest, NextResponse } from "next/server";
import api from "@/lib/axios";

export async function GET(req: NextRequest) {
  try {
    const response = await api.get("/api/profile/all-team");

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response?.data?.error || "Profile failed" },
      { status: error.response?.status || 500 }
    );
  }
}
