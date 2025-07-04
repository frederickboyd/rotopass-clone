// lib/tw-screens.ts
import defaultTheme from "tailwindcss/defaultTheme";

// defaultTheme.screens is an object like
// { sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1536px" }
export const screens = defaultTheme.screens as Record<string, string>;
