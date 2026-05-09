'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { WalletContextValue, StellarNetwork } from '../../types';

const WalletContext = createContext<WalletContextValue | null>(null);

interface WalletProviderProps {
  network?: StellarNetwork;
  children: React.ReactNode;
}

export function WalletProvider({ network = 'mainnet', children }: WalletProviderProps) {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    try {
      // Adapter hook point: replace with Freighter / xBull / Albedo integration
      const { isConnected, publicKey: pk } = await window.freighter?.getPublicKey?.() ?? {};
      if (pk) setPublicKey(pk);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => setPublicKey(null), []);

  return (
    <WalletContext.Provider
      value={{ publicKey, network, isConnected: !!publicKey, isConnecting, connect, disconnect }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet(): WalletContextValue {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWallet must be used inside <WalletProvider>');
  return ctx;
}
