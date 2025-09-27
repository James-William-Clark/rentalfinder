"use client";

import { useState, useEffect } from "react";
import Authentication from "./authentication";
import {RentalFinder} from "./rentalFinder";

export default function Home() {
  const [token, setToken] = useState<string | null>(null);

  // Only access sessionStorage in the browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = sessionStorage.getItem("access_token");
      if (storedToken) {
        setToken(storedToken);
      }

      // Also check URL hash for token after redirect from Domain login
      if (!storedToken && window.location.hash) {
        const params = new URLSearchParams(window.location.hash.slice(1));
        const accessToken = params.get("access_token");
        if (accessToken) {
          setToken(accessToken);
          sessionStorage.setItem("access_token", accessToken);
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      }
    }
  }, []);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Authentication />
        {token ? (
          <RentalFinder token={token} />
        ) : (
          <p className="text-gray-600">Please log in to see rentals</p>
        )}
      </main>
    </div>
  );
}
