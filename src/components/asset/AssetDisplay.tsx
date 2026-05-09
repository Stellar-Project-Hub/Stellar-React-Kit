import React from 'react';
import type { AssetBalance } from '../../types';

interface AssetDisplayProps {
  asset: AssetBalance;
  showIssuer?: boolean;
}

export function AssetDisplay({ asset, showIssuer = false }: AssetDisplayProps) {
  return (
    <div aria-label={`${asset.assetCode} balance`}>
      <span>{asset.assetCode}</span>
      <span>{asset.balance}</span>
      {showIssuer && asset.assetIssuer !== 'native' && (
        <small title={asset.assetIssuer}>
          {asset.assetIssuer.slice(0, 6)}…{asset.assetIssuer.slice(-4)}
        </small>
      )}
    </div>
  );
}
