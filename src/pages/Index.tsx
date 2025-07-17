
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoldPriceDashboard } from '@/components/GoldPriceDashboard';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null; // or a loading spinner
  }

  return <GoldPriceDashboard />;
};

export default Index;
