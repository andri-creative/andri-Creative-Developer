import { NextResponse } from "next/server";
import { TeamData } from "@/lib/team-data";

export async function GET() {
  return NextResponse.json(TeamData);
}
