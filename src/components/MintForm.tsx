import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2, ImagePlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const mintSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(50, 'Name must be less than 50 characters'),
  description: z.string().trim().min(1, 'Description is required').max(500, 'Description must be less than 500 characters'),
  imageUrl: z.string().trim().url('Must be a valid URL').min(1, 'Image URL is required'),
});

interface MintFormProps {
  onMint: (name: string, description: string, imageUrl: string) => Promise<void>;
}

export const MintForm = ({ onMint }: MintFormProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate form
      const validatedData = mintSchema.parse({ name, description, imageUrl });
      
      setLoading(true);
      await onMint(validatedData.name, validatedData.description, validatedData.imageUrl);
      
      // Reset form
      setName('');
      setDescription('');
      setImageUrl('');
      
      toast({
        title: 'NFT Minted Successfully!',
        description: 'Your NFT has been created on the Sui blockchain.',
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: 'Validation Error',
          description: error.errors[0].message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Minting Failed',
          description: error instanceof Error ? error.message : 'Failed to mint NFT',
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 bg-card shadow-card border-primary/10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground">NFT Name</Label>
          <Input
            id="name"
            placeholder="Enter NFT name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
            disabled={loading}
            className="bg-input border-border"
          />
          <p className="text-xs text-muted-foreground">
            {name.length}/50 characters
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-foreground">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe your NFT"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            disabled={loading}
            className="bg-input border-border min-h-[120px] resize-none"
          />
          <p className="text-xs text-muted-foreground">
            {description.length}/500 characters
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="imageUrl" className="text-foreground">Image URL</Label>
          <div className="flex gap-2">
            <Input
              id="imageUrl"
              type="url"
              placeholder="https://example.com/image.png"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              disabled={loading}
              className="bg-input border-border"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Provide a direct link to your NFT image (IPFS, Arweave, or web URL)
          </p>
        </div>

        {imageUrl && (
          <div className="space-y-2">
            <Label className="text-foreground">Preview</Label>
            <div className="aspect-square max-w-[200px] rounded-lg overflow-hidden border border-border bg-muted">
              <img
                src={imageUrl}
                alt="NFT Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            </div>
          </div>
        )}

        <Button
          type="submit"
          className="w-full gradient-primary text-primary-foreground shadow-glow hover:opacity-90"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Minting...
            </>
          ) : (
            <>
              <ImagePlus className="w-4 h-4 mr-2" />
              Mint NFT
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};
