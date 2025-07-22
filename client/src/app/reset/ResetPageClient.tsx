"use client";
import React, { useState } from "react";
import Button from "@/components/common/Button";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/api";
import { setCookie } from "@/lib/cookie";
import { useAuth } from "@/contexts/AuthContext";
import { isValidJWT } from "@/lib/utils";

type DecodedToken = {
  email: string;
  exp: number;
  iat: number;
};

export default function ResetPage() {
  const { setUser, setIsExpired, setExpiredDate } = useAuth();
  const params = useSearchParams();
  const token = params.get("token");
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoginScreen, setIsLoginScreen] = useState(false);

  const decodedToken = isValidJWT(token)
    ? (jwtDecode(token as string) as DecodedToken)
    : null;
  const expiredDate = decodedToken ? new Date(decodedToken.exp * 1000) : null;
  const currentDate = new Date();
  const isExpired = expiredDate ? currentDate > expiredDate : true;

  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const password = (form.loginPassword as HTMLInputElement).value;
    const confirmPassword = (form.logincPassword as HTMLInputElement).value;

    if (password !== confirmPassword) {
      setError("Passwords Do Not match");
      return;
    } else {
      setError("");
    }

    if (isExpired) {
      setError("Token has expired. Please request a new password reset.");
      return;
    }

    api
      .post("/users/reset_password", {
        email: decodedToken?.email,
        password,
      })
      .then((response) => {
        if (response.data.error) {
          setError(response.data.error);
        } else {
          setError("Your password has been reset. Please Login");
          setIsLoginScreen(true);
        }
      })
      .catch((error) => {
        console.error("Error resetting password:", error);
        setError(
          "An error occurred while resetting your password. Please try again."
        );
      });
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.loginEmail as HTMLInputElement).value;
    const password = (form.loginPassword as HTMLInputElement).value;
    api
      .post("/users/login", { email, password })
      .then(async (response) => {
        if (response.data.error) {
          setError(response.data.error);
        } else {
          setCookie("Bearer_token", `Bearer ${response.data.token}`);
          setIsExpired(response.data.expired);
          if (response.data.expiredDate) {
            setExpiredDate(new Date(response.data.expiredDate));
          }
          await (() => new Promise((resolve) => setTimeout(resolve, 1000)))();
          setError("Login Successful");
          setUser(jwtDecode(response.data.token));
          router.push("/account");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        setError("Incorrect Username or Password.");
      })
      .finally(async () => {
        await (() => new Promise((resolve) => setTimeout(resolve, 1000)))();
      });
  };

  if (!token || !decodedToken || isExpired) {
    return (
      <div className="container !py-6">
        <div className="w-full md:w-2/3 mx-auto">
          <h2 className="pl-4 mt-6">Invalid or Expired Token</h2>
          <p className="text-center">
            Please request a new password reset link.
          </p>
          <div className="text-center mt-4">
            <Link href="/auth/forgot-password" className="text-[#e9522a]">
              Request New Password Reset
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container !py-6">
      <div className="w-full md:w-2/3 mx-auto">
        <h2 className="pl-4 mt-6">
          {isLoginScreen ? "Login to Your Account" : "Reset your password"}
        </h2>
        {error && (
          <div className="border rounded-sm py-3 px-5 border-[#f9cfc3] bg-[#fbdcd4] text-[#792b16]">
            {error}
          </div>
        )}
        {!isLoginScreen && <p>"Please enter a new password"</p>}
        {!isLoginScreen && (
          <form onSubmit={handleResetPasswordSubmit}>
            <div className="mb-4">
              <label htmlFor="loginPassword">
                Enter Password
                <span>*</span>
              </label>
              <input
                type="password"
                id="loginPassword"
                placeholder="Password"
                required
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-4 py-[7.2px] text-sm shadow-sm focus:outline-none focus:border-[#E9522A]"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="logincPassword">
                Enter Password
                <span>*</span>
              </label>
              <input
                type="password"
                id="logincPassword"
                placeholder="Confirm Password"
                required
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-4 py-[7.2px] text-sm shadow-sm focus:outline-none focus:border-[#E9522A]"
              />
            </div>
            <div className="text-center">
              <Button
                className="bg-[#e9522a] hover:bg-[#d73e16] focus:bg-[#cb3b15] text-white active-boxshadow-orange"
                text="Submit"
                isFullWidth={false}
              />
            </div>
          </form>
        )}
        {isLoginScreen && (
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-4">
              <label htmlFor="loginEmail">
                Email Address
                <span>*</span>
              </label>
              <input
                type="email"
                id="loginEmail"
                placeholder="Email Address"
                required
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-4 py-[7.2px] text-sm shadow-sm focus:outline-none focus:border-[#E9522A]"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="loginPassword">
                Enter Password
                <span>*</span>
              </label>
              <input
                type="password"
                id="loginPassword"
                placeholder="Password"
                required
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-4 py-[7.2px] text-sm shadow-sm focus:outline-none focus:border-[#E9522A]"
              />
              <p className="text-right">
                <Link href="#" onClick={() => setIsLoginScreen(false)}>
                  Forgot your password?
                </Link>
              </p>
            </div>
            <div className="text-center">
              <Button
                className="bg-[#e9522a] hover:bg-[#d73e16] focus:bg-[#cb3b15] text-white active-boxshadow-orange"
                text="Login"
                isFullWidth={false}
              />
            </div>
          </form>
        )}
        {isLoginScreen && (
          <p className="mt-3">
            Need an account? <Link href="/auth/register">Register</Link>
          </p>
        )}
        {!isLoginScreen && (
          <p className="mt-3">
            Have an account?{" "}
            <Link href="#" onClick={() => setIsLoginScreen(true)}>
              Go Back
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
