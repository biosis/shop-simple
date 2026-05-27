"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart";

export default function CartIcon() {
  const totalItems = useCartStore((state) => state.totalItems());
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true) }, []);

  const count = mounted ? totalItems : 0;
  return (
    <button
      onClick={() => console.log("TODO: ouvrir drawer panier")}
      aria-label={`Panier (${count} article${count !== 1 ? "s" : ""})`}
      className="relative p-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors duration-150 hover:scale-105 active:scale-95"
      style={{ transition: "color 150ms ease, transform 150ms ease" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      {count > 0 && (
        <span
          aria-hidden="true"
          className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-accent)] text-[10px] font-semibold text-white leading-none"
        >
          {count}
        </span>
      )}
    </button>
  );
}
