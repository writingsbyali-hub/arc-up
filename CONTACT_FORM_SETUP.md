# Contact Form Setup Guide

## Overview

The Get Started page now includes a fully functional contact form with modal popup. This guide explains how to complete the setup.

---

## ✅ What's Already Done

1. **Updated Get Started page** with 4 new personas:
   - Students / Degree-Based Researchers
   - Academics / Independent Researchers
   - Community Practitioners
   - Open Collaborators

2. **Created ContactModal component** with:
   - Name & Email fields (with anonymous option)
   - Persona dropdown
   - Message textarea
   - Experience/Skills checkboxes
   - Contribution level radio buttons
   - Form validation

3. **Added JavaScript interactions**:
   - Modal open/close
   - Anonymous checkbox functionality
   - Form submission handling
   - Keyboard accessibility (Escape to close)

4. **Created Vercel serverless function** (`/api/contact.js`)

5. **Updated community section** with Discord and YouTube links

---

## 🚀 Setup Steps

### Step 1: Get Resend API Key

1. Go to [https://resend.com/signup](https://resend.com/signup)
2. Sign up for a free account (100 emails/day free tier)
3. Verify your email
4. Navigate to **API Keys** in the dashboard
5. Click **Create API Key**
6. Copy the key (starts with `re_...`)

### Step 2: Add Environment Variable to Vercel

**Option A: Via Vercel Dashboard**
1. Go to your project on [https://vercel.com](https://vercel.com)
2. Navigate to **Settings** → **Environment Variables**
3. Add a new variable:
   - **Name**: `RESEND_API_KEY`
   - **Value**: `re_your_api_key_here`
   - **Environments**: Select all (Production, Preview, Development)
4. Click **Save**

**Option B: Via `.env.local` (for local development)**
1. Create a file `.env.local` in the project root
2. Add:
   ```
   RESEND_API_KEY=re_your_api_key_here
   ```
3. **IMPORTANT**: Never commit this file to Git (it's already in `.gitignore`)

### Step 3: Verify Your Domain (Optional but Recommended)

Free Resend accounts can only send from `onboarding@resend.dev`. To send from your own domain:

1. Go to **Domains** in Resend dashboard
2. Click **Add Domain**
3. Enter your domain (e.g., `arcup.org`)
4. Add the DNS records to your domain provider
5. Wait for verification (usually a few minutes)
6. Update `FROM_EMAIL` in `/api/contact.js`:
   ```javascript
   const FROM_EMAIL = 'noreply@yourdomain.com'; // Instead of onboarding@resend.dev
   ```

### Step 4: Deploy to Vercel

```bash
# Commit changes
git add .
git commit -m "Add contact form with modal and serverless backend"

# Push to trigger deployment
git push
```

Vercel will automatically:
- Detect the `/api/contact.js` serverless function
- Build and deploy it
- Make it available at `/api/contact`

---

## 🧪 Testing

### Local Testing

1. Start dev server:
   ```bash
   npm run dev
   ```

2. Navigate to `/get-started`

3. Click any persona to reveal details

4. Click "Join the Field" button

5. Fill out the form and submit

**Note**: Vercel serverless functions don't run in local dev mode. To test locally, you need to use:
```bash
vercel dev
```

### Production Testing

1. After deploying, visit your live site
2. Go to `/get-started`
3. Submit a test form
4. Check your email (`alixarcup@gmail.com`)

---

## 📧 Email Format

Form submissions will be sent to **alixarcup@gmail.com** with this format:

**Subject**: `[ArcUp] New [Persona] Contact`

**Body**:
```
New Contact from Get Started Page
===================================

Persona: Student / Degree-Based Researcher
Name: John Doe
Email: john@example.com

Message:
I'm interested in integrating ArcUp research into my thesis project...

Experience / Skills: research, data-analysis
Contribution Level: active
```

---

## 🎨 Customization Options

### Change Recipient Email

Edit `/api/contact.js`:
```javascript
const TO_EMAIL = 'your-new-email@gmail.com';
```

### Add Discord Webhook (Optional)

Instead of email, you can send to Discord:

1. Create a webhook in your Discord server
2. Update `/api/contact.js`:
   ```javascript
   // Replace Resend code with Discord webhook
   await fetch('YOUR_DISCORD_WEBHOOK_URL', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       content: `**New ${displayPersona} Contact**\n\n**Name**: ${displayName}\n**Email**: ${displayEmail}\n\n**Message**:\n${message}`
     })
   });
   ```

### Modify Form Fields

Edit `/src/components/widgets/ContactModal.astro` to:
- Add new fields
- Remove optional fields
- Change validation rules
- Update styling

---

## 🐛 Troubleshooting

### Form submission fails with "Network error"

**Cause**: API route not found or Vercel function not deployed

**Solution**:
1. Ensure `/api/contact.js` exists
2. Redeploy to Vercel
3. Check Vercel function logs

### Emails not being sent

**Cause**: Missing or invalid Resend API key

**Solution**:
1. Verify `RESEND_API_KEY` is set in Vercel
2. Check the key is valid at [https://resend.com/api-keys](https://resend.com/api-keys)
3. Check Vercel function logs for errors

### Anonymous checkbox doesn't work

**Cause**: JavaScript not loaded properly

**Solution**:
1. Check browser console for errors
2. Verify `/src/scripts/global-interactions.js` is loaded
3. Hard refresh page (Ctrl+Shift+R)

---

## 📝 Next Steps

1. ✅ Set up Resend account and API key
2. ✅ Add environment variable to Vercel
3. ✅ Deploy to production
4. ✅ Test form submission
5. (Optional) Verify custom domain in Resend
6. (Optional) Set up Discord webhook
7. (Optional) Customize email template

---

## 💡 Tips

- **Rate Limiting**: Free Resend tier = 100 emails/day. Add rate limiting if needed.
- **Spam Protection**: Consider adding honeypot field or reCAPTCHA.
- **Analytics**: Track form submissions with your analytics tool.
- **A/B Testing**: Test different CTA button text to optimize conversion.

---

## 🔗 Resources

- [Resend Documentation](https://resend.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Resend Email Limits](https://resend.com/pricing)

---

**Questions?** Reach out on Discord or check the ArcUp workspace!
