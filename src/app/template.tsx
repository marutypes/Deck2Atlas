import classNames from "classnames";
import { headers } from "next/headers";
import Link from "./components/Link";

interface Props {
  children: React.ReactNode;
  key: string;
}

const navButtonStyles = `text-slate-400 flex-1 md:flex-grow-0 py-2 px-2 self-center md:self-start md:w-full align-middle border-0 md:border-slate-600 md:border-2 md:border-x-2 md:rounded text-sm md:text-md md:mb-4 lg:text-lg text-center border-collapse hover:border-white hover:text-purple-500 md:hover:text-white md:focus:text-white active:bg-purple-800`;

export default function Template({ children }: Props) {
  return (
    <main className="w-screen h-full flex lg:flex-row flex-col items-center">
      <div className="flex flex-col md:flex-row h-full w-full">
        <nav className="p-2 flex flex-shrink-0 flex-grow-0 flex-basis-32 flex-row md:flex-col md:mx-0 md:h-full border-slate-600 bg-slate-900 md:px-6 justify-around md:justify-start align:start border border-t-1 border-b-1 border-r-0 border-l-0 md:border-t-0 md:border-b-0 md:border-r-0 md:self-start drop-shadow-md lg:drop-shadow-2xl">
          <h2 className="invisible md:visible absolute md:relative md:au md:w-auto flex-none md:text-2xl md:mb-8 md:mt-4 xl:mt-8 text-bold text-center">
            Deck2Atlas
          </h2>
          <Link
            href="/"
            className={navButtonStyles}
          >
            Deckbuilder
          </Link>
          <Link
            href="/deckstats"
            className={navButtonStyles}
          >
            Import
          </Link>
          <Link
            href="/about"
            className={navButtonStyles}
          >
            About
          </Link>
        </nav>

        <div className="flex flex-col  justify-start align-evenly md:w-screen md:mx-12 md-pr-32 lg:pr-16 xl:pr-32">
          <header className=" flex flex-col items-center pb-6">
            <h1 className="text-4xl sm:text-4xl md:text-6xl font-bold text-center pb-2 md:pb-12 pt-6 md:pt-24">
              Deck 2 Atlas
            </h1>
            <p className="text-center text-sm sm:text-md w-64 xs:w-96 md:text-lg w-62 md:w-2/3 lg:w-3/4 xl:w-full">
              This app lets you generate a 2k atlas from a decklist or a
              deckstats link. You can use this generated atlas in the{" "}
              <a className="text-purple-400 hover:underline" href="google.com">
                VRChat world
              </a>
              , or for your own purposes.
            </p>
          </header>
          <div className="px-2 w-full lg:w-full xl:pl-36 2xl:px-64 animate-in fade-in slide-in-from-bottom duration-300">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
