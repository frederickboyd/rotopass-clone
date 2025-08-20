"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CgChevronRight } from "react-icons/cg";
import { useAuth } from "@/contexts/AuthContext";
import { deleteCookie } from "@/lib/cookie";
import Button from "./common/Button";
import { usePathname } from "next/navigation";

const UpLayout = () => {
  const { user, setUser, setIsExpired, setExpiredDate } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const pathname = usePathname();

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.target as HTMLAnchorElement;
    if (target.textContent?.toLowerCase() === "logout") {
      deleteCookie("Bearer_token");
      setShowDropdown(false);
      await (() => new Promise((resolve) => setTimeout(resolve, 1000)))();
      setUser({
        id: "",
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        status: 0,
        created_at: "",
        updated_at: "",
      });
      setIsExpired(null);
      setExpiredDate(new Date());
    }

    // Click on "Login"button
    else {
      window.location.href = "/auth/login";
    }
  };

  useEffect(() => {
    setShowDropdown(false);
  }, [pathname]);

  return (
    <div className="relative bg-white">
      <div className="mx-[24px] mt-6 mb-2 lg:mx-[120px] lg:mb-6">
        <div className="flex justify-between items-center lg:items-end">
          <Link href="/">
            <img
              src={"/images/rotopass.png"}
              alt="Logo"
              className="w-auto h-[50px] lg:h-[135px] object-contain logo-shadow"
            />
          </Link>
          <div className="hidden lg:flex gap-1">
            <Link
              href={"/account"}
              className="bg-[#d9d9d9] !text-[#212529] text-center px-[22px] py-[18px] mt-auto font-arupala font-semibold text-[16px] hover:bg-[#c6c6c6] transition-colors duration-300 active-boxshadow-grey"
            >
              My Account
            </Link>
            <div
              className="bg-[#d9d9d9] text-[#212529] text-center px-[22px] py-[18px] mt-auto font-arupala font-semibold text-[16px] cursor-pointer hover:bg-[#c6c6c6] transition-colors duration-300 active-boxshadow-grey"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <span>{showDropdown ? "Less" : "More"}</span>
            </div>
            <Link
              href={user.id ? "/auth/logout" : "/auth/login"}
              onClick={handleLogout}
              className="bg-[#063b42] !text-[#fff] text-center px-[22px] py-[18px] mt-auto font-arupala font-semibold text-[16px] hover:bg-[#031c1f] transition-colors duration-300 active-boxshadow-green"
            >
              {user.id ? "Logout" : "Login"}
            </Link>
            <div className="flex flex-col items-center">
              <Image
                src="/svgs/arrow.svg"
                alt="arrow"
                width={68}
                height={75}
                className="-scale-y-100 mb-2"
              />
              <Link
                href={"/pricing"}
                className="bg-[#e9522a] !text-[#fff] text-center px-[22px] py-[18px] mt-auto font-arupala font-semibold text-[16px] hover:bg-[#d73e16] transition-colors duration-300 active-boxshadow-orange"
              >
                Join
              </Link>
            </div>
          </div>
          <div className="flex lg:hidden gap-2">
            <Link
              href={user.id ? "/auth/logout" : "/auth/login"}
              onClick={handleLogout}
            >
              <Button
                className="bg-[#063b42] hover:bg-[#031c1f] focus:bg-[#021113] text-white !px-3 !py-2 text-[14px] font-arupala font-semibold active-boxshadow-green#008cc2"
                text={user.id ? "Logout" : "Login"}
              />
            </Link>
            <Link href={"/pricing"}>
              <Button
                className="bg-[#e9522a] hover:bg-[#d73e16] focus:bg-[#cb3b15] text-white !px-3 !py-2 text-[14px] font-arupala font-semibold active-boxshadow-orange"
                text={"Join"}
              />
            </Link>
            <div className="m-2">
              <img
                src={`/svgs/${showDropdown ? "close" : "menulist"}.svg`}
                alt="menu"
                className="cursor-pointer"
                onClick={() => setShowDropdown((prev) => !prev)}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`left-0 right-0 z-99 top-[100%] absolute lg:mx-[120px] ${showDropdown ? "block" : "hidden"
          }`}
        style={{
          boxShadow:
            "0px 8px 17px 0px rgba(0, 0, 0, .25), 0px 10px 15px 0px rgba(0, 0, 0, .25)",
        }}
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        <div className="!mx-0 flex flex-wrap">
          <div className="w-full lg:w-5/12 bg-[#d9d9d9] p-3">
            <div className="text-[20px] font-bold leading-[21px] font-arupala mb-3">
              Yo Rotopass
            </div>
            <div>
              <div className="flex mx-0 mb-3 items-center">
                <div className="max-w-full px-[7.5px]">
                  <Image
                    src={"/svgs/pencil.svg"}
                    alt="pencil"
                    width={88}
                    height={88}
                  />
                </div>
                <div className="flex-1">
                  <Link
                    href={"/account"}
                    className="bg-transparent text-[#e9522a] flex items-center hover-underline"
                  >
                    My Profile
                    <CgChevronRight />
                  </Link>
                  <div className="text-[#6c757d] text-[14px]">
                    Get access to my sites here
                  </div>
                </div>
              </div>
              <div className="flex mx-0 mb-3 items-center">
                <div className="max-w-full px-[7.5px]">
                  <Image
                    src={"/svgs/headphone.svg"}
                    alt="headphone"
                    width={88}
                    height={88}
                  />
                </div>
                <div className="flex-1">
                  <Link
                    href={"/support"}
                    className="bg-transparent text-[#e9522a] flex items-center hover-underline"
                  >
                    Customer Support
                    <CgChevronRight />
                  </Link>
                  <div className="text-[14px]">
                    <span className="text-[#6c757d]">need help, </span>
                    <span className="text-[#e9522a] cursor-pointer">
                      click here
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-3">
              <Link
                href={user.id ? "/auth/logout" : "/auth/login"}
                onClick={handleLogout}
                className="block px-[22px] py-[18px] font-arupala font-bold text-center cursor-pointer !text-white bg-[#063b42] hover:bg-[#031c1f] border border-1 border-[#063b42] transition-colors duration-300"
              >
                {user.id ? "Logout" : "Login"}
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-7/12 bg-white p-3">
            <div className="flex mx-0">
              <div className="w-full md:flex-1 mb-4 md:mb-0 px-[7.5px]">
                <h2 className="!mb-3">
                  <Link
                    href={"/about"}
                    className="text-[20px] font-bold leading-[36px] font-arupala !text-black hover-underline"
                  >
                    About us & Our Partners
                  </Link>
                </h2>
                <div className="mb-2">
                  <Link
                    href={"/about"}
                    className="text-[19px] leading-[12px] !text-black hover-underline"
                  >
                    About Rotopass
                  </Link>
                </div>
                <div className="mb-2">
                  <Link
                    href={"/articles/nfl-content/peacock"}
                    className="text-[19px] leading-[12px] !text-black hover-underline"
                  >
                    Peacock
                  </Link>
                </div>
                <div className="mb-2">
                  <Link
                    href={"/articles/nfl-content/draft-guide"}
                    className="text-[19px] leading-[12px] !text-black hover-underline"
                  >
                    Rotoworld Draft Guide
                  </Link>
                </div>
                <div className="mb-2">
                  <a
                    href="https://fantasylife.com"
                    className="text-[19px] leading-[12px] !text-black hover-underline"
                  >
                    Fantasy life
                  </a>
                </div>
                <div className="mb-2">
                  <Link
                    href={"/articles/nfl-content/what-is-footballguys"}
                    className="text-[19px] leading-[12px] !text-black hover-underline"
                  >
                    FootballGuys
                  </Link>
                </div>
                <div className="mb-2">
                  <Link
                    href={"/articles/nfl-content/what-is-4for4"}
                    className="text-[19px] leading-[12px] !text-black hover-underline"
                  >
                    4fo4
                  </Link>
                </div>
                <div className="mb-2">
                  <Link
                    href={"/articles/categories_here/what-is-rotoviz"}
                    className="text-[19px] leading-[12px] !text-black hover-underline"
                  >
                    Rotoviz
                  </Link>
                </div>
                <div className="mb-2">
                  <Link
                    href={"/articles/nfl-content/what-is-dlf"}
                    className="text-[19px] leading-[12px] !text-black hover-underline"
                  >
                    Dynasty League Football
                  </Link>
                </div>
              </div>
              <div className="w-full md:flex-1 mb-4 md:mb-0 px-[7.5px]">
                <h2 className="!mb-3">
                  <Link
                    href={"#"}
                    className="text-[20px] font-bold leading-[36px] font-arupala !text-black hover-underline"
                  >
                    Why buy the bundle?
                  </Link>
                </h2>
                <div className="mb-2">
                  <Link
                    href={"/articles/nfl-content/testimonials"}
                    className="text-[19px] leading-[12px] !text-black hover-underline"
                  >
                    Testimonials
                  </Link>
                </div>
              </div>
            </div>
            <div className="p-3">
              <Link
                href="/pricing"
                className="cursor-pointer font-bold px-[22px] py-[18px] text-center !text-white font-arupala bg-[#e9522a] hover:bg-[#d73e16] text-[16px] w-full block transitions-color duration-300 active-boxshadow-orange"
              >
                Get the Rotopass bundle
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpLayout;
