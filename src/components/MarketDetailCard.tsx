
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ArrowRight, Clock, Users, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { BettingMarket } from './BettingMarketCard';

interface MarketDetailCardProps {
  market: BettingMarket;
}

const MarketDetailCard = ({ market }: MarketDetailCardProps) => {
  const { toast } = useToast();
  const [betAmount, setBetAmount] = useState('100');
  const [betOption, setBetOption] = useState('yes');
  const [isPlacingBet, setIsPlacingBet] = useState(false);
  
  const timeLeft = new Date(market.endDate).getTime() - new Date().getTime();
  const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'sports': return 'bg-betting-green';
      case 'politics': return 'bg-betting-purple';
      case 'crypto': return 'bg-betting';
      case 'entertainment': return 'bg-betting-coral';
      default: return 'bg-secondary';
    }
  };
  
  const handlePlaceBet = () => {
    if (Number(betAmount) <= 0) {
      toast({
        title: 'Invalid amount',
        description: 'Please enter a valid betting amount',
        variant: 'destructive'
      });
      return;
    }
    
    setIsPlacingBet(true);
    
    setTimeout(() => {
      toast({
        title: 'Bet Placed',
        description: `You bet ${betAmount} WVTK on ${betOption.toUpperCase()}`,
      });
      setIsPlacingBet(false);
    }, 1500);
  };
  
  return (
    <Card className="betting-card max-w-4xl mx-auto">
      <CardHeader className="pb-2">
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge className={`${getCategoryColor(market.category)} text-white font-medium`}>
            {market.category}
          </Badge>
          
          <div className="ml-auto flex items-center space-x-4">
            <div className="flex items-center text-muted-foreground">
              <Users className="h-4 w-4 mr-1" />
              <span>{market.participants} participants</span>
            </div>
            
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span>{daysLeft}d {hoursLeft}h left</span>
            </div>
          </div>
        </div>
        <CardTitle className="text-2xl">{market.title}</CardTitle>
      </CardHeader>
      
      <CardContent className="pb-6 space-y-6">
        <p className="text-muted-foreground">{market.description}</p>
        
        <div className="space-y-4">
          <div className="flex justify-between text-sm mb-1">
            <div className="flex items-center font-medium text-betting-green">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>Yes: {market.yesPercentage}%</span>
            </div>
            <div className="flex items-center font-medium text-betting-red">
              <ArrowDownRight className="h-4 w-4 mr-1" />
              <span>No: {market.noPercentage}%</span>
            </div>
          </div>
          
          <Progress 
            value={market.yesPercentage} 
            className="h-3 bg-betting-red/30" 
            indicatorClassName="bg-betting-green" 
          />
          
          <div className="flex items-center justify-center">
            <DollarSign className="h-5 w-5 mr-1 text-betting" />
            <span className="font-medium">{market.liquidity.toLocaleString()} WVTK in pool</span>
          </div>
        </div>
        
        <Tabs defaultValue="place-bet" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="place-bet">Place Bet</TabsTrigger>
            <TabsTrigger value="my-positions">My Positions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="place-bet" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1">
                <Select onValueChange={setBetOption} defaultValue={betOption}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose outcome" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="col-span-2">
                <div className="flex space-x-2">
                  <Input 
                    type="number" 
                    placeholder="Enter amount"
                    className="bg-background flex-1"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)} 
                  />
                  <Button 
                    className="betting-button bg-betting flex items-center gap-2"
                    onClick={handlePlaceBet}
                    disabled={isPlacingBet}
                  >
                    {isPlacingBet ? 'Placing Bet...' : 'Place Bet'}
                    {!isPlacingBet && <ArrowRight className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="bg-secondary/30 rounded-lg p-4 text-sm">
              <p className="font-medium mb-2">Potential Return:</p>
              <div className="flex justify-between">
                <span>If outcome is {betOption.toUpperCase()}</span>
                <span className="font-bold text-betting">
                  {betOption === 'yes' 
                    ? (Number(betAmount) * (100 / market.yesPercentage)).toFixed(2) 
                    : (Number(betAmount) * (100 / market.noPercentage)).toFixed(2)} WVTK
                </span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="my-positions">
            <div className="text-center py-6">
              <p className="text-muted-foreground">You don't have any positions in this market yet.</p>
              <Button variant="outline" className="mt-4">
                Place your first bet
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MarketDetailCard;
