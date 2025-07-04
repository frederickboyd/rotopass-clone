// hooks/useMediaBreakpoints.ts
"use client";
import { useState, useEffect } from "react";
import { screens } from "@/lib/tw-screens";

export type Breakpoint = keyof typeof screens;

export function useMediaBreakpoints() {
  // start all as false
  const [matches, setMatches] = useState<Record<Breakpoint, boolean>>(
    Object.keys(screens).reduce((acc, key) => {
      acc[key as Breakpoint] = false;
      return acc;
    }, {} as Record<Breakpoint, boolean>)
  );

  useEffect(() => {
    // set up a MediaQueryList & listener for each breakpoint
    const entries = (Object.entries(screens) as [Breakpoint, string][])
      .map(([bp, minW]) => {
        const mql = window.matchMedia(`(min-width: ${minW})`);
        // initialize
        setMatches((prev) => ({ ...prev, [bp]: mql.matches }));
        // on-change handler
        const listener = (e: MediaQueryListEvent) =>
          setMatches((prev) => ({ ...prev, [bp]: e.matches }));
        mql.addEventListener("change", listener);
        return { mql, listener };
      });

    return () => {
      // clean up
      entries.forEach(({ mql, listener }) =>
        mql.removeEventListener("change", listener)
      );
    };
  }, []);

  // find the largest active one
  const active = (Object.keys(matches) as Breakpoint[])
    .filter((bp) => matches[bp])
    .pop() ?? null;

  return { matches, breakpoint: active };
}
