// import { NextResponse } from "next/server";
// import { projectsData } from "@/lib/porjects-data";

// export async function GET() {
//   return NextResponse.json(projectsData);
// }

// import { NextResponse } from "next/server";
// import { projectsData } from "@/lib/porjects-data";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get("id");

//   if (id) {
//     const project = projectsData.find((p) => p.id === Number(id));
//     return NextResponse.json(project ?? {});
//   }

//   return NextResponse.json(projectsData);
// }

import axios from "axios";
import { NextResponse } from "next/server";

const API_URL = "https://backend-ts-lemon.vercel.app";

export async function GET() {
  try {
    const res = await axios.get(`${API_URL}/api/project`);
    return NextResponse.json(res.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil data rating" },
      { status: 500 }
    );
  }
}
