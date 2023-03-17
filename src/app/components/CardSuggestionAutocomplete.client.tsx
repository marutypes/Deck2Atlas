import React, { useMemo, useState } from "react";
import throttle from "lodash.throttle";
import Autocomplete from "./Autocomplete.client";
import Spinner from "./Spinner";
import classNames from "classnames";

interface Props {
  onSelect: (selectedOption: string) => void;
}

const CardSuggestionAutocomplete = ({ onSelect }: Props) => {
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = useMemo(() => {
    async function fetchCardSuggestions(input: string) {
      const result = await fetch(`/api/suggestions?q=${input}`);
      setLoading(false);
      const parsedResult = (await result.json()) as { data: string[] };
      return parsedResult.data;
    }
    const throttledFetch = throttle(
      fetchCardSuggestions,
      250
    ) as typeof fetchCardSuggestions;

    return (input: string) => {
      setLoading(true);
      return throttledFetch(input);
    };
  }, []);
  return (
    <div className="mb-8 flex flex-row relative w-full items-center justify-center">
      <Spinner
        className={classNames("absolute -left-12", {
          invisible: !loading,
        })}
      />
      <Autocomplete
        placeholder="Type a card name"
        fetcher={fetchSuggestions}
        onSelect={onSelect}
        className="w-full"
        id="card-autocomplete"
        name="card-autocomplete"
      />
    </div>
  );
};

export default CardSuggestionAutocomplete;
