"use client";

import { useState } from "react";
import { sendCustomerEmail } from "@/lib/email-service";

export interface EmailData {
  customerEmail: string;
  customerName: string;
  posterBase64?: string;
  posterFilename?: string;
}

export function useEmail() {
  const [sendingEmails, setSendingEmails] = useState<Set<string>>(new Set());
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const sendEmail = async (emailData: EmailData) => {
    const emailKey = emailData.customerEmail;
    
    // Check if this specific email is already being sent
    if (sendingEmails.has(emailKey)) return;

    // Add this email to the sending set
    setSendingEmails(prev => new Set(prev).add(emailKey));
    
    try {
      await sendCustomerEmail(emailData);
      setNotification({
        type: 'success',
        message: `Email sent successfully to ${emailData.customerName}!`
      });
    } catch (error) {
      console.error('Email sending failed:', error);
      setNotification({
        type: 'error',
        message: `Failed to send email to ${emailData.customerName}. Please try again.`
      });
    } finally {
      // Remove this email from the sending set
      setSendingEmails(prev => {
        const newSet = new Set(prev);
        newSet.delete(emailKey);
        return newSet;
      });
    }
  };

  const isEmailSending = (customerEmail: string) => {
    return sendingEmails.has(customerEmail);
  };

  const clearNotification = () => {
    setNotification(null);
  };

  return {
    isEmailSending,
    notification,
    sendEmail,
    clearNotification,
  };
}