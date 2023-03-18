"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Spinner from "./Spinner";
import CopyButton from "./CopyButton";
import classNames from "classnames";
import { getDeckstatsInfo } from "@/utilities/deckstats";
import useStoredDecks from "@/utilities/hooks/useStoredDecks";

export default function DeckstatsForm() {
  const [, storedDeckActions] = useStoredDecks();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [atlasUrl, setAtlasUrl] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const deckstats = getDeckstatsInfo(url);
    if (deckstats == null) {
      setError("Deckstats URL seems to be invalid.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/decklist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deckstats,
        }),
      });

      const { url } = await response.json();
      setAtlasUrl(url);
      storedDeckActions.upsert(url);
    } catch (err) {
      setError("Error generating atlas.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <form
        onSubmit={handleSubmit}
        method="post"
        className="w-full flex flex-col"
      >
        <label htmlFor="decklist">Input Deckstats URL</label>
        <input
          id="decklist"
          name="decklist"
          className="rounded-lg block w-full py-2 px-3 leading-tight text-gray-100 border border-gray-500 bg-slate-900 appearance-none focus:outline-none focus:border-white focus:shadow-outline"
          placeholder="https://deckstats.net/decks/53680/2946855-let-s-get-krakens/en"
          value={url}
          onChange={(event) => {
            setUrl(event?.target.value);
            setError(null);
          }}
        />
        <button
          type="submit"
          className={classNames(
            "bg-purple-500 mt-4  border active:bg-black focus:outline-none border-gray-500 focus:border-white text-white font-bold py-2 px-4 rounded"
          )}
        >
          Generate Atlas
        </button>
      </form>
      <div className={classNames("py-4", { "self-start": !loading })}>
        {!loading && error && (
          <div className="text-red-400 bg-slate-800 rounded-md p-2">
            {error}
          </div>
        )}
        {loading && <Spinner />}
        {!loading && atlasUrl && <CopyButton href={atlasUrl} />}
      </div>
    </div>
  );
}
