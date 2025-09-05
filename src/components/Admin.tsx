
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Users, Activity, MessageSquare, Settings, TrendingUp, ThumbsUp, ThumbsDown } from 'lucide-react';
import { activityService, Activity as ActivityType, Review } from '@/services/activity';
import { useToast } from '@/hooks/use-toast';

export const Admin = () => {
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [reviewsList, setReviewsList] = useState<Review[]>([]);
  const [params, setParams] = useState({
    rate: 0.01,
    epochs: 100,
    batch: 32,
    split: 0.2
  });
  const { toast } = useToast();

  useEffect(() => {
    setActivities(activityService.getActivities());
    setReviewsList(activityService.getReviews());
  }, []);

  const stats = activityService.getActivityStats();
  const reviewStats = activityService.getReviewStats();

  const updateParams = () => {
    localStorage.setItem('modelParams', JSON.stringify(params));
    toast({
      title: "Model Parameters Updated",
      description: "The ML model parameters have been successfully updated.",
    });
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Monitor user activities and manage the gold prediction system</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8" />
                <div>
                  <p className="text-sm opacity-90">Unique Users</p>
                  <p className="text-2xl font-bold">{stats.uniqueUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Activity className="h-8 w-8" />
                <div>
                  <p className="text-sm opacity-90">Total Activities</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-8 w-8" />
                <div>
                  <p className="text-sm opacity-90">User Reviews</p>
                  <p className="text-2xl font-bold">{reviewStats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8" />
                <div>
                  <p className="text-sm opacity-90">Satisfaction</p>
                  <p className="text-2xl font-bold">{reviewStats.satisfaction}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="activities" className="space-y-4">
          <TabsList className="bg-white shadow-sm">
            <TabsTrigger value="activities">User Activities</TabsTrigger>
            <TabsTrigger value="reviews">User Reviews</TabsTrigger>
            <TabsTrigger value="settings">Model Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="activities">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent User Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {activities.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No activities recorded yet</p>
                  ) : (
                    activities.slice(0, 50).map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{activity.userName}</span>
                            <Badge variant="outline" className="text-xs">{activity.userEmail}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{activity.action}: {activity.details}</p>
                          {activity.prediction && (
                            <div className="text-xs text-gray-500 mt-1">
                              Prediction: {activity.prediction.currentPrice} → {activity.prediction.predictedPrice} ({activity.prediction.trend})
                            </div>
                          )}
                        </div>
                        <span className="text-xs text-gray-400">{formatTime(activity.timestamp)}</span>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  User Reviews & Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {reviewsList.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No reviews submitted yet</p>
                  ) : (
                    reviewsList.map((review) => (
                      <div key={review.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{review.userName}</span>
                            <Badge variant="outline" className="text-xs">{review.userEmail}</Badge>
                            {review.rating === 'positive' ? (
                              <ThumbsUp className="h-4 w-4 text-green-600" />
                            ) : (
                              <ThumbsDown className="h-4 w-4 text-red-600" />
                            )}
                          </div>
                          {review.comment && (
                            <p className="text-sm text-gray-600 mt-1">"{review.comment}"</p>
                          )}
                        </div>
                        <span className="text-xs text-gray-400">{formatTime(review.timestamp)}</span>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  ML Model Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="learningRate">Learning Rate</Label>
                    <Input
                      id="learningRate"
                      type="number"
                      step="0.001"
                      value={params.rate}
                      onChange={(e) => setParams({...params, rate: parseFloat(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="epochs">Epochs</Label>
                    <Input
                      id="epochs"
                      type="number"
                      value={params.epochs}
                      onChange={(e) => setParams({...params, epochs: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="batchSize">Batch Size</Label>
                    <Input
                      id="batchSize"
                      type="number"
                      value={params.batch}
                      onChange={(e) => setParams({...params, batch: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="validationSplit">Validation Split</Label>
                    <Input
                      id="validationSplit"
                      type="number"
                      step="0.1"
                      value={params.split}
                      onChange={(e) => setParams({...params, split: parseFloat(e.target.value)})}
                    />
                  </div>
                </div>
                <Button onClick={updateParams} className="w-full">
                  Update Model Parameters
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
