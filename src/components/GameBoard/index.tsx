"use client";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { useGameContext } from "@/contexts/GameContext";
import { type CardType, type HighscoreObjType } from "@/lib/types";
import cards from "@/data/cards.json";
import { cardShuffler } from "@/util/cardShuffler";
import { storageManager } from "@/util/storageManager";
import HighscoreForm from "@/components/Highscore";

const GameBoard = () => {
  const setSolvedDebug = (value: boolean) => {
    setSolved(value);
  };

  const {
    setMoves,
    setFlippedCards,
    setPairedCards,
    // gameCards,
    flippedCards,
    pairedCards,
    moves,
    showForm,
    highscoreObj,
    solved,
    setSolved,
    setShowForm,
    newGame,
    setHighscoreObj,
    setNewGame,
    gameEnd,
    setGameEnd,
  } = useGameContext();

  const [gameCards, setGameCards] = useState<CardType[]>([]);
  const [disableClicks, setDisableClicks] = useState(false);
  const [debugSolvedHighscore, setDebugSolvedHighscore] =
    useState<boolean>(false);
  const [debugSolvedLoose, setDebugSolvedLoose] = useState<boolean>(false);

  //Set game on load

  useEffect(() => {
    // startNewGame();
    setGameCards(cardShuffler(cards));
  }, []);

  const getCurrentHighscore = () => {
    const currentHighscore =
      storageManager.getItem<HighscoreObjType>("MemoHighscore");
    if (currentHighscore) {
      setHighscoreObj(currentHighscore);
    } else {
      storageManager.setItem("MemoHighscore", highscoreObj);
    }
    setNewGame(true);
  };

  const fireNewGame = () => {
    setSolvedDebug(false);
    setPairedCards([]);
    setFlippedCards([]);
    setMoves(0);
    setShowForm(false);
    setGameCards(cardShuffler(cards));
    // console.log("new game starting");
    setNewGame(false);
  };

  // Game start
  useEffect(() => {
    getCurrentHighscore();

    //Get highscore
    const currentHighscore =
      storageManager.getItem<HighscoreObjType>("MemoHighscore");
    if (currentHighscore) {
      setHighscoreObj(currentHighscore);
    } else {
      storageManager.setItem("MemoHighscore", highscoreObj);
    }
    setNewGame(true);
  }, []);

  //Set new game
  useEffect(() => {
    if (newGame) {
      setPairedCards([]);
      setFlippedCards([]);
      setMoves(0);
      setShowForm(false);
      setGameCards(cardShuffler(cards));
      // console.log("new game starting");
      setSolvedDebug(false);
      setNewGame(false);
      setGameEnd(false);
    }
  }, [newGame]);

  useEffect(() => {
    if (highscoreObj.highscore !== 0 || highscoreObj.name !== "") {
      storageManager.setItem("MemoHighscore", highscoreObj);
    }
  }, [highscoreObj]);

  //GamePlay

  const handleOnClick = (index: number): void => {
    if (disableClicks || flippedCards.includes(index)) {
      //console.log("not clickable yet");
      return;
    }
    if (flippedCards.length === 1) {
      setFlippedCards((prev: number[]): number[] => [...prev, index]);
      setMoves(moves + 1);
    } else {
      setFlippedCards([index]);
    }
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setDisableClicks(true);
      const [firstIndex, secondIndex] = flippedCards;
      // console.log(gameCards[firstIndex], gameCards[secondIndex]);
      // console.log("paired", pairedCards);
      if (gameCards[firstIndex].name === gameCards[secondIndex].name) {
        setPairedCards((prev: string[]): string[] => [
          ...prev,
          gameCards[firstIndex].name,
        ]);
        setFlippedCards([]);
        setDisableClicks(false);
      } else {
        //console.log(flippedCards);
        setTimeout(() => {
          setFlippedCards([]);
          setDisableClicks(false);
        }, 1100);
      }
    }
  }, [flippedCards]);

  //Game Complete Check

  useEffect(() => {
    if (
      (pairedCards.length > 1 &&
        pairedCards.length === Object.keys(gameCards).length / 2) ||
      debugSolvedHighscore ||
      debugSolvedLoose
    ) {
      if (highscoreObj.highscore > moves || debugSolvedHighscore) {
        //  console.log("new highscore");
        setShowForm(true);
      } else {
        setGameEnd(true);
      }
      setDebugSolvedHighscore(false);
      setDebugSolvedLoose(false);
      // setSolvedDebug(true);
    }
  }, [pairedCards, debugSolvedHighscore, debugSolvedLoose]);

  //DEBUGGERS

  const testStorage = () => {
    setHighscoreObj({ highscore: 35, name: "Bob" });
  };

  useEffect(() => {
    if (newGame) {
      // console.log("newGame true inte fireEffect")
    }
  }, [newGame]);

  useEffect(() => {
    // console.log("moves updated", moves);
  }, [moves]);

  useEffect(() => {
    // console.log("flipped cards updated");
  }, [flippedCards]);

  const handleDebugMoves = () => {
    // console.log(moves + 1, "moves + 1");
    setMoves(moves + 1);
  };

  const handleDebugSolvedHighscore = () => {
    setMoves(5);
    setDebugSolvedHighscore(true);
  };

  const handleDebugSolvedLoose = () => {
    {
      setMoves(60);
      setDebugSolvedLoose(true);
    }
  };

  return (
    <div
      className={`container grid grid-cols-4 max-w-l place-items-center gap-1 sm:gap-2 lg:gap-5 m-auto p-2 sm:p-5 ${
        disableClicks ? "cursor-not-allowed pointer-events-none" : ""
      }`}
    >
      {gameCards.map((card: CardType, index: number) => {
        const isPaired = pairedCards.includes(card.name);
        return (
          <div
            key={index}
            onClick={() => handleOnClick(index)}
            className={`container w-full aspect-square border bg-slate-100 border-black rounded-md  ${
              isPaired ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            } `}
            data-testid="card"
          >
            {flippedCards.includes(index) || isPaired ? (
              <div key={index} data-testid="card-image">
                <Image
                  src={card.imgSrc}
                  width={500}
                  height={500}
                  alt={card.name}
                />
              </div>
            ) : (
              <div className="w-full aspect-square border border-1 rounded-md bg-slate-100 border-black grid place-items-center">
                <p className="text-4xl sm:text-6xl m:text-10xl lg:text-20xl">
                  {card.reverse}
                </p>
              </div>
            )}
          </div>
        );
      })}
      <div>
        {showForm && <HighscoreForm />}

        {/* Debugger btns */}
        <div className="fixed flex gap-2 text-xs p-2">
          <button className="border px-1" onClick={handleDebugSolvedHighscore}>
            Debug solved Highscore
          </button>
          <button onClick={handleDebugSolvedLoose}>Debug solved Loose</button>
          {/* <button onClick={() => console.log("newGame logic finns inte längre")}>
          Reset debug
        </button>*/}
          {/* <button onClick={handleDebugMoves}>Debug Moves</button> */}
          <button onClick={() => setShowForm(!showForm)}>Show form</button>
          <button onClick={testStorage}>Debug storage</button>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
