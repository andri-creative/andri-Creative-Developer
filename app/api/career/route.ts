

import { NextResponse } from "next/server";
import { experienceData } from "@/lib/career-data";

export async function GET() {
return NextResponse.json(experienceData);
}
