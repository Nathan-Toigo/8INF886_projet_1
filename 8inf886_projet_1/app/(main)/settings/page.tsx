"use client";

import { useEffect } from "react";
import { ACTION_TYPES } from "@/lib/action-types";

export default function Settings() {
    useEffect(() => {
        void fetch("/api/log-action", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ actionName: ACTION_TYPES.GO_TO_SETTINGS }),
        });
    }, []);

    return (
        <div className="flex items-center justify-center h-screen">
            <p className="text-lg text-gray-500">Nothing is here yet</p>
        </div>
    );
}