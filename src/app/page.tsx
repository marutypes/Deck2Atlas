import DeckBuilder from "./components/DeckBuilder.client";

export default function Home() {
  return (
    <div className="opacity-100 animate-fade-in duration-1000 ease-out h-full w-full flex-1 xl:p-0 flex flex-col xl:flex-row 2xl:justify-evenly">
      <DeckBuilder />
      <div className="py-4 md:pt-0 border-t-2 border-slate-400 pt-2 md:pb-6 xl:pl-6 xl:border-t-0 xl:border-l-2 xl:ml-12 xl:justify-end">
        <h3 className="text-md font-bold pb-2 pl-2">Tips</h3>
        <ul className="text-xs md:text-sm pl-6 md:pl-8 list-disc">
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
    </div>
  );
}
