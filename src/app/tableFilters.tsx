"use client";
import React from "react";

type FiltersProps = {
  rentFilter: number | null;
  setRentFilter: (value: number | null) => void;
  bedroomsFilter: number | null;
  setBedroomsFilter: (value: number | null) => void;
  bathroomsFilter: number | null;
  setBathroomsFilter: (value: number | null) => void;
  carspacesFilter: number | null;
  setCarspacesFilter: (value: number | null) => void;
  commuteFilter: number | null;
  setCommuteFilter: (value: number | null) => void;
  gymFilter: number | null;
  setGymFilter: (value: number | null) => void;
  supermarketFilter: number | null;
  setSupermarketFilter: (value: number | null) => void;
};

export const TableFilters: React.FC<FiltersProps> = ({
  rentFilter,
  setRentFilter,
  bedroomsFilter,
  setBedroomsFilter,
  bathroomsFilter,
  setBathroomsFilter,
  carspacesFilter,
  setCarspacesFilter,
  commuteFilter,
  setCommuteFilter,
  gymFilter,
  setGymFilter,
  supermarketFilter,
  setSupermarketFilter,
}) => {
  const rentOptions = [
    300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000,
    1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000,
  ];

  const bedroomOptions = [0, 1, 2, 3, 4, 5];
  const bathroomOptions = [1, 2, 3];
  const carspacesOptions = [0, 1, 2, 3];
  const minuteOptions = [10, 15, 20, 25, 30, 40, 50, 60];

  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}>
      <select value={rentFilter ?? ""} onChange={(e) => setRentFilter(e.target.value ? Number(e.target.value) : null)}>
        <option value="">Any Rent</option>
        {rentOptions.map((r) => (
          <option key={r} value={r}>{r === 2000 ? "2000+" : `≤ ${r}`}</option>
        ))}
      </select>

      <select value={bedroomsFilter ?? ""} onChange={(e) => setBedroomsFilter(e.target.value ? Number(e.target.value) : null)}>
        <option value="">Any Bedrooms</option>
        {bedroomOptions.map((b) => (
          <option key={b} value={b}>{b === 5 ? "5+" : `≤ ${b}`}</option>
        ))}
      </select>

      <select value={bathroomsFilter ?? ""} onChange={(e) => setBathroomsFilter(e.target.value ? Number(e.target.value) : null)}>
        <option value="">Any Bathrooms</option>
        {bathroomOptions.map((b) => (
          <option key={b} value={b}>{b === 3 ? "3+" : `≤ ${b}`}</option>
        ))}
      </select>

      <select value={carspacesFilter ?? ""} onChange={(e) => setCarspacesFilter(e.target.value ? Number(e.target.value) : null)}>
        <option value="">Any Carspaces</option>
        {carspacesOptions.map((c) => (
          <option key={c} value={c}>{c === 3 ? "3+" : `≤ ${c}`}</option>
        ))}
      </select>

      <select value={commuteFilter ?? ""} onChange={(e) => setCommuteFilter(e.target.value ? Number(e.target.value) : null)}>
        <option value="">Any Commute</option>
        {minuteOptions.map((m) => (
          <option key={m} value={m}>{m === 60 ? "60+" : `≤ ${m} min`}</option>
        ))}
      </select>

      <select value={gymFilter ?? ""} onChange={(e) => setGymFilter(e.target.value ? Number(e.target.value) : null)}>
        <option value="">Any Gym</option>
        {minuteOptions.map((m) => (
          <option key={m} value={m}>{m === 60 ? "60+" : `≤ ${m} min`}</option>
        ))}
      </select>

      <select value={supermarketFilter ?? ""} onChange={(e) => setSupermarketFilter(e.target.value ? Number(e.target.value) : null)}>
        <option value="">Any Supermarket</option>
        {minuteOptions.map((m) => (
          <option key={m} value={m}>{m === 60 ? "60+" : `≤ ${m} min`}</option>
        ))}
      </select>
    </div>
  );
};