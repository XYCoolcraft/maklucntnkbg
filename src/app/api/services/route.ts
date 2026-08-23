import { NextResponse } from "next/server";
import { rumahotpFetch } from "@/lib/rumahotp";

export async function GET() {
  try {
    const data = await rumahotpFetch("/v2/services");
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { message: error.message } },
      { status: 500 }
    );
  }
}
