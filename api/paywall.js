import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import x402Router from "./x402.js";
import { createWallet } from "./wallet.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());

// CORS configuration - allow Vite dev server
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Serve frontend static files (production build)
const distPath = path.join(__dirname, "../dist");
app.use(express.static(distPath));

app.get("/", (req, res) => {
  res.json({
    message: "LockPay API is live",
    version: "1.0.0",
    powered_by: "@CoinbaseDev + x402"
  });
});

// x402 Protocol endpoint
app.use("/", x402Router);

// Create paywall with wallet
app.post("/create-paywall", (req, res) => {
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
  
  const baseDomain = process.env.BASE_DOMAIN || `http://localhost:${PORT}`;

  res.json({
    paywall_id: id,
    paywall_link: `${baseDomain}/paywall/${id}`,
    price,
    currency: "USDC",
    status: "created",
    walletAddress: wallet.walletAddress,
    network: wallet.network,
    nonCustodial: wallet.nonCustodial
  });
});

// Simulate payment verification
app.post("/verify-payment", (req, res) => {
  const { txHash } = req.body;
  res.json({
    txHash,
    confirmed: true,
    network: "BNB Chain",
    settled_to: "0xWalletAddress...",
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 LockPay API running on port ${PORT}`);
  console.log(`💡 For development, run: npm run frontend:dev`);
  console.log(`🌐 Frontend will be available at: http://localhost:3000`);
});
