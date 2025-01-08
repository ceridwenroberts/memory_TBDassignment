import {
  useState,
  useRef,
  FormEvent,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { useGameContext } from "@/contexts/GameContext";
import { type HighscoreObjType } from "@/lib/types";

type HighscoreProps = {
  // setHighscoreObj: Dispatch<SetStateAction<HighscoreObjType>>;
  // moves: number;
  // setShowForm: Dispatch<SetStateAction<boolean>>;
  nameQuery?: string
  updateNewHighscore?: () => void;
};

const Highscore = ({ updateNewHighscore, nameQuery }: HighscoreProps) => {
  const { moves, setShowForm, setHighscoreObj, setNewGame } = useGameContext();

  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>): string => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const nameQuery = formData.get("query") as string;

    setName(nameQuery);

    setHighscoreObj({ highscore: moves, name: nameQuery });

    if (formRef.current) {
      formRef.current.reset();
    }
    setName("");
    setShowForm(false);
    setNewGame(true);
    return nameQuery
  };

  return (
    <div className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 

    backdrop-blur-sm 
    transition-opacity
    duration-300">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="absolute mx-auto w-full max-w-[24rem] rounded-lg overflow-hidden shadow-sm flex flex-col bg-white p-5 gap-4"
        data-testid="highscore-popup"
      >
        <h2 className="text-center text-xl">New Highscore!</h2>
        <input
          required
          value={name}
          name="query"
          placeholder="Enter your name..."
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow autofocus"
          data-testid="input"
        />
        <button
          type="submit"
          // className="p-2 border border-black"
          className="w-full rounded-md bg-orange-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-orange-700 focus:shadow-none active:bg-orange-700 hover:bg-orange-600 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          data-testid="highscore-button"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default Highscore;
