import "./globals.css";

export const metadata = {
  title: "Deck2Atlas",
  description: "Create 2k Atlasses for your MTG decks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="dark:text-gray-100 dark:bg-gradient-to-b dark:from-slate-900 dark:to-purple-700 h-screen">
        {children}
      </body>
    </html>
  );
}
