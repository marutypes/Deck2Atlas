import useLocalStorage from "./useLocalStorage";

export interface Deck {
  url: string;
  createdAt: string;
  updatedAt: string;
}

interface DeckActions {
  upsert(url: string): void;
}

export default function useStoredDecks() {
  const [decks, setDecks] = useLocalStorage<Deck[]>("my-decks", []);

  function upsert(url: string) {
    // Find the index of the deck with the same URL, if it exists
    const existingIndex = decks.findIndex((d) => d.url === url);

    if (existingIndex === -1) {
      // Deck with this URL does not exist, add it to the list with current timestamp
      setDecks([
        ...decks,
        { url, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      ]);
    } else {
      // Deck with this URL exists, update its updatedAt timestamp
      const updatedDeck = { ...decks[existingIndex], updatedAt: new Date().toISOString() };
      setDecks([
        ...decks.slice(0, existingIndex),
        updatedDeck,
        ...decks.slice(existingIndex + 1),
      ]);
    }
  }

  const deckActions = {
    upsert,
  };
  
  return [decks, deckActions] as [Deck[], DeckActions];
}
