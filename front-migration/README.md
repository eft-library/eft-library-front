# front-migration

Next.js migration workspace for the EFT Library frontend.

## Structure

```text
app/              App Router entry points
components/       Shared UI and cross-feature components
features/         Domain-first feature modules
hooks/            Reusable React hooks
lib/              API helpers, config, constants, utilities
types/            Shared api, domain, and ui contracts
```

## Type Rules

- One component only: keep the type next to that component.
- One feature only: use `features/<domain>/types.ts`.
- Shared backend contracts: use `types/api/*`.
- Shared business entities: use `types/domain/*`.
- Shared UI-ready models: use `types/ui/*`.

## Getting Started

Run the development server:

```bash
npm run dev
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Validation

```bash
npm run lint
npm run build
```

## Notes

- Check [`AGENTS.md`](./AGENTS.md) before making structural changes.
- Verify Next.js 16 behavior against the installed docs in
  `node_modules/next/dist/docs/` when framework APIs are involved.

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
