# Contributing to Stellar React Kit

Thank you for your interest in contributing! This document covers everything you need to get started.

---

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Project Structure](#project-structure)
3. [Development Setup](#development-setup)
4. [Coding Standards](#coding-standards)
5. [Testing](#testing)
6. [Submitting a Pull Request](#submitting-a-pull-request)
7. [Issue Labels](#issue-labels)

---

## Code of Conduct

Be respectful, inclusive, and constructive. We follow the [Contributor Covenant](https://www.contributor-covenant.org/).

---

## Project Structure

```
Stellar-React-Kit/
├── src/
│   ├── components/
│   │   ├── wallet/          # WalletProvider context + ConnectWalletButton
│   │   │   ├── WalletProvider.tsx
│   │   │   └── ConnectWalletButton.tsx
│   │   ├── transaction/     # Payment forms, history list, status badge
│   │   │   ├── SendPaymentForm.tsx
│   │   │   ├── TransactionHistory.tsx
│   │   │   └── TransactionStatusBadge.tsx
│   │   ├── asset/           # Balance display components
│   │   │   ├── AssetDisplay.tsx
│   │   │   └── AssetBalanceList.tsx
│   │   └── common/          # Shared UI primitives (CopyableAddress, etc.)
│   │       └── CopyableAddress.tsx
│   ├── hooks/
│   │   ├── useStellarAccount.ts   # Fetches account balances from Horizon
│   │   └── useTransactions.ts    # Fetches paginated transaction history
│   ├── utils/               # Pure helper functions (formatting, Horizon wrappers)
│   ├── types/               # Shared TypeScript interfaces (index.ts)
│   └── index.ts             # Public barrel export — only export from here
├── tests/                   # Vitest tests mirroring src/ structure
├── docs/                    # Long-form documentation and guides
├── .github/
│   └── workflows/
│       └── ci.yml           # Runs on every push/PR: typecheck → lint → format → test
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vitest.config.ts
└── .eslintrc.json
```

### Key conventions

| Area | Rule |
|---|---|
| Component files | PascalCase `.tsx` |
| Hook files | camelCase `use*.ts` |
| Util files | camelCase `.ts` |
| Exports | All public exports go through `src/index.ts` |
| Styling | Zero default styles. Accept `className` prop and forward it. |
| Accessibility | Every interactive element needs an `aria-label` or visible label. |

---

## Development Setup

**Prerequisites:** Node ≥ 20, npm ≥ 10.

```bash
git clone https://github.com/Stellar-Project-Hub/Stellar-React-Kit.git
cd Stellar-React-Kit
npm install
```

### Useful commands

```bash
npm run build          # Compile to dist/
npm run dev            # Watch mode
npm run typecheck      # tsc --noEmit
npm run lint           # ESLint
npm run lint:fix       # ESLint with auto-fix
npm run format         # Prettier write
npm run format:check   # Prettier check (used in CI)
npm test               # Vitest run (single pass)
npm run test:watch     # Vitest watch mode
```

---

## Coding Standards

- **TypeScript strict mode** is enabled. No `any`, no `@ts-ignore` without a comment explaining why.
- **Headless first** — components must not import CSS or apply inline styles. Accept and forward `className`.
- **Composability** — prefer small, single-responsibility components over large monoliths.
- **No new dependencies** without discussion in an issue first. Keep the peer-dep surface minimal.
- **Accessibility** — use semantic HTML and ARIA attributes. Run `axe` or similar before opening a PR.

---

## Testing

Tests live in `tests/` and use [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/).

- Every new component needs at least one render test.
- Every new hook needs at least one unit test (mock Horizon calls with `vi.mock`).
- Aim for behaviour tests, not implementation tests.

```bash
npm test               # Run all tests once
npm run test:watch     # Re-run on file change
```

---

## Submitting a Pull Request

1. **Fork** the repository and create a branch: `git checkout -b feat/my-feature`.
2. Make your changes, following the coding standards above.
3. Add or update tests.
4. Run `npm run typecheck && npm run lint && npm test` — all must pass.
5. Open a PR against `main`. Fill in the PR template.
6. A maintainer will review within 5 business days.

### Commit message format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add ReceiveAddressQR component
fix: correct balance parsing for non-native assets
chore: update stellar-sdk to 12.x
docs: add SEP-24 integration guide
```

---

## Issue Labels

| Label | Meaning |
|---|---|
| `good first issue` | Small, well-scoped — great for first-time contributors |
| `enhancement` | New feature or improvement |
| `bug` | Something is broken |
| `documentation` | Docs-only change |
| `help wanted` | Maintainers welcome outside help |
| `SEP` | Related to a Stellar Ecosystem Proposal |
| `accessibility` | A11y improvement |
| `performance` | Speed or bundle-size improvement |
