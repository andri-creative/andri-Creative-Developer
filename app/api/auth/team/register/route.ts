import { NextRequest, NextResponse } from "next/server";
import api from "@/lib/axios";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await api.post("/api/auth/register", body);
    return NextResponse.json(response.data);
  } catch (error: unknown) {
    let errorMessage = "Registration failed";
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
