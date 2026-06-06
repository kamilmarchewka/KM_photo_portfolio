// src/components/Footer.tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faSquareInstagram,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20 border-t border-zinc-200/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-400 tracking-wider font-light">
      <p>
        &copy; {new Date().getFullYear()} Kamil Marchewka. Wszelkie prawa
        zastrzeżone.
      </p>
      <div className="flex items-center justify-end gap-3">
        {/* Facebook */}
        <a
          href="https://www.facebook.com/kamil.marchewka.370/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-5 block text-zinc-900 opacity-40 hover:opacity-100 transition-opacity"
        >
          <FontAwesomeIcon icon={faSquareFacebook} />
        </a>
        {/* Instagram */}
        <a
          href="https://www.instagram.com/kmarchewka_/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-5 block text-zinc-900 opacity-40 hover:opacity-100 transition-opacity"
        >
          <FontAwesomeIcon icon={faSquareInstagram} />
        </a>
      </div>
    </footer>
  );
}
