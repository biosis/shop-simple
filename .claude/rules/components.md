---
description: Règles pour les composants React (UI et métier)
globs: src/components/**
---

# Composants — règles

## Server vs Client

- Server Component par défaut — ne passer à `"use client"` que pour : hooks React, événements DOM, état local, refs
- Ne jamais importer de code serveur (Prisma, actions serveur) depuis un Client Component

## Structure

- Un composant par fichier, nommé en PascalCase, fichier en kebab-case
- Les composants purement visuels vont dans `src/components/ui/` — ils ne contiennent aucune logique métier ni appel réseau
- Les composants qui composent des UI-components avec de la logique restent dans `src/components/`

## Props et types

- Toujours typer les props explicitement avec une `interface` ou `type` — pas de `any`
- Les props optionnelles ont une valeur par défaut ou sont marquées `?`

## Prix

- Toujours afficher les prix via `formatPrice(cents)` depuis `@/lib/utils` — jamais de formatage inline

## Données

- Ne pas accéder à Prisma directement dans un composant
- Les données sont soit passées en props (depuis un Server Component parent), soit récupérées via une Server Action

## Tailwind

- Classes utilitaires Tailwind uniquement — pas de styles inline sauf cas exceptionnel justifié
- Variantes responsive et dark mode via les préfixes Tailwind (`md:`, `dark:`)
