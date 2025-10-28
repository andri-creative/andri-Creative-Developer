import { NextResponse } from "next/server";
import axios from "axios";
const API_URL = "https://backend-ts-lemon.vercel.app";

export async function GET() {
  try {
    const res = await axios.get(`${API_URL}/api/ranting/stats`);
    return NextResponse.json(res.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil data rating" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await axios.post(`${API_URL}/api/ranting`, body);
    
    return NextResponse.json(res.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengirim data rating" },
      { status: 500 }
    );
  }
}
