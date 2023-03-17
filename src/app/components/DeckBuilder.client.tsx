"use client";

import { useState, useMemo } from "react";
import type {FormEvent} from "react";
import { parseDecklist } from "@/utilities/magic";
import CardSuggestionAutocomplete from "./CardSuggestionAutocomplete.client";
import Spinner from "./Spinner";

export function DeckBuilder() {
  const [decklist, setDecklist] = useState("");
  const [cards, commanders] = useMemo(
    () => parseDecklist(decklist),
    [decklist]
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = {
      decklist: formData.get("decklist")
    }

    const JSONdata = JSON.stringify(data)
    const endpoint = '/api/decklist'

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    }

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch('/api/decklist', options)

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json()
    alert(`Result: ${JSON.stringify(result)}`)
  }

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
      <form onSubmit={handleSubmit} method="post" className="w-full flex flex-col">
        <label htmlFor="decklist">Input Decklist</label>
        <textarea
          id="decklist"
          name="decklist"
          className="max-w-lg h-64 rounded-lg block w-full py-2 px-3 leading-tight text-gray-100 border border-gray-500 bg-slate-900 appearance-none focus:outline-none focus:border-white focus:shadow-outline"
          placeholder="4 Lightning bolt..."
          value={decklist}
          onChange={(event) => setDecklist(event.currentTarget.value)}
        />
        <p className="text-italic text-sm text-slate-400 mt-2 text-right">
          {cards.length} cards, {commanders.length} commanders
        </p>
        <button
          type="submit"
          className="bg-purple-500 mt-4 hover:bg-purple-700 border active:bg-black focus:outline-none border-gray-500 focus:border-white text-white font-bold py-2 px-4 rounded self-stretc"
        >
          Generate Atlas
        </button>
      </form>
    </div>
  );
}
