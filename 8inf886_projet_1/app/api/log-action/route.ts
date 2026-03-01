import { NextResponse } from "next/server";

export async function POST(request: Request) {
  return NextResponse.json({ ok: true, skipped: "localstorage_logging_enabled" });
}
