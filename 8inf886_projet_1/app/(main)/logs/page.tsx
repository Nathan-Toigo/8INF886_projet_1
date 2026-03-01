"use client";

import { useEffect, useState } from "react";
import {
  clearAllLocalActionLogs,
  getLocalActionLogs,
  LocalActionLog,
} from "@/lib/local-action-log";
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

function formatAction(action: string): string {
  return action
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }

  return date.toLocaleString();
}

export default function LogsPage() {
  const [logs, setLogs] = useState<LocalActionLog[]>([]);
  const [cookiesEnabled, setCookiesEnabled] = useState(false);
  const [isUpdatingCookies, setIsUpdatingCookies] = useState(false);

  const refreshLogs = () => {
    setLogs(getLocalActionLogs());
  };

  useEffect(() => {
    refreshLogs();
    setCookiesEnabled(getCookieValue(COOKIE_CONSENT_NAME) === COOKIE_CONSENT_ACCEPTED);
  }, []);

  const clearMyLogs = () => {
    clearAllLocalActionLogs();
    refreshLogs();
  };

  const toggleCookies = async () => {
    setIsUpdatingCookies(true);

    try {
      const decision = cookiesEnabled
        ? COOKIE_CONSENT_DECLINED
        : COOKIE_CONSENT_ACCEPTED;

      const response = await fetch("/api/cookie-consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision }),
      });

      if (response.ok) {
        setCookiesEnabled(decision === COOKIE_CONSENT_ACCEPTED);
      }
    } catch (error) {
      console.error("Failed to update cookie consent", error);
    } finally {
      setIsUpdatingCookies(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold">Action Logs</h1>
      <p className="mb-6 text-sm text-gray-400">
        Historique de toutes les actions enregistrées dans ce navigateur.
      </p>

      <p className="mb-3 text-sm text-gray-300">
        Cookies de logs: {cookiesEnabled ? "activés" : "désactivés"}
      </p>

      <div className="mb-4 flex gap-2">
        <button
          type="button"
          onClick={refreshLogs}
          className="rounded border border-white/20 px-3 py-2 text-sm hover:bg-white/10"
        >
          Rafraîchir
        </button>
        <button
          type="button"
          onClick={clearMyLogs}
          className="rounded border border-red-400/40 px-3 py-2 text-sm text-red-300 hover:bg-red-500/10"
        >
          Vider mes logs
        </button>
        <button
          type="button"
          onClick={toggleCookies}
          disabled={isUpdatingCookies}
          className="rounded border border-[#FFFF00] bg-[#FFFF00] px-3 py-2 text-sm font-semibold text-black hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isUpdatingCookies
            ? "Mise à jour..."
            : cookiesEnabled
              ? "Désactiver les cookies"
              : "Activer les cookies"}
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10">
        <table className="min-w-full divide-y divide-white/10">
          <thead className="bg-white/5">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-300">Utilisateur</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-300">Action</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-300">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {logs.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-sm text-gray-400">
                  Aucune action trouvée dans ce navigateur.
                </td>
              </tr>
            ) : (
              logs.map((entry, index) => (
                <tr key={`${entry.username}-${entry.action}-${entry.date}-${index}`} className="hover:bg-white/5">
                  <td className="px-4 py-3 text-sm">{entry.username}</td>
                  <td className="px-4 py-3 text-sm">{formatAction(entry.action)}</td>
                  <td className="px-4 py-3 text-sm text-gray-300">{formatDate(entry.date)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
