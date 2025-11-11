import { supabase } from './supabase.js';
import { Keypair, PublicKey } from '@solana/web3.js';
import { ethers } from 'ethers';

// Zcash address validation (supports transparent and shielded addresses)
function isValidZcashAddress(address) {
  if (!address || typeof address !== 'string') return false;

  // Transparent addresses: t1 (mainnet) or t2 (testnet) - 35 chars
  const transparentRegex = /^t[12][a-zA-Z0-9]{33}$/;
  
  // Sapling shielded addresses: zs1 (mainnet) or ztestsapling (testnet) - variable length
  const saplingRegex = /^zs1[a-z0-9]{75}$/;
  const testnetSaplingRegex = /^ztestsapling1[a-z0-9]{64}$/;
  
  // Sprout shielded addresses: zc (legacy, ~95 chars)
  const sproutRegex = /^zc[a-zA-Z0-9]{93}$/;
  
  // Unified addresses: u1 (mainnet) - variable length, can be 141+ chars
  const unifiedRegex = /^u1[a-z0-9]{100,}$/;
  
  return transparentRegex.test(address) || 
         saplingRegex.test(address) || 
         testnetSaplingRegex.test(address) ||
         sproutRegex.test(address) ||
         unifiedRegex.test(address);
}

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

  // If no wallet provided, create a new one (except for Zcash which requires manual address)
  let wallet;
  if (!walletAddress) {
    const network = selectedNetwork || 'BNB Chain';
    if (network === 'Zcash') {
      return res.status(400).json({ error: "A Zcash address is required. Zcash addresses cannot be auto-generated." });
    }
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
    } else if (network === 'Zcash') {
      // Validate Zcash address (transparent or shielded)
      if (!isValidZcashAddress(walletAddress)) {
        return res.status(400).json({ error: "Invalid Zcash address. Please enter a valid shielded (zs1, u1) or transparent (t1) address." });
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
  let rawBase = process.env.PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.BASE_DOMAIN ||
    (isProd ? 'https://vaultx402.io' : (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'));

  // Fallback: try to get from request headers if available
  if (!rawBase || rawBase === 'undefined' || rawBase === 'null') {
    const host = req.headers?.host || req.headers?.['x-forwarded-host'];
    const protocol = req.headers?.['x-forwarded-proto'] || (req.headers?.referer?.startsWith('https') ? 'https' : 'http');
    if (host) {
      rawBase = `${protocol}://${host}`;
    } else {
      rawBase = 'https://vaultx402.io'; // Ultimate fallback
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
    if (network === 'Solana') return 'SOL';
    if (network === 'Zcash') return 'ZEC';
    return 'BNB';
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
