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
          ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
          : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
        }
      `}
      title={isLoading ? 'Sending email...' : `Send email to ${customerName} (${customerEmail})`}
    >
      {isLoading ? 'Sending...' : 'Send Email'}
    </button>
  );
}