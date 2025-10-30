# Payfirst Setup Guide 🚀

Turn any link into instant crypto revenue with Payfirst!

## TL;DR - Quickest Start

1. **Install:** `npm install`
2. **Create `.env` file:** Copy `.env.example` and update `BASE_DOMAIN` to your domain
3. **Run both:** `npm run dev:all` (runs both backend and frontend)
4. **Open:** Browser opens automatically at `http://localhost:5173`
5. **Test:** Create a paywall!

---

## Quick Start (Detailed)

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Environment File

Copy the example environment file:

```bash
cp .env.example .env
```

### 3. Configure Environment Variables

Create a `.env` file in the project root with these contents:

```env
# Server configuration
PORT=8080
FRONTEND_URL=http://localhost:5173

# Your domain (change this to your actual domain)
BASE_DOMAIN=https://yourdomain.com

# Your BNB Chain wallet address for receiving payments
WALLET_ADDRESS=your_bnb_chain_wallet_address_here
```

**Important:**
- Change `BASE_DOMAIN` to your actual domain to avoid using `payfirst.app`
- Add your wallet address to receive payments
- All payments will go to the wallet address you specify

For production, see [ENV_KEYS.md](./ENV_KEYS.md) for what you need:
- Coinbase CDP keys (for real wallets)
- BNB Chain RPC URL (for real blockchain verification)
- Daimo Pay - NO API KEY needed (it's just a package)

📖 **Full env guide:** See `ENV_KEYS.md` for details on each variable.

### 4. Run the Application

```bash
# Run both backend and frontend together (recommended)
npm run dev:all

# OR run them separately:
# Terminal 1 - Backend with auto-reload
npm run dev

# Terminal 2 - Frontend (React + Vite)
npm run frontend:dev

# Production mode (backend only - requires built frontend)
npm start
```

The API will be available at: `http://localhost:8080`
The frontend will be available at: `http://localhost:5173`

---

## Testing the API

### Test the Health Endpoint

```bash
curl http://localhost:8080/
```

You should see:
```json
{
  "message": "Payfirst API is live",
  "version": "1.0.0",
  "powered_by": "@CoinbaseDev + x402"
}
```

### Create a Demo Paywall

```bash
curl -X POST http://localhost:8080/create-paywall \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com/article", "price": "2.99"}'
```

You should see:
```json
{
  "paywall_id": "abc123",
  "paywall_link": "https://payfirst.app/abc123",
  "price": "2.99",
  "currency": "USDC",
  "status": "created"
}
```

### Test x402 Protocol

Open in browser or use curl:
```bash
curl -i http://localhost:8080/x402
```

---

## Frontend Setup

The frontend is now built with **React + Vite** for a modern development experience!

### Development Mode

```bash
# Run frontend dev server
npm run frontend:dev
```

The Vite dev server will:
- Auto-reload on file changes
- Proxy API requests to the backend
- Provide fast HMR (Hot Module Replacement)

### Build for Production

```bash
# Build the frontend
npm run frontend:build

# Preview the production build
npm run frontend:preview
```

The built files will be in the `dist` folder, which the backend serves in production.

### Test the Frontend

1. Make sure your backend API is running: `npm run dev`
2. Start the frontend: `npm run frontend:dev` (or use `npm run dev:all` to run both)
3. Open `http://localhost:5173` in your browser
4. Fill in the form and create a paywall
5. You should see your paywall link with your configured domain

---

## For Production Integration

When you're ready to integrate real blockchain payments, you'll need:

### 1. Coinbase CDP Account
- Sign up at: https://portal.cdp.coinbase.com/
- Get your API credentials
- Add to `.env`:
```env
COINBASE_API_KEY=your_key_here
COINBASE_API_SECRET=your_secret_here
```

### 2. BNB Chain RPC
- Use public RPC or get your own from Infura/Alchemy
- Add to `.env`:
```env
BNB_CHAIN_RPC_URL=https://bsc-dataseed.binance.org/
```

### 3. Daimo Pay (for multi-crypto support) - NO API KEY NEEDED!

Daimo Pay is installed as a package, not an API service:

```bash
# Install Daimo Pay SDK
npm install @daimo/pay wagmi viem@^2.22.0 @tanstack/react-query
```

See [Daimo Pay Docs](https://paydocs.daimo.com/quickstart) for integration. It's a React component that handles cross-chain payments automatically.

### 4. USDC Contract Address
```env
USDC_CONTRACT_ADDRESS=0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d
```

---

## Common Issues

### Issue: "Cannot use import statement outside a module"

**Solution:** Add this to `package.json`:
```json
{
  "type": "module"
}
```

### Issue: Port already in use

**Solution:** Change `PORT` in `.env` to a different port like `8081`

### Issue: CORS errors in frontend

**Solution:** Make sure `cors` middleware is enabled in `api/paywall.js` (it already is!)

---

## Next Steps

1. ✅ Run the basic server (current state - simulates everything)
2. 🔄 Integrate Coinbase CDP for wallet creation
3. 🔄 Add BNB Chain transaction verification
4. 🔄 Integrate Daimo Pay for multi-crypto support
5. 🔄 Add database for persistent paywall storage
6. 🔄 Implement passkey authentication
7. 🔄 Deploy to production

---

## Current Limitations

- ⚠️ All paywall creation is simulated (no database storage)
- ⚠️ Payment verification is simulated (no blockchain interaction)
- ⚠️ Wallet creation is mocked (no actual Coinbase CDP integration)
- ⚠️ No passkey authentication yet
- ⚠️ No multi-crypto payment processing yet

The skeleton is ready - now integrate the real services!

