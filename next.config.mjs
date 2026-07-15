/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Cegah situs ini ditaruh dalam <iframe> pihak lain (clickjacking)
          { key: "X-Frame-Options", value: "DENY" },
          // Cegah browser "menebak" tipe file dari isi konten (MIME sniffing)
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Jangan bocorkan URL lengkap (termasuk query string) ke situs lain
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Matikan akses API browser yang tidak dipakai situs ini
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
