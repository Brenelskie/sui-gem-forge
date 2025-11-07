import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Tag, DollarSign } from 'lucide-react';

export interface NFT {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  owner?: string;
  price?: string;
  isListed?: boolean;
}

interface NFTCardProps {
  nft: NFT;
  onView?: (nft: NFT) => void;
  onBuy?: (nft: NFT) => void;
  onList?: (nft: NFT) => void;
  onCancel?: (nft: NFT) => void;
  isOwned?: boolean;
  loading?: boolean;
}

export const NFTCard = ({ 
  nft, 
  onView, 
  onBuy, 
  onList, 
  onCancel, 
  isOwned = false,
  loading = false 
}: NFTCardProps) => {
  return (
    <Card className="group overflow-hidden bg-card shadow-card hover:shadow-glow transition-smooth border-primary/10">
      <div className="aspect-square relative overflow-hidden bg-muted">
        <img
          src={nft.imageUrl || '/placeholder.svg'}
          alt={nft.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
        
        {nft.isListed && (
          <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground shadow-glow">
            <Tag className="w-3 h-3 mr-1" />
            Listed
          </Badge>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg truncate">{nft.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {nft.description}
          </p>
        </div>

        {nft.price && (
          <div className="flex items-center gap-2 text-primary font-semibold">
            <DollarSign className="w-4 h-4" />
            <span>{nft.price} SUI</span>
          </div>
        )}

        <div className="flex gap-2">
          {onView && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 hover:bg-muted"
              onClick={() => onView(nft)}
              disabled={loading}
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              View
            </Button>
          )}

          {!isOwned && onBuy && nft.isListed && (
            <Button
              size="sm"
              className="flex-1 bg-primary hover:bg-primary/90"
              onClick={() => onBuy(nft)}
              disabled={loading}
            >
              Buy Now
            </Button>
          )}

          {isOwned && !nft.isListed && onList && (
            <Button
              size="sm"
              className="flex-1 bg-accent hover:bg-accent/90"
              onClick={() => onList(nft)}
              disabled={loading}
            >
              List for Sale
            </Button>
          )}

          {isOwned && nft.isListed && onCancel && (
            <Button
              size="sm"
              variant="destructive"
              className="flex-1"
              onClick={() => onCancel(nft)}
              disabled={loading}
            >
              Cancel Listing
            </Button>
          )}
        </div>

        <div className="text-xs text-muted-foreground font-mono truncate">
          ID: {nft.id.slice(0, 8)}...{nft.id.slice(-6)}
        </div>
      </div>
    </Card>
  );
};
