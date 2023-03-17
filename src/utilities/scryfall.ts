import * as Scry from "scryfall-sdk";
import type { Card } from "scryfall-sdk";
import LRUCache from "lru-cache";

export const SPLIT_CARD_REGEX = /\/\/.*/;
export const COLLECTOR_NUMBER_REGEX = /#\d+/;
export const SET_SYMBOL_REGEX = /\[(.+)\]/;
export const COMMENT_REGEX = /#(w+)?/;

const imageCache = new LRUCache<string, ArrayBuffer>({ max: 100 });

export async function fetchCardMetadata(cards: string[]) {
  if (cards.length == 0) {
    return [];
  }
  const collection = cards.map((name) => {
    console.log("generating identifier for " + name);
    let nameForIdentifier = name
      .replace(SPLIT_CARD_REGEX, "")
      .replace(COLLECTOR_NUMBER_REGEX, "")
      .replace(COMMENT_REGEX, "");

    let setSymbol = null;
    const match = SET_SYMBOL_REGEX.exec(nameForIdentifier);
    if (match) {
      setSymbol = match[1];
      nameForIdentifier = nameForIdentifier.replace(SET_SYMBOL_REGEX, "");
    }

    if (setSymbol) {
      return Scry.CardIdentifier.byName(nameForIdentifier.trim(), setSymbol);
    } else {
      console.log("Identifier: " + nameForIdentifier);
      return Scry.CardIdentifier.byName(nameForIdentifier.trim());
    }
  });

  const cardData = await Scry.Cards.collection(...collection).waitForAll();
  return cardData;
}

export async function fetchCardImages(cardData: Card[]) {
  if (cardData.length == 0) {
    return [[], []];
  }

  const fronts: string[] = [];
  const backs: string[] = [];
  cardData.forEach((card) => {
    console.log(card);
    if (card.card_faces && !card.image_uris) {
      const [front, back] = card.card_faces;
      if (front && front.image_uris && front.image_uris.small) {
        fronts.push(front.image_uris.small);
      }
      if (back && back.image_uris && back.image_uris.small) {
        backs.push(back.image_uris.small);
      }
    } else if (card.image_uris) {
      return fronts.push(card.image_uris.small);
    }
  });

  return [await fetchImages(fronts), await fetchImages(backs)];
}

async function fetchImages(cards: string[]) {
  let imagesToGet = cards.length;
  let imagesGot = 0;
  console.log(`Fetching ${cards.length} images`);

  const streams = [];

  for (const img of cards) {
    let imageBuffer = imageCache.get(img);
    if (imageBuffer == null) {
      const response = await fetch(img);
      imageBuffer = await response.arrayBuffer();
      imageCache.set(img, imageBuffer);
    }

    imagesGot++;
    streams.push(imageBuffer);
    console.log(`${imagesGot} / ${imagesToGet}`);
  }

  return streams;
}

export function cleanCardName(name: string) {
    return name
        .replace(SPLIT_CARD_REGEX, "")
        .replace(COLLECTOR_NUMBER_REGEX, "")
        .replace(COMMENT_REGEX, "")
        .replace(SET_SYMBOL_REGEX, "");
}