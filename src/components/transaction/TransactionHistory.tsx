import React from 'react';
import type { TransactionRecord } from '../../types';

interface TransactionHistoryProps {
  transactions: TransactionRecord[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export function TransactionHistory({
  transactions,
  isLoading = false,
  emptyMessage = 'No transactions yet.',
}: TransactionHistoryProps) {
  if (isLoading) return <div aria-busy="true">Loading transactions…</div>;
  if (transactions.length === 0) return <p>{emptyMessage}</p>;

  return (
    <ul aria-label="Transaction history">
      {transactions.map((tx) => (
        <li key={tx.id}>
          <span>{tx.type}</span>
          <span>{tx.amount} {tx.assetCode}</span>
          <span>{tx.counterparty}</span>
          <time dateTime={tx.createdAt}>{new Date(tx.createdAt).toLocaleString()}</time>
          <span aria-label={tx.successful ? 'Success' : 'Failed'}>
            {tx.successful ? '✓' : '✗'}
          </span>
        </li>
      ))}
    </ul>
  );
}
