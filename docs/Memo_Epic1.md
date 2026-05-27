# Memo — Épic 1 : Fondations (T01–T05)

## T01 · Init projet

Stack initialisée :

| Couche | Choix |
|--------|-------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Langage | TypeScript 5 strict |
| Styles | Tailwind CSS 4 |
| ORM | Prisma 7 + PostgreSQL |
| État client | Zustand |
| Paiement | Stripe |
| Emails | Resend |
| Runtime Node | 22 (`.nvmrc`) |

Commandes clés : `pnpm dev`, `pnpm build`, `pnpm test`, `pnpm db:push`, `pnpm db:migrate`, `pnpm db:studio`.

---

## T02 · Schéma Prisma

Fichier : `prisma/schema.prisma`

Modèles :

- **User** — `id`, `email` (unique), `passwordHash`, `role` (BUYER | SELLER), `createdAt`, `updatedAt`
- **Product** — `id`, `slug` (unique), `name`, `description`, `price` (centimes), `stock`, `image?`, `category?`
- **CartItem** — liaison User ↔ Product avec `quantity`
- **Order** — `id`, `userId`, `total`, `status` (PENDING | PAID | SHIPPED | CANCELLED), `stripeSessionId?`
- **OrderItem** — liaison Order ↔ Product avec `quantity` et `price` (snapshot au moment de l'achat)

Client généré dans `src/generated/prisma/` (pas dans `node_modules`).

---

## T03 · Seed

Fichier : `prisma/seed.ts`

- 1 vendeur créé de manière idempotente (upsert par email)
- 6 produits de test avec slug, prix en centimes, stock, catégorie
- Commande : `pnpm db:seed` (via `prisma.config.ts`)

---

## T04 · Layout racine + Header

Fichiers : `src/app/layout.tsx`, `src/components/Header.tsx`, `src/components/CartIcon.tsx`

- Layout racine avec balises `<html>` / `<body>`, import `globals.css`
- Header : logo texte, liens de navigation, icône panier (`CartIcon`)
- Server Components par défaut

---

## T05 · Design system

Dossier : `src/components/ui/`

| Composant | Fichier | Variants / props clés |
|-----------|---------|----------------------|
| `Button` | `Button.tsx` | `primary` `secondary` `ghost` · `sm` `md` `lg` · `loading` `disabled` `fullWidth` |
| `Card` | `Card.tsx` | `default` `flat` `clickable` (hover scale + shadow) |
| `Badge` | `Badge.tsx` | `default` `success` `warning` `danger` `outline` · `sm` `md` |
| `Skeleton` | `Skeleton.tsx` | `width` `height` `rounded` · animation shimmer 1.5s |
| `Spinner` | `Spinner.tsx` | SVG stroke-dasharray · `sm` `md` `lg` · spin 0.8s |

Barrel export via `src/components/ui/index.ts`.

Tous les composants sont des **Server Components** (pas de `"use client"`).
Les couleurs utilisent les variables CSS de `globals.css` comme tokens Tailwind (`bg-accent`, `text-primary`, `border-border`…).

Page de démo temporaire : `src/app/ui-demo/page.tsx` (à supprimer après validation).

---

## Points techniques notables

### Prisma 7 — rupture de compatibilité
`@prisma/client` n'exporte plus `PrismaClient` directement. Le client généré est dans `src/generated/prisma/client.ts`. Le constructeur exige un adaptateur explicite :

```ts
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

new PrismaClient({ adapter: new PrismaPg(process.env.DATABASE_URL!) });
```

Fichier corrigé : `src/lib/prisma.ts`.

### Palette CSS
Définie dans `src/app/globals.css` via `@theme inline`, ce qui expose les variables comme tokens Tailwind :

```css
--color-bg       #fafaf8   (fond chaud)
--color-text     #1c1917
--color-text-muted #78716c
--color-primary  #292524
--color-accent   #d97706   (ambre — couleur principale des CTA)
--color-border   #e7e5e4
```
