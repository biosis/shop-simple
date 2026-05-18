@AGENTS.md

# ShopSimple

Boutique e-commerce pour créateur solo. Les acheteurs parcourent les produits, gèrent un panier et paient. Le vendeur consulte les commandes.

## Stack

| Couche | Technologie |
|--------|-------------|
| Framework | Next.js 16 (App Router) |
| Langage | TypeScript 5 strict |
| Styles | Tailwind CSS 4 |
| ORM | Prisma 7 · PostgreSQL |
| Paiement | Stripe |
| Emails | Resend |
| État client | Zustand |
| Validation | Zod 4 |
| Auth | bcryptjs · jsonwebtoken |

## Structure src/

```
src/
├── app/                  → Pages et routes (App Router)
│   ├── api/stripe/       → Webhooks et sessions Stripe
│   └── layout.tsx        → Layout racine
├── components/           → Composants UI réutilisables
│   └── ui/               → Design system (Button, Card…)
├── server/               → Actions serveur, services métier
├── schemas/              → Schémas de validation Zod
├── lib/
│   ├── prisma.ts         → Client Prisma singleton
│   └── utils.ts          → Utilitaires partagés (formatPrice…)
└── generated/prisma/     → Client Prisma généré (ne pas éditer)
```

## Commandes

```bash
pnpm dev          # Serveur de développement
pnpm build        # Build production
pnpm test         # Vitest
pnpm db:push      # Appliquer le schéma sans migration
pnpm db:migrate   # Créer et appliquer une migration
pnpm db:studio    # Ouvrir Prisma Studio
```

## Conventions

- **Fichiers** : kebab-case (`product-card.tsx`)
- **Composants** : PascalCase (`ProductCard`)
- **Server Components** par défaut — `"use client"` uniquement si nécessaire
- **Prix** : toujours via `formatPrice(cents)` depuis `src/lib/utils.ts`
- **Réponses serveur** : `{ success: boolean; data?: T; error?: string }`
- **Validation** : Zod sur tous les inputs (formulaires, API routes, actions)
- **TypeScript** : strict, zéro `any`

## À ne pas faire

- Modifier `prisma/schema.prisma` sans créer une migration
- Installer une dépendance sans demander
- Committer des secrets ou clés API
- Mettre de la logique métier dans les composants UI
- Accéder à Prisma directement dans les composants
- Contourner la validation Zod sur les entrées externes
