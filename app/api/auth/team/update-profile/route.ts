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
  } catch (error: unknown) {
    let errorMessage = "Profile update failed";
    let statusCode = 500;

    if (typeof error === "object" && error !== null && "response" in error) {
      const err = error as {
        response?: { data?: { error?: string }; status?: number };
      };

      errorMessage = err.response?.data?.error || errorMessage;
      statusCode = err.response?.status || statusCode;
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
