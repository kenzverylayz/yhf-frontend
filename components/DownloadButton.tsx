"use client";
import { useState } from "react";

type DownloadButtonProps = {
  data: Record<string, any>[];
  filename?: string;
};

export default function DownloadButton({
  data,
  filename = "export.csv",
}: DownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = () => {
    if (!data || data.length === 0) return;
    setIsLoading(true);

    try {
      const headers = Object.keys(data[0]);
      const csvRows = [
        headers.join(","), // header row
        ...data.map((row) =>
          headers
            .map((field) => {
              const value = row[field];
              if (value == null) return "";
              const str = String(value).replace(/"/g, '""');
              return `"${str}"`;
            })
            .join(",")
        ),
      ];

      const csvString = csvRows.join("\n");
      const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error("Error downloading CSV:", err);
    } finally {
      setTimeout(() => setIsLoading(false), 600); // small delay for UX
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isLoading || !data.length}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
        isLoading || !data.length
          ? "bg-[#4b4b4b] text-[#9c9c9c] cursor-not-allowed"
          : "bg-[var(--theme-accent-primary)] hover:bg-[var(--theme-accent-secondary)] text-white cursor-pointer shadow-[0_4px_12px_rgba(255,109,199,0.35)]"
      }`}
    >
      {isLoading ? "Downloading..." : "Download CSV"}
    </button>
  );
}