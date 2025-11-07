import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
import { NETWORK } from '@/config/contracts';

// Create and export a configured Sui client
export const suiClient = new SuiClient({ 
  url: getFullnodeUrl(NETWORK as 'testnet' | 'mainnet' | 'devnet' | 'localnet')
});
