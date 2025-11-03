-- Create the paywalls table in Supabase
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS paywalls (
  id TEXT PRIMARY KEY,
  url TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'USDC',
  status TEXT DEFAULT 'created',
  wallet_address TEXT NOT NULL,
  network TEXT DEFAULT 'BNB Chain',
  non_custodial BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add an index on created_at for faster queries
CREATE INDEX IF NOT EXISTS idx_paywalls_created_at ON paywalls(created_at DESC);

-- Add an index on status for filtering
CREATE INDEX IF NOT EXISTS idx_paywalls_status ON paywalls(status);

-- Enable Row Level Security (RLS)
ALTER TABLE paywalls ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows public read access to paywalls
-- (needed for the public API to fetch paywall data)
DROP POLICY IF EXISTS "Allow public read access to paywalls" ON paywalls;
CREATE POLICY "Allow public read access to paywalls"
  ON paywalls
  FOR SELECT
  USING (true);

-- Create a policy that allows public insert access to paywalls
-- (needed for the public API to create paywalls)
DROP POLICY IF EXISTS "Allow public insert access to paywalls" ON paywalls;
CREATE POLICY "Allow public insert access to paywalls"
  ON paywalls
  FOR INSERT
  WITH CHECK (true);

-- Optional: Create a policy to allow updates (for payment status changes)
DROP POLICY IF EXISTS "Allow public update access to paywalls" ON paywalls;
CREATE POLICY "Allow public update access to paywalls"
  ON paywalls
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Create the purchases table to track user purchases
CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  paywall_id TEXT NOT NULL REFERENCES paywalls(id) ON DELETE CASCADE,
  buyer_wallet_address TEXT NOT NULL,
  transaction_hash TEXT NOT NULL,
  network TEXT NOT NULL,
  amount_paid DECIMAL(18, 8) NOT NULL,
  currency TEXT NOT NULL,
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(paywall_id, buyer_wallet_address, transaction_hash)
);

-- Add indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_purchases_buyer ON purchases(buyer_wallet_address);
CREATE INDEX IF NOT EXISTS idx_purchases_paywall ON purchases(paywall_id);
CREATE INDEX IF NOT EXISTS idx_purchases_purchased_at ON purchases(purchased_at DESC);
CREATE INDEX IF NOT EXISTS idx_purchases_tx_hash ON purchases(transaction_hash);

-- Enable Row Level Security (RLS)
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows public read access to purchases (users can see their own purchases)
DROP POLICY IF EXISTS "Allow public read access to purchases" ON purchases;
CREATE POLICY "Allow public read access to purchases"
  ON purchases
  FOR SELECT
  USING (true);

-- Create a policy that allows public insert access to purchases
DROP POLICY IF EXISTS "Allow public insert access to purchases" ON purchases;
CREATE POLICY "Allow public insert access to purchases"
  ON purchases
  FOR INSERT
  WITH CHECK (true);