import { createWallet } from "./wallet.js";

export default function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url, price, walletAddress } = req.body;
  const id = Math.random().toString(36).substring(2, 8);

  // If no wallet provided, create a new one
  let wallet;
  if (!walletAddress) {
    wallet = createWallet("demo-passkey");
  } else {
    wallet = {
      walletAddress: walletAddress,
      network: "BNB Chain",
      nonCustodial: true
    };
  }

  const baseDomain = process.env.BASE_DOMAIN || process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  res.status(200).json({
    paywall_id: id,
    paywall_link: `${baseDomain}/paywall/${id}`,
    price,
    currency: "USDC",
    status: "created",
    walletAddress: wallet.walletAddress,
    network: wallet.network,
    nonCustodial: wallet.nonCustodial
  });
}
