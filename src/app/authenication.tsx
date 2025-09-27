"use client";

import { useEffect, useState } from "react";

export default function Authentication() {
  const [token, setToken] = useState<string | null>(null);

  const clientId = "client_0e758242e8fe0360b64206fba2288b0e";
  const redirectUri = window.location.origin; // adjust if you want /callback
  const scope = "api_agencies_read api_listings_read";

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    if (code) {
      // we just came back from Domain auth
      const storedState = sessionStorage.getItem("pkce_state");
      const verifier = sessionStorage.getItem("pkce_verifier");

      if (state !== storedState) {
        console.error("State mismatch");
        return;
      }

      if (!verifier) {
        console.error("Missing code_verifier");
        return;
      }

      // exchange code for token
      const params = new URLSearchParams();
      params.set("grant_type", "authorization_code");
      params.set("code", code);
      params.set("redirect_uri", redirectUri);
      params.set("client_id", clientId);
      params.set("code_verifier", verifier);

      fetch("https://auth.domain.com.au/v1/connect/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Token response:", data);
          if (data.access_token) {
            setToken(data.access_token);
            sessionStorage.setItem("access_token", data.access_token);
            if (data.refresh_token) {
              sessionStorage.setItem("refresh_token", data.refresh_token);
            }
          }
        })
        .catch((err) => console.error(err));
    }
  }, []);

  const handleLogin = async () => {
    const state = crypto.randomUUID();

    sessionStorage.setItem("pkce_state", state);

    const authUrl = new URL("https://auth.domain.com.au/v1/connect/authorize");
    authUrl.searchParams.set("response_type", "token");
    authUrl.searchParams.set("client_id", clientId);
    authUrl.searchParams.set("redirect_uri", redirectUri);
    authUrl.searchParams.set("scope", scope);
    authUrl.searchParams.set("state", state);

    window.location.href = authUrl.toString();
  };

  const callApi = () => {
    const accessToken = sessionStorage.getItem("access_token");
    if (!accessToken) {
      console.error("No access token");
      return;
    }
    fetch("https://api.domain.com.au/v1/agencies?q=NSW&pageSize=5", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log("Agencies:", data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Domain OAuth Demo</h1>

      {!token ? (
        <button
          onClick={handleLogin}
          className="px-4 py-2 rounded bg-blue-500 text-white"
        >
          Login with Domain
        </button>
      ) : (
        <div>
          <p className="mb-2 text-green-700">✅ Logged in</p>
          <button
            onClick={callApi}
            className="px-4 py-2 rounded bg-green-600 text-white"
          >
            Call Agencies API
          </button>
        </div>
      )}
    </div>
  );
}
