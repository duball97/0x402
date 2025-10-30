import express from "express";
const router = express.Router();

router.get("/x402", (req, res) => {
  res.set({
    "X-Payment-Required": "2.99 USDC",
    "X-Payment-Address": "0x743bc656C34a532952a35b44b69e795f5f0bDEb",
    "X-Payment-Network": "bnb-chain",
    "X-Payment-Memo": "paywall-abc123"
  });
  res.status(402).send("Payment Required");
});

export default router;
