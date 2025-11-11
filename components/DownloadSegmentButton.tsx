"use client";
import React from "react";

type DownloadSegmentButtonProps = {
  filters: Record<string, string | undefined>;
};

export default function DownloadSegmentButton({ filters }: DownloadSegmentButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams(
        Object.entries(filters).reduce((acc, [key, value]) => {
          if (value) acc[key] = value;
          return acc;
        }, {} as Record<string, string>)
      );
      
      // API EXPORT something like /api/export-segment?churnSegment=High&clvSegment=Low
      const res = await fetch(`/api/export-segment?${params.toString()}`, { method: "GET" });
      if (!res.ok) throw new Error("Failed to export CSV");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `segment_export_${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to export data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isLoading}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
        isLoading
          ? "bg-[#4b4b4b] text-[#9c9c9c] cursor-not-allowed"
          : "bg-[var(--theme-accent-primary)] hover:bg-[var(--theme-accent-secondary)] text-white cursor-pointer shadow-[0_4px_12px_rgba(255,109,199,0.35)]"
      }`}
    >
      {isLoading ? "Downloading..." : "Download CSV"}
    </button>
  );
}