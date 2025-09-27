"use client";
import React from "react";

type NumericRanges = Record<string, number[]>;

type TableFiltersProps = {
  tableFilters: Record<string, number | null>;
  setTableFilters: (key: string, value: number | null) => void;
  numericRanges: NumericRanges;
};

export const TableFilters: React.FC<TableFiltersProps> = ({ tableFilters, setTableFilters, numericRanges }) => {
  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "10px" }}>
      {Object.keys(tableFilters).map((key) => (
        <select
          key={key}
          value={tableFilters[key] ?? ""}
          onChange={(e) => setTableFilters(key, e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">{`Any ${key.charAt(0).toUpperCase() + key.slice(1)}`}</option>
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
