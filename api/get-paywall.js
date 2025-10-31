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

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Paywall ID is required' });
  }

  // Fetch from Supabase
  const { data, error } = await supabase
    .from('paywalls')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    console.error('Supabase error:', error);
    return res.status(404).json({ error: 'Paywall not found' });
  }

  res.status(200).json({
    id: data.id,
    url: data.url,
    price: data.price.toString(),
    currency: data.currency,
    status: data.status,
    walletAddress: data.wallet_address,
    network: data.network,
    createdAt: data.created_at,
  });
}

