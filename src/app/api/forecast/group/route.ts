import { NextRequest, NextResponse } from "next/server";

const BACKEND_BASE_URL = process.env.FORECAST_API_BASE_URL || "http://localhost:5005";

export async function GET(request: NextRequest) {
  const targetUrl = new URL(`${BACKEND_BASE_URL}/forecast/group`);
  request.nextUrl.searchParams.forEach((value, key) => {
    targetUrl.searchParams.set(key, value);
  });

  try {
    const response = await fetch(targetUrl.toString(), {
      headers: {
        Accept: "application/json",
      },
    });

    const body = await response.text();

    return new NextResponse(body, {
      status: response.status,
      headers: {
        "content-type": response.headers.get("content-type") ?? "application/json",
        "cache-control": "no-store",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Forecast service unavailable",
      },
      { status: 502 }
    );
  }
}