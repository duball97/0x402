import { supabase } from './supabase.js';
import { ethers } from 'ethers';

// Helper function to create a wallet
function createWallet(network = 'Monad') {
  // Generate Ethereum-style address for Monad (EVM-compatible)
  const wallet = ethers.Wallet.createRandom();
    return {
    walletAddress: wallet.address,
      network: network,
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

  const { url, price, walletAddress, description, paywallId, network: selectedNetwork } = req.body;
  
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
    const network = selectedNetwork || 'Monad';
    wallet = createWallet(network);
  } else {
    // Validate wallet address (EVM format for Monad)
    const network = selectedNetwork || 'Monad';
      if (!ethers.isAddress(walletAddress)) {
      return res.status(400).json({ error: "Invalid Monad wallet address. Please enter a valid EVM address (0x...)" });
    }

    wallet = {
      walletAddress: walletAddress,
      network: network,
      nonCustodial: true
    };
  }

  // Determine base domain for generated links
  const isProd = (process.env.VERCEL_ENV === 'production') || (process.env.NODE_ENV === 'production');
  let rawBase = process.env.PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.BASE_DOMAIN ||
    (isProd ? 'https://monadpay.io' : (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'));

  // Fallback: try to get from request headers if available
  if (!rawBase || rawBase === 'undefined' || rawBase === 'null') {
    const host = req.headers?.host || req.headers?.['x-forwarded-host'];
    const protocol = req.headers?.['x-forwarded-proto'] || (req.headers?.referer?.startsWith('https') ? 'https' : 'http');
    if (host) {
      rawBase = `${protocol}://${host}`;
    } else {
      rawBase = 'https://monadpay.io'; // Ultimate fallback
    }
  }

  // Normalize (remove trailing slash)
  const baseDomain = rawBase.endsWith('/') ? rawBase.slice(0, -1) : rawBase;
  
  // Ensure baseDomain is valid
  if (!baseDomain || baseDomain.includes('undefined') || baseDomain.includes('null')) {
    console.error('Invalid baseDomain detected:', baseDomain);
    return res.status(500).json({ error: 'Server configuration error. Please contact support.' });
  }

  // Determine currency based on network
  const getCurrency = (network) => {
    if (network === 'Monad') return 'MON';
    return 'MON';
  };

  const paywallData = {
    id,
    url,
    description: description || null,
    price: parseFloat(price),
    currency: getCurrency(selectedNetwork),
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

  // Ensure we have valid data before responding
  if (!data || !Array.isArray(data) || data.length === 0) {
    console.error('Supabase insert returned no data');
    return res.status(500).json({ error: 'Failed to create paywall. Please try again.' });
  }

  const paywallLink = `${baseDomain}/paywall/${id}`;
  
  // Validate the link was constructed correctly
  if (!paywallLink || !paywallLink.includes('/paywall/')) {
    console.error('Invalid paywall link constructed:', paywallLink);
    return res.status(500).json({ error: 'Server configuration error. Please contact support.' });
  }

  const responseData = {
    paywall_id: id,
    paywall_link: paywallLink,
    price,
    currency: getCurrency(selectedNetwork),
    status: "created",
    walletAddress: wallet.walletAddress,
    network: wallet.network,
    nonCustodial: wallet.nonCustodial
  };

  // Log for debugging (remove in production if needed)
  console.log('Paywall created successfully:', { id, paywall_link: paywallLink, network: wallet.network });

  res.status(200).json(responseData);
}
