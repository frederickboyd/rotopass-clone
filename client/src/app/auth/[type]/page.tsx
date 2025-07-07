"use client";

import { useEffect, useState } from "react";
import Button from "@/components/common/Button";
import { UsaStates } from "usa-states";
import Link from "next/link";
import api from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { jwtDecode } from "jwt-decode";
import { setCookie } from "@/lib/cookie";
import { DotLoader } from "react-spinners";
import { useMediaBreakpoints } from "@/hooks/useMediaBreakpoints";

type IType = "login" | "register" | "forgotPassword";

export default function Auth() {
  const router = useRouter();
  const params = useParams();
  const { matches, breakpoint } = useMediaBreakpoints();
  const { setUser, setIsExpired, setExpiredDate } = useAuth();
  const validTypes: IType[] = ["login", "register", "forgotPassword"];
  const initialType = validTypes.includes(params.type as IType)
    ? (params.type as IType)
    : "login";
  const [type, setType] = useState<IType>(initialType);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // State to track loading
  const [freeSignUpLoading, setFreeSignUpLoading] = useState<boolean | undefined>(undefined); // State for free sign-up loading
  const allStates = new UsaStates().states;
  const stateOptions = allStates.map((state) => ({
    value: state.abbreviation,
    label: state.name,
  }));

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const firstName = (form.registerFirst as HTMLInputElement).value;
    const lastName = (form.registerLast as HTMLInputElement).value;
    const email = (form.registerEmail as HTMLInputElement).value;
    const password = (form.registerPassword as HTMLInputElement).value;
    const confirmPassword = (form.registercPassword as HTMLInputElement).value;
    const state = (form.registerState as HTMLSelectElement).value;
    const termsCheckbox = form.termsCheckbox as HTMLInputElement;
    const termsChecked = termsCheckbox?.checked;

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
        .then(async (response) => {
          if (response.data.error) {
            setError(response.data.error);
          } else {
            setError("Login Successful");
            setCookie("Bearer_token", `Bearer ${response.data.token}`);
            await (() => new Promise((resolve) => setTimeout(resolve, 1000)))();
            setUser(jwtDecode(response.data.token));
            router.push("/account");
          }
        })
        .catch((error) => {
          console.error("Registration error:", error);
          // Access the backend error response
          if (error.response && error.response.data) {
            setError(error.response.data.error); // Set the error message from the backend
          } else {
            setError("Registration failed. Please try again.");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the login starts

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
        setLoading(false); // Set loading to false after the login process finishes
        await (() => new Promise((resolve) => setTimeout(resolve, 1000)))();
      });
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.resetEmail as HTMLInputElement).value;

    api
      .post("/users/forgot_password", { email })
      .then((response) => {
        if (response.data.error) {
          setError(response.data.error);
        } else {
          setError(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Forgot password error:", error);
        setError("Failed to send password reset link. Please try again.");
        setFreeSignUpLoading(undefined)
      });
  };

  const handleFreeSignUpSubmit = (e: React.FormEvent) => {
    setFreeSignUpLoading(true); // Set loading to true when the free sign-up starts
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.freeSignUpEmail as HTMLInputElement).value;

    if (!email) {
      setError("Please enter a valid email address.");
      return;
    }

    api
      .post("/users/free_signup", { email })
      .then((response) => {
        if (response.data.error) {
          setError(response.data.error);
        } else {
          setFreeSignUpLoading(false); // Set loading to false after successful sign-up
        }
      })
      .catch((error) => {
        console.error("Free sign-up error:", error);
        setError("Failed to sign up for free updates. Please try again.");
      });
  }
  useEffect(() => {
    // Reset error message when type changes
    setError("");
    // If the type is not valid, default to "login"
    if (!validTypes.includes(params.type as IType)) {
      setType("login");
    } else {
      setType(params.type as IType);
    }
  }, [params.type]);

  return (
    <div>
      <div className="bg-[url('/images/gridbg.png')] bg-cover bg-no-repeat bg-blend-luminosity bg-gray-100">
        <div className="rp-container !py-6 mx-auto">
          {/*Login Dialog*/}
          {type === "login" && (
            <div
              className="backdrop-blur-md w-full md:w-2/3 mx-auto px-6 py-6 border border-1 border-[#E9522A]"
              style={{
                background:
                  "linear-gradient(134deg, rgba(244, 244, 244, 0.40) 0%, rgba(244, 244, 244, 0.20) 100%)",
              }}
            >
              <h2 className="font-bold !text-[25px] uppercase !mb-6">
                Login to Your Account
              </h2>
              <form onSubmit={handleLoginSubmit} className="pb-4">
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
                  className="bg-[#00a8e8] hover:bg-[#008cc2] focus:bg-[#0083b5] text-white !flex !items-center !justify-center active-boxshadow-blue"
                  isFullWidth={true}
                  text={
                    <>
                      <span>Login&nbsp;&nbsp;</span>
                      {loading && <DotLoader color="#fff" size={20} />}
                    </>
                  }
                />

                <div className="row mx-2 pt-2 justify-content-between">
                  <div className="message-text">
                    <div className="text-primary text-[#e9522a]">
                      {loading ? <DotLoader color="#fff" size={20} /> : error}
                    </div>
                  </div>
                </div>
                <div className="text-right pt-2">
                  <Link
                    href={"/auth/forgotPassword"}
                    className="uppercase text-[10px] cursor-pointer !text-black"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </form>
              <hr className="text-[rgba(0,0,0,0.1)]" />
              <div className="py-3 font-bold text-[20px] uppercase">
                Need an Account?
              </div>
              <div className="pb-3">
                <Link href={"/auth/register"}>
                  <Button
                    text="REGISTER HERE"
                    isFullWidth
                    className="bg-black hover:bg-black text-[12px] active-boxshadow-black"
                  />
                </Link>
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
              <h2 className="font-bold !text-[25px] uppercase !mb-6">
                Create your account!
              </h2>
              <p className="flex items-center text-[12px] text-[#767777]">
                Already have an account?{" "}
                <Link
                  className="text-[#E9522A] ml-1 font-bold text-[15px] cursor-pointer active-boxshadow-blue"
                  href={"/auth/login"}
                >
                  LOGIN
                </Link>
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
                    id="registercPassword"
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
                    <label className="!flex items-center space-x-2 cursor-pointer group relative">
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
                  className="bg-[#00a8e8] hover:bg-[#008cc2] focus:bg-[#0083b5] text-white active-boxshadow-blue"
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
              <h2 className="font-bold !text-[25px] uppercase !mb-6">
                Forgot your password?
              </h2>
              <div className="p-4">
                {error && (
                  <div className="border rounded-sm px-5 py-3 mb-4 border-[#c3e6cb] text-[#155724] bg-[#d4edda]">
                    {error}
                  </div>
                )}
                <p>
                  Enter the email address for your account, and we'll send you a
                  link to reset your password.
                </p>
                <form onSubmit={handleForgotPasswordSubmit}>
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
                    className="bg-[#00a8e8] hover:bg-[#008cc2] focus:bg-[#0083b5] text-white active-boxshadow-blue"
                    isFullWidth={true}
                    text="Submit"
                  />
                </form>
              </div>
              <hr className="text-[rgba(0,0,0,0.1)]" />
              <div className="py-3 font-bold text-[20px] uppercase">
                Have an Account?
              </div>
              <div className="pb-3">
                <Link href={"/auth/login"}>
                  <Button
                    text="SIGN IN"
                    isFullWidth
                    className="bg-black hover:bg-black text-[12px] active-boxshadow-black"
                  />
                </Link>
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
          <div className="w-full md:w-1/2 mx-auto px-2">
            {freeSignUpLoading !== false ? (
              <form className="flex justify-center items-center flex-wrap" onSubmit={handleFreeSignUpSubmit}>
                <input
                  type="email"
                  id="freeSignUpEmail"
                  disabled={freeSignUpLoading}
                  required
                  placeholder="youremail@here.com"
                  className="px-[22px] py-[18px] font-semibold -tracking-[0.5px] border-none text-center mx-auto w-full md:flex-1 md:mr-2 sm:mb-2 md:mb-0 bg-white"
                />
                {!freeSignUpLoading && (
                  <Button
                    type="submit"
                    text="Sign Up!"
                    className="bg-[#00a8e8] hover:bg-[#008cc2] focus:bg-[#0083b5] text-white active-boxshadow-blue"
                    isFullWidth={matches.md ? false : true}
                  />
                )}
              </form>
            ) : (
              <div className="text-[#28a745] text-center">Thanks for signing up!!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
