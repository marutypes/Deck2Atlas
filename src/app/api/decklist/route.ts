import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkIfFileExists, uploadFileToS3 } from "@/utilities/s3";
import sharp from "sharp";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const fileExists = await checkIfFileExists("test-image.png", "cardatlas");
  const image = await sharp({
    create: {
      width: 2048,
      height: 2048,
      channels: 4,
      background: { r: 255, g: 255, b: 255 },
    },
  })
    .resize(2048, 2048)
    .png()
    .toBuffer();

  if (!fileExists) {
    uploadFileToS3('test-image.png', "cardatlas", image);
  }

  return NextResponse.json({
    url: "/api/atlas?f=test-image.png",
    fileExists,
    data,
  });
}
