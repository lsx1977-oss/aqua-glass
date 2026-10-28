"use client";

import { useCallback, useEffect, useState } from "react";

const LIKED_KEY = "aq-liked";

function readLiked(): string[] {
  try {
    const raw = JSON.parse(localStorage.getItem(LIKED_KEY) || "[]");
    return Array.isArray(raw) ? raw.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

/** Liked video ids, remembered in this browser. */
export function useLiked() {
  const [liked, setLiked] = useState<string[]>([]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setLiked(readLiked()));
    return () => cancelAnimationFrame(frame);
  }, []);

  const toggle = useCallback((id: string) => {
    setLiked((current) => {
      const next = current.includes(id) ? current.filter((x) => x !== id) : [id, ...current];
      try {
        localStorage.setItem(LIKED_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage failures; the like still applies for this visit.
      }
      return next;
    });
  }, []);

  return { liked, toggle, isLiked: (id: string) => liked.includes(id) };
}
