// src/components/Header.tsx
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faSquareInstagram,
} from "@fortawesome/free-brands-svg-icons";
export default function TopBar() {
  return (
    <nav className="fixed bg-zinc-50 top-0 left-0 w-full p-5 grid grid-cols-[auto_1fr_auto_auto] items-center justify-items-end gap-6 z-999">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/" className="text-xl font-bold text-zinc-900">
          KM
        </Link>
      </div>
      {/* Navigation */}
      <ul className="flex items-center justify-center gap-8">
        <li>
          <Link
            href="/#portfolio"
            className="text-sm text-zinc-900 opacity-40 hover:opacity-100 transition-opacity"
          >
            Portfolio
          </Link>
        </li>
      </ul>
      {/* Separator */}
      <span className="block w-px h-10/12 bg-zinc-300"></span>
      {/* Socials */}
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
    </nav>
  );
}
