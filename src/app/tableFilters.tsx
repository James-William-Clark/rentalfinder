"use client";
import React, { useState } from "react";
import type { Rental } from "./rental";

type TableFiltersProps = {
  tableFilters: Record<string, number | null>;
  setTableFilters: (key: string, value: number | null) => void;
  numericRanges: Record<string, number[]>;
  suburbs: string[];
  setSuburbs: React.Dispatch<React.SetStateAction<string[]>>;
};

export const TableFilters: React.FC<TableFiltersProps> = ({
  tableFilters,
  setTableFilters,
  numericRanges,
}) => {
  const fieldLabels: Record<string, string> = {
    rent: "Rent (<= $)",
    bedrooms: "Bedrooms (>=)",
    bathrooms: "Bathrooms (>=)",
    carspaces: "Carspaces (>=)",
    commute: "Commute (minutes)",
    gym: "Nearest Gym (minutes)",
    supermarket: "Nearest Supermarket (minutes)",
  };
  const [suburbsInput, setSuburbsInput] = useState("");

  const suburbs = suburbsInput
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
    
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", marginBottom: "10px" }}>
      {Object.keys(tableFilters).map((key) => (
        <select
          key={key}
          value={tableFilters[key] ?? ""}
          onChange={(e) =>
            setTableFilters(key, e.target.value ? Number(e.target.value) : null)
          }
          style={{
            minWidth: "140px",
            padding: "6px 8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            height: "36px",
          }}
        >
          <option value="">{fieldLabels[key] ?? key}</option>
          {numericRanges[key].map((v, idx) => (
            <option key={v} value={v}>
              {idx === numericRanges[key].length - 1 ? `${v}+` : `≤ ${v}`}
            </option>
          ))}
        </select>
      ))}

      {/* Suburb input */}
      <input
        type="text"
        placeholder="Enter suburbs, comma separated"
        value={suburbsInput}
        onChange={(e) => setSuburbsInput(e.target.value)}
        style={{
          minWidth: "200px",
          padding: "6px 8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          height: "36px",
        }}
      />
    </div>
  );
};
