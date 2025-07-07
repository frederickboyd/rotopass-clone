"use client";
import Button from "@/components/common/Button";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import BraintreeDropIn from "@/components/BraintreeDropIn";
import { Dropin } from "braintree-web-drop-in";
import { useRouter } from "next/navigation";

export default function PricingPage() {
  const { user, setExpiredDate, setIsExpired } = useAuth();
  const router = useRouter();
  const isAuthenticated = !!user.id;
  const [clientToken, setClientToken] = useState<string>("");
  const [instance, setInstance] = useState<Dropin | null>(null);
  const [termsError, setTermsError] = useState<boolean>(false);
  const fetchClientToken = async () => {
    try {
      const response = await api.get("/payments/client-token");
      if (response.status === 200) {
        setClientToken(response.data.clientToken);
      }
    } catch (error) {
      console.error("Error fetching client token:", error);
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const termsChecked = (form.elements.namedItem("terms") as HTMLInputElement)
      .checked;
    if (!termsChecked) {
      setTermsError(true);
      return;
    } else {
      setTermsError(false);
    }

    if (!instance) return;
    try {
      const payload = await instance.requestPaymentMethod();
      const response = await api.post("/payments/checkout", {
        nonce: payload.nonce,
      });

      if (response.status === 200) {
        setExpiredDate(new Date(response.data.expiredDate));
        setIsExpired(response.data.expired);
        alert("Payment successful! Thank you for your purchase.");
        router.push("/account");
        // Optionally, redirect to a success page or update UI
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (err) {
      console.error("Payment method error:", err);
      alert("Payment failed. Please try again.");
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchClientToken();
  }, [isAuthenticated]);
  return (
    <div className="rp-container !py-6 mx-auto">
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
              <h3 className="text-center font-bold leading-[1.2] !mb-2 not-italic">
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
              <h3 className="!text-[40px] text-center font-bold leading-[50px] -tracking-[0.4px] !mb-4">
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
            <h5 className="text-center text-[20px] font-bold !mb-4">
              Get your 12 MONTHS of ACCESS to the Rotopass Bundle
            </h5>
            <div className="text-center mb-4">
              Subscription starts the day you purchase and lasts for 12 months,
              regardless of when you purchase.
            </div>
            {!isAuthenticated && (
              <div className="text-center">
                <Link href={"/auth/login?redirect=/pricing"}>
                  <Button
                    className="bg-[#e9522a] hover:bg-[#d73e16] focus:bg-[#cb3b15] text-white active-boxshadow-orange"
                    text="Please Login/Register before purchasing"
                    isFullWidth={false}
                  />
                </Link>
              </div>
            )}
            <form onSubmit={handlePayment} noValidate>
              {isAuthenticated && (
                <div className="bg-[#F3F3F3] p-6">
                  {clientToken && isAuthenticated && (
                    <div className="mb-4">
                      <BraintreeDropIn
                        clientToken={clientToken}
                        setInstance={setInstance}
                        instance={instance}
                      />
                    </div>
                  )}
                  {isAuthenticated && (
                    <>
                      <div className="flex items-center mb-3">
                        <div className="rounded-lg px-2 py-4 bg-white mr-4">
                          <img
                            src="/images/rp-logo.png"
                            alt="rp_logo"
                            className="h-[25px]"
                          />
                        </div>
                        <div className="mr-auto">
                          <div className="text-[14px] leading-[14px]">
                            Rotopass Bundle
                          </div>
                          <div className="text-[12px] leading-[14px] text-[#6c757d]">
                            12 Month Access
                          </div>
                        </div>
                        <div>$99.99</div>
                      </div>
                      <hr className="border border-black/10" />
                      <div className="mb-3">
                        <div className="mb-2 items-center flex">
                          <div className="text-[14px] mr-auto">Subtotal</div>
                          <div className="text-[14px]">$99.99</div>
                        </div>
                        <hr className="border border-black/10" />
                        <div className="mb-2 items-center flex">
                          <div className="text-[16px] mr-auto font-medium">
                            Total
                          </div>
                          <div>
                            <div className="text-[12px] text-[#6c757d] inline-block mr-1">
                              USD
                            </div>
                            <div className="text-[24px] font-medium inline-block">
                              $99.99
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div>
                          <input
                            type="checkbox"
                            name="terms"
                            id="terms-cbx"
                            className="mr-1.5"
                            required
                          />
                          <label
                            className={`mb-2 ${termsError ? "text-red-500" : "text-black"
                              }`}
                            htmlFor="terms-cbx"
                          >
                            By checking this box, you indicate that you
                            understand the following Terms:
                          </label>
                        </div>
                        <div className="text-[12px]">
                          <p>
                            <span className="font-bold">ONE:</span> You
                            understand and agree to our NO REFUND POLICY. The
                            information within these sites is very valuable and
                            provides a significant edge for fantasy sports with
                            a very specific shelf life. Based on this fact and
                            per the policies of some of our partner sites, we
                            have a NO REFUND POLICY! Thanks for understanding.
                          </p>
                          <p>
                            <span className="font-bold">TWO:</span> You agree to
                            the RotoPass <a href="/terms">Terms of Use</a> and
                            have read and understand the RotoPass{" "}
                            <a href="/privacy">Privacy Policy</a>. Your
                            submission of this form will constitute your consent
                            to the collection and use of this information by
                            RotoPass. You also agree to receive required
                            administrative notices about your account
                            electronically.
                          </p>
                          <p>
                            <span className="font-bold">THREE:</span> You
                            acknowledge that RotoPass is a site that features
                            advice for season long fantasy football and that for
                            many sites DFS advice and tools are an extra cost.
                            You also have checked out the front page to know the
                            current roster of sites included in RotoPass as
                            there has been some change.
                          </p>
                          <p>
                            <span className="font-bold">FOUR:</span> You
                            acknowledge that by signing up for RotoPass your are
                            opting in to receive the Fantasy Life Newsletter
                          </p>
                        </div>
                      </div>
                      <Button
                        className="bg-[#00a8e8] hover:bg-[#008cc2] focus:bg-[#0083b5] text-white active-boxshadow-blue"
                        text="Pay Now"
                        isFullWidth
                        disabled={!isAuthenticated || !clientToken}
                        type="submit"
                      />
                    </>
                  )}
                </div>
              )}
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
