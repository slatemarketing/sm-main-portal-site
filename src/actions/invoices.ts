"use server";

import { InvoiceStatus } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";

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
    pdfURL,
  }: valuesProps,
  name: string
) {
  try {
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
        pdfURL,
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
