"use client";

import { useEffect } from "react";
import { ACTION_TYPES } from "@/lib/action-types";
import { logLocalAction } from "@/lib/local-action-log";
import { getUserName } from "@/lib/session";

export default function Settings() {
    useEffect(() => {
        void (async () => {
            const username = await getUserName();
            await logLocalAction(ACTION_TYPES.GO_TO_SETTINGS, username ?? undefined);
        })();
    }, []);

    return (
        <div className="flex items-center justify-center h-screen">
            <p className="text-lg text-gray-500">Nothing is here yet</p>
        </div>
    );
}