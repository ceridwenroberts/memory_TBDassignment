"use client";
import { useEffect } from "react";
import Image from "next/image";
import { CardType } from "@/types/cardType";
import cards from "@/data/cards.json";
import { cardShuffler } from "@/util/cardShuffler";

const GameBoard = () => {
  useEffect(() => {
    console.log("Client-side cards:", cards);
  }, []);

  console.log(cards);
  const shuffledCards = cardShuffler(cards);
  console.log("shuffledCards", shuffledCards);

  return (
    <div>
      {shuffledCards.map((card: CardType) => (
        <div key={card.id}>
          {card.reverse}
          {/* <Image
      src={card.imgSrc}
      width={500}
      height={500}
      alt="card.name" 
                    /> */}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
