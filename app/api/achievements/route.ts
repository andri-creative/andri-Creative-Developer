import { NextResponse } from "next/server";
import { achievementsData } from "@/lib/achievements-data";

export async function GET() {
  return NextResponse.json(achievementsData);
}
