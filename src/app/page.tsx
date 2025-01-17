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
import { storageManager } from "@/util/storageManager";

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
    console.log("flipped", flipped.length);
  }, [flipped])

  const updateNewHighscore = (moves: number) => {
    console.log("updatNewHighscore has been called");
    localStorage.setItem("highscore", JSON.stringify(moves));
    setShowForm(false);
  };

  const shuffledCards = cardShuffler(cardsData);

  // let currentHighscore: number = 0;
  let currentHighscoreName: string = "";
  const getStoredHighscore = () => {
    const storedName = localStorage.getItem("name");
    if (storedName) setHighscoreName(storedName);
    const highscoreData = localStorage.getItem("highscore");
    console.log("stored highscore", highscoreData);
    if (highscoreData) {
       setCurrentHighscore(JSON.parse(highscoreData));
    }
  };

  const handleMockCurrent = (): void => {
    const mockName = "bullen";
    const mockHighscore = JSON.stringify(68);
    
    localStorage.setItem("name", mockName);
    localStorage.setItem("highscore", mockHighscore);
  }

  const handleMockHighscore = (): void => {
    console.log("Mock highscore")
    setPaired(["a", "g", "r", "e", "s", "s"]);
    setMoves(18);
    const mockName = "Elin"
    localStorage.setItem("name", mockName)
    setHighscoreName(mockName);

  }
  const handleMockSolvedOnly = (): void =>{
    console.log("SolvedOnly")
  }

  const newRound = () => {
    getStoredHighscore();
    setCards(shuffledCards);
    setPaired([]);
    setMoves(0);
    setFlipped([])
  };

  //ON LOAD

  useEffect(() => {
    newRound();
  }, []);

  const handleOnClick = (card: CardType, index: number): void => {
    setMoves(moves + 1);

    if (flipped.length === 2 || paired.includes(card.name)) return;
    setFlipped((prev: number[]): number[] => [...prev, index]); //type assertion needed here?
  };

  // EVALUATE GUESS
  // useEffect(() => {
  //   if (flipped.length === 2) {
  //     // setMoves(moves + 1);

  //     const checkPair = () => {
  //  const [firstIndex, secondIndex] = flipped;
  //     if (cards[firstIndex].name === cards[secondIndex].name) {
  //       setPaired((prev: string[]): string[] => [
  //         ...prev,
  //         cards[firstIndex].name,
  //       ]);
  //       setFlipped([])
  //     }

  //     }
   
  //     setTimeout(() => {
  //       checkPair();
  //     }, 1000);
  //   }
  // }, [flipped, paired, cards]);

  useEffect(() => {
  if (flipped.length === 2) {
    const checkPair = () => {
      const [firstIndex, secondIndex] = flipped;
      if (cards[firstIndex].name === cards[secondIndex].name) {
        setPaired((prev: string[]): string[] => [
          ...prev,
          cards[firstIndex].name,
        ]);
      }
      setTimeout(() => {
        setFlipped([]); 
      }, 1000);
    };

    setTimeout(checkPair, 1000);
  }
}, [flipped, cards]);


  // CHECK WIN
  useEffect(() => {
    console.log(paired);
    if (paired.length > 1 && paired.length === cards.length / 2) {
      console.log("passed win test");
      if (highscore > moves) {
         console.log("new highscore");
               setShowForm(true);
      } else {
        // setGameEnd(true);
        console.log("gameEnd no Highscore");
      }
    }
  }, [paired]);

 useEffect(() => {
    // Find all elements with the 'data-my-attribute' attribute
    const elementsWithAttribute = document.querySelectorAll('[data-testid]');
   let cardImages = 0;
    // Filter and log conditionally based on the value of the attribute
    elementsWithAttribute.forEach((element) => {
      if (element.getAttribute('data-testid') === 'card-image') {
        // console.log('Matching element:', element);
        cardImages = cardImages + 1;
     console.log("Card images", cardImages)
      }
    });
  }, [flipped]); 

  return (
    <>
      <Header />
      <main className="mx-auto w-full h-full flex flex-col">
        <div
          className={`bg-blue-400 container grid grid-cols-4 max-w-l place-items-center gap-1 sm:gap-2 lg:gap-5 m-auto p-2 sm:p-5 `}
        >
          {cards.map((card: CardType, index: number) => {
            const isPaired = paired.includes(card.name);
            return (
              <div
                key={index}
                onClick={() => handleOnClick(card, index)}
                className={` w-full aspect-square border border-1 rounded-md bg-slate-100 border-black grid place-items-center ${disabled ? "cursor-not-allowed pointer-events-none" : ""} ${isPaired && "opacity-50"}`}
                data-testid="card"
              >
                {flipped.includes(index) || paired.includes(card.name) ?
                  <Image
                    src={card.imgSrc}
                    width={500}
                    height={500}
                    alt={card.name}
                    data-testid="card-image"
                  />
                  :
                  <div
                    // className={`${flipped.length === 2 ? "cursor-not-allowed pointer-events-none" : ""}`}
                  >
                    <p>?</p>
                  </div>
                }
              </div>
            );
          })}
        </div>
        {/* Debuttons */ }
        <div className="inline-flex justify-around p-5 *:rounded-full *:border *:border-sky-100 *:bg-sky-50 *:px-2 *:py-0.5">
        <button onClick={ () => setShowForm(true) }>Show form</button>
        {/* <button onClick={ handleMockCurrent } >Mock Current</button>
        <button onClick={ handleMockHighscore }>Highscore win</button>
        <button onClick={ handleMockSolvedOnly }>Solved only</button> */}
        </div>
        {/* Scoreboard */}
        <div className="flex justify-around w-full py-6 px-4 text-sm leading-6">
          <div className="flex flex-col place-items-center">
            <p>Moves</p>
            <p data-testid="moves">{moves}</p>
          </div>
          <NewGameButton newRound={newRound} data-testid="new-game-btn" />
          <div className="flex flex-col place-items-center">
            <p>Highscore</p>
            
            <div className="inline-flex gap-1">
              {highscoreName && (
           <>    <p data-testid="highscore-name">{ `${highscoreName}:` }</p>
                  <p data-testid="highscore">{ highscore }
                  </p></>
              )}
            </div>
          </div>
        </div>
        {showForm && (
          <Highscore
            updateNewHighscore={() => updateNewHighscore(moves)}
          />
        )}
      </main>
      <Footer />
    </>
  );
}
