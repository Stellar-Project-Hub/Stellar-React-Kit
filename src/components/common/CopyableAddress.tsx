import React, { useState } from 'react';

interface CopyableAddressProps {
  address: string;
  truncate?: boolean;
  className?: string;
}

export function CopyableAddress({ address, truncate = true, className }: CopyableAddressProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const display = truncate ? `${address.slice(0, 6)}…${address.slice(-4)}` : address;

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? 'Copied!' : `Copy address ${address}`}
      className={className}
    >
      <code>{display}</code>
      {copied ? ' ✓' : ' ⎘'}
    </button>
  );
}
