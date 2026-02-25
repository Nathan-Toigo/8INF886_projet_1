import { getIronSession, IronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// 1. Define the shape of your session data
export interface SessionData {
  userId?: string;
  username?: string;
  isLoggedIn: boolean;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: "app_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};