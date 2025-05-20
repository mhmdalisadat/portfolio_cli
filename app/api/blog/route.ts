import { NextResponse } from "next/server";
import { headers } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CACHE_DURATION = 3600; // 1 hour in seconds

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const headersList = await headers();
    const cacheKey = headersList.get("x-cache-key") || "default";

    const response = await fetch(`${API_URL}/api/blog/`, {
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: CACHE_DURATION,
        tags: ["blog"],
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blog data: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate=59`,
        ETag: `"${cacheKey}-${Date.now()}"`,
      },
    });
  } catch (error) {
    console.error("Error in blog API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog data" },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}
