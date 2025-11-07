import { useCurrentAccount } from '@mysten/dapp-kit';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, DollarSign, Wallet, TrendingUp, AlertTriangle } from 'lucide-react';
import { ADMIN_ADDRESS, MARKETPLACE_FEE_PERCENT } from '@/config/contracts';

export default function Admin() {
  const account = useCurrentAccount();
  
  // Check if current user is admin
  const isAdmin = account?.address === ADMIN_ADDRESS;

  // Mock data - replace with actual contract reads
  const stats = {
    totalSales: 42,
    totalVolume: '1,234.56',
    accumulatedFees: '30.86',
    activeListings: 15,
  };

  if (!account) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Alert className="max-w-2xl mx-auto bg-card border-primary/20">
          <Wallet className="h-5 w-5 text-primary" />
          <AlertDescription className="ml-2">
            Connect your wallet to access admin panel
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Alert className="max-w-2xl mx-auto bg-destructive/10 border-destructive/20">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <AlertDescription className="ml-2">
            Access denied. Only the marketplace admin can view this page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const handleWithdrawFees = async () => {
    // TODO: Implement fee withdrawal
    console.log('Withdrawing fees...');
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-lg bg-primary/10">
          <Shield className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-4xl font-bold">Admin Panel</h1>
          <p className="text-muted-foreground">
            Manage marketplace fees and settings
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-card shadow-card border-primary/10">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Sales</p>
            <p className="text-3xl font-bold">{stats.totalSales}</p>
          </div>
        </Card>

        <Card className="p-6 bg-card shadow-card border-primary/10">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Volume</p>
            <p className="text-3xl font-bold">{stats.totalVolume} SUI</p>
          </div>
        </Card>

        <Card className="p-6 bg-card shadow-card border-accent/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-accent/10">
              <DollarSign className="w-5 h-5 text-accent" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Accumulated Fees</p>
            <p className="text-3xl font-bold text-accent">{stats.accumulatedFees} SUI</p>
          </div>
        </Card>

        <Card className="p-6 bg-card shadow-card border-primary/10">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Shield className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Active Listings</p>
            <p className="text-3xl font-bold">{stats.activeListings}</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-card shadow-card border-primary/10">
          <h2 className="text-xl font-semibold mb-4">Fee Configuration</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
              <span className="text-muted-foreground">Marketplace Fee</span>
              <span className="text-xl font-bold text-primary">
                {MARKETPLACE_FEE_PERCENT}%
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              This fee is charged on every successful sale and accumulates in the marketplace contract.
            </p>
          </div>
        </Card>

        <Card className="p-6 bg-card shadow-card border-accent/20">
          <h2 className="text-xl font-semibold mb-4">Withdraw Fees</h2>
          <div className="space-y-4">
            <div className="p-4 bg-accent/10 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Available to Withdraw</p>
              <p className="text-3xl font-bold text-accent mb-4">
                {stats.accumulatedFees} SUI
              </p>
              <Button
                className="w-full bg-accent hover:bg-accent/90"
                onClick={handleWithdrawFees}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Withdraw Fees
              </Button>
            </div>
            <Alert className="bg-muted/30 border-primary/20">
              <AlertDescription className="text-sm">
                Fees can only be withdrawn by the marketplace admin address.
              </AlertDescription>
            </Alert>
          </div>
        </Card>
      </div>
    </div>
  );
}
