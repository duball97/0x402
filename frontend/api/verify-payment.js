export default function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { txHash } = req.body;

  res.status(200).json({
    txHash,
    confirmed: true,
    network: "BNB Chain",
    settled_to: "0xWalletAddress...",
    timestamp: new Date().toISOString()
  });
}
