"use client";

import { useEffect, useState } from "react";
import Button from "@/components/common/Button";
import { UsaStates } from "usa-states";
import Link from "next/link";
import api from "@/lib/api";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { jwtDecode } from "jwt-decode";
import { setCookie } from "@/lib/cookie";

type IType = "login" | "register" | "forgotPassword";

export default function Login() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setUser, setIsExpired, setExpiredDate } = useAuth();
  const [type, setType] = useState<IType>("login");
  const [error, setError] = useState<string | null>(null);
  const allStates = new UsaStates().states;
  const stateOptions = allStates.map((state) => ({
    value: state.abbreviation,
    label: state.name,
  }));

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const firstName = (
      form.elements.namedItem("registerFirst") as HTMLInputElement
    ).value;
    const lastName = (
      form.elements.namedItem("registerLast") as HTMLInputElement
    ).value;
    const email = (form.elements.namedItem("registerEmail") as HTMLInputElement)
      .value;
    const passwordInputs = form.querySelectorAll('input[type="password"]');
    const password = (passwordInputs[0] as HTMLInputElement).value;
    const confirmPassword = (passwordInputs[1] as HTMLInputElement).value;
    const state = (
      form.elements.namedItem("registerState") as HTMLSelectElement
    ).value;
    const termsChecked = (
      form.elements.namedItem("termsCheckbox") as HTMLInputElement
    )?.checked;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    } else {
      setError(null);
    }
    if (!termsChecked) {
      setError("Please read and Agree to the Terms and Conditions");
      return;
    } else {
      setError(null);
    }

    const registrationData = {
      firstName,
      lastName,
      email,
      password,
      state,
    };

    try {
      api
        .post("users/register", registrationData)
        .then((response) => {
          if (response.data.error) {
            setError(response.data.error);
          } else {
            setError(null);
            setCookie("Bearer_token", `Bearer ${response.data.token}`);
            setUser(jwtDecode(response.data.token));
            setIsExpired(response.data.expired);
            if (response.data.expiredDate) {
              setExpiredDate(new Date(response.data.expiredDate));
            }
            router.push("/account");
          }
        })
        .catch((error) => {
          console.error("Registration error:", error);
          setError("Registration failed. Please try again.");
        });
    } catch (error) {
      console.error("Error during registration:", error);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("loginEmail") as HTMLInputElement)
      .value;
    const password = (
      form.elements.namedItem("loginPassword") as HTMLInputElement
    ).value;

    api
      .post("/users/login", { email, password })
      .then(async (response) => {
        if (response.data.error) {
          setError(response.data.error);
        } else {
          setError(null);

          setCookie("Bearer_token", `Bearer ${response.data.token}`);

          await (() => new Promise((resolve) => setTimeout(resolve, 2000)))();
          setUser(jwtDecode(response.data.token));
          router.push("/account");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        setError("Login failed. Please check your credentials.");
      });
  };

  return (
    <div>
      <div className="bg-[url('/images/gridbg.png')] bg-cover bg-no-repeat bg-blend-luminosity bg-gray-800">
        <div className="container py-4 mx-auto">
          {/*Login Dialog*/}
          {type === "login" && (
            <div
              className="backdrop-blur-md w-full md:w-2/3 mx-auto px-6 py-6 border border-1 border-[#E9522A]"
              style={{
                background:
                  "linear-gradient(134deg, rgba(244, 244, 244, 0.40) 0%, rgba(244, 244, 244, 0.20) 100%)",
              }}
            >
              <h2 className="font-bold !text-[25px] uppercase mb-6">
                Login to Your Account
              </h2>
              {error && (
                <div className="border rounded-sm px-5 py-3 mb-4 border-[#bee5eb] text-[#0c5460] bg-[#d1ecf1]">
                  {error}
                </div>
              )}
              <form onSubmit={handleLoginSubmit} className="pb-3">
                <div className="mb-4">
                  <input
                    type="email"
                    id="loginEmail"
                    aria-describedby="emailHelp"
                    placeholder="Email Address"
                    required
                    className="mt-1 block w-full rounded border border-gray-300 bg-white px-4 py-[7.2px] text-sm shadow-sm focus:outline-none focus:border-[#E9522A]"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    id="loginPassword"
                    aria-describedby="passwordHelp"
                    placeholder="Password"
                    required
                    className="mt-1 block w-full rounded border border-gray-300 bg-white px-4 py-[7.2px] text-sm shadow-sm focus:outline-none focus:border-[#E9522A]"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-[#008cc2] hover:bg-[#0083b5] text-white"
                  isFullWidth={true}
                  text="Login"
                />
                <div className="text-right pt-2">
                  <div
                    className="uppercase text-[10px] cursor-pointer"
                    onClick={() => {
                      setError("");
                      setType("forgotPassword");
                    }}
                  >
                    Forgot Password?
                  </div>
                </div>
              </form>
              <hr className="text-[rgba(0,0,0,0.1)]" />
              <div className="py-3 font-bold text-[20px] uppercase">
                Need an Account?
              </div>
              <div className="pb-3">
                <Button
                  text="REGISTER HERE"
                  isFullWidth
                  className="bg-gray-800 hover:bg-gray-900 text-[12px]"
                  onClick={() => {
                    setError("");
                    setType("register");
                  }}
                />
              </div>
            </div>
          )}
          {/*Register Dialog*/}
          {type === "register" && (
            <div
              className="backdrop-blur-md w-full md:w-2/3 mx-auto px-6 py-6 border border-1 border-[#E9522A]"
              style={{
                background:
                  "linear-gradient(134deg, rgba(244, 244, 244, 0.40) 0%, rgba(244, 244, 244, 0.20) 100%)",
              }}
            >
              <h2 className="font-bold !text-[25px] uppercase mb-6">
                Create your account!
              </h2>
              <p className="flex items-center text-[12px] text-[#767777]">
                Already have an account?{" "}
                <span
                  className="text-[#E9522A] ml-1 font-bold text-[15px] cursor-pointer"
                  onClick={() => {
                    setError("");
                    setType("login");
                  }}
                >
                  LOGIN
                </span>
              </p>
              {error && (
                <div className="border rounded-sm px-5 py-3 mb-4 border-[#bee5eb] text-[#0c5460] bg-[#d1ecf1]">
                  {error}
                </div>
              )}
              <form onSubmit={handleRegisterSubmit}>
                <div className="flex mx-0 mb-4 px-2">
                  <input
                    type="text"
                    id="registerFirst"
                    placeholder="First Name"
                    required
                    className="mt-1 block w-full rounded border border-gray-300 bg-white px-4 py-[7.2px] text-sm shadow-sm focus:outline-none focus:border-[#E9522A]"
                  />
                </div>
                <div className="flex mx-0 mb-4 px-2">
                  <input
                    type="text"
                    id="registerLast"
                    placeholder="Last Name"
                    required
                    className="mt-1 block w-full rounded border border-gray-300 bg-white px-4 py-[7.2px] text-sm shadow-sm focus:outline-none focus:border-[#E9522A]"
                  />
                </div>
                <div className="flex mx-0 mb-4 px-2">
                  <input
                    type="email"
                    id="registerEmail"
                    placeholder="Email Address"
                    required
                    className="mt-1 block w-full rounded border border-gray-300 bg-white px-4 py-[7.2px] text-sm shadow-sm focus:outline-none focus:border-[#E9522A]"
                  />
                </div>
                <div className="flex mx-0 mb-4 px-2">
                  <input
                    type="password"
                    id="registerPassword"
                    placeholder="Password"
                    required
                    className="mt-1 block w-full rounded border border-gray-300 bg-white px-4 py-[7.2px] text-sm shadow-sm focus:outline-none focus:border-[#E9522A]"
                  />
                </div>
                <div className="flex mx-0 mb-4 px-2">
                  <input
                    type="password"
                    id="registerPassword"
                    placeholder="Re-enter Password"
                    autoComplete="new-password"
                    required
                    className="mt-1 block w-full rounded border border-gray-300 bg-white px-4 py-[7.2px] text-sm shadow-sm focus:outline-none focus:border-[#E9522A]"
                  />
                </div>
                <div className="flex mx-0 mb-4 px-2">
                  <select
                    name="state"
                    id="registerState"
                    className="mt-1 block w-full rounded border border-gray-300 bg-white px-4 py-[7.2px] text-sm shadow-sm focus:outline-none focus:border-[#E9522A]"
                  >
                    <option value="" disabled selected>
                      Select Your State
                    </option>
                    {stateOptions.map((state) => (
                      <option key={state.value} value={state.value}>
                        {state.label}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="font-bold text-[12px] uppercase">T & C's</p>
                <div className="flex mx-0 mb-4">
                  <div className="w-full pl-0">
                    <label className="flex items-center space-x-2 cursor-pointer group relative">
                      {/* Functional hidden checkbox */}
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        id="termsCheckbox"
                      />

                      {/* Custom visual box that responds to checkbox state */}
                      <div className="h-[21px] w-[21px] bg-white rounded-[6px] flex items-center justify-center group-hover:bg-gray-100"></div>
                      <svg
                        className="w-3 h-3 text-[#00a8e8] opacity-0 peer-checked:opacity-100 transition-opacity absolute transform translate-x-1/3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>

                      <span className="text-sm text-gray-700">
                        I agree to the{" "}
                        <Link
                          href="/terms"
                          className="font-bold text-[#e9522a] hover:underline"
                        >
                          Terms &amp; Conditions
                        </Link>
                      </span>
                    </label>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="bg-[#008cc2] hover:bg-[#0083b5] text-white"
                  isFullWidth={true}
                  text="Register"
                />
              </form>
            </div>
          )}
          {/*Forgot Password Dialog*/}
          {type === "forgotPassword" && (
            <div
              className="backdrop-blur-md w-full md:w-2/3 mx-auto px-6 py-6 border border-1 border-[#E9522A]"
              style={{
                background:
                  "linear-gradient(134deg, rgba(244, 244, 244, 0.40) 0%, rgba(244, 244, 244, 0.20) 100%)",
              }}
            >
              <h2 className="font-bold !text-[25px] uppercase mb-6">
                Forgot your password?
              </h2>
              <div className="p-4">
                <p>
                  Enter the email address for your account, and we'll send you a
                  link to reset your password.
                </p>
                <div className="mb-4">
                  <input
                    type="email"
                    id="resetEmail"
                    aria-describedby="emailHelp"
                    placeholder="Email Address"
                    required
                    className="mt-1 block w-full rounded border border-gray-300 bg-white px-4 py-[7.2px] text-sm shadow-sm focus:outline-none focus:border-[#E9522A]"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-[#008cc2] hover:bg-[#0083b5] text-white"
                  isFullWidth={true}
                  text="Submit"
                />
              </div>
              <hr className="text-[rgba(0,0,0,0.1)]" />
              <div className="py-3 font-bold text-[20px] uppercase">
                Have an Account?
              </div>
              <div className="pb-3">
                <Button
                  text="SIGN IN"
                  isFullWidth
                  className="bg-gray-800 hover:bg-gray-900 text-[12px]"
                  onClick={() => {
                    setError("");
                    setType("login");
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bg-black text-center py-6">
        <img
          src="https://dfw06mp24knrz.cloudfront.net/rotopass/partners/fantasylife/FL_Summer2023_Horizontal.svg"
          height={70}
          alt="fl_summer"
          className="h-[70px] mx-auto"
        />
        <div className="text-shadow text-[50px] leading-[50px] font-bold font-arupala text-white my-6">
          Get <span className="italic">Free</span> updates in your inbox
        </div>
        <div className="flex">
          <div className="w-full md:w-1/2 mx-auto">
            <form className="flex justify-center items-center">
              <input
                type="email"
                required
                placeholder="youremail@here.com"
                className="px-[22px] py-[18px] font-semibold -tracking-[0.5px] border-none text-center mx-auto w-full md:flex-1 md:mr-2 sm:mb-2 md:mb-0 bg-white"
              />
              <Button
                type="submit"
                text="Sign Up!"
                className="bg-[#008cc2] hover:bg-[#0083b5] text-white"
                isFullWidth={false}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
