export interface EmailData {
  customerEmail: string;
  customerName: string;
  posterBase64?: string;
  posterFilename?: string;
}

export async function sendCustomerEmail(emailData: EmailData) {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: emailData.customerEmail,
        subject: `Exclusive Offer for ${emailData.customerName}!`,
        message: `Hi ${emailData.customerName},\n\nWe have a special offer just for you! Check out the attached poster for details.\n\nDon't miss out on this limited-time opportunity!`,
        posterBase64: emailData.posterBase64,
        posterFilename: emailData.posterFilename,
      }),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to send email');
    }

    return result;
  } catch (error) {
    console.error('Email service error:', error);
    throw error;
  }
}

// Helper function to convert image to base64
export async function imageToBase64(imagePath: string): Promise<string> {
  try {
    const response = await fetch(imagePath);
    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        // Remove the data:image/png;base64, prefix
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error converting image to base64:', error);
    throw error;
  }
}
