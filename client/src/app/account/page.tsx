"use client";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AccountPage() {
  const { user } = useAuth();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (!user.id && path === "/account") {
      router.push("/login");
    }
  }, [user.id, router]);

  return (
    <div className="bg-[url('/images/gridbg.png')] bg-cover bg-no-repeat bg-blend-luminosity bg-gray-800">
      <div className="container py-6 mx-auto">
        <div className="pt-4 mb-6 justify-center flex flex-wrap mx-0">
          <div className="w-full md:w-5/6 lg:w-2/3">
            <div
              className="backdrop-blur-md p-4 border border-white"
              style={{
                background:
                  "linear-gradient(134deg, rgba(244, 244, 244, 0.40) 0%, rgba(244, 244, 244, 0.20) 100%)",
              }}
            >
              <div className="text-[40px] font-bold tracking-[.5px] uppercase mb-4">
                <div className="w-full p-4 text-white bg-[#063b42] font-arupala">
                  {user.first_name}'s dashboard
                </div>
              </div>
              <div className="flex items-stretch">
                <div className="max-w-full p-6 bg-white">
                  <h2>
                    <a href="/pricing">Join Now</a> to get access to all our
                    great partners!
                  </h2>
                  <p>
                    If you already have an account please{" "}
                    <a href="mailto:support@rotopass.com">contact support</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
