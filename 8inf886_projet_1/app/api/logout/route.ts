import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession, IronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/lib/session";
import { cookies } from 'next/dist/server/request/cookies';
import { logUserAction } from "@/lib/action-log";
import { ACTION_TYPES } from "@/lib/action-types";


export async function POST(request: NextRequest) {
    const session = await getIronSession(await cookies(), sessionOptions) as IronSession<SessionData>;

    if (session.isLoggedIn) {
        const userId = Number(session.userId);
        if (Number.isFinite(userId)) {
            try {
                await logUserAction(userId, ACTION_TYPES.LOGOUT);
            } catch (logError) {
                console.error("Failed to log logout action", logError);
            }
        }

        session.destroy();
        return NextResponse.json({ isLoggedIn: false, message: "Logged out successfully" }, { status: 200 });
    } else {
        return NextResponse.json({ isLoggedIn: false, message: "No active session found" }, { status: 401 });
    }
}