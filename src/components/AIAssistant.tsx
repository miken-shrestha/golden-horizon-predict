
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, MessageCircle } from 'lucide-react';

interface AIAssistantProps {
  currentPrice: number;
  predictedPrice: number;
  trend: 'up' | 'down';
  confidence: 'high' | 'medium' | 'low';
}

export const AIAssistant = ({ currentPrice, predictedPrice, trend, confidence }: AIAssistantProps) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messages = [
    `Hi Miken! 🌟 Based on current market trends, gold might shine ${trend === 'up' ? 'brighter' : 'a bit dimmer'} tomorrow ✨`,
    `Good ${new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}! The golden crystal ball shows ${trend === 'up' ? 'promising' : 'cautious'} signals ahead 🔮`,
    `Market whispers suggest gold prices are ${trend === 'up' ? 'dancing upward' : 'taking a breather'}. Confidence level: ${confidence} ${confidence === 'high' ? '😊' : confidence === 'medium' ? '😐' : '😟'}`,
    `✨ Goldeen here! The precious metal markets are showing ${trend === 'up' ? 'bullish' : 'bearish'} patterns. Stay tuned for more insights! 📈`,
    `🎯 My ML sensors detect a ${Math.abs(predictedPrice - currentPrice).toFixed(2)} point ${trend === 'up' ? 'upward' : 'downward'} movement brewing!`
  ];

  useEffect(() => {
    const showMessage = () => {
      setIsTyping(true);
      setTimeout(() => {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        setMessage(randomMessage);
        setIsTyping(false);
      }, 1500);
    };

    showMessage();
    const interval = setInterval(showMessage, 15000);
    return () => clearInterval(interval);
  }, [currentPrice, predictedPrice, trend, confidence]);

  return (
    <Card className="bg-gradient-to-r from-purple-100 via-pink-50 to-yellow-100 border-2 border-purple-200 shadow-lg animate-fade-in">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="h-6 w-6 text-white animate-pulse" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-purple-800">Goldeen AI Assistant</h3>
              <MessageCircle className="h-4 w-4 text-purple-600" />
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
              {isTyping ? (
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-sm">Goldeen is thinking...</span>
                </div>
              ) : (
                <p className="text-gray-800 leading-relaxed">{message}</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
