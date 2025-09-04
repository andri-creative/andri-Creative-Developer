import { NextResponse } from "next/server";
import { tools } from "@/lib/tools-data";

type Tools = {
  id: number;
  name: string;
  icon: string;
};

export type ToolsData = Tools[];

export async function GET() {
  return NextResponse.json(tools);
}
