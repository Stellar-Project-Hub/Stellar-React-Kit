import { useState, useEffect } from 'react';
import { Horizon } from '@stellar/stellar-sdk';
import type { TransactionRecord, StellarNetwork } from '../types';

const HORIZON: Record<StellarNetwork, string> = {
  mainnet: 'https://horizon.stellar.org',
  testnet: 'https://horizon-testnet.stellar.org',
  futurenet: 'https://horizon-futurenet.stellar.org',
};

interface UseTransactionsResult {
  transactions: TransactionRecord[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useTransactions(
  publicKey: string | null,
  network: StellarNetwork = 'mainnet',
  limit = 20,
): UseTransactionsResult {
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!publicKey) return;
    const server = new Horizon.Server(HORIZON[network]);
    setIsLoading(true);
    setError(null);

    server
      .transactions()
      .forAccount(publicKey)
      .limit(limit)
      .order('desc')
      .call()
      .then(({ records }) => {
        const mapped: TransactionRecord[] = records.map((r) => ({
          id: r.id,
          type: 'other',
          amount: '0',
          assetCode: 'XLM',
          counterparty: '',
          createdAt: r.created_at,
          successful: r.successful,
          hash: r.hash,
        }));
        setTransactions(mapped);
      })
      .catch((e: unknown) => setError(e instanceof Error ? e : new Error(String(e))))
      .finally(() => setIsLoading(false));
  }, [publicKey, network, limit, tick]);

  return { transactions, isLoading, error, refetch: () => setTick((t) => t + 1) };
}
