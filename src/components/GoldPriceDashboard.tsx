
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, Sparkles, Brain, ThumbsUp, ThumbsDown, Star, LogOut, Shield } from 'lucide-react';
import { PriceChart } from './PriceChart';
import { PredictionCard } from './PredictionCard';
import { DataInputModule } from './DataInputModule';
import { AIAssistant } from './AIAssistant';
import { Footer } from './Footer';
import { AdminDashboard } from './AdminDashboard';
import { useAuth } from '@/contexts/AuthContext';
import { activityService } from '@/services/activityService';
import { useToast } from '@/hooks/use-toast';

export const GoldPriceDashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [currentPrice, setCurrentPrice] = useState(134500);
  const [predictedPrice, setPredictedPrice] = useState(135800);
  const [trend, setTrend] = useState<'up' | 'down'>('up');
  const [confidence, setConfidence] = useState<'high' | 'medium' | 'low'>('high');
  const [viewMode, setViewMode] = useState<'beginner' | 'analyst'>('beginner');
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const priceChange = predictedPrice - currentPrice;
  const changePercent = ((priceChange / currentPrice) * 100).toFixed(2);

  const confidenceEmoji = {
    high: '😊',
    medium: '😐',
    low: '😟'
  };

  const trendIcon = trend === 'up' ? TrendingUp : TrendingDown;
  const trendColor = trend === 'up' ? 'text-green-600' : 'text-red-600';

  const formatNPR = (amount: number) => {
    return new Intl.NumberFormat('ne-NP', {
      style: 'currency',
      currency: 'NPR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    if (user) {
      // Log user login activity
      activityService.logActivity(
        user.id,
        user.email,
        user.name,
        'User Login',
        `${user.role === 'admin' ? 'Admin' : 'User'} logged into the system`
      );
    }
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      const oldPrice = currentPrice;
      const oldPredicted = predictedPrice;
      
      setCurrentPrice(prev => prev + (Math.random() - 0.5) * 500);
      setPredictedPrice(prev => prev + (Math.random() - 0.5) * 800);
      setLastUpdate(new Date());

      if (user) {
        activityService.logActivity(
          user.id,
          user.email,
          user.name,
          'Price Update',
          'Viewed updated gold price prediction',
          {
            currentPrice: oldPrice,
            predictedPrice: oldPredicted,
            trend
          }
        );
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [user, currentPrice, predictedPrice, trend]);

  const handleFeedback = (type: 'positive' | 'negative') => {
    setFeedback(type);
    
    if (user) {
      activityService.addReview(
        user.id,
        user.email,
        user.name,
        type,
        type === 'positive' ? 'Found the prediction helpful' : 'Prediction was not helpful'
      );
      
      activityService.logActivity(
        user.id,
        user.email,
        user.name,
        'Feedback Submitted',
        `User provided ${type} feedback on prediction`
      );
    }

    toast({
      title: "Feedback Received",
      description: `Thank you for your ${type} feedback! 🙏`,
    });
  };

  const handleLogout = () => {
    if (user) {
      activityService.logActivity(
        user.id,
        user.email,
        user.name,
        'User Logout',
        `${user.role === 'admin' ? 'Admin' : 'User'} logged out of the system`
      );
    }
    logout();
  };

  // Show admin dashboard for admin users
  if (user?.role === 'admin') {
    return (
      <div>
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
          <Badge className="bg-red-500 text-white">
            <Shield className="h-3 w-3 mr-1" />
            Admin Mode
          </Badge>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
        <AdminDashboard />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
      {/* User Header */}
      {user && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
          <Badge variant="outline">
            Welcome, {user.name}
          </Badge>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="h-8 w-8 text-yellow-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
              Nepal Gold Price Prediction Model
            </h1>
            <Sparkles className="h-8 w-8 text-yellow-600" />
          </div>
          <p className="text-gray-600 text-lg">AI-Powered Gold Price Predictions for Nepal Market</p>
          
          <div className="flex justify-center">
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'beginner' | 'analyst')}>
              <TabsList className="bg-yellow-100 border-yellow-200">
                <TabsTrigger value="beginner" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white">
                  👶 Beginner View
                </TabsTrigger>
                <TabsTrigger value="analyst" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white">
                  📊 Analyst View
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <AIAssistant 
          currentPrice={currentPrice}
          predictedPrice={predictedPrice}
          trend={trend}
          confidence={confidence}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <Card className="bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-xl">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Star className="h-6 w-6" />
                Current Gold Price (Nepal)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-3xl font-bold">{formatNPR(currentPrice)}</div>
                <div className="text-sm opacity-90">per tola (11.66 grams)</div>
                <div className="text-xs opacity-75">
                  Last updated: {lastUpdate.toLocaleTimeString()}
                </div>
              </div>
            </CardContent>
          </Card>

          <PredictionCard 
            predictedPrice={predictedPrice}
            priceChange={priceChange}
            changePercent={changePercent}
            trend={trend}
            confidence={confidence}
            confidenceEmoji={confidenceEmoji[confidence]}
            trendIcon={trendIcon}
            trendColor={trendColor}
            formatCurrency={formatNPR}
          />

          <Card className="shadow-lg border-yellow-200">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                ML Insights (Nepal Market)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Accuracy Rate</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">82.3%</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Model Type</span>
                <Badge variant="outline">Random Forest</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Data Points</span>
                <span className="text-sm font-medium">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Next Update</span>
                <span className="text-sm font-medium">15 min</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {viewMode === 'beginner' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>📈 Price Trend (7 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <PriceChart simple={true} />
              </CardContent>
            </Card>
            
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Was this prediction helpful?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">Help us improve our AI model by rating today's prediction.</p>
                <div className="flex gap-4">
                  <Button 
                    onClick={() => handleFeedback('positive')}
                    variant={feedback === 'positive' ? 'default' : 'outline'}
                    className="flex items-center gap-2"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    Helpful
                  </Button>
                  <Button 
                    onClick={() => handleFeedback('negative')}
                    variant={feedback === 'negative' ? 'destructive' : 'outline'}
                    className="flex items-center gap-2"
                  >
                    <ThumbsDown className="h-4 w-4" />
                    Not Helpful
                  </Button>
                </div>
                {feedback && (
                  <p className="text-sm text-green-600 animate-fade-in">
                    Thank you for your feedback! 🙏
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>📊 Advanced Price Analysis (Nepal)</CardTitle>
              </CardHeader>
              <CardContent>
                <PriceChart simple={false} />
              </CardContent>
            </Card>
            
            <DataInputModule />
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};
