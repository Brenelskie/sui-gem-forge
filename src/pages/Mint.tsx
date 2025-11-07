import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { MintForm } from '@/components/MintForm';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Wallet, Sparkles } from 'lucide-react';
import { PACKAGE_ID, MODULE_NAME, FUNCTIONS } from '@/config/contracts';

export default function Mint() {
  const account = useCurrentAccount();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  const handleMint = async (name: string, description: string, imageUrl: string) => {
    if (!account) {
      throw new Error('Please connect your wallet first');
    }

    return new Promise<void>((resolve, reject) => {
      const tx = new Transaction();

      // TODO: Replace with actual contract call
      // Example structure (adjust based on your contract):
      tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::${FUNCTIONS.MINT_NFT}`,
        arguments: [
          tx.pure.string(name),
          tx.pure.string(description),
          tx.pure.string(imageUrl),
        ],
      });

      signAndExecute(
        {
          transaction: tx,
        },
        {
          onSuccess: () => {
            console.log('NFT minted successfully');
            resolve();
          },
          onError: (error) => {
            console.error('Minting error:', error);
            reject(error);
          },
        }
      );
    });
  };

  if (!account) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Alert className="max-w-2xl mx-auto bg-card border-primary/20">
          <Wallet className="h-5 w-5 text-primary" />
          <AlertDescription className="ml-2">
            Connect your wallet to mint NFTs
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold">Create Your NFT</h1>
          <p className="text-muted-foreground text-lg">
            Mint a unique digital asset on the Sui blockchain
          </p>
        </div>

        <MintForm onMint={handleMint} />

        <Alert className="bg-muted/30 border-primary/20">
          <AlertDescription className="text-sm">
            <strong>Note:</strong> Make sure your contract is deployed and the PACKAGE_ID 
            in <code className="text-primary">src/config/contracts.ts</code> is updated with 
            your deployed package address.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
