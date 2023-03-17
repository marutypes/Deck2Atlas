import { Inter } from "next/font/google";
import { DeckBuilder } from "./components/DeckBuilder.client";
import { Fragment } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Fragment>
      <DeckBuilder />
      <div className="border-t-2 border-slate-400 pt-4 mt-6">
        <h3 className="text-md font-bold mb-2">Tips</h3>

        <ul className="text-sm pl-4 list-disc">
          <li>
            End a line with{" "}
            <span className="font-mono bg-slate-800 pl-1 pr-1">
              #! Commander
            </span>{" "}
            to mark your commander
          </li>
          <li>
            <span className="font-mono bg-slate-800 pl-1 pr-1">
              4 lightning bolt
            </span>{" "}
            is the same as writing lightning bolt on 4 lines
          </li>
          <li>
            Decks must be between 1 and 140 cards. Sorry battle of wits players!
          </li>
        </ul>
      </div>
    </Fragment>
  );
}
