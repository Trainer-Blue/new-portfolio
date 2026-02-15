
import React from "react";
import { PORFOLIO_DATA } from "../data/portfolio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const HeroSection = () => {
  const { hero } = PORFOLIO_DATA;
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 md:gap-4 text-left">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-5xl/none bg-clip-text">
            Hi, I'm Ishan Siddhartha
          </h1>
          <p className="max-w-200 text-sm text-muted-foreground">
            {hero.bio}
          </p>
        </div>
        <Avatar className="size-25 md:size-28 border-3 border-foreground">
          <AvatarImage alt={hero.name} src="/profile4.jpg" />
          <AvatarFallback>{hero.name[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <h2 className="text-xl font-bold">About</h2>
        <div className="text-muted-foreground text-pretty font-sans text-sm mt-2 space-y-3">
          <p>
            I've loved diving into different fields and studies ever since I can remember. Not to prove anything to anyone, but simply because I have this{" "}
            <span className="font-semibold text-foreground underline decoration-foreground/30 underline-offset-4">
              fuel burning inside of me constantly
            </span>
            {" "}this desire to build and to gain an understanding of various things. I have never not loved what I do, and I don't think I ever will.
          </p>
          <p>
            Before, this energy, desire, and passion were scattered everywhere, from arts like paper crafts, singing, and sketching to electronics, computers, and beyond. But along the way, I have learned, and am still learning,{" "}
            <span className="font-semibold text-foreground underline decoration-foreground/30 underline-offset-4">
              the art of discipline
            </span>
            : aligning myself to compound my efforts and energy.
          </p>
          <p>
            I have been doing this by taking on a difficult task: trying to{" "}
            <span className="font-semibold text-foreground underline decoration-foreground/30 underline-offset-4">
              become a good engineer
            </span>{" "}
            and pouring my everything into this field. The journey so far has been painful but so fun.
          </p>
          <p>
            People ask me how I do it, and I don't know how to convey to them that{" "}
            <span className="font-semibold text-foreground underline decoration-foreground/30 underline-offset-4">
              I just want it so bad
            </span>
            {" "}and it's so fun to chase something you care about, to explore and master various things, to experience life to its utmost extent.
          </p>
          <p>
            And along the way realized that finding something you're passionate about isn't about being born with "talent" or expertise. It's about{" "}
            <span className="font-semibold text-foreground underline decoration-foreground/30 underline-offset-4">
              building yourself, brick by brick
            </span>
            , to a level of mastery where it becomes inevitable that your art, your life, flows through you.
          </p>
        </div>
      </div>
    </div>
  );
};
