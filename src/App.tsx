import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { NETWORK } from '@/config/contracts';
import { Header } from '@/components/Header';
import MyNFTs from "./pages/MyNFTs";
import Mint from "./pages/Mint";
import Marketplace from "./pages/Marketplace";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

// Import dapp-kit styles
import '@mysten/dapp-kit/dist/index.css';

const queryClient = new QueryClient();

// Sui network configuration
const networks = {
  testnet: { url: getFullnodeUrl('testnet') },
  mainnet: { url: getFullnodeUrl('mainnet') },
  devnet: { url: getFullnodeUrl('devnet') },
  localnet: { url: getFullnodeUrl('localnet') },
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SuiClientProvider networks={networks} defaultNetwork={NETWORK as 'testnet' | 'mainnet' | 'devnet' | 'localnet'}>
      <WalletProvider autoConnect>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <div className="min-h-screen bg-background">
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<MyNFTs />} />
                  <Route path="/mint" element={<Mint />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </WalletProvider>
    </SuiClientProvider>
  </QueryClientProvider>
);

export default App;
