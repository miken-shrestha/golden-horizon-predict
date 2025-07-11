
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

interface PredictionCardProps {
  predictedPrice: number;
  priceChange: number;
  changePercent: string;
  trend: 'up' | 'down';
  confidence: 'high' | 'medium' | 'low';
  confidenceEmoji: string;
  trendIcon: LucideIcon;
  trendColor: string;
}

export const PredictionCard = ({
  predictedPrice,
  priceChange,
  changePercent,
  trend,
  confidence,
  confidenceEmoji,
  trendIcon: TrendIcon,
  trendColor
}: PredictionCardProps) => {
  return (
    <Card className="shadow-lg border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <TrendIcon className={`h-6 w-6 ${trendColor}`} />
          Tomorrow's Prediction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-2xl font-bold text-gray-800">
          ${predictedPrice.toFixed(2)}
        </div>
        <div className={`flex items-center gap-2 ${trendColor}`}>
          <span className="font-medium">
            {priceChange > 0 ? '+' : ''}${priceChange.toFixed(2)}
          </span>
          <span className="text-sm">
            ({priceChange > 0 ? '+' : ''}{changePercent}%)
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Confidence</span>
          <Badge 
            variant={confidence === 'high' ? 'default' : confidence === 'medium' ? 'secondary' : 'outline'}
            className="capitalize"
          >
            {confidenceEmoji} {confidence}
          </Badge>
        </div>
        <div className="text-xs text-gray-500">
          Based on ML analysis of market trends
        </div>
      </CardContent>
    </Card>
  );
};
