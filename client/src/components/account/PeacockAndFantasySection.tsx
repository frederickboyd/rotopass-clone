"use client";
import { useState } from "react";
import Button from "@/components/common/Button";
import api from "@/lib/api";

export default function PeacockAndFantasySection() {
  const [peacockCode, setPeacockCode] = useState<string | null>(null);
  const [peacockLoading, setPeacockLoading] = useState(false);
  const [flLoading, setFlLoading] = useState(false);

  const handleGetPeacockCode = async () => {
    try {
      setPeacockLoading(true);
      const res = await api.get("/peacock/my-code");
      setPeacockCode(res.data.code);
    } catch (err) {
      alert("Failed to retrieve Peacock code.");
    } finally {
      setPeacockLoading(false);
    }
  };

  const openPeacockPage = () => {
    if (peacockCode) {
      const peacockUrl = `https://www.peacocktv.com/rotopass?voucher[]=${peacockCode}`;
      window.open(peacockUrl, "_blank");
    } else {
      alert("Please retrieve your Peacock code first.");
    }
  };

  const handleGetFantasyLifeCode = async () => {
    try {
      setFlLoading(true);
      const res = await api.post("/promo/fantasylife");
      if (res.data?.url) {
        window.open(res.data.url, "_blank");
      } else {
        alert("FantasyLife code not returned.");
      }
    } catch (err) {
      alert("Failed to retrieve FantasyLife promo code.");
    } finally {
      setFlLoading(false);
    }
  };

  return (
    <>
      {/* Peacock Tile */}
      <div className="w-full md:w-1/2 lg:w-1/3 mb-4 px-2">
        <div className="bg-white flex flex-col h-[100%]">
          <div className="p-4 mb-4 text-center">
            <img
              src="/images/slide1.png"
              alt="peacock.png"
              className="max-w-full max-h-full"
            />
          </div>
          <div className="text-[#383838] p-4 px-6 my-auto leading-[20px] tracking-[.5px]">
            Six months of free access to the most live sports of any streaming
            service including NBC's Sunday Night Football, this year's exclusive
            Friday NFL Brazil game, Big Ten Saturday Night and much more.
          </div>
          <div className="p-4">
            <Button
              isFullWidth
              className="!text-[#212529] bg-[#d9d9d9] hover:bg-[#c6c6c6] focus:bg-[#c0c0c0] active-boxshadow-grey"
              text={peacockCode ? "REDEEM" : peacockLoading ? "Loading..." : "GET CODE"}
              onClick={peacockCode ? openPeacockPage : handleGetPeacockCode}
              disabled={peacockLoading}
            />
          </div>
        </div>
      </div>

      {/* FantasyLife Tile */}
      <div className="w-full md:w-1/2 lg:w-1/3 mb-4 px-2">
        <div className="bg-white flex flex-col h-[100%]">
          <div className="p-4 mb-4 text-center">
            <img
              src="/images/slide3.png"
              alt="Fantasylife"
              className="max-w-full max-h-full"
            />
          </div>
          <div className="text-[#383838] p-4 px-6 my-auto leading-[20px] tracking-[.5px]">
            Get one year of access to FantasyLife+ Tier 1 ($39.99 value) for
            free. Contact support@fantasylife.com for a special discount code to
            upgrade to tier 2.
          </div>
          <div className="p-4">
            <Button
              isFullWidth
              className="!text-[#212529] bg-[#d9d9d9] hover:bg-[#c6c6c6] focus:bg-[#c0c0c0] active-boxshadow-grey"
              text={flLoading ? "Retrieving..." : "ACCESS"}
              onClick={handleGetFantasyLifeCode}
            />
          </div>
        </div>
      </div>
    </>
  );
}