# Stellar React Kit

[![CI](https://github.com/Stellar-Project-Hub/Stellar-React-Kit/actions/workflows/ci.yml/badge.svg)](https://github.com/Stellar-Project-Hub/Stellar-React-Kit/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![npm](https://img.shields.io/npm/v/@stellar-project-hub/stellar-react-kit)](https://www.npmjs.com/package/@stellar-project-hub/stellar-react-kit)

**Headless, composable React components for the Stellar ecosystem.** Paste components into your project, own the styling, ship faster.

---

## Philosophy

Stellar React Kit is a **copy-paste component library** — not a traditional npm UI package. Components are unstyled by default and built on [Radix UI](https://www.radix-ui.com/) primitives. You control every pixel. The library handles Stellar protocol logic.

## Features

- 🔌 **Wallet connection** — Freighter, xBull, Albedo adapter pattern
- 💸 **Send / Receive flows** — composable payment forms with validation
- 📊 **Asset displays** — balances, asset codes, issuer info
- 📜 **Transaction history** — paginated, filterable, real-time via Horizon SSE
- 🔒 **TypeScript-first** — full type safety end to end
- 🎨 **Headless** — zero default styles, Tailwind-ready

## Directory Structure

```
Stellar-React-Kit/
├── src/
│   ├── components/
│   │   ├── wallet/          # WalletProvider, ConnectWalletButton
│   │   ├── transaction/     # SendPaymentForm, TransactionHistory, TransactionStatusBadge
│   │   ├── asset/           # AssetDisplay, AssetBalanceList
│   │   └── common/          # CopyableAddress, shared primitives
│   ├── hooks/               # useStellarAccount, useTransactions
│   ├── utils/               # Horizon helpers, formatting
│   ├── types/               # Shared TypeScript interfaces
│   └── index.ts             # Public API barrel
├── tests/                   # Vitest unit tests
├── docs/                    # Extended documentation
├── .github/
│   └── workflows/
│       └── ci.yml           # Lint + format + test pipeline
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vitest.config.ts
```

## Quick Start

```bash
# Install peer dependencies
npm install react react-dom @stellar/stellar-sdk

# Copy the components you need directly from src/
```

### Wrap your app

```tsx
import { WalletProvider } from './components/wallet/WalletProvider';

export default function App({ children }) {
  return <WalletProvider network="mainnet">{children}</WalletProvider>;
}
```

### Connect a wallet

```tsx
import { ConnectWalletButton } from './components/wallet/ConnectWalletButton';

// Unstyled — add your own className
<ConnectWalletButton className="btn btn-primary" />
```

### Display balances

```tsx
import { useStellarAccount } from './hooks/useStellarAccount';
import { AssetBalanceList } from './components/asset/AssetBalanceList';

function Balances() {
  const { publicKey, network } = useWallet();
  const { balances, isLoading } = useStellarAccount(publicKey, network);
  return <AssetBalanceList balances={balances} />;
}
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup instructions, coding standards, and the PR process.

## License

MIT © [Stellar Project Hub](https://github.com/Stellar-Project-Hub)
