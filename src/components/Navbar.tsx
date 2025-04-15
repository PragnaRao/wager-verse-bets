
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlusSquare, TrendingUp, User, Home, Wallet } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';

const Navbar = () => {
  const { isConnected, address, balance, connectWallet, disconnectWallet } = useWallet();
  
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-1">
          <Link to="/" className="flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-betting" />
            <span className="text-xl font-bold bg-clip-text text-transparent betting-gradient">
              WagerVerse
            </span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors">
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>
          <Link to="/create" className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors">
            <PlusSquare className="h-5 w-5" />
            <span>Create Market</span>
          </Link>
          <Link to="/profile" className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors">
            <User className="h-5 w-5" />
            <span>Profile</span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {isConnected ? (
            <>
              <div className="px-3 py-1 rounded-full bg-secondary/50 text-sm font-medium">
                Balance: {balance.toLocaleString()} WVTK
              </div>
              <Button 
                variant="outline" 
                className="flex items-center space-x-2"
                onClick={disconnectWallet}
              >
                <Wallet className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
              </Button>
            </>
          ) : (
            <Button 
              className="betting-button bg-betting"
              onClick={connectWallet}
            >
              <Wallet className="h-4 w-4 mr-2" />
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
