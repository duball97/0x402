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
CREATE POLICY "Allow public read access to paywalls"
  ON paywalls
  FOR SELECT
  USING (true);

-- Create a policy that allows public insert access to paywalls
-- (needed for the public API to create paywalls)
CREATE POLICY "Allow public insert access to paywalls"
  ON paywalls
  FOR INSERT
  WITH CHECK (true);

-- Optional: Create a policy to allow updates (for payment status changes)
CREATE POLICY "Allow public update access to paywalls"
  ON paywalls
  FOR UPDATE
  USING (true)
  WITH CHECK (true);
