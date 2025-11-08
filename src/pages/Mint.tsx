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

      try {
        // Call the mint function - adjust arguments based on your actual contract
        // Common signatures: mint(name, description, url) or mint_to_sender(name, description, url)
        tx.moveCall({
          target: `${PACKAGE_ID}::${MODULE_NAME}::${FUNCTIONS.MINT_NFT}`,
          arguments: [
            tx.pure.string(name),
            tx.pure.string(description),
            tx.pure.string(imageUrl),
          ],
        });
      } catch (error) {
        console.error('Transaction building error:', error);
        reject(new Error(`Failed to build transaction: ${error}`));
        return;
      }

      signAndExecute(
        {
          transaction: tx,
        },
        {
          onSuccess: (result) => {
            console.log('NFT minted successfully:', result);
            resolve();
          },
          onError: (error) => {
            console.error('Full minting error:', error);
            const errorMessage = error instanceof Error ? error.message : String(error);
            
            // Provide helpful error messages
            if (errorMessage.includes('VMVerificationOrDeserializationError')) {
              reject(new Error(
                'Contract verification failed. Please verify:\n' +
                '1. MODULE_NAME matches your contract module\n' +
                '2. Function name is correct (check your Move contract)\n' +
                '3. Arguments match the function signature\n' +
                `Current: ${PACKAGE_ID}::${MODULE_NAME}::${FUNCTIONS.MINT_NFT}`
              ));
            } else {
              reject(error);
            }
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
          <AlertDescription className="text-sm space-y-2">
            <div>
              <strong>Current Configuration:</strong>
            </div>
            <div className="font-mono text-xs bg-background/50 p-2 rounded">
              Package: {PACKAGE_ID.slice(0, 20)}...
              <br />
              Function: {MODULE_NAME}::{FUNCTIONS.MINT_NFT}
            </div>
            <div className="text-muted-foreground">
              If minting fails, verify the module name and function name match your deployed Move contract.
            </div>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
