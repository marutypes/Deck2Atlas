import Link from "next/link";

interface Props {
  href: string;
  showLink?: boolean;
}

export default function CopyableUrl({ href, showLink = true }: Props) {
  function handleCopyToClipboard() {
    const location = window.location;
    const baseUrl = location.protocol + "//" + location.host;
    navigator.clipboard.writeText(`${baseUrl}${href}`);
    alert("Copied URL to Clipboard!");
  }
  return (
    <div>
      <button
        onClick={handleCopyToClipboard}
        id="copy-url"
        aria-label="CopyButton"
        className="bg-purple-500 text-sm md:text-md mr-2 border active:bg-black focus:outline-none border-gray-500 focus:border-white text-white font-bold py-2 px-4 rounded"
      >
        📋
      </button>
      {showLink && (
        <Link
          id="atlas-link"
          href={href}
          target="_blank"
          className="text-purple-200 text-sm md:text-md hover:underline"
        >
          See completed atlas
        </Link>
      )}
    </div>
  );
}
