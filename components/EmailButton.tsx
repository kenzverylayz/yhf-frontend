"use client";

import React, { useState } from "react";
import { sendCustomerEmail } from "@/lib/email-service";

type EmailButtonProps = {
  customerEmail: string;
  customerName: string;
  posterBase64?: string;
  posterFilename?: string;
  disabled?: boolean;
  onEmailSent?: (success: boolean, message: string) => void;
};

export default function EmailButton({
  customerEmail,
  customerName,
  posterBase64,
  posterFilename,
  disabled = false,
  onEmailSent,
}: EmailButtonProps) {
  const [isSending, setIsSending] = useState(false);

  const handleSendEmail = async () => {
    if (disabled || isSending) return;

    setIsSending(true);
    
    try {
      await sendCustomerEmail({
        customerEmail,
        customerName,
        posterBase64,
        posterFilename,
      });
      
      onEmailSent?.(true, `Email sent successfully to ${customerName}!`);
    } catch (error) {
      console.error('Email sending failed:', error);
      onEmailSent?.(false, `Failed to send email to ${customerName}. Please try again.`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <button
      onClick={handleSendEmail}
      disabled={disabled || isSending}
      className={`
        px-3 py-1.5 text-xs font-medium rounded-md transition-colors
        ${disabled || isSending
          ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
          : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
        }
      `}
      title={isSending ? 'Sending email...' : `Send email to ${customerName} (${customerEmail})`}
    >
      {isSending ? 'Sending...' : 'Send Email'}
    </button>
  );
}
