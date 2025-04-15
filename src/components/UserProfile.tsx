import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownRight, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useWallet } from '@/hooks/useWallet';

const mockUserBets: Array<BettingMarket & { position: 'yes' | 'no', amount: number }> = [
  {
    id: '1',
    title: 'Will Bitcoin reach $100,000 by the end of 2025?',
    description: 'The market will resolve to YES if the price of Bitcoin reaches or exceeds $100,000 at any point before December 31, 2025.',
    endDate: '2025-12-31T23:59:59Z',
    participants: 156,
    liquidity: 24500,
    yesPercentage: 68,
    noPercentage: 32,
    category: 'Crypto',
    position: 'yes',
    amount: 150
  },
  {
    id: '3',
    title: 'Will the FIFA World Cup 2026 final have more than 3 goals scored?',
    description: 'This market will resolve to YES if 4 or more goals are scored during the FIFA World Cup 2026 final match.',
    endDate: '2026-07-15T23:59:59Z',
    participants: 237,
    liquidity: 18700,
    yesPercentage: 45,
    noPercentage: 55,
    category: 'Sports',
    position: 'no',
    amount: 100
  }
];

const UserProfile = () => {
  const navigate = useNavigate();
  const { session } = useAuth();
  const { isConnected, address, balance, connectWallet } = useWallet();
  const { toast } = useToast();

  useEffect(() => {
    if (!session) {
      navigate('/auth');
    }
  }, [session, navigate]);

  const handleAddFunds = () => {
    toast({
      title: "Adding funds",
      description: "This feature will be available soon!",
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="betting-card mb-8">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">My Profile</CardTitle>
        </CardHeader>
        <CardContent className="pb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-secondary/20 rounded-xl p-4 flex flex-col items-center justify-center">
              <Wallet className="h-8 w-8 mb-2 text-betting" />
              <div className="text-2xl font-bold">{balance.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">WVTK Balance</div>
              {!isConnected && (
                <Button 
                  className="mt-4 betting-button bg-betting"
                  onClick={connectWallet}
                >
                  Connect Wallet
                </Button>
              )}
              {isConnected && (
                <div className="mt-2 text-sm text-muted-foreground break-all text-center">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </div>
              )}
            </div>
            
            <div className="bg-secondary/20 rounded-xl p-4 flex flex-col items-center justify-center">
              <TrendingUp className="h-8 w-8 mb-2 text-betting-coral" />
              <div className="text-2xl font-bold">{2}</div>
              <div className="text-sm text-muted-foreground">Active Bets</div>
            </div>
            
            <div className="bg-secondary/20 rounded-xl p-4 flex flex-col items-center justify-center">
              <Award className="h-8 w-8 mb-2 text-betting-green" />
              <div className="text-2xl font-bold">{320}</div>
              <div className="text-sm text-muted-foreground">Total Won</div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <Button 
              className="betting-button bg-betting"
              onClick={handleAddFunds}
            >
              Add Funds
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="active">Active Bets</TabsTrigger>
          <TabsTrigger value="past">Past Bets</TabsTrigger>
          <TabsTrigger value="created">Created Markets</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-6">
          {mockUserBets.length > 0 ? (
            <div>
              {mockUserBets.map((bet) => (
                <Card key={bet.id} className="betting-card mb-4">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="font-medium">{bet.title}</h3>
                        <div className="flex items-center mt-2 text-sm">
                          <span className="text-muted-foreground mr-2">Your position:</span>
                          {bet.position === 'yes' ? (
                            <span className="flex items-center text-betting-green">
                              <ArrowUpRight className="h-4 w-4 mr-1" />
                              YES
                            </span>
                          ) : (
                            <span className="flex items-center text-betting-red">
                              <ArrowDownRight className="h-4 w-4 mr-1" />
                              NO
                            </span>
                          )}
                          <span className="ml-3">
                            {bet.amount} WVTK at {bet.position === 'yes' ? bet.yesPercentage : bet.noPercentage}%
                          </span>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="md:self-center whitespace-nowrap"
                        onClick={() => navigate(`/market/${bet.id}`)}
                      >
                        View Market
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">You don't have any active bets yet.</p>
              <Link to="/">
                <Button className="betting-button bg-betting">Explore Markets</Button>
              </Link>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past">
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">You don't have any past bets yet.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="created">
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">You haven't created any markets yet.</p>
            <Link to="/create">
              <Button className="betting-button bg-betting">Create Market</Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
