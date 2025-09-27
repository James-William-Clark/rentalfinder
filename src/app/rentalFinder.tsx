"use client";
import React, { useState } from "react";
import type { Rental } from "./types";
import { TableFilters } from "./tableFilters";
import { Table } from "./table";

export const RentalFinder: React.FC = () => {
  const [sortBy, setSortBy] = useState<keyof Rental>("address");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Filters
  const [rentFilter, setRentFilter] = useState<number | null>(null);
  const [bedroomsFilter, setBedroomsFilter] = useState<number | null>(null);
  const [bathroomsFilter, setBathroomsFilter] = useState<number | null>(null);
  const [carspacesFilter, setCarspacesFilter] = useState<number | null>(null);
  const [commuteFilter, setCommuteFilter] = useState<number | null>(null);
  const [gymFilter, setGymFilter] = useState<number | null>(null);
  const [supermarketFilter, setSupermarketFilter] = useState<number | null>(null);

  const data: Rental[] = [
    {
      address: "123 Main St",
      rent: 500,
      bedrooms: 2,
      bathrooms: 1,
      carspaces: 1,
      commute: 30,
      gym: 5,
      supermarket: 2,
      link: "https://example.com/1",
    },
    {
      address: "456 Oak Ave",
      rent: 1200,
      bedrooms: 3,
      bathrooms: 2,
      carspaces: 2,
      commute: 45,
      gym: 15,
      supermarket: 10,
      link: "https://example.com/2",
    },
    // Add more rentals...
  ];

  // Filter logic
  const filteredData = data.filter((item) => {
    const matchesRent = rentFilter === null ? true : rentFilter === 2000 ? item.rent >= 2000 : item.rent <= rentFilter;
    const matchesBedrooms = bedroomsFilter === null ? true : bedroomsFilter === 5 ? item.bedrooms >= 5 : item.bedrooms <= bedroomsFilter;
    const matchesBathrooms = bathroomsFilter === null ? true : bathroomsFilter === 3 ? item.bathrooms >= 3 : item.bathrooms <= bathroomsFilter;
    const matchesCarspaces = carspacesFilter === null ? true : carspacesFilter === 3 ? item.carspaces >= 3 : item.carspaces <= carspacesFilter;
    const matchesCommute = commuteFilter === null ? true : commuteFilter === 60 ? item.commute >= 60 : item.commute <= commuteFilter;
    const matchesGym = gymFilter === null ? true : gymFilter === 60 ? item.gym >= 60 : item.gym <= gymFilter;
    const matchesSupermarket = supermarketFilter === null ? true : supermarketFilter === 60 ? item.supermarket >= 60 : item.supermarket <= supermarketFilter;

    return matchesRent && matchesBedrooms && matchesBathrooms && matchesCarspaces && matchesCommute && matchesGym && matchesSupermarket;
  });

  // Sorting logic
  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (typeof aValue === "number" && typeof bValue === "number") return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    else if (typeof aValue === "string" && typeof bValue === "string") return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    return 0;
  });

  return (
    <div>
      <TableFilters
        rentFilter={rentFilter}
        setRentFilter={setRentFilter}
        bedroomsFilter={bedroomsFilter}
        setBedroomsFilter={setBedroomsFilter}
        bathroomsFilter={bathroomsFilter}
        setBathroomsFilter={setBathroomsFilter}
        carspacesFilter={carspacesFilter}
        setCarspacesFilter={setCarspacesFilter}
        commuteFilter={commuteFilter}
        setCommuteFilter={setCommuteFilter}
        gymFilter={gymFilter}
        setGymFilter={setGymFilter}
        supermarketFilter={supermarketFilter}
        setSupermarketFilter={setSupermarketFilter}
      />
      <Table
        data={sortedData}
        sortBy={sortBy}
        sortOrder={sortOrder}
        setSortBy={setSortBy}
        setSortOrder={setSortOrder}
      />
    </div>
  );
};
