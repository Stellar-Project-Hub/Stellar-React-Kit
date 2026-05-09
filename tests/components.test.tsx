import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CopyableAddress } from '../src/components/common/CopyableAddress';
import { TransactionStatusBadge } from '../src/components/transaction/TransactionStatusBadge';
import { AssetDisplay } from '../src/components/asset/AssetDisplay';
import { TransactionHistory } from '../src/components/transaction/TransactionHistory';

describe('CopyableAddress', () => {
  it('truncates address by default', () => {
    render(<CopyableAddress address="GABC1234567890WXYZ" />);
    expect(screen.getByRole('button').textContent).toContain('GABC12');
  });

  it('shows full address when truncate=false', () => {
    const addr = 'GABC1234567890WXYZ';
    render(<CopyableAddress address={addr} truncate={false} />);
    expect(screen.getByRole('button').textContent).toContain(addr);
  });
});

describe('TransactionStatusBadge', () => {
  it.each([['pending'], ['success'], ['failed']] as const)('renders %s status', (status) => {
    render(<TransactionStatusBadge status={status} />);
    expect(screen.getByRole('status')).toBeTruthy();
  });
});

describe('AssetDisplay', () => {
  it('renders asset code and balance', () => {
    render(<AssetDisplay asset={{ assetCode: 'USDC', assetIssuer: 'GABC', balance: '100.00' }} />);
    expect(screen.getByText('USDC')).toBeTruthy();
    expect(screen.getByText('100.00')).toBeTruthy();
  });
});

describe('TransactionHistory', () => {
  it('shows empty message when no transactions', () => {
    render(<TransactionHistory transactions={[]} emptyMessage="Nothing here" />);
    expect(screen.getByText('Nothing here')).toBeTruthy();
  });

  it('shows loading state', () => {
    render(<TransactionHistory transactions={[]} isLoading />);
    expect(screen.getByText(/loading/i)).toBeTruthy();
  });

  it('renders transaction list', () => {
    const txs = [{
      id: '1', type: 'sent' as const, amount: '10', assetCode: 'XLM',
      counterparty: 'GABC', createdAt: new Date().toISOString(), successful: true, hash: 'abc',
    }];
    render(<TransactionHistory transactions={txs} />);
    expect(screen.getByRole('list')).toBeTruthy();
  });
});
