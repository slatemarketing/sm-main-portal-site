"use server";

import { InvoiceStatus } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { uploadFileToS3 } from "@/lib/s3";

export async function getInvoices({ id }: { id?: string } = {}) {
  if (id) {
    return await prisma.invoices.findMany({
      where: {
        userId: id,
      },
    });
  } else {
    return await prisma.invoices.findMany();
  }
}

export async function getInvoice(id: string) {
  return await prisma.invoices.findUnique({
    where: { id },
  });
}

interface valuesProps {
  // values: {
  title: string;
  userId: string;
  company: string;
  amount: string;
  email: string;
  date: Date;
  status: InvoiceStatus;
  paid: boolean;
  file?: File;
  pdfURL?: string;
  // };
}

export async function createInvoice(
  {
    title,
    userId,
    company,
    amount,
    email,
    date,
    status,
    paid,
    file,
    pdfURL,
  }: valuesProps,
  name: string
) {
  try {
    let finalPdfURL = pdfURL;

    // If a file is provided, upload it to S3 first
    if (file) {
      // Convert file to buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Upload directly to S3
      finalPdfURL = await uploadFileToS3(
        buffer,
        file.name,
        file.type,
        userId
      );
    }

    await prisma.invoices.create({
      data: {
        title,
        userId,
        name,
        company,
        amount,
        email,
        date,
        status,
        paid,
        pdfURL: finalPdfURL,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to create invoice!");
  }
}

export async function deleteInvoice(id: string) {
  try {
    await prisma.invoices.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete invoice");
  }
}
