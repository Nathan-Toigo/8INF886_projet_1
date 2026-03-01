import { SessionOptions } from "iron-session";

export interface SessionData {
  userId?: string;
  username?: string;
  isLoggedIn: boolean;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: "app_session",
  cookieOptions: {
    secure: false, // So it works with http (hosted without domain with coolify)
  },
};

export const getUserName = async (): Promise<string | null> => {
  const res = await fetch("/api/getUser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  let username: string | null = null;
  if (res.ok) {
    username = (await res.json()).username;
  }
  return await username;
}