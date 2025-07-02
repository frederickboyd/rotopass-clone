"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const AUTO_ADVANCE_INTERVAL = 3000;
const items = [
  {
    id: 1,
    text: "Get access to the exclusive Friday night NFL game in Brazil, NBC's Sunday Night Football and Matthew Berry's Fantasy Football Happy Hour plus Fantasy Football Pregame.",
    image: "/images/slide1.png",
  },
  {
    id: 2,
    text: "Anyone that has utilized knows what an invaluable resource it is. I've been a subscriber for years and can say that Footballguys was integral in my winning $100,000 in the Fantasy Football Players Championship Main Event.",
    image: "/images/slide2.png",
  },
  {
    id: 3,
    text: "The most comprehensive fantasy football tools product on the market. Your RotoPass bundle comes with FantasyLife+ Tier 1 which includes Fantasy Life's Premium Rankings Tool and their next generation mock draft simulator “Draft Champion”. ",
    image: "/images/slide3.png",
  },
  {
    id: 4,
    text: "Our rankings guru, John Paulsen, was named the Most Accurate Expert in 2010 and 2014, and has eight finishes in the Top 5 in the last twelve years, according to FantasyPros. That consistency cannot be found anywhere else.",
    image: "/images/slide4.png",
  },
  {
    id: 5,
    text: "Dynasty League Football is the premier source for dynasty fantasy football analysis. We’ve been doing this since 2006, longer than any other dynasty site around. We know what it takes to win, year after year. It’s what we do. It’s ",
    image: "/images/slide5.png",
  },
  {
    id: 6,
    text: "A treasure trove of our most insightful articles that will teach you the metrics that matter, time-tested winning strategies, the approaches that will give you an edge, and teach you how to be an effective fantasy manager.",
    image: "/images/slide6.png",
  },
];

export default function AdvertiseCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setIndex((prev) => (prev + newDirection + items.length) % items.length);
  };

  const variants = {
    enter: {
      opacity: 0.3,
    },
    center: {
      opacity: 1,
      transition: { duration: 1 },
    },
    exit: {
      opacity: 0.3,
      transition: { duration: 1 },
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      paginate(1);
    }, AUTO_ADVANCE_INTERVAL);

    return () => clearTimeout(timer);
  }, [index]);
  return (
    <div className="flex flex-wrap justify-center mx-0 mb-4">
      <Image
        src="/svgs/left-arrow.svg"
        alt="Left Arrow"
        width={98}
        height={48}
        onClick={() => paginate(-1)}
        className="w-auto mt-auto text-3xl"
      />
      <motion.div
        key={items[index].id}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        className="w-full lg:w-auto !max-w-[600px]"
      >
        <div className="w-5/6 text-center mx-auto">
          <div className="flex justify-center mb-4">
            <img
              src={`${items[index].image}`}
              alt={`Slide ${items[index].id}`}
              className="h-[70px] w-auto rounded-lg"
            />
          </div>
          <div className="mb-3 px-4 mx-4 md:px-0 md:mx-0 ">
            <p className="text-black">{items[index].text}</p>
          </div>
        </div>
      </motion.div>

      {/* Arrows */}
      <Image
        src="/svgs/left-arrow.svg"
        alt="Left Arrow"
        width={98}
        height={48}
        onClick={() => paginate(1)}
        className="w-auto mt-auto text-3xl -scale-100"
      />
    </div>
  );
}
