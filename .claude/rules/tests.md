---
description: Règles pour l'écriture des tests (Vitest)
globs: ["**/*.test.ts", "**/*.test.tsx"]
---

# Tests — règles

## Framework

- Vitest uniquement — pas de Jest, pas de Mocha
- Imports depuis `vitest` : `describe`, `it`, `expect`, `vi`, `beforeEach`, `afterEach`

## Organisation

- Un fichier de test par module, colocalisé avec le fichier testé (`product.ts` → `product.test.ts`)
- `describe` nommé comme le module ou la fonction testée
- `it` énonce le comportement attendu en français : `"retourne une erreur si le stock est épuisé"`

## Ce qu'on teste

- Logique métier dans `src/server/` et `src/schemas/` en priorité
- Schémas Zod : cas valides, cas invalides, messages d'erreur
- Fonctions pures dans `src/lib/utils.ts`
- Pas de tests sur les composants UI purement visuels

## Données de test

- Utiliser des fixtures locales ou des objets littéraux — pas de base de données réelle dans les tests unitaires
- Mocker Prisma avec `vi.mock` pour les tests unitaires qui touchent la couche serveur
- Les tests d'intégration qui nécessitent une vraie DB sont marqués `// integration` en en-tête

## Assertions

- Une assertion principale par `it` — les vérifications secondaires sont acceptées si elles testent le même comportement
- Préférer `toEqual` pour les objets, `toBe` pour les primitives, `toThrow` pour les erreurs

## Couverture

- Tester les chemins heureux ET les cas d'erreur
- Pour `formatPrice` : tester 0, un montant positif, et les arrondis
- Pour les actions serveur : tester le succès et chaque condition d'échec métier
