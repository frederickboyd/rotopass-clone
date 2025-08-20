"use client";
import Button from "@/components/common/Button";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import PeacockAndFantasySection from "@/components/account/PeacockAndFantasySection"; // adjust the path as needed

export default function AccountPage() {
  const { user, isExpired, expiredDate } = useAuth();
  const formattedExpiredDate = expiredDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-[url('/images/gridbg.png')] bg-cover bg-no-repeat bg-blend-luminosity bg-gray-100">
      <div className="rp-container !py-6 mx-auto">
        <div className="pt-4 mb-6 justify-center flex flex-wrap mx-0">
          <div className="w-full md:w-5/6">
            <div
              className="backdrop-blur-md p-4 border border-white"
              style={{
                background:
                  "linear-gradient(134deg, rgba(244, 244, 244, 0.40) 0%, rgba(244, 244, 244, 0.20) 100%)",
              }}
            >
              <div className="text-[24px] lg:text-[40px] font-bold tracking-[.5px] uppercase mb-4">
                <div className="w-full p-4 text-white bg-[#063b42] font-arupala">
                  {user.first_name}'s dashboard
                </div>
              </div>
              {isExpired !== false ? (
                <div className="max-w-full p-6 bg-white">
                  <h2>
                    <a href="/pricing">Join Now</a> to get access to all our
                    great partners!
                  </h2>
                  <p>
                    If you already have an account please{" "}
                    <a href="mailto:support@rotopass.com" className="hover-underline">contact support</a>
                  </p>
                </div>
              ) : (
                <>
                  <div className="bg-white p-4 mb-4">
                    {`Your subscription is comped until ${formattedExpiredDate}. Please reach out to support if you have any questions.`}
                  </div>
                  <div className="flex flex-wrap">
                    <PeacockAndFantasySection />
                    <div className="w-full md:w-1/2 lg:w-1/3 mb-4 px-2">
                      <div className="bg-white flex flex-col h-[100%]">
                        <div className="p-4 mb-4 text-center">
                          <img
                            src="/images/slide2.png"
                            alt="Footballguys"
                            className="max-w-full max-h-full"
                          />
                        </div>
                        <div className="text-[#383838] p-4 px-6 my-auto leading-[20px] tracking-[.5px]">
                          Cheatsheets, rankings, projections, and so much more
                        </div>
                        <div className="p-4">
                          <Link
                            href={
                              "https://www.footballguys.com/rotopass/authentication?session_key="
                            }
                            target="_blank"
                          >
                            <Button
                              isFullWidth
                              className="!text-[#212529] bg-[#d9d9d9] hover:bg-[#c6c6c6] focus:bg-[#c0c0c0] active-boxshadow-grey"
                              text="ACCESS"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/3 mb-4 px-2">
                      <div className="bg-white flex flex-col h-[100%]">
                        <div className="p-4 mb-4 text-center">
                          <img
                            src="https://dfw06mp24knrz.cloudfront.net/rotopass/partners/rotoviz/rotoviz_logo.jpg"
                            alt="Rotoviz"
                            className="max-w-full max-h-full"
                          />
                        </div>
                        <div className="text-[#383838] p-4 px-6 my-auto leading-[20px] tracking-[.5px]">
                          Over 33 tools and content from Shawn Siegle and the
                          RotoViz team
                        </div>
                        <div className="p-4">
                          <Link
                            href={
                              "https://www.rotoviz.com/rotopass?session_key="
                            }
                            target="_blank"
                          >
                            <Button
                              isFullWidth
                              className="!text-[#212529] bg-[#d9d9d9] hover:bg-[#c6c6c6] focus:bg-[#c0c0c0] active-boxshadow-grey"
                              text="ACCESS"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="w-full md:w-1/2 lg:w-1/3 mb-4 px-2">
                      <div className="bg-white flex flex-col h-[100%]">
                        <div className="p-4 mb-4 text-center">
                          <img
                            src="/images/slide4.png"
                            alt="4for4"
                            className="max-w-full max-h-full"
                          />
                        </div>
                        <div className="text-[#383838] p-4 px-6 my-auto leading-[20px] tracking-[.5px]">
                          Take me to the most accurate rankings since 2010
                        </div>
                        <div className="p-4">
                          <Link
                            href={
                              "https://www.4for4.com/free-subscription/rotopass25?session_key="
                            }
                            target="_blank"
                          >
                            <Button
                              isFullWidth
                              className="!text-[#212529] bg-[#d9d9d9] hover:bg-[#c6c6c6] focus:bg-[#c0c0c0] active-boxshadow-grey"
                              text="ACCESS"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/3 mb-4 px-2">
                      <div className="bg-white flex flex-col h-[100%]">
                        <div className="p-4 mb-4 text-center">
                          <img
                            src="/images/slide5.png"
                            alt="Dynasty"
                            className="max-w-full max-h-full"
                          />
                        </div>
                        <div className="text-[#383838] p-4 px-6 my-auto leading-[20px] tracking-[.5px]">
                          The most indepth dynasty coverage in the industry
                        </div>
                        <div className="p-4">
                          <Link
                            href={
                              "https://dynastyleaguefootball.com/register/annual-rotopass/?coupon=ROTOPASS2025WIN&session_key="
                            }
                            target="_blank"
                          >
                            <Button
                              isFullWidth
                              className="!text-[#212529] bg-[#d9d9d9] hover:bg-[#c6c6c6] focus:bg-[#c0c0c0] active-boxshadow-grey"
                              text="ACCESS"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                    {/* 
                    <div className="w-full md:w-1/2 lg:w-1/3 mb-4 px-2">
                      <div className="bg-white flex flex-col h-[100%]">
                        <div className="p-4 mb-4 text-center">
                          <img src="/images/slide3.png" alt="Fantasylife" className="max-w-full max-h-full" />
                        </div>
                        <div className="text-[#383838] p-4 px-6 my-auto leading-[20px] tracking-[.5px]">
                          Get one year of access to FantasyLife+ Tier 1 ($39.99 value) for free. Contact support@fantasylife.com...
                        </div>
                        <div className="p-4">
                          <Link href={"https://www.rotopass.com/redeem/fantasylife?session_key="} target="_blank">
                            <Button
                              isFullWidth
                              className="!text-[#212529] bg-[#d9d9d9] hover:bg-[#c6c6c6] focus:bg-[#c0c0c0] active-boxshadow-grey"
                              text="ACCESS"
                            />
                          </Link>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
