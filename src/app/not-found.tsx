import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center px-4 py-28 text-center sm:px-6 lg:px-8">
      <span className="font-display text-7xl font-semibold text-pink-200">
        404
      </span>
      <h1 className="mt-4 font-display text-3xl font-semibold text-navy-800">
        Halaman Tidak Ditemukan
      </h1>
      <p className="mt-3 max-w-md text-slate-500">
        Sepertinya halaman yang kamu cari sudah pindah atau tidak pernah ada.
        Yuk kembali ke beranda.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-pink-600 px-7 py-3 font-semibold text-white shadow-pinkglow transition-all duration-200 hover:-translate-y-0.5 hover:bg-pink-700"
      >
        Kembali ke Beranda
      </Link>
    </section>
  );
}
