"use client";
import * as Accordion from "@radix-ui/react-accordion";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useState } from "react";

const accordionItems = [
  {
    value: "peacock",
    title: "PEACOCK",
    content: `Peacock is now a part of the RotoPass bundle. When you purchase RotoPass, you get a free six month subscription to Peacock, which renews every year with your RotoPass bundle renewal. With Peacock, you get access to the most live sports of any streaming service including the exclusive Friday night NFL game from Brazil. You also get access to Matthew Berry's Fantasy Football Happy Hour and Fantasy Football Pregame shows. Get your college football fix with Big Ten Saturday Night plus, watch live events from the PGA Tour, IndyCar, WWE, and check out the action from across the pond with Premier League soccer. Redeem your offer today for this and so much more. Limited time offer. $5.99/mo. or then-current retail price (plus tax) after offer ends. Cancel anytime. Eligibility restrictions and terms apply.`,
  },
  {
    value: "footballguys",
    title: "FOOTBALL GUYS",
    content: (
      <>
        <p>
          Win More At Fantasy Football with your exclusive Footballguys PRO
          premium subscription tailored for redraft leagues. Led by FSWA Hall of
          Famer and Value Based Drafting innovator Joe Bryant, Footballguys and
          their team of more than 80 paid analysts are on your sideline and in
          your headset year-round.
        </p>
        <p>
          Your team, your league, your rules. Unlock deeply-customized advice by
          importing ALL your online leagues, just once. They'll stay synced up
          all season and you'll see what a difference thoughtfully-adapted
          advice makes.
        </p>
        <p>
          Leverage that insight during your draft with the Draft Dominator App,
          which includes Custom Cheatsheets and Footballguys legendary Rate My
          Team analysis. Crush your leagues in-season with the League Dominator
          App. Both apps are available on your choice of platforms or in your
          web browser.
        </p>
        <p>
          You'll also unlock personalized Expert Rankings for your draft and for
          each week during the regular season and postseason. Plus weekly
          rest-of-season Expert Rankings through the fantasy playoffs.
        </p>
        <p>
          Combine all that with frequent redraft strategy features during the
          preseason, more than fifty(!) weekly columns during the regular
          season, the internet's most popular fantasy football newsletter
          delivered daily, and a FREE entry into the epic Footballguys
          Subscriber Contest?
        </p>
        <p>Welcome to the Footballguys Family.</p>
      </>
    ),
  },
  {
    value: "fantasylife",
    title: "FANTASY LIFE",
    content: (
      <>
        <p>
          FantasyLife+ is the NEW way to take your game to the next level. Led
          by the godfather of Fantasy Football - Matthew Berry, our team of
          experts deliver the highest quality of fantasy and betting content
          found on the internet. Cultivating a vibrant fantasy and sports
          betting community, Fantasy Life delivers users unparalleled tools,
          content, data, projections, and rankings through FantasyLife+. Your
          RotoPass subscription gets you access to FantasyLife+ Tier 1.
        </p>
        <p>&nbsp;</p>
      </>
    ),
  },
  {
    value: "4for4",
    title: "4 FOR 4",
    content: (
      <>
        <p>
          If there's one thing that we've learned in our decades of experience
          playing fantasy football, it's that consistently accurate preseason
          and in-season rankings are the foundation for success. 4for4 is home
          to the most accurate fantasy football rankings since 2010. Our
          rankings guru, John Paulsen, was named The Most Accurate Fantasy
          <br />
          &nbsp;
        </p>
        <p>
          Football Expert by FantasyPros in 2010 and 2014 and was the runner-up
          in 2011 and 2019. In 2012, 2015, 2017, and 2020 he finished in the top
          four. Our forecasting process places emphasis on offensive tendencies,
          strength of schedule, and player talent via predictive modeling.
        </p>
        <p>
          This process allows us to effectively deliver fantasy football results
          that are measurable, objective, and consistently replicated, and our
          success in the various accuracy studies only confirms that we're good
          at what we do. By becoming a subscriber, you'll be able to draft and
          manage your team with the confidence that you'll have the most
          consistently accurate rankings at your disposal.
        </p>
      </>
    ),
  },
  {
    value: "dlf",
    title: "DYNASTY LEAGUE FOOTBALL",
    content:
      "Dynasty League Football is the leading source for dynasty fantasy football news and analysis. Since 2006 DLF has been helping team managers dominate their dynasty leagues. With year-round articles, rankings, and industry defining ADP data you will have the resources you need to understand the ever-changing dynasty fantasy football market. The Dynasty Trade Analyzer will help you optimize your trade offers, and the Dynasty Mock Draft tool will help you prepare for your startup and rookie drafts. On top of all of that, the Podcasts, YoutTube videos, the DLF Forum and numerous data analytics tools provide the advantage you will not find on any other dynasty resource. At Dynasty League Football, there is no off-season!",
  },
  {
    value: "rotoviz",
    title: "ROTOVIZ",
    content:
      "RotoViz is the home to Zero RB, and while their signature strategy crushed in 2020, that’s far from the only thing you’ll learn with contingency-based drafting. The RotoViz analysts again racked up the Main Event titles last season, deploying the same research and analysis in high stakes drafts that we provide to readers. RotoViz also offers 33 industry-leading tools to help you dominate redraft, dynasty, and best ball formats. Dave Caban’s Range of Outcomes tool supercharges your redraft prep, helping you buy upside while limiting risk. Blair Andrews’ Win the Flex app teaches you how to exploit ADP flaws through your draft. Industry-leading dynasty guru Curtis Patrick offers player picks and strategy seminars. He’ll change the way you think about team building. Plus, get high-stakes champion Shawn Siegele’s annual Zero RB target list and land this year’s top sleeper RBs at the end of your draft.",
  },
];

export default function PartnerAccordion() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggle = (value: string) => {
    setOpenItems((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <Accordion.Root
      type="multiple"
      value={openItems}
      onValueChange={setOpenItems}
      className="w-full mx-auto font-sans"
    >
      {accordionItems.map(({ value, title, content }) => (
        <Accordion.Item key={value} value={value} className="mb-4 border-none">
          <Accordion.Header className="!mb-0">
            <Accordion.Trigger
              className="w-full bg-[#00313c] font-arupala text-[30px] text-white px-4 py-4 text-base font-bold uppercase flex justify-between items-center transition-colors hover:bg-[#004c5a] focus:outline-none"
              onClick={() => toggle(value)}
            >
              {title}
              <span className="text-2xl leading-none">
                {openItems.includes(value) ? (
                  <MinusCircle width={32} height={32} />
                ) : (
                  <PlusCircle width={32} height={32} />
                )}
              </span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="accordion-content">
            <div className="bg-[#eeeeee] text-[#333] px-4 py-4">{content}</div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
