"use client";
import React from "react";
import type { Rental } from "./rental";

type TableProps = {
  data: Rental[];
  sortBy: keyof Rental;
  sortOrder: "asc" | "desc";
  setSortBy: (key: keyof Rental) => void;
  setSortOrder: (order: "asc" | "desc") => void;
};

export const Table: React.FC<TableProps> = ({ data, sortBy, sortOrder, setSortBy, setSortOrder }) => {
  if (data.length === 0) {
    return <p>No rentals match the selected filters.</p>;
  }

  return (
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {(Object.keys(data[0]) as (keyof Rental)[]).map((key) => (
              <th
                key={key}
                onClick={() => {
                  if (sortBy === key) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  else {
                    setSortBy(key);
                    setSortOrder("asc");
                  }
                }}
                style={{
                  cursor: "pointer",
                  padding: "8px 12px",
                  backgroundColor: "#f0f0f0",
                  borderBottom: "2px solid #ccc",
                  textAlign: "left",
                }}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
                {sortBy === key && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx} style={{ borderBottom: "1px solid #eee", cursor: "default" }}>
              {(Object.keys(item) as (keyof Rental)[]).map((key) => (
                <td key={key} style={{ padding: "8px 12px" }}>
                  {key === "link" ? (
                    <a href={item[key]} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  ) : (
                    item[key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

  );
};
