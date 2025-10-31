export default function handler(req, res) {
  res.setHeader("X-Payment-Required", "0.01 BNB");
  res.setHeader("X-Payment-Address", "0x743bc656C34a532952a35b44b69e795f5f0bDEb");
  res.setHeader("X-Payment-Network", "bnb-chain");
  res.setHeader("X-Payment-Memo", "paywall-abc123");

  res.status(402).send("Payment Required");
}
