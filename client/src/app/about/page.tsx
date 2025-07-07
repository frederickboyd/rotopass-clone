import PartnerAccordion from "@/components/PartnerAccordion";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div>
      <div className="rp-container !py-6 mx-auto">
        <div className="pt-4 mb-6 justify-center flex flex-wrap mx-0">
          <div className="w-full md:w-5/6 lg:w-2/3">
            <h1 className="!mb-6 text-center md:text-left !text-[60px] text-shadow">
              ABOUT
            </h1>
            <h5 className="!mb-2 block md:hidden text-center text-[16px] font-bold leading-[1.2]">
              Rotopass & Matthew Berry
            </h5>
            <div className="flex flex-wrap mx-0 mb-6">
              <div className="w-auto max-w-full px-6 text-center mt-auto">
                <img
                  src="/images/MB.png"
                  alt="MB"
                  style={{
                    filter:
                      "drop-shadow(2px 4px 18px grey) drop-shadow(10px 0px 3px grey)",
                  }}
                />
              </div>
              <div className="px-[7.5px] flex-1">
                <h2 className="hidden md:block font-bold !mb-2">
                  ROTOPASS BY MATTHEW BERRY
                </h2>
                <p className="!mb-4">
                  When you buy a subscription to{" "}
                  <Link href="http://rotopass.com/" className="text-[#e9522a]">
                    rotopass.com
                  </Link>
                  , you are getting UNLIMITED access to the best premium fantasy
                  football sites on the planet for the entire football season.
                  Super easy to use - just log into RotoPass once and then every
                  site is just <strong>ONE CLICK AWAY</strong>.
                </p>
                <p className="!mb-4">
                  These sites have combined to produce over{" "}
                  <strong>
                    70 expert league titles, over 100 different writing awards
                  </strong>{" "}
                  and feature{" "}
                  <strong>TEN different FSWA Hall of Famers.</strong> They have
                  research, rankings, articles, news, updates and more. All of
                  it fully customizable for whatever format you play, including
                  line-up setting software for daily games. They have text
                  alerts, email updates, cutting edge tools and award winning
                  draft software. Whatever and however you play fantasy
                  football, if you need it, they have it. Along with 100 other
                  things you need but didn't realize until now.
                </p>
                <p className="!mb-4">
                  Not every site does everything equally well, so why you should
                  you have to choose? Now you don't have to. Created by ESPN's
                  Matthew Berry, RotoPass is an elite product for the elite
                  player. But you don't have to pay elite prices. With RotoPass,
                  the best premium football sites on the planet are available
                  for over $300 LESS than it would cost to buy them separately!
                </p>
              </div>
            </div>
            <h4 className="!mb-6">
              LEARN MORE ABOUT OUR OTHER BUNDLE PARTNERS
            </h4>
            <div>
              <PartnerAccordion />
            </div>
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
            className="cursor-pointer font-semibold px-[22px] py-[18px] text-center !text-white font-arupala bg-[#e9522a] hover:bg-[#d73e16] text-[26px] w-full block transitions-color duration-300 active-boxshadow-orange"
          >
            I'M READY. LET'S GO.
          </Link>
        </div>
      </section>
    </div>
  );
}
