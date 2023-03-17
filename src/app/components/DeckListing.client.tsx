"use client";

import useHasWindow from "@/utilities/hooks/useHasWindow";
import useStoredDecks, { Deck } from "@/utilities/hooks/useStoredDecks";
import Spinner from "./Spinner";
import CopyButton from "./CopyButton";

import hdate from "human-date";
import { Fragment } from "react";

export default function DeckListing() {
  const [decks] = useStoredDecks();
  const hasWindow = useHasWindow();

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h1 className="text-2xl lg:text-4xl text-bold pt-2 lg:py-4">My Decks</h1>
      <p className="py-2">
        These are the decks you have made atlasses so far. This is tied to your
        browser state, so you will not see them on another device.
      </p>
      <ul className="text-lg pt-2">
        {hasWindow ? (
          <Fragment>
            {decks.length == 0 && (
              <p className="text-slate-300 italic">
                Looks like you haven&apos;t made any atlases yet. Try using the
                tools on the sidebar to import some decks!
              </p>
            )}
            {decks.map((deck) => {
              const { url, createdAt } = deck;
              return <DeckListItem key={`${url}-${createdAt}`} {...deck} />;
            })}
          </Fragment>
        ) : (
          <Spinner />
        )}
      </ul>
    </div>
  );
}

function DeckListItem({ url, updatedAt }: Deck) {
  return (
    <li className="flex flex-row p-2 justify-even items-center text-sm">
      <CopyButton href={url} showLink={false} />
      <span className="p-2 flex-1">
        <a href={url} target="_blank">
          {url}
        </a>
      </span>
      <span className="border-l-2"></span>
      <span>last updated at {hdate.relativeTime(updatedAt)}</span>
    </li>
  );
}
