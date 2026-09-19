# Forever Events

Plateforme d’organisation d’événements, lancée à Oran.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- next-intl (FR par défaut, EN sur `/en`)
- Zustand pour **Mon Événement**
- Formulaires → `data/*.json` (l’équipe les reçoit en local ; Resend/Payload ensuite)
- PostgreSQL via Docker, prêt pour Payload CMS

## Lancer le site

```bash
npm install
npm run dev
```
