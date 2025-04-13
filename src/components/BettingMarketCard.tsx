
import { Link } from 'react-router-dom';
import { ArrowUpRight, Users, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export interface BettingMarket {
  id: string;
  title: string;
  description: string;
  endDate: string; 
  participants: number;
  liquidity: number;
  yesPercentage: number;
  noPercentage: number;
  category: string;
}

interface BettingMarketCardProps {
  market: BettingMarket;
}

const BettingMarketCard = ({ market }: BettingMarketCardProps) => {
  const timeLeft = new Date(market.endDate).getTime() - new Date().getTime();
  const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'sports': return 'bg-betting-green';
      case 'politics': return 'bg-betting-purple';
      case 'crypto': return 'bg-betting';
      case 'entertainment': return 'bg-betting-coral';
      default: return 'bg-secondary';
    }
  };
  
  return (
    <Link to={`/market/${market.id}`}>
      <Card className="betting-card h-full cursor-pointer hover:translate-y-[-4px] transition-transform duration-200">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-3">
            <Badge className={`${getCategoryColor(market.category)} text-white font-medium`}>
              {market.category}
            </Badge>
            <div className="flex items-center text-muted-foreground text-sm">
              <Users className="h-4 w-4 mr-1" />
              <span>{market.participants}</span>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{market.title}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{market.description}</p>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-betting-green">Yes: {market.yesPercentage}%</span>
              <span className="font-medium text-betting-red">No: {market.noPercentage}%</span>
            </div>
            
            <Progress 
              value={market.yesPercentage} 
              className="h-2 bg-betting-red/30" 
            />
            
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center text-muted-foreground text-sm">
                <Clock className="h-4 w-4 mr-1" />
                <span>{daysLeft > 0 ? `${daysLeft} days left` : 'Ending soon'}</span>
              </div>
              <div className="text-sm font-medium">
                {market.liquidity.toLocaleString()} WVTK
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-3 right-3 text-muted-foreground/50">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BettingMarketCard;
