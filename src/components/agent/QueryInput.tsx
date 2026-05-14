'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { clsx } from 'clsx';
import { Spinner } from '@/components/ui/Spinner';
import { QueryInputSuggestions } from './QueryInputSuggestions';

interface QueryInputProps {
  onSubmit: (question: string) => void;
  isLoading?: boolean;
  initialValue?: string;
  showSuggestions?: boolean;
}

const MAX_CHARS = 500;

const SendIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M7 1l6 6-6 6M1 7h12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const QueryInput: React.FC<QueryInputProps> = ({
  onSubmit,
  isLoading = false,
  initialValue = '',
  showSuggestions = true,
}) => {
  const [value, setValue] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resize = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = `${Math.min(ta.scrollHeight, 220)}px`;
  }, []);

  useEffect(() => { resize(); }, [value, resize]);

  useEffect(() => { textareaRef.current?.focus(); }, []);

  useEffect(() => {
    if (initialValue) setValue(initialValue);
  }, [initialValue]);

  const handleSubmit = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSubmit(trimmed);
    setValue('');
  }, [value, isLoading, onSubmit]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const charCount = value.length;
  const isOverLimit = charCount > MAX_CHARS;
  const canSubmit = value.trim().length > 0 && !isLoading && !isOverLimit;

  return (
    <div className="w-full">
      {/* Input container */}
      <div
        className={clsx(
          'relative rounded-xl border transition-all duration-200',
          'bg-bg-surface',
          isFocused && !isOverLimit
            ? 'border-brand-primary shadow-[0_0_0_3px_var(--color-brand-glow)]'
            : isOverLimit
            ? 'border-risk-danger shadow-[0_0_0_2px_var(--color-risk-danger-bg)]'
            : 'border-border-strong hover:border-brand-primary/40'
        )}
      >
        {/* Textarea — larger text, brighter placeholder */}
        <textarea
          ref={textareaRef}
          id="query-input"
          value={value}
          onChange={(e) => { setValue(e.target.value); resize(); }}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Ask about the portfolio... e.g. 'Is PAR going up?'"
          disabled={isLoading}
          rows={1}
          className={clsx(
            'w-full bg-transparent',
            'px-4 pt-4 pb-12',
            // Larger, brighter text
            'text-base font-body text-text-primary',
            'placeholder:text-text-muted placeholder:text-base',
            'resize-none outline-none',
            'min-h-[60px] max-h-[220px]',
            'disabled:opacity-60 disabled:cursor-not-allowed',
            'transition-opacity duration-150'
          )}
          style={{ lineHeight: '1.65' }}
          aria-label="Ask a question about the portfolio"
          maxLength={MAX_CHARS + 50}
        />

        {/* Bottom toolbar */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 pb-3">
          {/* Left — char count + hint */}
          <div className="flex items-center gap-3">
            <span
              className={clsx(
                'text-xs font-mono-data transition-colors duration-150',
                isOverLimit
                  ? 'text-risk-danger font-semibold'
                  : charCount > MAX_CHARS * 0.8
                  ? 'text-risk-warning'
                  : 'text-text-muted'
              )}
            >
              {charCount}/{MAX_CHARS}
            </span>
            {!isLoading && (
              <span className="hidden sm:block text-text-muted text-xs font-mono-data">
                Enter ↵ to send · Shift+Enter for new line
              </span>
            )}
          </div>

          {/* Right — submit button */}
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            aria-label="Submit query"
            className={clsx(
              'flex items-center justify-center w-9 h-9 rounded-lg',
              'transition-all duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50',
              canSubmit
                ? [
                    'bg-brand-primary text-bg-base',
                    'hover:bg-brand-deep hover:shadow-brand-glow-sm',
                    'active:scale-95',
                  ]
                : 'bg-bg-elevated text-text-muted cursor-not-allowed border border-border'
            )}
          >
            {isLoading ? <Spinner size="sm" color="brand" /> : <SendIcon />}
          </button>
        </div>
      </div>

      {/* Suggestion chips — shown when input is empty and not loading */}
      {showSuggestions && !value && !isLoading && (
        <div className="mt-3">
          <QueryInputSuggestions
            onSelect={(q) => {
              setValue(q);
              textareaRef.current?.focus();
            }}
            compact
          />
        </div>
      )}
    </div>
  );
};