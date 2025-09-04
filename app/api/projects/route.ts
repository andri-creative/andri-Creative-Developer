import { NextResponse } from "next/server";
import { projectsData } from "@/lib/porjects-data";

export async function GET() {
  return NextResponse.json(projectsData);
}
