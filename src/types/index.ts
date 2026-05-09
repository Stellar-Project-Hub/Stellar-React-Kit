export type StellarNetwork = 'mainnet' | 'testnet' | 'futurenet';

export interface WalletContextValue {
  publicKey: string | null;
  network: StellarNetwork;
  isConnected: boolean;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export interface AssetBalance {
  assetCode: string;
  assetIssuer: string | 'native';
  balance: string;
  limit?: string;
}

export interface PaymentParams {
  destination: string;
  amount: string;
  assetCode: string;
  assetIssuer: string | 'native';
  memo?: string;
}

export interface TransactionRecord {
  id: string;
  type: 'sent' | 'received' | 'swap' | 'other';
  amount: string;
  assetCode: string;
  counterparty: string;
  createdAt: string;
  successful: boolean;
  hash: string;
}
