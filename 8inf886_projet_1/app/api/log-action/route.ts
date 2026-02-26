import { NextResponse } from "next/server";
import { getIronSession, IronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionData, sessionOptions } from "@/lib/session";
import { ACTION_TYPES, ActionType, isActionType } from "@/lib/action-types";
import { logUserAction } from "@/lib/action-log";

const RECENT_ACTION_WINDOW_MS = 1500;
const recentActions = new Map<string, number>();
const dedupedActions = new Set<ActionType>([
  ACTION_TYPES.GO_TO_HOME,
  ACTION_TYPES.GO_TO_SETTINGS,
  ACTION_TYPES.GO_TO_CHAT,
]);

export async function POST(request: Request) {
  const session = await getIronSession(await cookies(), sessionOptions) as IronSession<SessionData>;

  if (!session.isLoggedIn || !session.userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null) as { actionName?: unknown } | null;
  const actionName = body?.actionName;

  if (!isActionType(actionName)) {
    return NextResponse.json({ message: "Invalid actionName" }, { status: 400 });
  }

  const userId = Number(session.userId);
  if (!Number.isFinite(userId)) {
    return NextResponse.json({ message: "Invalid session userId" }, { status: 400 });
  }

  try {
    if (dedupedActions.has(actionName)) {
      const key = `${userId}:${actionName}`;
      const now = Date.now();
      const last = recentActions.get(key);

      if (last && now - last < RECENT_ACTION_WINDOW_MS) {
        return NextResponse.json({ ok: true, deduped: true });
      }

      recentActions.set(key, now);
    }

    await logUserAction(userId, actionName);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to log action", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
