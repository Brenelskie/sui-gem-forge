# Sui NFT Marketplace DApp

A production-ready React front-end for a Sui NFT marketplace built with TypeScript, Sui DApp Kit, and modern Web3 technologies.

## 🚀 Features

- **Wallet Integration**: Connect and manage Sui wallets with automatic balance updates
- **NFT Minting**: Create unique NFTs with name, description, and image URL
- **Marketplace**: Browse, search, and trade NFTs with other users
- **List & Buy**: List your NFTs for sale or purchase from others
- **Admin Panel**: Manage marketplace fees and withdraw accumulated revenue
- **Responsive Design**: Beautiful UI optimized for all devices

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Blockchain**: Sui TypeScript SDK + Sui DApp Kit
- **UI**: Tailwind CSS + shadcn/ui components
- **State Management**: TanStack Query (React Query)
- **Form Validation**: Zod

## 📋 Prerequisites

- Node.js 18+ and npm
- A Sui wallet (e.g., Sui Wallet browser extension)
- Deployed NFT marketplace Move contracts on Sui testnet/mainnet

## 🔧 Setup

1. **Clone and install dependencies**

```bash
npm install
```

2. **Configure environment variables**

Copy `.env.example` to `.env` and update with your values:

```bash
cp .env.example .env
```

Update these required values:
- `VITE_PACKAGE_ID`: Your deployed NFT marketplace package ID
- `VITE_ADMIN_ADDRESS`: Admin wallet address for fee withdrawal

3. **Update contract configuration**

Edit `src/config/contracts.ts` to match your Move contract structure:
- Module name
- Function names (mint, list, buy, cancel, withdraw)
- Object type definitions

4. **Start development server**

```bash
npm run dev
```

The app will be available at `http://localhost:8080`

## 📝 Contract Integration

### Required Move Contract Functions

Your NFT marketplace contract should expose these functions:

```move
// Mint a new NFT
public fun mint_nft(
    name: String,
    description: String,
    image_url: String,
    ctx: &mut TxContext
)

// List NFT for sale
public fun list_nft(
    nft: NFT,
    price: u64,
    marketplace: &mut Marketplace,
    ctx: &mut TxContext
)

// Buy a listed NFT
public fun buy_nft(
    listing_id: ID,
    payment: Coin<SUI>,
    marketplace: &mut Marketplace,
    ctx: &mut TxContext
)

// Cancel listing
public fun cancel_listing(
    listing_id: ID,
    marketplace: &mut Marketplace,
    ctx: &mut TxContext
)

// Withdraw marketplace fees (admin only)
public fun withdraw_fees(
    marketplace: &mut Marketplace,
    ctx: &mut TxContext
)
```

### Object Types

Update `OBJECT_TYPES` in `src/config/contracts.ts` to match your contract:

```typescript
export const OBJECT_TYPES = {
  NFT: `${PACKAGE_ID}::${MODULE_NAME}::NFT`,
  LISTING: `${PACKAGE_ID}::${MODULE_NAME}::Listing`,
  MARKETPLACE: `${PACKAGE_ID}::${MODULE_NAME}::Marketplace`,
};
```

## 🎯 Usage Flow

### 1. Connect Wallet
Click "Connect Wallet" in the header and approve the connection in your Sui wallet.

### 2. Mint NFT
- Navigate to the "Mint" page
- Fill in NFT details (name, description, image URL)
- Submit the transaction and approve in your wallet
- Your NFT will appear in "My NFTs"

### 3. List for Sale
- Go to "My NFTs"
- Click "List for Sale" on any NFT
- Enter the price in SUI
- Confirm the transaction

### 4. Buy NFT
- Browse the "Marketplace"
- Click "Buy Now" on any listed NFT
- Confirm the purchase transaction
- The NFT transfers to your wallet

### 5. Admin Functions
- Connect with the admin wallet address
- Navigate to "Admin" panel
- View marketplace statistics
- Withdraw accumulated fees

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Header.tsx
│   ├── WalletButton.tsx
│   ├── NFTCard.tsx
│   └── MintForm.tsx
├── pages/            # Route pages
│   ├── MyNFTs.tsx
│   ├── Mint.tsx
│   ├── Marketplace.tsx
│   └── Admin.tsx
├── hooks/            # Custom React hooks
│   └── useSuiBalance.ts
├── config/           # Configuration files
│   └── contracts.ts
├── lib/              # Utilities
│   ├── suiClient.ts
│   └── utils.ts
└── App.tsx           # Main app with providers
```

## 🔐 Security Notes

- All form inputs are validated client-side using Zod schemas
- Transaction signatures are handled by the connected wallet
- Admin functions verify the caller's address
- Never commit your `.env` file to version control

## 🎨 Customization

### Styling
The design system is defined in:
- `src/index.css` - CSS variables and custom styles
- `tailwind.config.ts` - Tailwind theme configuration

### Contract Configuration
Update `src/config/contracts.ts` for your specific Move contract.

## 📚 Additional Resources

- [Sui TypeScript SDK Docs](https://sdk.mystenlabs.com/typescript)
- [Sui DApp Kit Guide](https://sdk.mystenlabs.com/dapp-kit)
- [Sui Move Documentation](https://docs.sui.io/build/move)
- [Demo Source Code](https://github.com/rjaymf10/demo-nft)

## 🤝 Contributing

This project was created for the DICT Sui DApp activity. Feel free to extend and customize it for your needs!

## 📄 License

MIT License - feel free to use this project for learning and development.
