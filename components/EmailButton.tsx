import React from "react";

type EmailButtonProps = {
  customerEmail: string;
  customerName: string;
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
};

export default function EmailButton({
  customerEmail,
  customerName,
  onClick,
  disabled = false,
  isLoading = false,
}: EmailButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        px-3 py-1.5 text-xs font-medium rounded-md transition-colors
        ${disabled || isLoading
          ? 'bg-[#4b4b4b] text-[#9c9c9c] cursor-not-allowed' 
          : 'bg-[var(--theme-accent-primary)] hover:bg-[var(--theme-accent-secondary)] text-white cursor-pointer shadow-[0_4px_12px_rgba(255,109,199,0.35)]'
        }
      `}
      title={isLoading ? 'Sending email...' : `Send email to ${customerName} (${customerEmail})`}
    >
      {isLoading ? 'Sending...' : 'Send Email'}
    </button>
  );
}