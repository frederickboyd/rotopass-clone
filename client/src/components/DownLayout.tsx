import Image from "next/image";
import Link from "next/link";

const DownLayout = () => {
  return (
    <div className="p-6 bg-[#063b42]">
      <div className="flex flex-col-reverse lg:flex-row mx-0 py-4 justify-center">
        <div className="max-w-full w-auto">
          <Image
            src={"/images/rp-logo.png"}
            alt="Logo"
            className="w-[300px] h-[135px] object-contain mx-auto mb-4"
            width={300}
            height={135}
          />
          <div className="text-[#f0f0f0] text-[9px] leading-[21.5px] text-center">{`© ${new Date().getFullYear()} Rotopass, All rights reserved`}</div>
        </div>
        <div className="flex-1 max-w-full">
          <div className="flex flex-wrap mx-0 justify-center">
            <div className="w-full md:w-1/6 mb-4 md:mb-0 text-center md:text-left px-2">
              <h2 className="!mb-3">
                <Link
                  href="/pricing"
                  className="!text-white text-shadow text-[20px] font-bold font-arupala hover-underline"
                >
                  Join Now{" "}
                </Link>
              </h2>
              <div className="mb-2">
                <Link
                  href="/pricing"
                  className="!text-white text-shadow text-[16px] font-dm hover-underline"
                >
                  Join Rotopass{" "}
                </Link>
              </div>
              <div className="mb-2">
                <Link
                  href="/about"
                  className="!text-white text-shadow text-[16px] font-dm hover-underline"
                >
                  About Us{" "}
                </Link>
              </div>
              <div className="mb-2">
                <Link
                  href="https://www.fantasylife.com/"
                  className="!text-white text-shadow text-[16px] font-dm text-wrap whitespace-break-spaces hover-underline"
                >
                  Fantasy Life Newsletter{" "}
                </Link>
              </div>
            </div>

            <div className="w-full md:w-1/6 mb-4 md:mb-0 text-center md:text-left px-2">
              <h2 className="mb-3">
                <Link
                  href="/pricing"
                  className="!text-white text-shadow text-[20px] font-bold font-arupala hover-underline"
                >
                  The Bundle{" "}
                </Link>
              </h2>
              <div className="mb-2">
                <Link
                  href="/articles/nfl-content/peacock"
                  className="!text-white text-shadow text-[16px] font-dm hover-underline"
                >
                  Peacock{" "}
                </Link>
              </div>
              <div className="mb-2">
                <Link
                  href="https://www.fantasylife.com/"
                  className="!text-white text-shadow text-[16px] font-dm hover-underline"
                >
                  Fantasy Life{" "}
                </Link>
              </div>
              <div className="mb-2">
                <Link
                  href="/articles/nfl-content/what-is-footballguys"
                  className="!text-white text-shadow text-[16px] font-dm hover-underline"
                >
                  Football Guys{" "}
                </Link>
              </div>
              <div className="mb-2">
                <Link
                  href="/articles/nfl-content/what-is-4for4"
                  className="!text-white text-shadow text-[16px] font-dm hover-underline"
                >
                  4for4{" "}
                </Link>
              </div>
              <div className="mb-2">
                <Link
                  href="/articles/nfl-content/what-is-rotoviz"
                  className="!text-white text-shadow text-[16px] font-dm hover-underline"
                >
                  RotoViz{" "}
                </Link>
              </div>
              <div className="mb-2">
                <Link
                  href="/articles/nfl-content/what-is-dlf"
                  className="!text-white text-shadow text-[16px] font-dm hover-underline"
                >
                  Dynasty League Football{" "}
                </Link>
              </div>
            </div>

            <div className="w-full md:w-1/6 mb-4 md:mb-0 text-center md:text-left px-2">
              <h2 className="!mb-3">
                <Link
                  href="/articles/nfl-content/16-reasons-to-buy"
                  className="!text-white text-shadow text-[20px] font-bold font-arupala hover-underline"
                >
                  Why Buy{" "}
                </Link>
              </h2>
              <div className="mb-2">
                <Link
                  href="/pricing"
                  className="!text-white text-shadow text-[16px] font-dm hover-underline"
                >
                  The Best Bundle{" "}
                </Link>
              </div>
              <div className="mb-2">
                <Link
                  href="/articles/nfl-content/testimonials"
                  className="!text-white text-shadow text-[16px] font-dm hover-underline"
                >
                  Testimonials{" "}
                </Link>
              </div>
              <div className="mb-2">
                <Link
                  href="/articles/nfl-content/faq"
                  className="!text-white text-shadow text-[16px] font-dm hover-underline"
                >
                  FAQs{" "}
                </Link>
              </div>
            </div>

            <div className="w-full md:w-1/6 mb-4 md:mb-0 text-center md:text-left px-2">
              <h2 className="!mb-3">
                <Link
                  href="/pricing"
                  className="!text-white text-shadow text-[20px] font-bold font-arupala hover-underline"
                >
                  More{" "}
                </Link>
              </h2>
              <div className="mb-2">
                <Link
                  href="/terms"
                  className="!text-white text-shadow text-[16px] font-dm hover-underline"
                >
                  Terms of Service{" "}
                </Link>
              </div>
              <div className="mb-2">
                <Link
                  href="/privacy"
                  className="!text-white text-shadow text-[16px] font-dm hover-underline"
                >
                  Privacy{" "}
                </Link>
              </div>
              <div className="mb-2">
                <Link
                  href="/support"
                  className="!text-white text-shadow text-[16px] font-dm hover-underline"
                >
                  Support{" "}
                </Link>
              </div>
              <div className="mb-2">
                <Link
                  href="/articles/nfl-content/troubleshooting"
                  className="!text-white text-shadow text-[16px] font-dm hover-underline"
                >
                  Troubleshooting{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownLayout;
