// src/components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <Link
          href="/"
          className="text-xl font-light tracking-widest uppercase hover:text-zinc-500 transition-colors"
        >
          Jan Kowalski
        </Link>
        <p className="text-xs text-zinc-400 tracking-wider mt-1">
          Fine Art Photography
        </p>
      </div>

      <nav className="flex gap-8 text-sm tracking-wide font-light text-zinc-600">
        <Link
          href="/"
          className="hover:text-zinc-900 transition-colors underline underline-offset-4 decoration-zinc-300"
        >
          Galeria
        </Link>
        <Link href="/o-mnie" className="hover:text-zinc-900 transition-colors">
          O mnie
        </Link>
        <Link href="/kontakt" className="hover:text-zinc-900 transition-colors">
          Kontakt
        </Link>
      </nav>
    </header>
  );
}
