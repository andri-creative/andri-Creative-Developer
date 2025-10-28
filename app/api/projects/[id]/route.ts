import { NextResponse } from "next/server";
import axios from "axios";
const API_URL = "https://backend-ts-lemon.vercel.app";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const res = await axios.get(`${API_URL}/api/project/${id}`);
    return NextResponse.json(res.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil data rating" },
      { status: 500 }
    );
  }
}
