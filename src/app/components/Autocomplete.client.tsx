import React, { useState, useRef } from "react";
import classNames from "classnames";
import type { ChangeEvent, KeyboardEvent, FocusEvent} from "react";
import { tailwind } from "@/utilities/tags";

const AutocompleteContainer = tailwind`relative`;
const AutocompleteInput = tailwind`block w-full py-2 px-3 leading-tight text-gray-100 border border-gray-500 bg-slate-900 appearance-none focus:outline-none focus:border-white focus:shadow-outline`;
const AutocompleteList = tailwind`absolute z-10 w-full pt-1 border text-gray-100 border border-gray-500 bg-slate-900 divide-y divide-gray-200 rounded-md shadow-lg max-h-56 overflow-y-auto`;
const AutocompleteItem = tailwind`py-2 px-3 cursor-pointer focus:bg-purple-500 active:bg-purple-500 hover:bg-purple-500 select-none transition-colors`;

interface Props {
  fetcher: (text: string) => Promise<string[]>;
  onSelect: (selectedOption: string) => void;
  placeholder?: string;
  className?: string;
  name?: string;
  id?: string;
}

const Autocomplete = ({
  fetcher,
  onSelect,
  className,
  placeholder = "Start typing...",
  id,
  name,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [inputValue, setInputValue] = useState("");
  const autocompleteSuggestions = useRef<HTMLUListElement>(null);

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target?.value;
    setInputValue(inputValue);

    if (inputValue.length > 0) {
      const results = await fetcher(inputValue);
      if (results && results.length > 0) {
        setOpen(true);
        setFilteredOptions(results);
        setSelectedIndex(-1);
      }
    } else {
      setFilteredOptions([]);
      setSelectedIndex(-1);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "Escape": {
        setOpen(false);
        break;
      }
      case "ArrowUp": {
        event.preventDefault();
        setSelectedIndex((prevIndex) =>
          prevIndex <= 0 ? filteredOptions.length - 1 : prevIndex - 1
        );
        break;
      }
      case "Tab":
      case "ArrowDown": {
        event.preventDefault();
        setSelectedIndex((prevIndex) =>
          prevIndex === filteredOptions.length - 1 ? 0 : prevIndex + 1
        );
        break;
      }
      case "Enter": {
        if (selectedIndex >= 0 && selectedIndex < filteredOptions.length) {
          onSelect(filteredOptions[selectedIndex]);
          setOpen(false);
          setInputValue("");
        }
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const targetElement = event.relatedTarget;
    if (autocompleteSuggestions.current && autocompleteSuggestions.current.contains(targetElement)) {
      setSelectedIndex(0);
    } else {
      setOpen(false);
    }  
  }

  return (
    <div className={classNames(AutocompleteContainer, className)}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className={AutocompleteInput}
        placeholder={placeholder}
        onBlur={handleBlur}
        name={name}
        id={id}
      />
      {open && filteredOptions.length > 0 && (
        <ul onKeyDown={handleKeyDown} ref={autocompleteSuggestions} className={AutocompleteList}>
          {filteredOptions.map((option, index) => (
            <li
              tabIndex={0}
              key={option}
              className={classNames(
                AutocompleteItem,
                index === selectedIndex && "bg-purple-500"
              )}
              onClick={() => {
                setOpen(false);
                onSelect(option);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
