
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import BettingMarketCard, { BettingMarket } from '@/components/BettingMarketCard';
import MarketFilter from '@/components/MarketFilter';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for betting markets
const mockMarkets: BettingMarket[] = [
  {
    id: '1',
    title: 'Will Bitcoin reach $100,000 by the end of 2025?',
    description: 'The market will resolve to YES if the price of Bitcoin reaches or exceeds $100,000 at any point before December 31, 2025.',
    endDate: '2025-12-31T23:59:59Z',
    participants: 156,
    liquidity: 24500,
    yesPercentage: 68,
    noPercentage: 32,
    category: 'Crypto'
  },
  {
    id: '2',
    title: 'Will SpaceX successfully land humans on Mars before 2030?',
    description: 'This market resolves to YES if SpaceX completes a crewed mission that lands humans on the surface of Mars before January 1, 2030.',
    endDate: '2029-12-31T23:59:59Z',
    participants: 89,
    liquidity: 12800,
    yesPercentage: 42,
    noPercentage: 58,
    category: 'Science'
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
    category: 'Sports'
  },
  {
    id: '4',
    title: 'Will [Popular Movie Franchise] release a new film in 2025?',
    description: 'Market resolves to YES if a new movie in the franchise is released in theaters worldwide during the calendar year 2025.',
    endDate: '2025-12-31T23:59:59Z',
    participants: 64,
    liquidity: 5400,
    yesPercentage: 78,
    noPercentage: 22,
    category: 'Entertainment'
  },
  {
    id: '5',
    title: 'Will the current US President win re-election in 2024?',
    description: 'This market resolves to YES if the incumbent US President wins the 2024 presidential election.',
    endDate: '2024-11-05T23:59:59Z',
    participants: 412,
    liquidity: 45600,
    yesPercentage: 51,
    noPercentage: 49,
    category: 'Politics'
  },
  {
    id: '6',
    title: 'Will Ethereum 2.0 be fully implemented by the end of 2024?',
    description: 'Market resolves to YES if all phases of Ethereum 2.0 are fully implemented on mainnet by December 31, 2024.',
    endDate: '2024-12-31T23:59:59Z',
    participants: 178,
    liquidity: 28900,
    yesPercentage: 62,
    noPercentage: 38,
    category: 'Crypto'
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const filteredMarkets = mockMarkets.filter(market => {
    const matchesSearch = 
      searchQuery === '' || 
      market.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      market.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = 
      selectedCategories.length === 0 || 
      selectedCategories.includes(market.category);
      
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="betting-gradient text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold mb-4 animate-fade-in">
            Bet on Anything. Powered by Community.
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/80 animate-fade-in">
            Create or participate in prediction markets on sports, politics, crypto, 
            entertainment, and more.
          </p>
          <Link to="/create">
            <Button size="lg" className="betting-button bg-white text-betting hover:bg-white/90 animate-pulse-scale">
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Market
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Markets Section */}
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h2 className="text-2xl font-bold mb-4 md:mb-0">Trending Markets</h2>
          <Link to="/create">
            <Button className="betting-button bg-betting">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Market
            </Button>
          </Link>
        </div>
        
        <MarketFilter 
          onSearchChange={setSearchQuery}
          onCategoryChange={setSelectedCategories}
          selectedCategories={selectedCategories}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMarkets.map((market) => (
            <BettingMarketCard key={market.id} market={market} />
          ))}
        </div>
        
        {filteredMarkets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No markets found matching your criteria.</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategories([]);
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
