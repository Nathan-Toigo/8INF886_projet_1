// app/api/user/route.js (App Router)
import { cookies } from 'next/headers';
import { getIronSession, IronSession } from 'iron-session';
import { SessionData, sessionOptions } from '@/lib/session'; // Your session configuration file

export async function POST() {
  const session = await getIronSession(await cookies(), sessionOptions) as IronSession<SessionData>;

  // Check if user data exists in the session
  if (session.username) {
    return new Response(JSON.stringify({ username: session.username }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } else {
    return new Response(JSON.stringify({ username: null }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
