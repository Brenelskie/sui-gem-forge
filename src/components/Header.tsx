import { WalletButton } from './WalletButton';
import { NavLink } from './NavLink';
import { Waves, Home, Plus, ShoppingBag, Shield } from 'lucide-react';

export const Header = () => {
  return (
    <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Waves className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                Sui NFT Market
              </h1>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              <NavLink
                to="/"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
                activeClassName="text-foreground bg-muted"
              >
                <Home className="w-4 h-4" />
                <span>My NFTs</span>
              </NavLink>

              <NavLink
                to="/mint"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
                activeClassName="text-foreground bg-muted"
              >
                <Plus className="w-4 h-4" />
                <span>Mint</span>
              </NavLink>

              <NavLink
                to="/marketplace"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
                activeClassName="text-foreground bg-muted"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Marketplace</span>
              </NavLink>

              <NavLink
                to="/admin"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
                activeClassName="text-foreground bg-muted"
              >
                <Shield className="w-4 h-4" />
                <span>Admin</span>
              </NavLink>
            </nav>
          </div>

          <WalletButton />
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex items-center gap-1 mt-4 overflow-x-auto pb-2">
          <NavLink
            to="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth whitespace-nowrap"
            activeClassName="text-foreground bg-muted"
          >
            <Home className="w-4 h-4" />
            <span>My NFTs</span>
          </NavLink>

          <NavLink
            to="/mint"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth whitespace-nowrap"
            activeClassName="text-foreground bg-muted"
          >
            <Plus className="w-4 h-4" />
            <span>Mint</span>
          </NavLink>

          <NavLink
            to="/marketplace"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth whitespace-nowrap"
            activeClassName="text-foreground bg-muted"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Marketplace</span>
          </NavLink>

          <NavLink
            to="/admin"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth whitespace-nowrap"
            activeClassName="text-foreground bg-muted"
          >
            <Shield className="w-4 h-4" />
            <span>Admin</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
