// template.tsx dirender ulang setiap pindah halaman,
// sehingga animasi transisi selalu diputar saat klik menu navbar.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-pagein">{children}</div>;
}
