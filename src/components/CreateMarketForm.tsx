
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { format } from 'date-fns';

const CATEGORIES = [
  'Sports',
  'Politics',
  'Crypto',
  'Entertainment',
  'Science',
  'Other'
];

const CreateMarketForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [initialFunding, setInitialFunding] = useState('100');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !category || !endDate) {
      toast({
        title: 'Missing fields',
        description: 'Please fill all required fields',
        variant: 'destructive'
      });
      return;
    }
    
    // Simulating submission
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast({
        title: 'Market Created',
        description: 'Your betting market has been created successfully!',
      });
      setIsSubmitting(false);
      navigate('/'); // Redirect to home page
    }, 1500);
  };
  
  return (
    <Card className="betting-card max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Create Betting Market</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Market Question</Label>
            <Input
              id="title"
              placeholder="E.g., Will Bitcoin reach $100,000 by the end of 2025?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-background"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Provide details about this betting market..."
              className="bg-background min-h-[100px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={setCategory} value={category}>
                <SelectTrigger id="category" className="bg-background">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Resolution Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full bg-background justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-card" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="funding">Initial Funding (WVTK)</Label>
            <Input
              id="funding"
              type="number"
              value={initialFunding}
              onChange={(e) => setInitialFunding(e.target.value)}
              min="10"
              className="bg-background"
            />
            <p className="text-sm text-muted-foreground">
              This amount will be used to create initial liquidity in the market.
            </p>
          </div>
          
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full betting-button bg-betting"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Market...' : 'Create Betting Market'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateMarketForm;
