"use client";

import { useState } from "react";
import { ExternalLink, Download } from "lucide-react";
import { Button } from "../ui/button";

interface InvoicePDFViewerProps {
  pdfUrl: string;
  invoiceNumber: string;
}

export default function InvoicePDFViewer({
  pdfUrl,
  invoiceNumber,
}: InvoicePDFViewerProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  const openInNewTab = () => {
    window.open(pdfUrl, "_blank");
  };

  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `invoice-${invoiceNumber}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-96 bg-red-50 rounded-lg">
        <div className="text-center text-red-600">
          <p className="font-medium">Error loading PDF</p>
          <p className="text-sm mt-1">The PDF could not be loaded</p>
          <div className="flex gap-2 mt-4 justify-center">
            <Button variant="outline" onClick={openInNewTab}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Open in New Tab
            </Button>
            <Button variant="outline" onClick={downloadPDF}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Controls */}
      <div className="flex items-center justify-between p-3 pl-0 bg-gray-50 rounded-t-lg border-b">
        {/* <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Invoice PDF</span>
        </div> */}

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={openInNewTab}>
            <ExternalLink className="h-4 w-4" />
            Open
          </Button>
          <Button variant="outline" size="sm" onClick={downloadPDF}>
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-b-lg z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-600">Loading PDF...</p>
          </div>
        </div>
      )}

      {/* PDF Iframe */}
      <div className="flex-1 relative bg-gray-100 rounded-b-lg">
        <iframe
          src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
          className="w-full h-full border-0 rounded-b-lg"
          title={`Invoice ${invoiceNumber} PDF`}
          onLoad={handleLoad}
          onError={handleError}
        />
      </div>
    </div>
  );
}
