/**
 * Vercel Serverless Function - Contact Form Handler
 *
 * Sends contact form submissions to alixarcup@gmail.com
 * Uses Resend for reliable email delivery
 *
 * SETUP:
 * 1. Install Resend: npm install resend
 * 2. Get API key from: https://resend.com/api-keys
 * 3. Add to Vercel env: RESEND_API_KEY=re_...
 * 4. Verify domain (optional but recommended)
 */

import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Configuration
const TO_EMAIL = 'alixarcup@gmail.com';
const FROM_EMAIL = 'onboarding@resend.dev'; // Use your verified domain

/**
 * Main handler
 */
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  try {
    // Parse form data
    const {
      name,
      email,
      anonymous,
      persona,
      message,
      skills,
      contribution
    } = req.body;

    // Validate required fields
    if (!persona || !message) {
      return res.status(400).json({
        success: false,
        error: 'Persona and message are required'
      });
    }

    // Validate identity fields if not anonymous
    if (!anonymous && (!name || !email)) {
      return res.status(400).json({
        success: false,
        error: 'Name and email are required (or check "Send anonymously")'
      });
    }

    // Build email content
    const displayName = anonymous ? 'Anonymous' : name || 'Not provided';
    const displayEmail = anonymous ? 'Not provided' : email || 'Not provided';
    const displaySkills = Array.isArray(skills) && skills.length > 0
      ? skills.join(', ')
      : 'Not specified';
    const displayContribution = contribution || 'Not specified';

    // Map persona values to display names
    const personaNames = {
      student: 'Student / Degree-Based Researcher',
      researcher: 'Academic / Independent Researcher',
      practitioner: 'Community Practitioner',
      collaborator: 'Open Collaborator'
    };
    const displayPersona = personaNames[persona] || persona;

    // Create email HTML
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
          .header h1 { margin: 0; font-size: 24px; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .field { margin-bottom: 20px; }
          .label { font-weight: bold; color: #4b5563; margin-bottom: 5px; }
          .value { color: #1f2937; padding: 10px; background: white; border-radius: 5px; border-left: 3px solid #667eea; }
          .message-box { background: white; padding: 15px; border-radius: 5px; border: 1px solid #e5e7eb; white-space: pre-wrap; }
          .footer { text-align: center; color: #9ca3af; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚀 New Contact from Get Started Page</h1>
          </div>
          <div class="content">

            <div class="field">
              <div class="label">Persona:</div>
              <div class="value">${displayPersona}</div>
            </div>

            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${displayName}</div>
            </div>

            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${displayEmail}</div>
            </div>

            <div class="field">
              <div class="label">Message:</div>
              <div class="message-box">${message}</div>
            </div>

            ${displaySkills !== 'Not specified' ? `
            <div class="field">
              <div class="label">Experience / Skills:</div>
              <div class="value">${displaySkills}</div>
            </div>
            ` : ''}

            ${displayContribution !== 'Not specified' ? `
            <div class="field">
              <div class="label">Contribution Level:</div>
              <div class="value">${displayContribution}</div>
            </div>
            ` : ''}

          </div>
          <div class="footer">
            Sent via ArcUp Get Started form • ${new Date().toLocaleString()}
          </div>
        </div>
      </body>
      </html>
    `;

    // Create plain text version
    const emailText = `
New Contact from Get Started Page
===================================

Persona: ${displayPersona}
Name: ${displayName}
Email: ${displayEmail}

Message:
${message}

Experience / Skills: ${displaySkills}
Contribution Level: ${displayContribution}

---
Sent via ArcUp Get Started form
${new Date().toLocaleString()}
    `;

    // Send email via Resend
    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `[ArcUp] New ${displayPersona} Contact`,
      html: emailHtml,
      text: emailText,
      replyTo: !anonymous && email ? email : undefined
    });

    // Success response
    return res.status(200).json({
      success: true,
      message: 'Message sent successfully!',
      id: data.id
    });

  } catch (error) {
    console.error('Contact form error:', error);

    return res.status(500).json({
      success: false,
      error: 'Failed to send message. Please try again or contact us directly.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
