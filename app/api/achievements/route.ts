// import { NextResponse } from "next/server";
// import { achievementsData } from "@/lib/achievements-data";

// export async function GET() {
//   return NextResponse.json(achievementsData);
// }

import { NextResponse } from "next/server";
import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  try {
    const res = await axios.get(`${API_URL}/api/achievement`);

    console.log("API_URL:", API_URL);

    return NextResponse.json(res.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil data experience" },
      { status: 500 }
    );
  }
}
