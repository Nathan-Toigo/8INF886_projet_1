import { getIronSession, IronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/lib/session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { logUserAction } from "@/lib/action-log";
import { ACTION_TYPES } from "@/lib/action-types";
import bcrypt from 'bcrypt'; // Highly recommended for password checking

export async function POST(request: NextRequest) {
  const session = await getIronSession(await cookies(), sessionOptions) as IronSession<SessionData>;
  const { username, password } = await request.json();

  try {
    const [rows]: any = await pool.execute(
      'SELECT id_users, username, password FROM users WHERE username = ? LIMIT 1',
      [username]
    );

    const user = rows[0];

    if (user && await bcrypt.compare(password, user.password)) {
      session.userId = user.id_users.toString();
      session.username = user.username;
      session.isLoggedIn = true;

      await session.save();

      try {
        await logUserAction(user.id_users, ACTION_TYPES.LOGIN);
      } catch (logError) {
        console.error("Failed to log login action", logError);
      }

      return NextResponse.json({ ok: true });
    }

    return NextResponse.json(
      { message: "Invalid username or password" },
      { status: 401 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}