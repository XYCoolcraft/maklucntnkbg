import { NextRequest, NextResponse } from "next/server";
import { rumahotpFetch } from "@/lib/rumahotp";

export async function GET(req: NextRequest) {
  const serviceId = req.nextUrl.searchParams.get("service_id");
  if (!serviceId) {
    return NextResponse.json(
      { success: false, error: { message: "service_id wajib diisi" } },
      { status: 400 }
    );
  }

  try {
    const data = await rumahotpFetch("/v2/countries", { service_id: serviceId });
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { message: error.message } },
      { status: 500 }
    );
  }
}
