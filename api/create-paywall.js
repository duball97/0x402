import { supabase } from './supabase.js';

// Helper function to create a wallet
function createWallet(passkey) {
  return {
    walletAddress: `0x${Math.random().toString(16).slice(2, 42)}`,
    passkey,
    network: "BNB Chain",
    nonCustodial: true
  };
}

export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url, price, walletAddress, description, paywallId } = req.body;
  
  // Validate paywallId
  if (!paywallId) {
    return res.status(400).json({ error: "Paywall ID is required" });
  }
  if (!/^[a-zA-Z0-9-_]+$/.test(paywallId)) {
    return res.status(400).json({ error: "Paywall ID can only contain letters, numbers, hyphens, and underscores" });
  }
  
  // Check if ID already exists
  const { data: existingPaywall } = await supabase
    .from('paywalls')
    .select('id')
    .eq('id', paywallId)
    .single();
  
  if (existingPaywall) {
    return res.status(400).json({ error: "This Paywall ID is already taken. Please choose another one." });
  }
  
  const id = paywallId;

  // If no wallet provided, create a new one
  let wallet;
  if (!walletAddress) {
    wallet = createWallet("demo-passkey");
  } else {
    wallet = {
      walletAddress: walletAddress,
      network: "BNB Chain",
      nonCustodial: true
    };
  }

  const baseDomain = process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.BASE_DOMAIN ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  const paywallData = {
    id,
    url,
    description: description || null,
    price: parseFloat(price),
    currency: "BNB",
    status: "created",
    wallet_address: wallet.walletAddress,
    network: wallet.network,
    non_custodial: wallet.nonCustodial,
    created_at: new Date().toISOString()
  };

  // Save to Supabase
  const { data, error } = await supabase
    .from('paywalls')
    .insert([paywallData])
    .select();

  if (error) {
    console.error('Supabase error:', error);
    return res.status(500).json({ error: 'Failed to create paywall', details: error.message });
  }

  res.status(200).json({
    paywall_id: id,
    paywall_link: `${baseDomain}/paywall/${id}`,
    price,
    currency: "BNB",
    status: "created",
    walletAddress: wallet.walletAddress,
    network: wallet.network,
    nonCustodial: wallet.nonCustodial
  });
}
