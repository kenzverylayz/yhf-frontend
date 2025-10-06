import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { to, subject, message, posterBase64, posterFilename } = await request.json();

    if (!to || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields: to, subject, message' }, { status: 400 });
    }

    const attachments = [];
    if (posterBase64 && posterFilename) {
      attachments.push({
        filename: posterFilename,
        content: posterBase64,
      });
    }

    const data = await resend.emails.send({
      from: 'YHF <onboarding@resend.dev>', // CHANGE TO ANOTHER EMAIL
      to: Array.isArray(to) ? to : [to],
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; margin-bottom: 20px;">Special Offer Just for You!</h2>
          <p style="font-size: 16px; line-height: 1.6; color: #666;">${message}</p>
          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #888; font-size: 14px;">Check out our latest promotional poster attached below!</p>
          </div>
          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
            <p style="color: #999; font-size: 12px;">Best regards,<br>YHF</p>
          </div>
        </div>
      `,
      attachments: attachments,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
