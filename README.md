# BaseSwap Scout

![BaseSwap Scout](https://img.shields.io/badge/BaseSwap-Scout-blue?style=for-the-badge&logo=ethereum)
![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=flat-square&logo=tailwind-css)

> Automate your token trades on Base with intelligent swaps and arbitrage.

BaseSwap Scout is a comprehensive DeFi trading platform built on the Base network, featuring automated token swapping, real-time arbitrage detection, and advanced gas optimization.

## 🚀 Features

### 🤖 Automated Token Swapper
- **Limit Orders**: Set price triggers for automatic token swaps
- **Stop-Loss Orders**: Protect your positions with automated sell triggers
- **Real-time Monitoring**: Continuous blockchain monitoring for optimal execution
- **Multi-DEX Support**: Route trades across Uniswap V3, Aerodrome, and BaseSwap

### 🔍 Arbitrage Opportunity Detector
- **Cross-DEX Scanning**: Real-time price comparison across all major Base DEXs
- **Profit Calculation**: Instant profit potential and risk assessment
- **One-Click Execution**: Execute profitable arbitrage trades with a single click
- **Confidence Scoring**: High, medium, and low confidence opportunities

### ⚡ Gas & Slippage Optimizer
- **Dynamic Gas Pricing**: Real-time gas price optimization
- **Slippage Control**: Intelligent slippage adjustment to minimize losses
- **Transaction Cost Analysis**: Detailed gas cost breakdowns
- **Network Congestion Handling**: Automatic adjustment for network conditions

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.3 with App Router
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS with custom design system
- **Web3**: Coinbase OnchainKit, Wagmi, Viem
- **State Management**: React Hooks with custom state management
- **API Integration**: 0x Protocol, Base RPC endpoints
- **Caching**: Custom LRU cache with TTL support
- **Notifications**: Real-time notification system

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vistara-apps/db6a77e7-f39c-47f8-bb3d-7e728738f4f8.git
   cd baseswap-scout
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your API keys:
   ```env
   NEXT_PUBLIC_0X_API_KEY=your_0x_api_key_here
   NEXT_PUBLIC_ETHERSCAN_API_KEY=your_etherscan_api_key_here
   NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
   NEXT_PUBLIC_APP_ENV=development
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
baseswap-scout/
├── app/                          # Next.js app directory
│   ├── components/               # React components
│   │   ├── AppShell.tsx         # Main layout component
│   │   ├── ArbitrageScanner.tsx # Arbitrage detection UI
│   │   ├── OrdersManager.tsx    # Order management interface
│   │   ├── TokenInput.tsx       # Token selection component
│   │   ├── TradeConfigForm.tsx  # Trade configuration form
│   │   └── NotificationCenter.tsx # Notification system
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── lib/                         # Core business logic
│   ├── api/                     # API integrations
│   │   ├── blockchain-service.ts
│   │   ├── dex-aggregator.ts
│   │   ├── gas-service.ts
│   │   └── token-service.ts
│   ├── hooks/                   # Custom React hooks
│   │   ├── useArbitrageScanner.ts
│   │   ├── useGasOptimization.ts
│   │   ├── useNotifications.ts
│   │   ├── useOrderExecution.ts
│   │   └── useTokenPrices.ts
│   ├── types/                   # TypeScript type definitions
│   ├── utils/                   # Utility functions
│   │   ├── cache.ts
│   │   ├── error-handling.ts
│   │   └── validation.ts
│   └── constants.ts             # Application constants
├── public/                      # Static assets
├── .env.example                 # Environment variables template
├── next.config.mjs             # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── README.md                   # This file
```

## 🎨 Design System

### Colors
- **Background**: `hsl(210 25% 10%)`
- **Accent**: `hsl(140 60% 55%)`
- **Primary**: `hsl(210 60% 50%)`
- **Surface**: `hsl(210 25% 15%)`
- **Text Primary**: `hsl(0 0% 95%)`
- **Text Secondary**: `hsl(0 0% 75%)`

### Typography
- **Display**: `text-4xl font-bold`
- **Heading**: `text-2xl font-semibold`
- **Body**: `text-base leading-7`
- **Caption**: `text-sm text-secondary`

### Spacing
- **Small**: `8px`
- **Medium**: `12px`
- **Large**: `16px`
- **Extra Large**: `24px`

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_0X_API_KEY` | 0x Protocol API key | Yes |
| `NEXT_PUBLIC_ETHERSCAN_API_KEY` | Etherscan API key | No |
| `NEXT_PUBLIC_BASE_RPC_URL` | Base network RPC URL | No |
| `NEXT_PUBLIC_APP_ENV` | Application environment | No |
| `NEXT_PUBLIC_APP_VERSION` | Application version | No |

### Feature Flags

| Flag | Description | Default |
|------|-------------|---------|
| `NEXT_PUBLIC_ENABLE_ARBITRAGE` | Enable arbitrage features | `true` |
| `NEXT_PUBLIC_ENABLE_LIMIT_ORDERS` | Enable limit orders | `true` |
| `NEXT_PUBLIC_ENABLE_GAS_OPTIMIZATION` | Enable gas optimization | `true` |

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e

# Run linting
npm run lint
```

## 📊 API Documentation

### DEX Aggregator API
- **Endpoint**: `https://api.0x.org`
- **Purpose**: Get optimal swap quotes across DEXs
- **Rate Limit**: 100 requests/minute

### Base RPC Endpoints
- **Mainnet**: `https://mainnet.base.org`
- **Testnet**: `https://goerli.base.org`

## 🔒 Security

- Input validation and sanitization
- Rate limiting on API calls
- Secure wallet connections
- Transaction signing verification
- Error boundary protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Coinbase OnchainKit](https://github.com/coinbase/onchainkit) for Web3 components
- [0x Protocol](https://0x.org/) for DEX aggregation
- [Base Network](https://base.org/) for the blockchain infrastructure
- [Tailwind CSS](https://tailwindcss.com/) for styling

## 📞 Support

For support, email support@baseswapscout.com or join our Discord community.

---

**Built with ❤️ on Base**

