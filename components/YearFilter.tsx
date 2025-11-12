import React from "react";

type YearFilterProps = {
  selectedYear: number;
  onYearChange: (year: number) => void;
  years?: number[];
  label?: string;
};

export default function YearFilter({
  selectedYear,
  onYearChange,
  years = [2023, 2024, 2025],
  label = "Year"
}: YearFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-[var(--theme-accent-primary)]">
        {label}:
      </label>
      <select
        value={selectedYear}
        onChange={(e) => onYearChange(Number(e.target.value))}
        className="px-3 py-1.5 text-sm rounded-md border border-[var(--theme-border-primary)] 
                   bg-[var(--theme-bg-secondary)] text-[var(--theme-text-primary)]
                   focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent-primary)]
                   focus:border-[var(--theme-accent-primary)] transition-colors"
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
