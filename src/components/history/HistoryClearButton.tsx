'use client';

import React, { useState } from 'react';
import { clsx } from 'clsx';

interface HistoryClearButtonProps {
  onClear: () => void;
  count: number;
}

export const HistoryClearButton: React.FC<HistoryClearButtonProps> = ({
  onClear,
  count,
}) => {
  const [confirming, setConfirming] = useState(false);

  if (count === 0) return null;

  if (confirming) {
    return (
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] font-mono-data text-text-muted">Clear all?</span>
        <button
          onClick={() => {
            onClear();
            setConfirming(false);
          }}
          className="text-[10px] font-mono-data text-risk-danger hover:text-risk-danger/80 transition-colors px-1"
        >
          Yes
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-[10px] font-mono-data text-text-muted hover:text-text-secondary transition-colors px-1"
        >
          No
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className={clsx(
        'text-[10px] font-mono-data text-text-muted',
        'hover:text-risk-danger transition-colors px-1 py-0.5 rounded'
      )}
      aria-label="Clear all history"
    >
      Clear
    </button>
  );
};