import { NextRequest, NextResponse } from "next/server";
import { rumahotpFetch } from "@/lib/rumahotp";

export async function GET(req: NextRequest) {
  const country = req.nextUrl.searchParams.get("country");
  const providerId = req.nextUrl.searchParams.get("provider_id");

  if (!country || !providerId) {
    return NextResponse.json(
      { success: false, error: { message: "country dan provider_id wajib diisi" } },
      { status: 400 }
    );
  }

  try {
    const data = await rumahotpFetch("/v2/operators", {
      country,
      provider_id: providerId,
    });
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { message: error.message } },
      { status: 500 }
    );
  }
}
