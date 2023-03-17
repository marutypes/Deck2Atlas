import { parseDecklist } from "./magic";

const DECKSTATS_REGEX = /\/?(\d+)\/(\d+)/;

export function getDeckstatsInfo(url: string) {
  const match = url.match(DECKSTATS_REGEX);

  if (match == null) {
    return null;
  }

  const deckId = match[2];
  const ownerId = match[1];

  return {
    deckId,
    ownerId,
  };
}

export function getDeckstatsApiUrl(ownerId: string, deckId: string) {
  const deckstatsListUrl = `https://deckstats.net/api.php?action=get_deck&id_type=saved&owner_id=${ownerId}&id=${deckId}&response_type=list`;
  return deckstatsListUrl;
}

export async function getListFromDeckstats(ownerId: string, deckId: string) {
  const url = getDeckstatsApiUrl(ownerId, deckId);
  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();
    const decklist = data.list;

    const sections = decklist.split("//");
    const mainSectionIndex = sections.findIndex((section: string) =>
      section.startsWith("Main")
    );
    const filteredSections = sections
      .slice(mainSectionIndex)
      .filter(
        (section: string) =>
          !section.startsWith("Maybeboard") && !section.startsWith("Sideboard")
      );
    const filteredDecklist = filteredSections.join("//").trim();
    return parseDecklist(filteredDecklist);
  } else {
    return null;
  }
}
