// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20 border-t border-zinc-200/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-400 tracking-wider font-light">
      <p>
        © {new Date().getFullYear()} Jan Kowalski. Wszelkie prawa zastrzeżone.
      </p>
      <div className="flex gap-6">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="hover:text-zinc-600 transition-colors"
        >
          Instagram
        </a>
        <a
          href="https://vimeo.com"
          target="_blank"
          rel="noreferrer"
          className="hover:text-zinc-600 transition-colors"
        >
          Vimeo
        </a>
      </div>
    </footer>
  );
}
