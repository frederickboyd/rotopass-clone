"use server";
// This file is used to manage cookies in the Next.js application.
import { cookies } from "next/headers";

export const getCookie = async (name: string): Promise<string | undefined> => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(name);
  return cookie ? cookie.value : undefined;
};

export const setCookie = async (
  name: string,
  value: string,
  options?: { maxAge?: number; path?: string }
) => {
  const cookieStore = await cookies();
  cookieStore.set(name, value, {
    ...options,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};

export const deleteCookie = async (name: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(name);
};
