import { useCurrentAccount } from '@mysten/dapp-kit';
import { NFTCard } from '@/components/NFTCard';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

// Mock data for development
const mockListings = [
  {
    id: '0xmarket1',
    name: 'Cosmic Dreams #42',
    description: 'Journey through the stars',
    imageUrl: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=500',
    isListed: true,
    price: '15.0',
  },
  {
    id: '0xmarket2',
    name: 'Ocean Depths',
    description: 'Deep blue mystery',
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500',
    isListed: true,
    price: '8.5',
  },
  {
    id: '0xmarket3',
    name: 'Mountain Peak',
    description: 'Reach new heights',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500',
    isListed: true,
    price: '12.0',
  },
];

export default function Marketplace() {
  const account = useCurrentAccount();
  const [searchQuery, setSearchQuery] = useState('');

  // TODO: Fetch actual listings from the blockchain
  const listings = mockListings;

  const filteredListings = listings.filter(nft =>
    nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    nft.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">NFT Marketplace</h1>
        <p className="text-muted-foreground">
          Discover and collect unique digital assets
        </p>
      </div>

      <Card className="p-4 bg-card/50">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search NFTs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input"
            />
          </div>
          <Button variant="outline" className="hidden sm:flex">
            Filters
          </Button>
        </div>
      </Card>

      {filteredListings.length === 0 ? (
        <Card className="p-12 text-center bg-card/50 border-dashed border-2">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">No Listings Found</h3>
          <p className="text-muted-foreground">
            {searchQuery ? 'Try adjusting your search' : 'Check back later for new items'}
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredListings.map((nft) => (
            <NFTCard
              key={nft.id}
              nft={nft}
              isOwned={false}
              onView={(nft) => console.log('View NFT:', nft)}
              onBuy={account ? (nft) => console.log('Buy NFT:', nft) : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
