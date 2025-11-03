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

  const { walletAddress } = req.query;

  if (!walletAddress) {
    return res.status(400).json({ error: 'Wallet address is required' });
  }

  try {
    // Fetch purchases with joined paywall data
    const { data, error } = await supabase
      .from('purchases')
      .select(`
        id,
        paywall_id,
        transaction_hash,
        network,
        amount_paid,
        currency,
        purchased_at,
        paywalls (
          id,
          url,
          description,
          price,
          currency,
          network
        )
      `)
      .eq('buyer_wallet_address', walletAddress)
      .order('purchased_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to fetch purchases', details: error.message });
    }

    // Format the response
    const formattedPurchases = data.map(purchase => ({
      id: purchase.id,
      paywallId: purchase.paywall_id,
      transactionHash: purchase.transaction_hash,
      network: purchase.network,
      amountPaid: Number(purchase.amount_paid),
      currency: purchase.currency,
      purchasedAt: purchase.purchased_at,
      paywall: purchase.paywalls ? {
        id: purchase.paywalls.id,
        url: purchase.paywalls.url,
        description: purchase.paywalls.description,
        price: Number(purchase.paywalls.price),
        currency: purchase.paywalls.currency,
        network: purchase.paywalls.network
      } : null
    }));

    res.status(200).json({
      purchases: formattedPurchases,
      count: formattedPurchases.length
    });
  } catch (error) {
    console.error('Error fetching purchases:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to fetch purchases' 
    });
  }
}

