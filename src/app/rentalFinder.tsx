"use client";
import React, { useState } from "react";
import type { Rental } from "./rental";
import { TableFilters } from "./tableFilters";
import { Table } from "./table";

export const RentalFinder: React.FC = () => {
  const [sortBy, setSortBy] = useState<keyof Rental>("address");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const data: Rental[] = [
    { address: "123 Main St", rent: 500, bedrooms: 2, bathrooms: 1, carspaces: 1, commute: 30, gym: 5, supermarket: 2, link: "https://example.com/1" },
    { address: "456 Oak Ave", rent: 1200, bedrooms: 3, bathrooms: 2, carspaces: 2, commute: 45, gym: 15, supermarket: 10, link: "https://example.com/2" },
    // Add more rentals...
  ];

  // Identify numeric fields automatically
  const numericFields = Object.keys(data[0]).filter((key) => typeof data[0][key as keyof Rental] === "number");

  // Initialize tableFilters dynamically
  const [tableFilters, setTableFiltersState] = useState<Record<string, number | null>>(
    Object.fromEntries(numericFields.map((f) => [f, null]))
  );

  const setTableFilters = (key: string, value: number | null) => {
    setTableFiltersState((prev) => ({ ...prev, [key]: value }));
  };

  // Define numeric ranges for fields
  const numericRanges: Record<string, number[]> = {
    rent: [300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000],
    bedrooms: [0, 1, 2, 3, 4, 5],
    bathrooms: [1, 2, 3],
    carspaces: [0, 1, 2, 3],
    commute: [10, 15, 20, 25, 30, 40, 50, 60],
    gym: [10, 15, 20, 25, 30, 40, 50, 60],
    supermarket: [10, 15, 20, 25, 30, 40, 50, 60],
  };

  // Filter data
  const filteredData = data.filter((item) =>
    Object.entries(tableFilters).every(([key, filterValue]) => {
      if (filterValue === null) return true;
      const value = item[key as keyof Rental] as number;
      const maxValue = numericRanges[key][numericRanges[key].length - 1];
      return filterValue === maxValue ? value >= maxValue : value <= filterValue;
    })
  );

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (typeof aValue === "number" && typeof bValue === "number") return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    if (typeof aValue === "string" && typeof bValue === "string") return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    return 0;
  });

  return (
    <div>
      <TableFilters tableFilters={tableFilters} setTableFilters={setTableFilters} numericRanges={numericRanges} />
      <Table data={sortedData} sortBy={sortBy} sortOrder={sortOrder} setSortBy={setSortBy} setSortOrder={setSortOrder} />
    </div>
  );
};
