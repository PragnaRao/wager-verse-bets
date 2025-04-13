
import Navbar from '@/components/Navbar';
import UserProfile from '@/components/UserProfile';

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-12 px-4">
        <UserProfile />
      </div>
    </div>
  );
};

export default Profile;
