
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import MarketDetailCard from '@/components/MarketDetailCard';
import { BettingMarket } from '@/components/BettingMarketCard';

// Mock data for betting markets (same as in Index.tsx)
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

const MarketDetail = () => {
  const { id } = useParams<{ id: string }>();
  const market = mockMarkets.find(m => m.id === id);
  
  if (!market) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto py-12 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Market Not Found</h1>
          <p className="text-muted-foreground">The betting market you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-12 px-4">
        <MarketDetailCard market={market} />
      </div>
    </div>
  );
};

export default MarketDetail;
