# Environment Variables Guide 🔑

This file explains what each environment variable is for and where to get it.

---

## Required Environment Variables

### 1. PORT (Server Port)
```env
PORT=8080
```
**What it is:** The port your backend API will run on  
**Default:** 8080  
**Where to get it:** Just pick a port number!

---

### 2. NODE_ENV (Environment)
```env
NODE_ENV=development
```
**What it is:** Set to `development` or `production`  
**Default:** development  
**Options:** development | production

---

### 3. COINBASE_API_KEY (Coinbase CDP Key)
```env
COINBASE_API_KEY=your_coinbase_api_key_here
```
**What it is:** Your Coinbase CDP API key for wallet creation  
**Why:** Powers wallet creation, passkey authentication, and ERC-4337 smart wallets  
**Where to get it:**
1. Go to https://portal.cdp.coinbase.com/
2. Sign up or log in
3. Create a new app
4. Copy your API key

**Docs:** https://docs.cdp.coinbase.com/

---

### 4. COINBASE_API_SECRET (Coinbase CDP Secret)
```env
COINBASE_API_SECRET=your_coinbase_api_secret_here
```
**What it is:** Your Coinbase CDP API secret (keep this private!)  
**Why:** Required along with API key for authentication  
**Where to get it:** Same place as API key above  
**⚠️ SECURITY:** Never commit this to git!

---

### 5. BNB_CHAIN_RPC_URL (BNB Chain RPC)
```env
BNB_CHAIN_RPC_URL=https://bsc-dataseed.binance.org/
```
**What it is:** RPC endpoint for BNB Chain  
**Why:** Used to verify payments and read blockchain state  
**Where to get it:**

**Option 1: Public RPC (Free but rate-limited)**
- Mainnet: https://bsc-dataseed.binance.org/
- Testnet: https://data-seed-prebsc-1-s1.binance.org:8545/

**Option 2: Get your own (Recommended for production)**
- **Infura:** https://infura.io/ → Create project → Get BNB Chain endpoint
- **Alchemy:** https://www.alchemy.com/ → Create app → Get endpoint
- **QuickNode:** https://www.quicknode.com/ → Create endpoint
- **Ankr:** https://www.ankr.com/rpc/bsc/

**BNB Chain Docs:** https://www.bnbchain.org/en/developers/rpc/

---

### 6. USDC_CONTRACT_ADDRESS (USDC on BNB Chain)
```env
USDC_CONTRACT_ADDRESS=0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d
```
**What it is:** USDC token contract address on BNB Chain  
**Why:** This is where all payments settle  
**Default:** Mainnet USDC address (already set)

**Other networks:**
- BNB Mainnet: `0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d`
- BNB Testnet: `0x64544969e7c1FE07b55a12c26a8Fa2f9C46bb862`

---

## Optional Environment Variables

### DAIMO_API_KEY (DEPRECATED - Not Needed!)
```env
DAIMO_API_KEY=not_needed_anymore
```
**Old info:** This was listed as optional  
**New info:** Daimo Pay doesn't use API keys!  
**What to do:** Install `@daimo/pay` as a package instead

**Daimo Docs:** https://paydocs.daimo.com/quickstart

---

## Complete .env File Example

```env
# Server Configuration
PORT=8080
NODE_ENV=development

# Coinbase CDP API Keys
# Get from: https://portal.cdp.coinbase.com/
COINBASE_API_KEY=your_actual_key_here
COINBASE_API_SECRET=your_actual_secret_here

# BNB Chain RPC
# Get from: https://www.bnbchain.org/en/developers/rpc/
BNB_CHAIN_RPC_URL=https://bsc-dataseed.binance.org/

# USDC Contract on BNB Chain
USDC_CONTRACT_ADDRESS=0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d
```

---

## Testing Without API Keys

The current codebase **simulates** everything, so you can test without real API keys:

```env
PORT=8080
NODE_ENV=development
```

⚠️ **Note:** For real payments, you MUST get the Coinbase and BNB Chain credentials!

---

## Production Checklist

Before deploying to production:

- [ ] Replace public BNB Chain RPC with your own (Infura/Alchemy)
- [ ] Get production Coinbase CDP credentials
- [ ] Use mainnet USDC contract address
- [ ] Set `NODE_ENV=production`
- [ ] Store secrets securely (use environment variables, not hardcoded)
- [ ] Never commit `.env` to git (it's already in `.gitignore`)

---

## Support

If you need help getting API keys:
- Coinbase CDP: https://docs.cdp.coinbase.com/
- BNB Chain: https://www.bnbchain.org/en/developers/
- Daimo Pay: https://paydocs.daimo.com/

