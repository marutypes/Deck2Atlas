/* eslint-disable react/jsx-no-comment-textnodes */
import DeckListing from "@/app/components/DeckListing.client";

export default function Home() {
  return (
    <div className="h-full w-full flex-1 xl:p-0 flex flex-col xl:flex-row 2xl:justify-evenly">
      <DeckListing />
    </div>
  );
}
