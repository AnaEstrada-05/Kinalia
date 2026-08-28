import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Rope Master license blocklist — a hand-editable static file at
        // public/rope-master/blocklist.json. The desktop app polls this URL
        // (https://kinalia.com.mx/rope-master/blocklist.json) to learn which
        // machines are blocked. Force it to always revalidate so an unblock
        // reaches clients on their next check instead of sitting in a CDN cache.
        source: "/rope-master/blocklist.json",
        headers: [
          { key: "Content-Type", value: "application/json; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
    ];
  },
};

export default nextConfig;
