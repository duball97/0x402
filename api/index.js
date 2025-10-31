export default function handler(req, res) {
  res.status(200).json({
    message: "Payx402 API is live",
    version: "1.0.0",
    powered_by: "@CoinbaseDev + x402"
  });
}
