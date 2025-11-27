import { ethers } from 'ethers';

const MONAD_RPC = process.env.MONAD_RPC_URL || 'https://monad-mainnet.g.alchemy.com/v2/M87svOeOrOhMsnQWJXB8iQECjn8MJNW0';

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

  const { txHash, network = 'Monad' } = req.body;

  try {
    // Verify Monad transaction (EVM-compatible)
    const provider = new ethers.JsonRpcProvider(MONAD_RPC);
    const tx = await provider.getTransaction(txHash);

    if (!tx) {
      return res.status(404).json({ 
        error: "Transaction not found",
        txHash: txHash,
        confirmed: false 
      });
    }

    // Get transaction receipt to check confirmation
    const receipt = await provider.getTransactionReceipt(txHash);

    if (!receipt) {
      return res.status(200).json({
        txHash: txHash,
        confirmed: false,
        network: "Monad",
        settled_to: tx.to || "Unknown",
        timestamp: new Date().toISOString(),
        message: "Transaction pending confirmation"
      });
    }

    res.status(200).json({
      txHash: txHash,
      confirmed: true,
      network: "Monad",
      settled_to: receipt.to || tx.to || "Unknown",
      timestamp: new Date().toISOString(),
      blockNumber: receipt.blockNumber
    });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ 
      error: error.message || "Failed to verify transaction",
      txHash,
      confirmed: false 
    });
  }
}
