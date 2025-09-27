"use client";

import { useEffect, useState } from "react";

export default function Authentication() {
  const [token, setToken] = useState<string | null>(null);

  const clientId = "client_0e758242e8fe0360b64206fba2288b0e";
  const redirectUri = typeof window !== "undefined" ? window.location.origin : ""; 
  const scope = "api_agencies_read api_listings_read";

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check sessionStorage first
    const storedToken = sessionStorage.getItem("access_token");
    if (storedToken) {
      setToken(storedToken);
      return;
    }

    // Check URL hash for implicit flow token
    if (window.location.hash) {
      const params = new URLSearchParams(window.location.hash.slice(1));
      const accessToken = params.get("access_token");
      if (accessToken) {
        setToken(accessToken);
        sessionStorage.setItem("access_token", accessToken);

        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, []);

  const handleLogin = () => {
    if (typeof window === "undefined") return;

    const state = crypto.randomUUID();
    sessionStorage.setItem("pkce_state", state);

    const authUrl = new URL("https://auth.domain.com.au/v1/connect/authorize");
    authUrl.searchParams.set("response_type", "token"); // implicit flow
    authUrl.searchParams.set("client_id", clientId);
    authUrl.searchParams.set("redirect_uri", redirectUri);
    authUrl.searchParams.set("scope", scope);
    authUrl.searchParams.set("state", state);

    window.location.href = authUrl.toString();
  };

  return (
    <div className="p-6">
      {!token ? (
        <button
          onClick={handleLogin}
          className="px-4 py-2 rounded bg-blue-500 text-white"
        >
          Login with Domain
        </button>
      ) : (
        <p className="mb-2 text-green-700 font-medium">✅ Authenticated</p>
      )}
    </div>
  );
}
