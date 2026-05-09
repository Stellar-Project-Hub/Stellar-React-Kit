import React, { useState } from 'react';
import type { PaymentParams } from '../../types';

interface SendPaymentFormProps {
  onSubmit: (params: PaymentParams) => Promise<void>;
  defaultAssetCode?: string;
  defaultAssetIssuer?: string;
}

export function SendPaymentForm({
  onSubmit,
  defaultAssetCode = 'XLM',
  defaultAssetIssuer = 'native',
}: SendPaymentFormProps) {
  const [params, setParams] = useState<PaymentParams>({
    destination: '',
    amount: '',
    assetCode: defaultAssetCode,
    assetIssuer: defaultAssetIssuer,
    memo: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const set = (key: keyof PaymentParams) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setParams((p) => ({ ...p, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(params);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Send payment">
      <input
        required
        placeholder="Destination address (G…)"
        value={params.destination}
        onChange={set('destination')}
        aria-label="Destination"
      />
      <input
        required
        type="number"
        min="0"
        step="any"
        placeholder="Amount"
        value={params.amount}
        onChange={set('amount')}
        aria-label="Amount"
      />
      <input
        placeholder="Memo (optional)"
        value={params.memo}
        onChange={set('memo')}
        aria-label="Memo"
      />
      <button type="submit" disabled={submitting}>
        {submitting ? 'Sending…' : 'Send'}
      </button>
    </form>
  );
}
