import DeckstatsForm from "@/app/components/DeckstatsForm.client";

export default function Home() {
  return (
    <div className="h-full w-full flex-1 xl:p-0 flex flex-col xl:flex-row 2xl:justify-evenly">
      <DeckstatsForm />
      <div className="py-4 md:pt-0 border-t-2 border-slate-400 pt-2 md:pb-6 xl:pl-6 xl:border-t-0 xl:border-l-2 xl:ml-12 xl:justify-end">
        <h3 className="text-md font-bold pb-2 pl-2">Tips</h3>
        <ul className="text-xs md:text-sm pl-6 md:pl-8 list-disc">
          <li>
            This currently only works with URLs from{" "}
            <a
              href="https://deckstats.net/"
              className="text-purple-400 hover:underline"
            >
              Deckstats
            </a>{" "}
            decks. Someday I will add more sites.
          </li>
          <li>
            <span className="font-mono bg-slate-800 pl-1 pr-1">//</span>{" "}
            Comments will be stripped.
          </li>
          <li>
            If you have added a
            <span className="font-mono bg-slate-800 pl-1 pr-1">
              // Maybeboard
            </span>{" "}
            it will be removed.
          </li>
          <li>
            Decks must be between 1 and 140 cards. Sorry battle of wits players!
          </li>
        </ul>
      </div>
    </div>
  );
}
