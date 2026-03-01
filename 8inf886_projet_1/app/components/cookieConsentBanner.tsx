"use client";

import { useEffect, useState } from "react";
import {
  COOKIE_CONSENT_ACCEPTED,
  COOKIE_CONSENT_DECLINED,
  COOKIE_CONSENT_NAME,
} from "@/lib/cookie-consent";

function getCookieValue(name: string): string | null {
  const cookie = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
}

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const value = getCookieValue(COOKIE_CONSENT_NAME);
    if (value !== COOKIE_CONSENT_ACCEPTED && value !== COOKIE_CONSENT_DECLINED) {
      setIsVisible(true);
    }
  }, []);

  const setDecision = async (decision: typeof COOKIE_CONSENT_ACCEPTED | typeof COOKIE_CONSENT_DECLINED) => {
    try {
      const response = await fetch("/api/cookie-consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision }),
      });

      if (response.ok) {
        setIsVisible(false);
      }
    } catch (error) {
      console.error("Failed to save cookie consent", error);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-black/90 p-6 sm:p-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 text-base sm:flex-row sm:items-center sm:justify-between">
        <p>
          We use cookies to log app activity. Do you accept cookies?
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            className="rounded border border-[#FFFF00] bg-[#FFFF00] px-5 py-2 font-semibold text-black hover:opacity-90"
            onClick={() => setDecision(COOKIE_CONSENT_DECLINED)}
          >
            Decline
          </button>
          <button
            type="button"
            className="rounded border border-[#FFFF00] bg-[#FFFF00] px-5 py-2 font-semibold text-black hover:opacity-90"
            onClick={() => setDecision(COOKIE_CONSENT_ACCEPTED)}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
