import { supabase } from './supabase.js';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { data, error } = await supabase
      .from('paywalls')
      .select('id, url, description, price, currency, created_at')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Supabase error (get-all-paywalls):', error);
      res.status(500).json({ error: 'Failed to fetch paywalls', details: error.message });
      return;
    }

    res.status(200).json({ paywalls: data ?? [] });
  } catch (e) {
    console.error('Unhandled error (get-all-paywalls):', e);
    res.status(500).json({ error: 'Server error' });
  }
}

import { supabase } from './supabase.js';

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

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Fetch all paywalls from Supabase
    const { data, error } = await supabase
      .from('paywalls')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to fetch paywalls', details: error.message });
    }

    // Format the response
    const paywalls = data.map(item => ({
      id: item.id,
      url: item.url,
      description: item.description || 'Premium content behind this paywall',
      price: item.price.toString(),
      currency: item.currency,
      status: item.status,
      walletAddress: item.wallet_address,
      network: item.network,
      createdAt: item.created_at,
    }));

    res.status(200).json({
      paywalls,
      count: paywalls.length
    });
  } catch (err) {
    console.error('Error fetching paywalls:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
