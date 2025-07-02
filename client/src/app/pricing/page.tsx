import Button from "@/components/common/Button";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

export default function PricingPage() {
  return (
    <div className="container py-6 mx-auto">
      <div className="pt-6 mb-6 justify-center flex">
        <div className="w-full md:w-5/6 lg:w-2/3">
          <section className="mb-6">
            <h1 className="text-center !text-[50px] leading-[77px] -tracking-[0.5px] text-[#1d1e1f] mb-6">
              Unlock your Fantasy Football winning Potential
            </h1>
            <h2 className="text-center text-shadow !text-[30px] leading-[59px] tracking-[8px] italic text-[#1d1e1f] mb-6">
              Here's How
            </h2>
          </section>
          <section className="mb-6">
            <div className="border-[2px] p-4 border-[#063b42] bg-[#d9d9d9]">
              <img
                src="/images/rp-logo.png"
                alt="rp-logo"
                className="text-center mx-auto mb-4 block"
              />
              <h3 className="text-center font-bold leading-[1.2] mb-2 not-italic">
                The Rotopass Bundle
              </h3>
              <div className="flex justify-center mb-4">
                <ul className="mb-4 px-10">
                  <li className="flex items-center text-[16px] leading-[30px] -tracking-[0.3px] pl-1">
                    <FaStar className="text-[#e9522a] mr-2" />
                    <span className="text-[#1d1e1f] font-medium">
                      12 Months of FULL ACCESS to Content
                    </span>
                  </li>
                  <li className="flex items-center text-[16px] leading-[30px] -tracking-[0.3px] pl-1">
                    <FaStar className="text-[#e9522a] mr-2" />
                    <span className="text-[#1d1e1f] font-medium">
                      Hand selected by Matthew Berry
                    </span>
                  </li>
                  <li className="flex items-center text-[16px] leading-[30px] -tracking-[0.3px] pl-1">
                    <FaStar className="text-[#e9522a] mr-2" />
                    <span className="text-[#1d1e1f] font-medium">
                      Top Industry Analytics & Tools
                    </span>
                  </li>
                  <li className="flex items-center text-[16px] leading-[30px] -tracking-[0.3px] pl-1">
                    <FaStar className="text-[#e9522a] mr-2" />
                    <span className="text-[#1d1e1f] font-medium">
                      And SO much more
                    </span>
                  </li>
                </ul>
              </div>
              <div className="mb-3 flex justify-center hidden lg:flex flex-wrap">
                <div className="w-1/2 md:w-1/3 lg:w-1/4 mb-6 px-[7.5px]">
                  <img
                    src="/images/slide1.png"
                    alt="peacock"
                    className="mx-auto max-w-full h-[50px]"
                  />
                </div>
                <div className="w-1/2 md:w-1/3 lg:w-1/4 mb-6 px-[7.5px]">
                  <img
                    src="/images/slide2.png"
                    alt="peacock"
                    className="mx-auto max-w-full h-[50px]"
                  />
                </div>
                <div className="w-1/2 md:w-1/3 lg:w-1/4 mb-6 px-[7.5px]">
                  <img
                    src="/images/slide3.png"
                    alt="peacock"
                    className="mx-auto max-w-full h-[50px]"
                  />
                </div>
                <div className="w-1/2 md:w-1/3 lg:w-1/4 mb-6 px-[7.5px]">
                  <img
                    src="/images/slide4.png"
                    alt="peacock"
                    className="mx-auto max-w-full h-[50px]"
                  />
                </div>
                <div className="w-1/2 md:w-1/3 lg:w-1/4 mb-6 px-[7.5px]">
                  <img
                    src="/images/slide5.png"
                    alt="peacock"
                    className="mx-auto max-w-full h-[50px]"
                  />
                </div>
                <div className="w-1/2 md:w-1/3 lg:w-1/4 mb-6 px-[7.5px]">
                  <img
                    src="/images/slide6.png"
                    alt="peacock"
                    className="mx-auto max-w-full h-[50px]"
                  />
                </div>
              </div>
              <h3 className="!text-[40px] text-center font-bold leading-[50px] -tracking-[0.4px] mb-4">
                Bundle Worth over $380
              </h3>
              <div className="text-[20px] text-center font-bold leading-[50px] -tracking-[0.2px] mb-4 font-arupala">
                for only
              </div>
              <div className="text-[80px] text-center font-bold leading-[50px] tracking-[7.2px] mb-4 font-arupala text-[#00a8e8]">
                $99.99
              </div>
              <div className="text-[20px] text-center font-bold leading-[50px] -tracking-[0.2px] mb-4 font-arupala">
                That's just $0.27 cents per day!
              </div>
            </div>
          </section>
          <section className="mb-6">
            <h5 className="text-center text-[20px] font-bold mb-4">
              Get your 12 MONTHS of ACCESS to the Rotopass Bundle
            </h5>
            <div className="text-center mb-4">
              Subscription starts the day you purchase and lasts for 12 months,
              regardless of when you purchase.
            </div>
            <div className="text-center">
              <Link href={"login?redirect=/pricing"}>
                <Button
                  className="bg-[#e9522a] hover:bg-[#d73e16] text-white"
                  text="Please Login/Register before purchasing"
                  isFullWidth={false}
                />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
