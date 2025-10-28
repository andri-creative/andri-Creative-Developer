// app/api/auth/team/update-profile/route.ts
import { NextRequest, NextResponse } from "next/server";
import api from "@/lib/axios";

export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: No token" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const response = await api.put("/api/auth/update-profile", body, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response?.data?.error || "Profile update failed" },
      { status: error.response?.status || 500 }
    );
  }
}
