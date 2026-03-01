"use client";

import { ActionType } from "@/lib/action-types";
import { COOKIE_CONSENT_ACCEPTED, COOKIE_CONSENT_NAME } from "@/lib/cookie-consent";

export type LocalActionLog = {
  username: string;
  action: ActionType;
  date: string;
};

const LOCAL_ACTION_LOGS_KEY = "action_logs";
const LOCAL_ACTION_USERNAME_KEY = "action_logs_username";
const DEDUP_WINDOW_MS = 1500;
let lastActionFingerprint = "";
let lastActionAt = 0;

function hasAcceptedConsentInBrowser(): boolean {
  const cookie = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${COOKIE_CONSENT_NAME}=`));

  if (!cookie) {
    return false;
  }

  return decodeURIComponent(cookie.split("=")[1]) === COOKIE_CONSENT_ACCEPTED;
}

function getStoredLocalLogUsername(): string | null {
  return window.localStorage.getItem(LOCAL_ACTION_USERNAME_KEY);
}

async function resolveUsername(explicitUsername?: string): Promise<string> {
  if (explicitUsername && explicitUsername.trim().length > 0) {
    window.localStorage.setItem(LOCAL_ACTION_USERNAME_KEY, explicitUsername);
    return explicitUsername;
  }

  const storedUsername = getStoredLocalLogUsername();
  if (storedUsername && storedUsername.trim().length > 0) {
    return storedUsername;
  }

  try {
    const response = await fetch("/api/getUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const payload = (await response.json()) as { username?: string | null };
      const fetchedUsername = payload.username?.trim();

      if (fetchedUsername) {
        window.localStorage.setItem(LOCAL_ACTION_USERNAME_KEY, fetchedUsername);
        return fetchedUsername;
      }
    }
  } catch {
  }

  return "unknown";
}

export function clearLocalLogUsername(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(LOCAL_ACTION_USERNAME_KEY);
}

export async function logLocalAction(action: ActionType, explicitUsername?: string): Promise<void> {
  if (typeof window === "undefined") {
    return;
  }

  if (!hasAcceptedConsentInBrowser()) {
    return;
  }

  const username = await resolveUsername(explicitUsername);
  const now = Date.now();
  const fingerprint = `${username}:${action}`;
  if (lastActionFingerprint === fingerprint && now - lastActionAt < DEDUP_WINDOW_MS) {
    return;
  }

  lastActionFingerprint = fingerprint;
  lastActionAt = now;

  const nextLog: LocalActionLog = {
    username,
    action,
    date: new Date(now).toISOString(),
  };

  try {
    const existingRaw = window.localStorage.getItem(LOCAL_ACTION_LOGS_KEY);
    const existing = existingRaw ? (JSON.parse(existingRaw) as LocalActionLog[]) : [];
    existing.unshift(nextLog);
    window.localStorage.setItem(LOCAL_ACTION_LOGS_KEY, JSON.stringify(existing));
  } catch (error) {
    console.error("Failed to write action log to localStorage", error);
  }
}

export function getLocalActionLogs(): LocalActionLog[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(LOCAL_ACTION_LOGS_KEY);
    return raw ? (JSON.parse(raw) as LocalActionLog[]) : [];
  } catch {
    return [];
  }
}

export function clearAllLocalActionLogs(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(LOCAL_ACTION_LOGS_KEY);
  } catch (error) {
    console.error("Failed to clear local action logs", error);
  }
}
