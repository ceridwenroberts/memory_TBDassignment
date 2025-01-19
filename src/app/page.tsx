"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "../components/Header";
import NewGameButton from "@/components/NewGameButton";
import Highscore from "@/components/Highscore";
import Footer from "../components/Footer";
import cardsData from "@/data/cardsData.json";
import { CardType } from "@/lib/types";
import { cardShuffler } from "@/util/cardShuffler";

export default function Home() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [paired, setPaired] = useState<string[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [moves, setMoves] = useState<number>(0);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [highscore, setHighscore] = useState<number>(0);
  const [highscoreName, setHighscoreName] = useState<string>("");
  const [currentHighscore, setCurrentHighscore] = useState<number>(0);

  useEffect(() => {
    newCards();
    getStoredHighscore();
  }, []);

  const newCards = (): void => {
    const shuffledCards = cardShuffler(cardsData);
    setCards(shuffledCards);
  };

  const getStoredHighscore = (): void => {
    const storedName = localStorage.getItem("name");
    if (storedName) setHighscoreName(storedName);
    const highscoreData = localStorage.getItem("highscore");
    if (highscoreData) {
      setCurrentHighscore(JSON.parse(highscoreData));
    }
  };

  const newRound = (): void => {
    setMoves(0);
    setFlipped([]);
    setPaired([]);
    newCards();
  };

  const updateNewHighscore = (moves: number, nameQuery: string) => {
    setHighscore(moves);
    localStorage.setItem("highscore", JSON.stringify(moves));
    setHighscoreName(nameQuery);
    setShowForm(false);
    newRound();
  };

  const handleOnClick = (card: CardType, index: number) => {
    if (flipped.length === 2 || paired.includes(card.name)) return;
    const moveCount = moves + 1;
    setMoves(moveCount);
    if (flipped.length === 0) {
      setFlipped([index]);
    } else {
      setFlipped((prev: number[]): number[] => [...prev, index]);

      setTimeout(() => {
        const [firstIndex, secondIndex] = flipped;

        if (cards[firstIndex].name === card.name) {
          paired ?
            setPaired((prev: string[]): string[] => [
              ...prev,
              cards[firstIndex].name,
              cards[index].name,
            ])
          : setPaired([cards[firstIndex].name, cards[index].name]);
        }
        setFlipped([]);
        const moveCount = moves + 1;
        setMoves(moveCount);
      }, 1000);
    }
  };

  useEffect(() => {
    if (paired.length === 12) {
      if (moves < highscore) {
        setShowForm(true);
      }
    }
  }, [paired]);

  return (
    <>
      <Header />
      <main className="mx-auto w-full h-full flex flex-col">
        <div
          className={`container grid grid-cols-4 max-w-xl place-items-center gap-1 sm:gap-2 lg:gap-5 m-auto p-2 sm:p-5 `}
        >
          {cards.map((card: CardType, index: number) => {
            const isPaired = paired.includes(card.name);
            return (
              <div
                key={index}
                onClick={() => handleOnClick(card, index)}
                className={`w-full aspect-square border border-1 rounded-md bg-slate-100 border-black grid place-items-center ${disabled ? "cursor-not-allowed pointer-events-none" : ""} ${isPaired && "opacity-50 transition-opacity duration-500"}`}
                data-testid="card"
              >
                {flipped.includes(index) || paired.includes(card.name) ?
                  <div data-testid="card-image">
                    <Image
                      src={card.imgSrc}
                      width={500}
                      height={500}
                      alt={card.name}
                    />
                  </div>
                : <div>
                    <p className="text-4xl sm:text-5xl md:text-7xl ">?</p>
                  </div>
                }
              </div>
            );
          })}
        </div>
        <div className="flex justify-around w-full py-6 px-4 text-sm leading-6">
          <div className="flex flex-col place-items-center">
            <p>Moves</p>
            <p data-testid="moves">{moves}</p>
          </div>
          <NewGameButton
            data-testid="new-game-btn"
            newRound={newRound}
            paired={paired}
          />
          <div className="flex flex-col place-items-center">
            <p>Highscore</p>

            <div className="inline-flex gap-1">
              {highscoreName ?
                <>
                  {" "}
                  <p data-testid="highscore-name">{`${highscoreName}:`}</p>
                  <p data-testid="highscore">{highscore}</p>
                </>
              : <>
                  <p>0</p>
                </>
              }
            </div>
          </div>
        </div>
        {showForm && (
          <Highscore
            updateNewHighscore={(nameQuery) =>
              updateNewHighscore(moves, nameQuery)
            }
          />
        )}
      </main>
      <Footer />
    </>
  );
}
