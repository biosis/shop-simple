"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CartIcon from "./CartIcon";

const navLinks = [
  { href: "/products", label: "Produits" },
  { href: "/about", label: "À propos" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className="sticky top-0 z-50 bg-[var(--color-bg)]/90 backdrop-blur-md border-b border-[var(--color-border)]"
      style={{ transition: "box-shadow 150ms ease" }}
    >
      {/* Desktop: 64px tall — Mobile: 56px tall */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 h-14 md:h-16">

        {/* Logo */}
        <Link
          href="/"
          className="font-[family-name:var(--font-cormorant)] text-[1.6rem] font-semibold tracking-[0.06em] text-[var(--color-primary)] hover:opacity-75 transition-opacity duration-150"
        >
          Shop<span className="text-[var(--color-accent)]">·</span>Simple
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navigation principale">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={[
                "text-sm uppercase tracking-widest transition-colors duration-150",
                pathname === href
                  ? "text-[var(--color-primary)] border-b border-[var(--color-accent)] pb-0.5"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-primary)]",
              ].join(" ")}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right: CartIcon + hamburger */}
        <div className="flex items-center gap-1">
          <CartIcon />

          <button
            className="md:hidden p-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors duration-150"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <nav
          className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-bg)] px-4 sm:px-6 pb-5 pt-3"
          aria-label="Navigation mobile"
        >
          <ul className="flex flex-col">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={closeMenu}
                  className={[
                    "block py-3 text-sm uppercase tracking-widest transition-colors duration-150",
                    pathname === href
                      ? "text-[var(--color-primary)] font-medium"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-primary)]",
                  ].join(" ")}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
