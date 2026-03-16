export default async function handler(req, res) {
  // Add CORS headers for local development if needed
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email } = req.body;
  const RESEND_API_KEY = process.env.VITE_RESEND_API_KEY;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  if (!RESEND_API_KEY) {
    return res.status(500).json({ error: 'VITE_RESEND_API_KEY is not configured' });
  }

  try {
    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background-color: #050505; color: #ffffff; border-radius: 24px; border: 1px solid rgba(255,255,255,0.1);">
        <div style="margin-bottom: 32px; text-align: center;">
          <span style="font-size: 40px;">🚀</span>
        </div>
        <h1 style="font-size: 28px; font-weight: 800; margin-bottom: 24px; background: linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-align: center;">
          Welcome to the EcoInsight Waitlist!
        </h1>
        <p style="font-size: 16px; line-height: 1.6; color: #a1a1aa; margin-bottom: 24px; text-align: center;">
          You're officially in.
        </p>
        <div style="background: rgba(255,255,255,0.03); padding: 24px; border-radius: 16px; border: 1px dashed rgba(255,255,255,0.1); margin-bottom: 32px;">
          <p style="font-size: 16px; line-height: 1.6; color: #ffffff; margin-bottom: 16px;">
            I’m building EcoInsight to make financial markets easier to understand using AI, and it means a lot to have you here this early.
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #ffffff; margin-bottom: 0;">
            I’ll be sharing updates and progress as we get closer to launch. Thanks for being part of the journey from the beginning.
          </p>
        </div>
        <div style="padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center;">
          <p style="font-size: 16px; font-weight: 700; color: #ffffff; margin: 0;">— Shivam</p>
          <p style="font-size: 14px; color: #8b5cf6; margin: 4px 0 0 0;">Founder, EcoInsight</p>
        </div>
        <div style="margin-top: 40px; text-align: center; font-size: 12px; color: rgba(255,255,255,0.3);">
          Sent to ${email} • EcoInsight Bharat Edition
        </div>
      </div>
    `;

    console.log(`Attempting to send email to ${email} using Resend API Key: ${RESEND_API_KEY ? 'Present' : 'Missing'}`);

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'EcoInsight <onboarding@joinecoinsight.dev>',
        to: [email],
        subject: '🚀 Welcome to the EcoInsight Waitlist!',
        html: html,
        tags: [
          { name: 'category', value: 'welcome-template' }
        ]
      }),
    });

    const data = await response.json();
    console.log('Resend API Response Status:', response.status);
    console.log('Resend API Response Body:', JSON.stringify(data));

    if (!response.ok) {
      // Return the specific Resend error to the client for debugging
      return res.status(response.status).json({ 
        error: data.message || 'Resend API failed', 
        details: data 
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Vercel API Handler Error:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}
