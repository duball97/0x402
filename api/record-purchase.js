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

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { paywallId, buyerWalletAddress, transactionHash, network, amountPaid, currency } = req.body;

  // Validation
  if (!paywallId || !buyerWalletAddress || !transactionHash || !network || !amountPaid || !currency) {
    return res.status(400).json({ 
      error: 'Missing required fields',
      required: ['paywallId', 'buyerWalletAddress', 'transactionHash', 'network', 'amountPaid', 'currency']
    });
  }

  try {
    // Check if purchase already exists (to prevent duplicates)
    const { data: existingPurchase } = await supabase
      .from('purchases')
      .select('id')
      .eq('transaction_hash', transactionHash)
      .eq('paywall_id', paywallId)
      .eq('buyer_wallet_address', buyerWalletAddress)
      .single();

    if (existingPurchase) {
      return res.status(200).json({ 
        message: 'Purchase already recorded',
        purchaseId: existingPurchase.id 
      });
    }

    // Insert purchase record
    const { data, error } = await supabase
      .from('purchases')
      .insert([{
        paywall_id: paywallId,
        buyer_wallet_address: buyerWalletAddress,
        transaction_hash: transactionHash,
        network: network,
        amount_paid: parseFloat(amountPaid),
        currency: currency
      }])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to record purchase', details: error.message });
    }

    res.status(200).json({
      success: true,
      purchaseId: data.id,
      message: 'Purchase recorded successfully'
    });
  } catch (error) {
    console.error('Error recording purchase:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to record purchase' 
    });
  }
}

