import { useState, useEffect } from 'react';
import { Horizon } from '@stellar/stellar-sdk';
import type { AssetBalance, StellarNetwork } from '../types';

const HORIZON: Record<StellarNetwork, string> = {
  mainnet: 'https://horizon.stellar.org',
  testnet: 'https://horizon-testnet.stellar.org',
  futurenet: 'https://horizon-futurenet.stellar.org',
};

interface UseStellarAccountResult {
  balances: AssetBalance[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useStellarAccount(
  publicKey: string | null,
  network: StellarNetwork = 'mainnet',
): UseStellarAccountResult {
  const [balances, setBalances] = useState<AssetBalance[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!publicKey) return;
    const server = new Horizon.Server(HORIZON[network]);
    setIsLoading(true);
    setError(null);

    server
      .loadAccount(publicKey)
      .then((account) => {
        const mapped: AssetBalance[] = account.balances.map((b) => ({
          assetCode: b.asset_type === 'native' ? 'XLM' : (b as Horizon.HorizonApi.BalanceLineAsset).asset_code,
          assetIssuer: b.asset_type === 'native' ? 'native' : (b as Horizon.HorizonApi.BalanceLineAsset).asset_issuer,
          balance: b.balance,
        }));
        setBalances(mapped);
      })
      .catch((e: unknown) => setError(e instanceof Error ? e : new Error(String(e))))
      .finally(() => setIsLoading(false));
  }, [publicKey, network, tick]);

  return { balances, isLoading, error, refetch: () => setTick((t) => t + 1) };
}
