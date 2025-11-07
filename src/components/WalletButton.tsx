import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Wallet, LogOut } from 'lucide-react';
import { useSuiBalance } from '@/hooks/useSuiBalance';

export const WalletButton = () => {
  const account = useCurrentAccount();
  const { balance, isLoading } = useSuiBalance(account?.address);

  if (!account) {
    return (
      <ConnectButton
        connectText="Connect Wallet"
        className="gradient-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold shadow-glow hover:opacity-90 transition-smooth"
      />
    );
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatBalance = (bal: bigint | null) => {
    if (bal === null) return '0';
    return (Number(bal) / 1_000_000_000).toFixed(4);
  };

  return (
    <Card className="flex items-center gap-3 px-4 py-2 bg-card/50 backdrop-blur border-primary/20">
      <div className="flex items-center gap-2">
        <Wallet className="w-4 h-4 text-primary" />
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Connected</span>
          <span className="text-sm font-mono font-semibold">
            {formatAddress(account.address)}
          </span>
        </div>
      </div>
      
      <div className="h-8 w-px bg-border" />
      
      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground">Balance</span>
        <span className="text-sm font-semibold text-primary">
          {isLoading ? '...' : formatBalance(balance)} SUI
        </span>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="ml-2 h-8 w-8 hover:bg-destructive/20 hover:text-destructive"
        onClick={() => {
          // Disconnect handled by dapp-kit internally
          window.location.reload();
        }}
      >
        <LogOut className="w-4 h-4" />
      </Button>
    </Card>
  );
};
