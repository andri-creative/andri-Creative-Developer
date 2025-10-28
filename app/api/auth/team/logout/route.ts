// app/api/auth/team/logout/route.ts
import { NextRequest, NextResponse } from "next/server";
import api from "@/lib/axios";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const response = await api.post(
      "/api/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    let errorMessage = "Logout failed";
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
