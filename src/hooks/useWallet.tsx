
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: number;
}

export function useWallet() {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: 0
  });
  const { toast } = useToast();
  const { session } = useAuth();

  const connectWallet = async () => {
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        toast({
          title: "MetaMask not detected",
          description: "Please install MetaMask to connect your wallet",
          variant: "destructive"
        });
        return;
      }

      // Request account access and switch to Sepolia network
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xaa36a7' }], // Sepolia chain ID
        });
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0xaa36a7',
              chainName: 'Sepolia',
              nativeCurrency: {
                name: 'SepoliaETH',
                symbol: 'SEP',
                decimals: 18
              },
              rpcUrls: ['https://sepolia.infura.io/v3/'],
              blockExplorerUrls: ['https://sepolia.etherscan.io']
            }]
          });
        } else {
          throw switchError;
        }
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const address = accounts[0];

      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to connect your wallet",
          variant: "destructive"
        });
        return;
      }

      // Store wallet info in Supabase
      const { error } = await supabase
        .from('user_wallets')
        .upsert({
          user_id: session.user.id,
          wallet_address: address,
          balance: 1000 // Initial balance for testing
        });

      if (error) throw error;

      setWalletState({
        isConnected: true,
        address,
        balance: 1000
      });

      toast({
        title: "Wallet connected",
        description: "Your wallet has been successfully connected to Sepolia network",
      });
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      toast({
        title: "Connection failed",
        description: error.message || "Failed to connect wallet. Please try again.",
        variant: "destructive"
      });
    }
  };

  const disconnectWallet = () => {
    setWalletState({
      isConnected: false,
      address: null,
      balance: 0
    });
  };

  // Load existing wallet connection on mount
  useEffect(() => {
    const loadWalletConnection = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: wallet } = await supabase
        .from('user_wallets')
        .select('wallet_address, balance')
        .eq('user_id', session.user.id)
        .single();

      if (wallet) {
        setWalletState({
          isConnected: true,
          address: wallet.wallet_address,
          balance: wallet.balance
        });
      }
    };

    loadWalletConnection();
  }, []);

  return {
    ...walletState,
    connectWallet,
    disconnectWallet
  };
}
