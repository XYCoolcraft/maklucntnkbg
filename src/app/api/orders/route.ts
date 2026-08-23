import { NextRequest, NextResponse } from "next/server";
import { rumahotpFetch } from "@/lib/rumahotp";

export async function GET(req: NextRequest) {
  const numberId = req.nextUrl.searchParams.get("number_id");
  const providerId = req.nextUrl.searchParams.get("provider_id");
  const operatorId = req.nextUrl.searchParams.get("operator_id");

  if (!numberId || !providerId || !operatorId) {
    return NextResponse.json(
      {
        success: false,
        error: { message: "number_id, provider_id, dan operator_id wajib diisi" },
      },
      { status: 400 }
    );
  }

  try {
    const data = await rumahotpFetch("/v2/orders", {
      number_id: numberId,
      provider_id: providerId,
      operator_id: operatorId,
    });
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { message: error.message } },
      { status: 500 }
    );
  }
}
