# LockPay

> Crypto-native paywalls powered by BNB Chain and the HTTP 402 protocol

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![BNB Chain](https://img.shields.io/badge/Chain-BNB-yellow.svg)](https://www.bnbchain.org/)

LockPay is a decentralized paywall platform that enables creators, developers, and businesses to monetize digital content with instant BNB payments. Built on the HTTP 402 "Payment Required" protocol, LockPay makes payments programmable for AI agents and automated systems.

## ✨ Features

### Core Features
- **Instant BNB Payments** - Settle payments in 2-5 seconds on BNB Chain
- **Custom Paywall IDs** - Choose memorable, human-readable URLs for your paywalls
- **Non-Custodial** - Full wallet control, payments flow directly from buyer to seller
- **Zero Platform Fees** - Keep 100% of your revenue, only pay gas fees (&lt;$0.01)
- **HTTP 402 Protocol** - Machine-readable payment requirements for AI agents
- **MetaMask Integration** - Seamless wallet connection and payment flow
- **Multi-Decimal Precision** - Support for up to 4 decimal places in BNB pricing

### User Experience
- **Modern, Vercel-Style UI** - Clean, professional dark theme interface
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Real-Time Validation** - Instant feedback on form inputs
- **Live Preview** - See your paywall before publishing
- **One-Click Copy** - Easy sharing of paywall links
- **Smooth Animations** - Polished, professional interactions

### Developer Features
- **RESTful API** - Simple integration with comprehensive endpoints
- **Supabase Backend** - Scalable database for paywall management
- **Vercel Deployment** - Serverless functions for optimal performance
- **React + Vite** - Modern frontend stack
- **TypeScript Ready** - Built with extensibility in mind

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MetaMask browser extension
- Supabase account (for database)
- BNB Chain testnet/mainnet access

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/lockpay.git
cd lockpay
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# BNB Chain Configuration
BNB_CHAIN_RPC_URL=https://bsc-dataseed.binance.org/
BNB_CONTRACT_ADDRESS=native

# Optional: Deployment URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. **Set up the database**

Run the SQL schema in your Supabase project:

```sql
CREATE TABLE paywalls (
  id TEXT PRIMARY KEY,
  url TEXT NOT NULL,
  description TEXT,
  price DECIMAL(18, 8) NOT NULL,
  currency TEXT DEFAULT 'BNB',
  status TEXT DEFAULT 'created',
  wallet_address TEXT NOT NULL,
  network TEXT DEFAULT 'BNB Chain',
  non_custodial BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

5. **Run the development server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see your app running!

## 🏗️ Architecture

### Frontend Stack
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Ethers.js** - Web3 blockchain interactions

### Backend Stack
- **Vercel Serverless Functions** - API endpoints
- **Supabase** - PostgreSQL database
- **Node.js** - Runtime environment

### Blockchain
- **BNB Chain** - Fast, low-cost transactions
- **MetaMask** - Wallet provider
- **Native BNB** - Payment currency

## 📚 How It Works

### Creating a Paywall

1. **Navigate to Create Page** (`/create`)
2. **Enter Details:**
   - Content URL (the protected content)
   - Custom Paywall ID (unique identifier)
   - Price in BNB (min 0.0001)
   - Wallet Address (where payments go)
   - Description (optional)
3. **Submit** - Get an instant shareable paywall link
4. **Share** - Distribute your paywall link

### Paying for Content

1. **Visit Paywall Link** (`/paywall/your-id`)
2. **Review Details** - See price, description, and payment info
3. **Connect MetaMask** - Approve wallet connection
4. **Pay with BNB** - Confirm transaction in MetaMask
5. **Access Content** - Instant redirect after payment confirmation

### HTTP 402 Protocol

LockPay implements the HTTP 402 "Payment Required" standard, making payments discoverable by machines:

```http
HTTP/1.1 402 Payment Required
X-Payment-Required: 0.01 BNB
X-Payment-Address: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb27
X-Payment-Network: bnb-chain
```

This enables AI agents and automated systems to:
- Discover payment requirements programmatically
- Pay for services without human intervention
- Access gated APIs and content autonomously

## 🎨 Design Philosophy

LockPay follows modern web design principles inspired by Vercel:

- **Minimalism** - Clean, uncluttered interfaces
- **Clarity** - Clear information hierarchy
- **Performance** - Fast load times and smooth interactions
- **Accessibility** - WCAG compliant color contrast and navigation
- **Responsiveness** - Works beautifully on all screen sizes

## 🔧 API Reference

### Create Paywall
```http
POST /api/create-paywall
Content-Type: application/json

{
  "url": "https://example.com/premium-content",
  "paywallId": "my-premium-article",
  "price": "0.01",
  "description": "Premium article about Web3",
  "walletAddress": "0x..."
}
```

### Get Paywall
```http
GET /api/get-paywall?id=my-premium-article
```

### Get All Paywalls
```http
GET /api/get-all-paywalls
```

### HTTP 402 Header
```http
GET /api/x402?price=0.01
```

## 🛣️ Roadmap

### Phase 1: Core Features ✅
- [x] BNB payment integration
- [x] Custom paywall IDs
- [x] MetaMask wallet support
- [x] HTTP 402 protocol implementation
- [x] Modern UI/UX redesign

### Phase 2: Enhanced Features (Coming Soon)
- [ ] Multi-chain support (Ethereum, Polygon, Arbitrum)
- [ ] Subscription-based paywalls
- [ ] Analytics dashboard
- [ ] Webhook notifications
- [ ] API key management

### Phase 3: Advanced Features
- [ ] $LOCK token utilities
- [ ] Staking rewards
- [ ] Governance system
- [ ] White-label solutions
- [ ] Enterprise features

## 💡 Use Cases

### Content Creators
- Articles, videos, research papers
- Online courses and tutorials
- Exclusive content and early access
- Premium newsletters

### Developers
- API access (per-request or subscription)
- AI model endpoints
- Data feeds and webhooks
- Developer tools and SDKs

### Businesses
- Digital downloads (software, templates, assets)
- Gated communities and forums
- Professional services
- B2B data access

### AI & Automation
- Agent-to-agent payments
- Autonomous service access
- Programmatic content purchasing
- Machine-readable payment flows

## 🔒 Security

- **Non-Custodial** - Users retain full control of funds
- **On-Chain Verification** - All transactions verified on BNB Chain
- **No Private Keys** - Keys never touch our servers
- **Open Source** - Code is auditable and transparent
- **HTTPS Only** - Encrypted communication
- **Input Validation** - XSS and injection protection

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Website:** [lockpay.io](https://lockpay.io)
- **Documentation:** [lockpay.io/docs](https://lockpay.io/docs)
- **Twitter/X:** [@lockpay](https://x.com/lockpayx402?s=21)
- **GitHub:** [github.com/lockpay](https://github.com/lockpay)

## 🙏 Acknowledgments

- Built on [BNB Chain](https://www.bnbchain.org/)
- Powered by [Supabase](https://supabase.com/)
- Deployed on [Vercel](https://vercel.com/)
- UI inspired by [Vercel Design](https://vercel.com/design)

## 📞 Support

- **Discord:** [Join our community](https://discord.gg/lockpay)
- **Twitter:** [@lockpay](https://x.com/lockpayx402?s=21)
- **Email:** support@lockpay.io

---

**Built with ❤️ for the future of Web3 payments**
