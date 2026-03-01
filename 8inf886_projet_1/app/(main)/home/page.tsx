"use client";

import { useEffect } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import { ACTION_TYPES } from "@/lib/action-types";
import { logLocalAction } from "@/lib/local-action-log";
import { getUserName } from "@/lib/session";

  
export default function Home() {
  const size = useWindowSize() as { width: number; height: number };

  useEffect(() => {
    void (async () => {
      const username = await getUserName();
      await logLocalAction(ACTION_TYPES.GO_TO_HOME, username ?? undefined);
    })();
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-12 mt-12">Bienvenue dans ce super projet web.</h1>
      <p className="text-center text-sm md:text-base lg:text-lg text-gray-400 mb-8 max-w-2xl px-4">
      Pas mal hein.
      </p>
      <div className="mb-12">
      </div>
    </div>
  );
}