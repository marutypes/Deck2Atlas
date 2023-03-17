"use client";

import { useState, useMemo } from "react";
import type { FormEvent } from "react";
import { parseDecklist } from "@/utilities/magic";
import CardSuggestionAutocomplete from "./CardSuggestionAutocomplete.client";
import Spinner from "./Spinner";
import CopyButton from "./CopyButton";
import classNames from "classnames";

export default function DeckBuilder() {
  const [decklist, setDecklist] = useState("");
  const [loading, setLoading] = useState(false);
  const [atlasUrl, setAtlasUrl] = useState<string | null>(null);
  const [cards, commanders] = useMemo(
    () => parseDecklist(decklist),
    [decklist]
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const data = {
      decklist: cards,
      commanders,
    };

    const JSONdata = JSON.stringify(data);

    const response = await fetch("/api/decklist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    });

    const result = await response.json();
    setLoading(false);

    setAtlasUrl(result.url);
  };

  const invalid = cards.length == 0 || cards.length > 140;

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <label htmlFor="autocomplete" className="text-left self-baseline">
        Card Autocomplete
      </label>
      <CardSuggestionAutocomplete
        onSelect={(value) => {
          setDecklist((current) => {
            if (current.length == 0) {
              return value;
            }
            const lines = current.trim().split("\n");
            lines.push(value);
            return lines.join("\n");
          });
        }}
      ></CardSuggestionAutocomplete>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="w-full flex flex-col"
      >
        <label htmlFor="decklist">Input Decklist</label>
        <textarea
          id="decklist"
          name="decklist"
          className="h-64 rounded-lg block w-full py-2 px-3 leading-tight text-gray-100 border border-gray-500 bg-slate-900 appearance-none focus:outline-none focus:border-white focus:shadow-outline"
          placeholder="4 Lightning bolt..."
          value={decklist}
          onChange={(event) => setDecklist(event.currentTarget.value)}
        />
        <p className="text-italic text-sm text-slate-400 pt-2 text-right">
          {cards.length} cards, {commanders.length} commanders
        </p>
        <button
          disabled={cards.length == 0 || cards.length > 140}
          type="submit"
          className={classNames(
            "bg-purple-500 mt-4  border active:bg-black focus:outline-none border-gray-500 focus:border-white text-white font-bold py-2 px-4 rounded",
            {
              "hover:bg-purple-700": !invalid,
              "bg-slate-600": invalid,
              "hover:slate-600": invalid,
              "pointer-events-none": invalid,
              "text-slate-200": invalid,
            }
          )}
        >
          Generate Atlas
        </button>
      </form>
      <div className={classNames("h-8 pt-4", {"self-start": !loading})}>
        {loading && <Spinner />}
        {!loading && atlasUrl && <CopyButton href={atlasUrl} />}
      </div>
    </div>
  );
}
