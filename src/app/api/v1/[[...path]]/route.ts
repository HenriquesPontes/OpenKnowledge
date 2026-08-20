import { NextRequest, NextResponse } from "next/server";
import { fetchResearchApi } from "@/lib/catalog";

const SEGMENT = /^[a-z0-9][a-z0-9._-]*$/i;
const QUERY_KEYS = new Set(["headword", "q", "dataset", "offset", "limit"]);
const GENERIC_ERROR = "The API could not complete this request.";

function researchPath(segments: string[], request: NextRequest) {
  if (segments.some((segment) => !SEGMENT.test(segment))) {
    return null;
  }
  const params = new URLSearchParams();
  for (const key of QUERY_KEYS) {
    const value = request.nextUrl.searchParams.get(key)?.trim();
    if (value) params.set(key, value);
  }
  const suffix = segments.length ? `/${segments.join("/")}` : "";
  const query = params.toString();
  return `/v1${suffix}${query ? `?${query}` : ""}`;
}

async function proxy(request: NextRequest, segments: string[]) {
  const path = researchPath(segments, request);
  if (!path) {
    return NextResponse.json(
      {
        status: "error",
        code: "DATASET_NOT_FOUND",
        message: "No isolated dataset is published at this path.",
      },
      { status: 404 },
    );
  }

  try {
    const response = await fetchResearchApi(path, { cache: "no-store" });
    const body = await response.text();
    const contentType = response.headers.get("content-type") || "application/json";
    return new NextResponse(body, {
      status: response.status,
      headers: { "Content-Type": contentType },
    });
  } catch (error) {
    console.error("Linguistic API proxy failed:", error);
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 502 });
  }
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path?: string[] }> },
) {
  const { path = [] } = await context.params;
  return proxy(request, path);
}
