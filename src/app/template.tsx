interface Props {
  children: React.ReactNode;
}

export default function Template({ children }: Props) {
  return (
    <main className="h-screen w-screen flex flex-col justify-evenly items-center">
      <header className="w-screen flex flex-col items-center">
        <h1 className="text-6xl font-bold text-center mb-4 mt-12">
          Deck 2 Atlas
        </h1>
        <p className="text-center text-lg mb-4 w-96">
          This app lets you generate a 2k atlas from a decklist or a deckstats
          link. You can use this generated atlas in the{" "}
          <a className="text-purple-400" href="google.com">
            VRChat world
          </a>
          , or for your own purposes.
        </p>
      </header>
      <div className="flex-1 w-96">{children}</div>
    </main>
  );
}
