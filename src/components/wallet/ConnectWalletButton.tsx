import React from 'react';
import { useWallet } from './WalletProvider';

interface ConnectWalletButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Label shown when wallet is not connected */
  connectLabel?: string;
  /** Label shown when wallet is connected */
  connectedLabel?: string | ((publicKey: string) => string);
}

export function ConnectWalletButton({
  connectLabel = 'Connect Wallet',
  connectedLabel = (pk) => `${pk.slice(0, 4)}…${pk.slice(-4)}`,
  onClick,
  ...props
}: ConnectWalletButtonProps) {
  const { publicKey, isConnected, isConnecting, connect, disconnect } = useWallet();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (isConnected) disconnect();
    else await connect();
  };

  const label = isConnected && publicKey
    ? typeof connectedLabel === 'function' ? connectedLabel(publicKey) : connectedLabel
    : connectLabel;

  return (
    <button
      type="button"
      disabled={isConnecting}
      aria-label={isConnected ? 'Disconnect wallet' : 'Connect wallet'}
      onClick={handleClick}
      {...props}
    >
      {isConnecting ? 'Connecting…' : label}
    </button>
  );
}
