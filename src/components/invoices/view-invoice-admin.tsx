"use client";

import { getInvoice } from "@/actions/invoices";
import { Card, CardContent } from "../ui/card";
import { InvoiceStatus } from "@/generated/prisma";
import { Check, Copy, CopyCheck } from "lucide-react";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const InvoicePDFViewer = dynamic(() => import("../misc/pdf-viewer"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
        <p className="text-gray-600">Loading PDF Viewer...</p>
      </div>
    </div>
  ),
});

const useCopyToClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return { copyToClipboard, copied };
};

function CopyButton({ text, label }: { text: string; label?: string }) {
  const { copyToClipboard, copied } = useCopyToClipboard();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => copyToClipboard(text)}
      title={copied ? "Copied!" : `Copy ${label || "text"}`}
    >
      {/* <Copy className={copied ? "text-green-500" : ""} /> */}
      {copied ? <Check /> : <Copy />}
    </Button>
  );
}

export function ViewInvoiceAdmin({ id }: { id: string }) {
  const [invoice, setInvoice] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const invoiceData = await getInvoice(id);
        setInvoice(invoiceData);
      } catch (error) {
        console.error("Error fetching invoice:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!invoice) {
    return <div>No Invoice Found!</div>;
  }

  return (
    <>
      <Card className="col-start-2 col-span-1 row-span-1">
        <CardContent>
          <div className="space-y-4">
            <h2 className="text-3xl">Invoice Status:</h2>
            <hr />
            <div className="flex flex-row gap-3 items-center justify-between">
              <StatusDisplay status={invoice.status} />
              <h3 className="px-4 py-2 text-xl">
                Amount:{" "}
                <span className="text-green-600 font-bold">
                  ${invoice.amount}.00
                </span>
              </h3>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="col-start-3 col-span-2 row-span-3 flex flex-col">
        <CardContent className="flex flex-col h-full p-0">
          <div className="p-6 pb-0">
            <h2 className="text-3xl">Invoice PDF</h2>
            <hr className="mt-4" />
          </div>
          <div className="flex-1 p-6 pt-4">
            <InvoicePDFViewer
              pdfUrl="/important/invoices/test-invoice.pdf"
              invoiceNumber={invoice.invoiceNumber}
            />
          </div>
        </CardContent>
      </Card>
      <Card className="col-start-2 col-span-1 row-span-1">
        <CardContent>
          <div className="space-y-4">
            <h2 className="text-3xl">Client Information</h2>
            <hr />
            <div className="flex flex-col gap-3">
              <div className="bg-white border-l-4 shadow-lg rounded-md border-l-[#31405A] p-2">
                <div className="flex flex-row gap-1 items-center">
                  <h3 className="text-muted-foreground text-lg">CLIENT NAME</h3>
                  <CopyButton text={invoice.name} label="client name" />
                </div>
                <p className="text-lg font-bold">{invoice.name}</p>
              </div>

              <div className="bg-white border-l-4 shadow-lg rounded-md border-l-[#31405A] p-2">
                <div className="flex flex-row gap-1 items-center">
                  <h3 className="text-muted-foreground text-lg">COMPANY</h3>
                  <CopyButton text={invoice.company} label="company" />
                </div>
                <p className="text-lg font-bold">{invoice.company}</p>
              </div>

              <div className="bg-white border-l-4 shadow-lg rounded-md border-l-[#31405A] p-2">
                <div className="flex flex-row gap-1 items-center">
                  <h3 className="text-muted-foreground text-lg">EMAIL</h3>
                  <CopyButton text={invoice.email} label="email" />
                </div>
                <p className="text-lg font-bold">{invoice.email}</p>
              </div>

              <div className="bg-white border-l-4 shadow-lg rounded-md border-l-[#31405A] p-2">
                <div className="flex flex-row gap-1 items-center">
                  <h3 className="text-muted-foreground text-lg">USER ID</h3>
                  <CopyButton text={invoice.userId} label="userID" />
                </div>
                <p className="text-xs font-bold">{invoice.userId}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="col-start-2 col-span-1 row-span-1">
        <CardContent>
          <div className="space-y-4">
            <h2 className="text-3xl">Invoice Details</h2>
            <hr />
            <div className="flex flex-col gap-3">
              <div className="bg-white border-l-4 shadow-lg rounded-md border-l-[#31405A] p-2">
                <div className="flex flex-row gap-1 items-center">
                  <h3 className="text-muted-foreground text-lg">INVOICE ID</h3>
                  <CopyButton text={invoice.id} label="invoice id" />
                </div>
                <p className="text-lg font-bold">{invoice.id}</p>
              </div>

              <div className="bg-white border-l-4 shadow-lg rounded-md border-l-[#31405A] p-2">
                <div className="flex flex-row gap-1 items-center">
                  <h3 className="text-muted-foreground text-lg">
                    INVOICE NUMBER
                  </h3>
                  <CopyButton
                    text={invoice.invoiceNumber}
                    label="invoice number"
                  />
                </div>
                <p className="text-lg font-bold">#{invoice.invoiceNumber}</p>
              </div>

              <div className="bg-white border-l-4 shadow-lg rounded-md border-l-[#31405A] p-2">
                <div className="flex flex-row gap-1 items-center">
                  <h3 className="text-muted-foreground text-lg">
                    INVOICE DATE
                  </h3>
                  <CopyButton text={invoice.date} label="date" />
                </div>
                <p className="text-lg font-bold">
                  {invoice.date.toDateString()}
                </p>
              </div>

              <div className="bg-white border-l-4 shadow-lg rounded-md border-l-[#31405A] p-2">
                <div className="flex flex-row gap-1 items-center">
                  <h3 className="text-muted-foreground text-lg">
                    Payment Status
                  </h3>
                  <CopyButton text={invoice.paid} label="userID" />
                </div>
                <p className="text-lg font-bold">
                  {invoice.paid ? "Paid" : "Not Paid"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* <h1>Invoice ID: {invoice.id}</h1>
      <h1>Invoice Name: {invoice.name}</h1>
      <h1>Invoice Company: {invoice.company}</h1>
      <h1>Invoice UserID: {invoice.userId}</h1>
      <h1>Invoice Amount: {invoice.amount}</h1>
      <h1>Invoice Email: {invoice.email}</h1>
      <h1>Invoice Number: {invoice.invoiceNumber}</h1>
      <h1>Invoice Date: {invoice.date?.toISOString()}</h1>

      <h1>Invoice Status: {invoice.status}</h1>
      <h1>Invoice Paid?: {invoice.paid}</h1>

      <h1>Invoice CreatedAt: {invoice.createdAt.toISOString()}</h1>
      <h1>Invoice UpdatedAt: {invoice.updatedAt.toISOString()}</h1> */}
    </>
  );
}

export function StatusDisplay({ status }: { status: string }) {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-800 border-green-200";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "DENIED":
        return "bg-red-100 text-red-800 border-red-200";
      case "CANCELLED":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "REPORTED":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div
      className={`rounded-full px-4 py-2 text-sm font-medium border ${getStatusStyles(
        status
      )}`}
    >
      <h3>{status}</h3>
    </div>
  );
}
