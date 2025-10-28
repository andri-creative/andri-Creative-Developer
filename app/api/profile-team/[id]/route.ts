import { NextRequest, NextResponse } from "next/server";
import api from "@/lib/axios";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const response = await api.get(`/api/profile/id-team/${id}`);

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response?.data?.error || "Profile failed" },
      { status: error.response?.status || 500 }
    );
  }
}
