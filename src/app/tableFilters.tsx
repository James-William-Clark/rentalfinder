"use client";
import React from "react";

type NumericRanges = Record<string, number[]>;

type TableFiltersProps = {
  tableFilters: Record<string, number | null>;
  setTableFilters: (key: string, value: number | null) => void;
  numericRanges: NumericRanges;
};

export const TableFilters: React.FC<TableFiltersProps> = ({ tableFilters, setTableFilters, numericRanges }) => {
  const fieldLabels: Record<string, string> = {
    rent: "Max Rent ($)",
    supermarket: "Nearest Supermarket (minutes)",
    gym: "Nearest Gym (minutes)",
    commute: "Commute Time (minutes)",
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "15px",
        justifyContent: "flex-start",
      }}
    >
      {Object.keys(tableFilters).map((key) => (
        <select
          key={key}
          value={tableFilters[key] ?? ""}
          onChange={(e) => setTableFilters(key, e.target.value ? Number(e.target.value) : null)}
          style={{
            minWidth: "120px",
            padding: "6px 8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "14px",
            height: "36px",
          }}
        >
          <option value="">
            {fieldLabels[key] ?? `Any ${key.charAt(0).toUpperCase() + key.slice(1)}`}
          </option>
          {numericRanges[key].map((v) => (
            <option key={v} value={v}>
              {v === numericRanges[key][numericRanges[key].length - 1] ? `${v}+` : `≤ ${v}`}
            </option>
          ))}
        </select>
      ))}
    </div>

  );
};
