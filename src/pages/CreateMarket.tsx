
import Navbar from '@/components/Navbar';
import CreateMarketForm from '@/components/CreateMarketForm';

const CreateMarket = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-12 px-4">
        <CreateMarketForm />
      </div>
    </div>
  );
};

export default CreateMarket;
