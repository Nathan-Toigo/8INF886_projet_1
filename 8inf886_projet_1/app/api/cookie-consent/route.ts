import { NextResponse } from "next/server";
import {
  COOKIE_CONSENT_ACCEPTED,
  COOKIE_CONSENT_DECLINED,
  COOKIE_CONSENT_NAME,
} from "@/lib/cookie-consent";

type ConsentBody = {
  decision?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ConsentBody | null;
  const decision = body?.decision;

  if (decision !== COOKIE_CONSENT_ACCEPTED && decision !== COOKIE_CONSENT_DECLINED) {
    return NextResponse.json({ message: "Invalid decision" }, { status: 400 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_CONSENT_NAME, decision, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: false,
  });

  return response;
}
