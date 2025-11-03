import { supabase } from './supabase.js';
import { Keypair, PublicKey } from '@solana/web3.js';
import { ethers } from 'ethers';

// Helper function to create a wallet
function createWallet(network = 'BNB Chain') {
  if (network === 'Solana') {
    // Generate a proper Solana keypair
    const keypair = Keypair.generate();
    const publicKey = keypair.publicKey.toBase58();
    return {
      walletAddress: publicKey,
      network: network,
      nonCustodial: true
    };
  } else {
    // Generate Ethereum-style address for BNB Chain
    return {
      walletAddress: `0x${Math.random().toString(16).slice(2, 42)}`,
      network: network,
      nonCustodial: true
    };
  }
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
    wallet = createWallet(selectedNetwork);
  } else {
    // Validate wallet address based on network
    const network = selectedNetwork || 'BNB Chain';
    if (network === 'Solana') {
      try {
        // Validate Solana address
        new PublicKey(walletAddress);
      } catch (err) {
        return res.status(400).json({ error: "Invalid Solana wallet address" });
      }
    } else {
      // Validate BNB Chain address (Ethereum format)
      if (!ethers.isAddress(walletAddress)) {
        return res.status(400).json({ error: "Invalid BNB Chain wallet address" });
      }
    }
    
    wallet = {
      walletAddress: walletAddress,
      network: network,
      nonCustodial: true
    };
  }

  // Determine base domain for generated links
  const isProd = (process.env.VERCEL_ENV === 'production') || (process.env.NODE_ENV === 'production');
  const rawBase = process.env.PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.BASE_DOMAIN ||
    (isProd ? 'https://lockpay.io' : (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'));

  // Normalize (remove trailing slash)
  const baseDomain = rawBase.endsWith('/') ? rawBase.slice(0, -1) : rawBase;

  const paywallData = {
    id,
    url,
    description: description || null,
    price: parseFloat(price),
    currency: selectedNetwork === 'Solana' ? 'SOL' : 'BNB',
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
    currency: selectedNetwork === 'Solana' ? 'SOL' : 'BNB',
    status: "created",
    walletAddress: wallet.walletAddress,
    network: wallet.network,
    nonCustodial: wallet.nonCustodial
  });
}
