import AdvertiseCarousel from "@/components/AdvertiseCarousel";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

export default function Home() {
  return (
    <div>
      <div className="rp-container !py-6 mx-auto">
        <div className="pt-4 flex flex-wrap">
          <div className="flex-1">
            <section className="mb-6">
              <h1 className="text-center text-shadow !text-[50px] lg:!text-[110px] tracking-[1.1px] uppercase text-[#1d1e1f] !mb-6">
                Win Your League
              </h1>
              <h2 className="text-center text-shadow !text-[16px] lg:!text-[24px] leading-[97%] tracking-[3px] lowercase text-[#1d1e1f] !mb-6">
                <div className="mb-4 md:mb-2">
                  <span className="italic font-normal">with </span>
                  <span className="uppercase font-medium text-[#e9522a]">
                    The Rotopass Bundle
                  </span>
                </div>
                <div>
                  <span className="italic font-normal">from </span>
                  <span className="uppercase">Matthew Berry</span>
                </div>
              </h2>
            </section>
            <div className="flex justify-center lg:hidden">
              <Image
                src="/images/MB.png"
                alt="mb"
                width={238}
                height={478}
                className="object-contain -scale-x-100"
              />
            </div>
            <section className="my-4">
              <div className="flex flex-wrap mx-0 justify-center">
                <div className="w-full lg:w-1/2 pb-3">
                  <div className="mx-auto">
                    <div className="text-[20px] lg:text-[40px] leading-[34px] lg:leading-[59px] -tracking-[0.4px] font-arupala mb-4 text-black">
                      <span className="text-[#00a8e8] font-bold">
                        Watch Live Sports,
                      </span>{" "}
                      <span className="italic">{" get the "}</span>
                      <span className="text-[#00a8e8] font-bold">
                        best fantasy analysis and tools
                      </span>
                      <span className="italic">
                        {" from the best in the business at the "}
                      </span>
                      <span className="text-[#00a8e8] font-bold">
                        best value in the world
                      </span>
                    </div>
                    <div className="mb-4 font-dm">
                      <ul className="mb-4 px-10">
                        <li className="flex items-center text-[16px] leading-[30px] -tracking-[0.3px] pl-1">
                          <FaStar className="text-[#e9522a] mr-2" />
                          <span className="text-[#1d1e1f]">Rankings</span>
                        </li>
                        <li className="flex items-center text-[16px] leading-[30px] -tracking-[0.3px] pl-1">
                          <FaStar className="text-[#e9522a] mr-2" />
                          <span className="text-[#1d1e1f]">Projections</span>
                        </li>
                        <li className="flex items-center text-[16px] leading-[30px] -tracking-[0.3px] pl-1">
                          <FaStar className="text-[#e9522a] mr-2" />
                          <span className="text-[#1d1e1f]">Tools</span>
                        </li>
                        <li className="flex items-center text-[16px] leading-[30px] -tracking-[0.3px] pl-1">
                          <FaStar className="text-[#e9522a] mr-2" />
                          <span className="text-[#1d1e1f]">
                            Top industry analysis
                          </span>
                        </li>
                        <li className="flex items-center text-[16px] leading-[30px] -tracking-[0.3px] pl-1">
                          <FaStar className="text-[#e9522a] mr-2" />
                          <span className="text-[#1d1e1f]">
                            Save hundreds of $$ each year
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="pr-0 lg:pr-4 mb-4">
                      <Link
                        href="/pricing"
                        className="cursor-pointer font-bold px-[22px] py-[18px] text-center !text-white font-arupala bg-[#e9522a] hover:bg-[#d73e16] focus:bg-[#cb3b15] text-[16px] w-full block transitions-color duration-300 active-boxshadow-orange"
                      >
                        Get the Rotopass bundle
                      </Link>
                    </div>
                    <div className="text-[16px] lg:text-[30px] font-bold leading-[50px] -tracking-[0.3px] font-arupala text-black flex justify-center lg:justify-start items-end">
                      <div>For only $0.27 per day!</div>
                      <div className="pb-4 hidden lg:inline">
                        <Image
                          src={"/svgs/arrow.svg"}
                          alt="arrow"
                          width={68}
                          height={75}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-auto min-w-[200px] relative">
                  <Image
                    src="/images/MB.png"
                    alt="mb"
                    width={238}
                    height={478}
                    className="absolute right-0 bottom-0 [transform:rotateY(180deg)] hidden lg:block min-w-[238px] h-[478px] object-contain"
                  />
                </div>
              </div>
              <div className="relative text-center hidden lg:block">
                <svg
                  width="full"
                  height="146"
                  viewBox="0 0 1202 146"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="max-w-full w-full hidden lg:block"
                >
                  <path
                    d="M0 0H1202L1148.58 73L1202 146H0L53.4222 73L0 0Z"
                    fill="#D9D9D9"
                  ></path>
                </svg>
                <div
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-[50px] font-bold tracking-[7.5px] font-arupala text-[#063b42] whitespace-nowrap"
                  style={{ textShadow: "6px 6px 5px rgba(0, 0, 0, 0.25)" }}
                >
                  THE ROTOPASS BUNDLE
                </div>
              </div>
            </section>
            <section className="min-h-[300px] relative mb-4">
              <AdvertiseCarousel />
              <div className="flex flex-wrap mx-0 mb-4 justify-center">
                <div className="w-auto">
                  <Link
                    href={"/pricing"}
                    className="inline-block font-medium px-[22px] py-[18px] font-arupala text-center cursor-pointer text-[#e9522a] hover:bg-[#e9522a] hover:!text-white border border-[4px] border-[#e9522a] transition-colors duration-300 active-boxshadow-orange"
                  >
                    Get the Rotopass bundle
                  </Link>
                </div>
              </div>
            </section>
            <section className="mb-4">
              <div className="flex flex-wrap mx-0 justify-center">
                <div className="w-full lg:w-1/2 text-right relative p-2">
                  <img
                    src="/images/rotopass-flplus.png"
                    alt="Rotopass FL+"
                    className="mb-4 max-w-full h-auto object-fit"
                  />
                </div>
                <div className="w-full lg:w-1/2 mt-4 lg:mt-0 flex flex-col p-2">
                  <div className="mb-3">
                    <Image
                      src={"/svgs/radio-checked.svg"}
                      alt="radio"
                      width={30}
                      height={31}
                    />
                  </div>
                  <div className="mb-3 font-arupala font-bold leading-[40px] text-[40px] text-black">
                    Here's what's new with the Rotopass bundle
                  </div>
                  <div className="text-[20px] leading-[29px]">
                    <div className="mb-3">
                      Outside of the awesome information you receive from
                      Footballguys, Rotoviz, 4for4, DLF, the Fantasy Life
                      Newsletter and of course the six free months of Peacock
                      streaming, we have added FantasyLife+ Tier 1 to the
                      RotoPass bundle.
                    </div>
                    <div className="mb-3">
                      FantasyLife+ Tier 1 is a $40 value that consists of
                      Fantasy Life's Premium Rankings tool, which allows users
                      to sync their league (or create their own scoring system)
                      so that rankings update and reflect their exact league
                      settings. Fantasy Life also provides 20+ pre-built
                      rankings sets.
                    </div>
                    <div className="mb-3">
                      It also includes full access to Draft Champion (a next
                      generation, AI fueled, mock draft simulator), Rate My
                      Draft, Start/Sit tool Keeper tool, Waiver tool, and a lot
                      more. With Draft Champion, you will be able to build draft
                      strategies based on your league settings and add "draft
                      traits" to mimic how your league mates actually draft.
                    </div>
                  </div>
                  <div className="mt-auto">
                    <Link
                      href={"/pricing"}
                      className="block lg:inline-block px-[22px] py-[18px] font-arupala text-center cursor-pointer text-[#e9522a] hover:bg-[#e9522a] hover:!text-white border border-1 border-[#e9522a] transition-colors duration-300 active-boxshadow-orange"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </section>
            <section className="mb-4">
              <div className="flex flex-wrap justify-center mb-4">
                <h4 className="w-full lg:w-2/3 text-left lg:text-center !text-[40px] lg:!text-[50px] font-bold text-shadow">
                  Arm yourself with the tools you need to succeed
                </h4>
              </div>
              <div className="flex flex-wrap justify-center mb-4">
                <h4 className="w-full lg:w-2/3 text-left lg:text-center !text-[26px] lg:!text-[30px] font-bold leading-[37px] lg:leading-[50px] text-[#e9522a]">
                  RANKINGS, PROJECTIONS, DRAFT HELP & MORE...
                </h4>
              </div>
              <div className="flex flex-wrap justify-center mb-4">
                <div className="w-full lg:w-1/2 text-left lg:text-center text-[20px] font-medium leading-[32px]">
                  Get exclusive access to College Football, College Basketball,
                  NHL, UFC, MLB, Soccer, & PGA events!
                </div>
              </div>
              <div className="flex flex-wrap justify-center mb-4 relative">
                <img
                  src="/images/tools-grid.png"
                  alt="Tools you need to succeed"
                  className="object-cover max-w-full h-full mx-auto"
                />
              </div>
              <div className="flex flex-wrap justify-center mb-4 relative">
                <Link
                  href={"/pricing"}
                  className="inline-block w-full lg:w-2/3 font-medium px-[22px] py-[18px] font-arupala text-center cursor-pointer text-[#e9522a] hover:bg-[#e9522a] hover:!text-white border border-[4px] border-[#e9522a] transition-colors duration-300 active-boxshadow-orange"
                >
                  Learn More
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
      <section className="bg-black flex flex-col items-center py-4">
        <img src="/images/rp-logo.png" alt="logo" />
        <div className="text-shadow font-arupala text-white text-[50px] text-center font-bold leading-[50px] my-4">
          It's time to <span className="italic">up your game.</span>
        </div>
        <div className="my-4">
          <Link
            href="/pricing"
            className="cursor-pointer font-semibold px-[22px] py-[18px] text-center !text-white font-arupala bg-[#e9522a] hover:bg-[#d73e16] focus:bg-[#cb3b15] text-[26px] w-full block transitions-color duration-300 active-boxshadow-orange"
          >
            I'M READY. LET'S GO.
          </Link>
        </div>
      </section>
    </div>
  );
}
