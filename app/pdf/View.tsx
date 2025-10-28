import { Document, Page, pdfjs } from "react-pdf";
// import "react-pdf/dist/esm/Page/TextLayer.css";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// Atur worker agar tidak error
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function PdfViewer({ src }: { src: string }) {
  return (
    <div className="w-full h-[400px] overflow-auto border rounded-md">
      <Document file={src}>
        <Page pageNumber={1} width={600} />
      </Document>
    </div>
  );
}
("use client");

import * as React from "react";
import { PDFViewer, PDFViewerTool } from "@progress/kendo-react-pdf-viewer";

const tools: PDFViewerTool[] = [
  "pager",
  "spacer",
  "zoomInOut",
  "zoom",
  "selection",
  "spacer",
  "search",
  "open",
  "download",
  "print",
];

interface KendoPdfViewerProps {
  src: string;
}

export const KendoPdfViewer: React.FC<KendoPdfViewerProps> = ({ src }) => {
  return (
    <div className="w-full h-[400px] border rounded-md overflow-hidden">
      <PDFViewer
        data={src}
        style={{ height: "100%", width: "100%" }}
        tools={tools}
      />
    </div>
  );
};
