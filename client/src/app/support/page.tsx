export default function SupportPage() {
  return (
    <div className="rp-container !py-6 mx-auto">
      <div className="pt-4 mb-6 justify-center flex flex-wrap mx-0">
        <div className="w-full md:w-5/6 lg:w-2/3">
          <section>
            <h1 className="text-center">Customer Support</h1>
            <p>&nbsp;</p>
            <p>
              For inquiries regarding the{" "}
              <a href="https://rotopass.com" className="text-[#e9522a]">
                rotopass.com
              </a>{" "}
              site or your{" "}
              <a href="https://rotopass.com" className="text-[#e9522a]">
                rotopass.com{" "}
              </a>
              account:
              <br />
              Email us at{" "}
              <a href="mailto:support@rotopass.com" className="text-[#e9522a]">
                support@rotopass.com
              </a>{" "}
              - We usually respond relatively quickly.
            </p>
            <p>
              For questions regarding one of the individual sites in RotoPass,
              contact them directly below:
            </p>
            <p>
              Sharp Football -{" "}
              <span className="bg-white text-gray-900">Email </span>
              <a
                className="text-[#e9522a]"
                href="mailto:support@sharpfootballanalysis.com"
                target="_blank"
              >
                support@sharpfootballanalysis.com
              </a>
            </p>
            <p>
              FootballGuys -{" "}
              <a
                className="text-[#e9522a]"
                href="https://sportsguys.zendesk.com/hc/en-us/sections/360008892513-Rotopass"
                target="_blank"
              >
                Help Desk
              </a>
            </p>
            <p>
              Rotoviz - Email{" "}
              <a href="mailto:rotovizmain@gmail.com" className="text-[#e9522a]">
                rotovizmain@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
