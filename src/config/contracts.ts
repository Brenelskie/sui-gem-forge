/**
 * NFT Marketplace Contract Configuration
 * 
 * Update these values with your deployed contract details
 */

export const NETWORK = 'testnet'; // 'testnet' | 'mainnet' | 'devnet' | 'localnet'

// Replace with your deployed package ID
export const PACKAGE_ID = import.meta.env.VITE_PACKAGE_ID || '0x_YOUR_PACKAGE_ID_HERE';

// Module name (usually the contract file name)
export const MODULE_NAME = 'nft_marketplace';

// Function names
export const FUNCTIONS = {
  MINT_NFT: 'mint_nft',
  LIST_NFT: 'list_nft',
  BUY_NFT: 'buy_nft',
  CANCEL_LISTING: 'cancel_listing',
  WITHDRAW_FEES: 'withdraw_fees',
} as const;

// Object types
export const OBJECT_TYPES = {
  NFT: `${PACKAGE_ID}::${MODULE_NAME}::NFT`,
  LISTING: `${PACKAGE_ID}::${MODULE_NAME}::Listing`,
  MARKETPLACE: `${PACKAGE_ID}::${MODULE_NAME}::Marketplace`,
} as const;

// Admin address (replace with actual admin address)
export const ADMIN_ADDRESS = import.meta.env.VITE_ADMIN_ADDRESS || '0x_ADMIN_ADDRESS_HERE';

// Marketplace fee percentage (if applicable)
export const MARKETPLACE_FEE_PERCENT = 2.5;

// RPC endpoints
export const RPC_ENDPOINTS = {
  testnet: 'https://fullnode.testnet.sui.io',
  mainnet: 'https://fullnode.mainnet.sui.io',
  devnet: 'https://fullnode.devnet.sui.io',
  localnet: 'http://127.0.0.1:9000',
} as const;

export const CURRENT_RPC = RPC_ENDPOINTS[NETWORK];
