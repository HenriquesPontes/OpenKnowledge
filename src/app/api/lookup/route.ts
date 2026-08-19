import { NextRequest, NextResponse } from "next/server";
import { API_ORIGIN } from "@/lib/catalog";

const DATASET_PATTERN = /^[a-z0-9]+(?:\/[a-z0-9]+)?$/;
const GENERIC_ERROR = "The dictionary could not complete that lookup.";

export async function GET(request: NextRequest) {
  const dataset = request.nextUrl.searchParams.get("dataset")?.trim() ?? "";
  const headword = request.nextUrl.searchParams.get("headword")?.trim() ?? "";

  if (!DATASET_PATTERN.test(dataset) || !headword) {
    return NextResponse.json(
      { error: "Choose an isolated lexicon and enter a headword." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(
      `${API_ORIGIN}/v1/${dataset}/lookup?headword=${encodeURIComponent(headword)}`,
      { cache: "no-store" },
    );
    const body = await response.text();
    let json: unknown = { error: body || GENERIC_ERROR };
    try {
      json = body ? JSON.parse(body) : {};
    } catch {
      json = { error: GENERIC_ERROR };
    }
    return NextResponse.json(json, { status: response.status });
  } catch (error) {
    console.error("Dictionary lookup failed:", error);
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 502 });
  }
}
