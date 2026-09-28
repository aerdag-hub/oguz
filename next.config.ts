import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // cPanel "Setup Node.js App" ile çalıştırmak için tek dosyalık sunucu üretir.
  // Çıktı: .next/standalone/server.js
  output: "standalone",
};

export default nextConfig;
