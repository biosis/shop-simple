---
description: Règles pour les routes Stripe (webhooks, checkout sessions)
globs: src/app/api/stripe/**
---

# Stripe — règles API

## Sécurité

- Toujours vérifier la signature webhook avec `stripe.webhooks.constructEvent` — ne jamais traiter un payload non signé
- Lire la clé secrète depuis `process.env.STRIPE_SECRET_KEY` uniquement, jamais en dur
- Lire le webhook secret depuis `process.env.STRIPE_WEBHOOK_SECRET`

## Webhooks (`src/app/api/stripe/webhook/`)

- Retourner `{ received: true }` avec status 200 dès que la signature est valide, même si l'événement n'est pas géré
- Utiliser un `switch` sur `event.type` — ignorer les types inconnus sans erreur
- Toute logique métier déclenchée par un webhook appartient dans `src/server/`, pas dans la route elle-même

## Checkout sessions

- Créer les sessions côté serveur uniquement (Server Action ou Route Handler)
- Toujours préciser `success_url` et `cancel_url` avec l'origine depuis les variables d'environnement
- Stocker l'`orderId` dans `metadata` pour le retrouver au retour webhook

## Montants

- Les montants sont toujours en centimes (entiers) — utiliser `formatPrice()` pour l'affichage
- Ne jamais faire confiance au montant transmis par le client : recalculer côté serveur depuis la base

## Gestion d'erreurs

- Wrapper le corps des handlers dans un try/catch
- Logger l'erreur et retourner status 400 si la signature échoue
- Format de réponse : `{ success, data?, error? }`
