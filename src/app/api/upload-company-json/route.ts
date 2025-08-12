import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

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

  const removeCompany = searchParams.get("remove-company");

  let key = `incoming/${data.name}-${Date.now().toString()}.json`;

  if (removeCompany) {
    key = `incoming/removed-companies/${
      data.name
    }-${Date.now().toString()}.json`;
  }

  const ai = await openai.responses.create({
    model: "gpt-5-nano",
    input: [
      {
        role: "system",
        content:
          "Summarize this json, and decide a topic for it. Return your response as JSON with 'summary' and 'topic' fields.",
      },
      { role: "user", content: JSON.stringify(data) },
    ],
  });

  const aiResponse = JSON.parse(
    ai.output_text || '{"summary": "", "topic": ""}'
  );
  const finalJSON = {
    ...data,
    summary: aiResponse.summary,
    topic: aiResponse.topic,
  };

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.TRUENAS_S3_BUCKET!,
      Key: key,
      Body: JSON.stringify(finalJSON),
      ContentType: "application/json",
    })
  );

  return NextResponse.json({
    ok: true,
    storedKey: key,
    analysis: ai.output_text ?? ai.output ?? ai,
  });
}
