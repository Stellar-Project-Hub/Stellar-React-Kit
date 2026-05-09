import React from 'react';

type Status = 'pending' | 'success' | 'failed';

const STATUS_LABEL: Record<Status, string> = {
  pending: 'Pending',
  success: 'Success',
  failed: 'Failed',
};

interface TransactionStatusBadgeProps {
  status: Status;
  className?: string;
}

export function TransactionStatusBadge({ status, className }: TransactionStatusBadgeProps) {
  return (
    <span role="status" aria-label={STATUS_LABEL[status]} className={className}>
      {STATUS_LABEL[status]}
    </span>
  );
}
