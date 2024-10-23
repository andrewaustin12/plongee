import React from 'react';

interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="text-center py-10">
      <p className="text-gray-500 text-lg">{message}</p>
    </div>
  );
}
