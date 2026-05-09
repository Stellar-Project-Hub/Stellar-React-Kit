import React from 'react';
import { AssetDisplay } from './AssetDisplay';
import type { AssetBalance } from '../../types';

interface AssetBalanceListProps {
  balances: AssetBalance[];
  showIssuers?: boolean;
}

export function AssetBalanceList({ balances, showIssuers = false }: AssetBalanceListProps) {
  if (balances.length === 0) return <p>No assets found.</p>;
  return (
    <ul aria-label="Asset balances">
      {balances.map((b) => (
        <li key={`${b.assetCode}-${b.assetIssuer}`}>
          <AssetDisplay asset={b} showIssuer={showIssuers} />
        </li>
      ))}
    </ul>
  );
}
