import { NextRequest } from "next/server";
import OpenAI from "openai";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "us-east-1",
  endpoint: process.env.TRUENAS_S3_ENDPOINT!,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.TRUENAS_S3_ACCESS_KEY!,
    secretAccessKey: process.env.TRUENAS_S3_SECRET_KEY!,
  },
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { searchParams } = new URL(req.url);

  const key = `/users/${data.name}/reports/REPORT-${data.name}-${data.id}`;

  console.log("Starting OpenAI");

  const ai = await openai.responses.create({
    model: "gpt-5-nano",
    input: [
      {
        role: "system",
        content:
          "Please generate a full comprehensive business style user report on the given user. This must be at least 1 page long. Your output should be in JSON format.",
      },
      {
        role: "user",
        content: JSON.stringify(data, null, 2),
      },
    ],
  });

  console.log("OpenAI Finished.");

  const report = ai.output_text;

  console.log("Adding to storage");

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.TRUENAS_S3_BUCKET!,
      Key: key,
      Body: JSON.stringify(report),
      ContentType: "application/json",
    })
  );

  console.log("Finished");

  return new Response(report, {
    status: 200,
    headers: {
      "Content-Type": "application/json", // or whatever type your report is
      "Content-Disposition": `attachment; filename="user-report-${data.name}.pdf"`,
    },
  });
}
