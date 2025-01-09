"use client";
import {
  useEffect,
  useRef,
  useState,
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
} from "react";
import { storageManager } from "@/util/storageManager";
import NewGameButton from "@/components/NewGameButton";
type HighscoreProps = {
  setShowForm: Dispatch<SetStateAction<boolean>>;
  updateNewHighscore?: any;
  newRound: () => boolean;
};

const Highscore = ({
  updateNewHighscore,
  setShowForm,
  newRound,
}: HighscoreProps) => {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    console.log("Name debug", name);
  }, [name]);

  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const nameQuery = formData.get("query") as string;

    localStorage.setItem("name", nameQuery);
    //  Why does my storage manager not work? Because of JSON.stringify()?
    // To not to causes a type error in the manager. Is the working test version type safe?
    // storageManager.setItem("name", nameQuery)
    // Test output:
    // Expected: "name", "Bartholomew"
    // Received: "name", "\"Bartholomew\""

    if (formRef.current) {
      formRef.current.reset();
    }
    setName("");
  };

  return (
    <div
      className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm"
      data-testid="highscore-popup"
    >
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="absolute mx-auto w-full max-w-[24rem] rounded-lg overflow-hidden shadow-sm flex flex-col bg-white p-5 gap-4"
      >
        <h2 className="text-center text-xl">New Highscore!</h2>
        <input
          required
          value={name}
          name="query"
          placeholder="Enter your name..."
          onChange={handleChange}
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow autofocus"
          data-testid="input"
        />
        <button
          type="submit"
          className="w-full rounded-md bg-orange-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-orange-700 focus:shadow-none active:bg-orange-700 hover:bg-orange-600 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          Done
        </button>
      </form>
    </div>
  );
};
export default Highscore;
