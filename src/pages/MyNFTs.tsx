import { useCurrentAccount } from '@mysten/dapp-kit';
import { NFTCard } from '@/components/NFTCard';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Wallet, Package } from 'lucide-react';

// Mock data for development - replace with actual data fetching
const mockNFTs = [
  {
    id: '0x1234...5678',
    name: 'Sui Wave #001',
    description: 'A beautiful wave from the Sui ocean',
    imageUrl: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=500',
    isListed: false,
  },
  {
    id: '0xabcd...efgh',
    name: 'Digital Sunset',
    description: 'Captured at the perfect moment',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500',
    isListed: true,
    price: '10.5',
  },
];

export default function MyNFTs() {
  const account = useCurrentAccount();

  if (!account) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Alert className="max-w-2xl mx-auto bg-card border-primary/20">
          <Wallet className="h-5 w-5 text-primary" />
          <AlertDescription className="ml-2">
            Connect your wallet to view your NFTs
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // TODO: Fetch actual NFTs from the blockchain
  const nfts = mockNFTs;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">My NFT Collection</h1>
        <p className="text-muted-foreground">
          Manage and trade your digital assets
        </p>
      </div>

      {nfts.length === 0 ? (
        <Card className="p-12 text-center bg-card/50 border-dashed border-2">
          <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">No NFTs Yet</h3>
          <p className="text-muted-foreground mb-4">
            Start by minting your first NFT!
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {nfts.map((nft) => (
            <NFTCard
              key={nft.id}
              nft={nft}
              isOwned
              onView={(nft) => console.log('View NFT:', nft)}
              onList={(nft) => console.log('List NFT:', nft)}
              onCancel={(nft) => console.log('Cancel listing:', nft)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
