// import { NextResponse } from "next/server";
// import { experienceData } from "@/lib/api.backend";

// export async function GET() {
//   return NextResponse.json(experienceData);
// }

import { NextResponse } from "next/server";
import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  try {
    const res = await axios.get(`${API_URL}/api/experience`);

    console.log("API_URL:", API_URL);

    return NextResponse.json(res.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil data experience" },
      { status: 500 }
    );
  }
}
