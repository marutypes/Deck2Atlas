import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const result = await fetch(
    `https://api.scryfall.com/cards/autocomplete?q=${searchParams.get("q")}`
  );

  if (result.ok) {
    const parsedResult = await result.json();
    
    return NextResponse.json({
      data: parsedResult.data,
    });
  }

  return NextResponse.json(
    {
      error: "Something went wrong in the remote request",
      status: result.status,
    },
    { status: result.status, statusText: result.statusText }
  );
}
