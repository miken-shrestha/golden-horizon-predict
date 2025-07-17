
export interface Activity {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  action: string;
  details: string;
  timestamp: Date;
  prediction?: {
    currentPrice: number;
    predictedPrice: number;
    trend: 'up' | 'down';
  };
}

export interface Review {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  rating: 'positive' | 'negative';
  comment?: string;
  timestamp: Date;
}

class ActivityService {
  private activities: Activity[] = [];
  private reviews: Review[] = [];

  constructor() {
    // Load from localStorage
    const storedActivities = localStorage.getItem('activities');
    const storedReviews = localStorage.getItem('reviews');
    
    if (storedActivities) {
      this.activities = JSON.parse(storedActivities).map((a: any) => ({
        ...a,
        timestamp: new Date(a.timestamp)
      }));
    }
    
    if (storedReviews) {
      this.reviews = JSON.parse(storedReviews).map((r: any) => ({
        ...r,
        timestamp: new Date(r.timestamp)
      }));
    }
  }

  logActivity(userId: string, userEmail: string, userName: string, action: string, details: string, prediction?: any) {
    const activity: Activity = {
      id: `activity-${Date.now()}-${Math.random()}`,
      userId,
      userEmail,
      userName,
      action,
      details,
      timestamp: new Date(),
      prediction
    };
    
    this.activities.unshift(activity);
    localStorage.setItem('activities', JSON.stringify(this.activities));
  }

  addReview(userId: string, userEmail: string, userName: string, rating: 'positive' | 'negative', comment?: string) {
    const review: Review = {
      id: `review-${Date.now()}-${Math.random()}`,
      userId,
      userEmail,
      userName,
      rating,
      comment,
      timestamp: new Date()
    };
    
    this.reviews.unshift(review);
    localStorage.setItem('reviews', JSON.stringify(this.reviews));
  }

  getActivities(): Activity[] {
    return this.activities;
  }

  getReviews(): Review[] {
    return this.reviews;
  }

  getUserActivities(userId: string): Activity[] {
    return this.activities.filter(a => a.userId === userId);
  }

  getActivityStats() {
    const total = this.activities.length;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayActivities = this.activities.filter(a => a.timestamp >= today).length;
    const uniqueUsers = new Set(this.activities.map(a => a.userId)).size;
    
    return {
      total,
      today: todayActivities,
      uniqueUsers
    };
  }

  getReviewStats() {
    const total = this.reviews.length;
    const positive = this.reviews.filter(r => r.rating === 'positive').length;
    const negative = this.reviews.filter(r => r.rating === 'negative').length;
    
    return {
      total,
      positive,
      negative,
      satisfaction: total > 0 ? Math.round((positive / total) * 100) : 0
    };
  }
}

export const activityService = new ActivityService();
