import { useEffect, useState } from 'react';
import { suiClient } from '@/lib/suiClient';

export const useSuiBalance = (address?: string) => {
  const [balance, setBalance] = useState<bigint | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!address) {
      setBalance(null);
      return;
    }

    const fetchBalance = async () => {
      setIsLoading(true);
      try {
        const balanceData = await suiClient.getBalance({
          owner: address,
        });
        setBalance(BigInt(balanceData.totalBalance));
      } catch (error) {
        console.error('Error fetching balance:', error);
        setBalance(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalance();
    
    // Poll balance every 10 seconds
    const interval = setInterval(fetchBalance, 10000);
    return () => clearInterval(interval);
  }, [address]);

  return { balance, isLoading };
};
