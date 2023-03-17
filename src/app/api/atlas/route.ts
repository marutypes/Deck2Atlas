import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { downloadFileFromS3 } from "@/utilities/s3";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const bucket = searchParams.get("b") || "cardatlas";
  const fileName = searchParams.get("f");
  
  if (fileName == null) {
    return NextResponse.json(
        {
          error: "Please include the f parameter",
          status: 400,
        },
        { status: 400, statusText: "User error" }
      );
  }

  const file = await downloadFileFromS3(`${fileName}.png`, bucket);
  return new NextResponse(file.Body as ReadableStream);
}
