import { NextRequest, NextResponse } from "next/server";
import api from "@/lib/axios";

export async function GET(request: NextRequest) {
  try {
    // Coba ambil token dari header Authorization
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const response = await api.get("/api/profile/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response?.data?.error || "Profile failed" },
      { status: error.response?.status || 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Terima FormData, bukan JSON
    const formData = await request.formData();
    const body: any = {};
    formData.forEach((value, key) => {
      body[key] =
        key === "roles" || key === "tools"
          ? JSON.parse(value as string)
          : value;
    });

    const response = await api.post("/api/profile/update", body, {
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

/* UPDATE PROFILE */
export async function PUT(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const formData = await request.formData();
    const id = formData.get("id");
    if (!id)
      return NextResponse.json(
        { error: "Profile ID is required" },
        { status: 400 }
      );

    // ✅ Kirim langsung FormData ke backend, tanpa convert ke JSON
    const response = await api.put(`/api/profile/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Update profile API error:", error);
    return NextResponse.json(
      { error: error.response?.data?.error || "Profile update failed" },
      { status: error.response?.status || 500 }
    );
  }
}
