import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkIfFileExists, uploadFileToS3 } from "@/utilities/s3";
import { fetchCardMetadata, fetchCardImages } from "@/utilities/scryfall";
import {
  getDeckstatsApiUrl,
  getListFromDeckstats,
} from "@/utilities/deckstats";
import { hashForDeck } from "@/utilities/hash";
import sharp from "sharp";

const ATLAS_SIZE = 2048;
const CARD_WIDTH = 146;
const CARD_HEIGHT = 204;
const BOTTOM_ROW = CARD_HEIGHT * 9;

export async function POST(request: NextRequest) {
  const { commanders = [], decklist = [], deckstats } = await request.json();

  if (decklist == null && deckstats == null) {
    return NextResponse.json(
      {
        error: "Please include decklist data",
        status: 400,
      },
      { status: 400, statusText: "Bad Request" }
    );
  }

  let deckstatsData: [string[], string[]] | null = null;
  if (deckstats) {
    console.log("Got deckstats data: ", deckstats);
    const { ownerId, deckId } = deckstats;
    deckstatsData = await getListFromDeckstats(ownerId, deckId);
    if (deckstatsData == null) {
      return NextResponse.json(
        {
          error: "Error fetching data from deckstats",
          status: 400,
        },
        { status: 400, statusText: "Bad Request" }
      );
    }
  }
  const decklistToUse = deckstatsData ? deckstatsData[0] : decklist;
  const commandersToUse = deckstatsData ? deckstatsData[1] : commanders;
  const filename = hashForDeck(decklistToUse, commandersToUse);
  const fileExists = await checkIfFileExists(`${filename}.png`, "cardatlas");

  if (fileExists) {
    return NextResponse.json({
      url: `/api/atlas?f=${filename}`,
    });
  }

  const cardData = await fetchCardMetadata(decklistToUse);
  const commanderData = await fetchCardMetadata(commandersToUse);

  const [deckBuffers, flipCardBuffers] = await fetchCardImages(cardData);
  const commanderBuffers = await fetchCardImages(commanderData);
  const imagesToComposite = [];

  let xOffset = 0;
  let yOffset = 0;
  let regularCardCount = 0;

  // layout main deck from top-left to bottom right
  for (const imageBuffer of deckBuffers) {
    regularCardCount++;
    imagesToComposite.push({
      input: Buffer.from(new Uint8Array(imageBuffer)),
      left: xOffset,
      top: yOffset,
    });
    xOffset += CARD_WIDTH;
    if (xOffset >= ATLAS_SIZE - CARD_WIDTH) {
      xOffset = 0;
      yOffset += CARD_HEIGHT;
    }
  }

  xOffset = 0;
  yOffset = BOTTOM_ROW;
  let commanderCount = 0;

  // layout commanders from bottom-left to top right
  for (const [commanderFrontBuffer, commanderBackBuffer] of commanderBuffers) {
    if (commanderFrontBuffer) {
      commanderCount++;
      imagesToComposite.push({
        input: Buffer.from(new Uint8Array(commanderFrontBuffer)),
        left: xOffset,
        top: yOffset,
      });
      xOffset += CARD_WIDTH;
    }

    if (commanderBackBuffer) {
      commanderCount++;
      imagesToComposite.push({
        input: Buffer.from(new Uint8Array(commanderFrontBuffer)),
        left: xOffset,
        top: yOffset,
      });
      xOffset += CARD_WIDTH;
    }
  }

  // flip-cards go right after commanders
  for (const imageBuffer of flipCardBuffers) {
    imagesToComposite.push({
      input: Buffer.from(new Uint8Array(imageBuffer)),
      left: xOffset,
      top: yOffset,
    });
    xOffset += CARD_WIDTH;
    if (xOffset >= ATLAS_SIZE - CARD_WIDTH) {
      xOffset = 0;
      yOffset -= CARD_HEIGHT;
    }
  }

  // encode metadata into bottom right corner
  imagesToComposite.push({
    gravity: "southeast",
    input: {
      create: {
        width: 100,
        height: 100,
        channels: 4,
        // r -> num cards
        // g -> commander index
        // b -> side-deck count
        background: {
          r: regularCardCount,
          g: commanderCount * 32,
          b: flipCardBuffers.length,
        },
      },
    },
  });

  console.log("Beginning composite of " + regularCardCount);
  console.log("Encoding commander length " + commanderCount);
  console.log("COMMANDERS!!!!!! ", commanderCount, " ", commanders);
  console.log("Encoding deck length " + deckBuffers.length);
  const image = await sharp({
    create: {
      width: 2048,
      height: 2048,
      channels: 4,
      background: { r: 255, g: 255, b: 255 },
    },
  })
    .resize(2048, 2048)
    .composite(imagesToComposite as any)
    .png()
    .toBuffer();

  await uploadFileToS3(`${filename}.png`, "cardatlas", image);

  return NextResponse.json({
    url: `/api/atlas?f=${filename}`,
  });
}
