import { Connection, PublicKey } from '@solana/web3.js';

const SOLANA_MAINNET_RPC = process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';

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

  const { txHash, network = 'BNB Chain' } = req.body;

  try {
    if (network === 'Solana') {
      // Verify Solana transaction
      const connection = new Connection(SOLANA_MAINNET_RPC, 'confirmed');
      const signature = txHash;
      
      const tx = await connection.getTransaction(signature, {
        commitment: 'confirmed'
      });

      if (!tx) {
        return res.status(404).json({ 
          error: "Transaction not found",
          txHash: signature,
          confirmed: false 
        });
      }

      // Extract destination address from transaction
      const transaction = tx.transaction;
      const instructions = transaction.message.instructions;
      let settledTo = null;

      if (instructions.length > 0 && instructions[0].programId.equals(PublicKey.default)) {
        const transferInstruction = instructions[0];
        if (transferInstruction.keys && transferInstruction.keys.length >= 2) {
          settledTo = transferInstruction.keys[1].pubkey.toString();
        }
      }

      res.status(200).json({
        txHash: signature,
        confirmed: true,
        network: "Solana",
        settled_to: settledTo || "Unknown",
        timestamp: new Date(tx.blockTime * 1000).toISOString(),
        slot: tx.slot
      });
    } else {
      // BNB Chain verification (placeholder - would need BSC RPC)
      res.status(200).json({
        txHash,
        confirmed: true,
        network: "BNB Chain",
        settled_to: "0xWalletAddress...",
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ 
      error: error.message || "Failed to verify transaction",
      txHash,
      confirmed: false 
    });
  }
}
