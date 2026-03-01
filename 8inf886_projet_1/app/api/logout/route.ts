import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession, IronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/lib/session";
import { cookies } from 'next/dist/server/request/cookies';


export async function POST(request: NextRequest) {
    const session = await getIronSession(await cookies(), sessionOptions) as IronSession<SessionData>;

    if (session.isLoggedIn) {
        session.destroy();
        return NextResponse.json({ isLoggedIn: false, message: "Logged out successfully" }, { status: 200 });
    } else {
        return NextResponse.json({ isLoggedIn: false, message: "No active session found" }, { status: 401 });
    }
}