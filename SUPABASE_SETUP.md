# Supabase Setup Instructions

This guide will help you set up Supabase for the Vaultx402 application.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Fill in the project details:
   - **Project Name**: Vaultx402 (or any name you prefer)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the region closest to your users
5. Click "Create new project" and wait for it to initialize (takes ~2 minutes)

## Step 2: Create the Paywalls Table

1. In your Supabase dashboard, navigate to the **SQL Editor** (left sidebar)
2. Click "New query"
3. Copy and paste the contents of `supabase-schema.sql` from this repository
4. Click "Run" to execute the SQL script
5. Verify the table was created by going to **Table Editor** → you should see a `paywalls` table

## Step 3: Get Your API Credentials

1. In your Supabase dashboard, go to **Settings** → **API** (left sidebar)
2. You'll find two important values:
   - **Project URL**: This is your `SUPABASE_URL`
   - **anon public**: This is your `SUPABASE_ANON_KEY`

## Step 4: Configure Environment Variables

1. Copy your `.env.example` file to create a `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and add your Supabase credentials:
   ```env
   SUPABASE_URL=https://your-project-ref.supabase.co
   SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. Replace the placeholder values with the actual credentials from Step 3

## Step 5: Deploy to Vercel (Optional)

If you're deploying to Vercel, you need to add the environment variables there too:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:
   - `SUPABASE_URL` → your Supabase project URL
   - `SUPABASE_ANON_KEY` → your Supabase anon key
4. Redeploy your project for the changes to take effect

## Step 6: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Create a test paywall through your application
3. Check your Supabase dashboard → **Table Editor** → `paywalls` table
4. You should see your newly created paywall entry
5. Try visiting the generated paywall link - it should now work without 404 errors!

## Database Schema Overview

The `paywalls` table contains:

| Column | Type | Description |
|--------|------|-------------|
| `id` | TEXT | Unique paywall ID (Primary Key) |
| `url` | TEXT | The URL to unlock after payment |
| `price` | DECIMAL | Price in the specified currency |
| `currency` | TEXT | Currency type (default: USDC) |
| `status` | TEXT | Paywall status (created, paid, etc.) |
| `wallet_address` | TEXT | Wallet address for receiving payments |
| `network` | TEXT | Blockchain network (default: BNB Chain) |
| `non_custodial` | BOOLEAN | Whether wallet is non-custodial |
| `created_at` | TIMESTAMP | When the paywall was created |
| `updated_at` | TIMESTAMP | When the paywall was last updated |

## Troubleshooting

### Error: "Missing Supabase environment variables"
- Make sure your `.env` file exists and contains `SUPABASE_URL` and `SUPABASE_ANON_KEY`
- Restart your dev server after adding environment variables

### Error: "relation 'paywalls' does not exist"
- Run the SQL script from `supabase-schema.sql` in your Supabase SQL Editor
- Verify the table was created in Table Editor

### 404 Error on Paywall Links
- Verify data is being saved to Supabase (check Table Editor)
- Make sure both `create-paywall.js` and `get-paywall.js` are properly configured
- Check browser console for errors

## Security Notes

- The `anon` key is safe to use in client-side code
- Row Level Security (RLS) is enabled to protect your data
- The current policies allow public read/write access - you may want to restrict this in production
- Never commit your `.env` file to version control
