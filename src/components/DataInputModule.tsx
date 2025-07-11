
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, Download, Upload, TrendingUp } from 'lucide-react';

export const DataInputModule = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastSync, setLastSync] = useState(new Date());

  const handleRefreshData = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLastSync(new Date());
    setIsLoading(false);
  };

  const marketData = [
    { label: 'USD/INR Rate', value: '83.12', change: '+0.15%', status: 'updated' },
    { label: 'USD/NPR Rate', value: '132.45', change: '-0.08%', status: 'updated' },
    { label: 'Crude Oil (WTI)', value: '$78.23', change: '+1.23%', status: 'updated' },
    { label: 'S&P 500', value: '4,892.35', change: '+0.45%', status: 'updated' },
    { label: 'Inflation Rate', value: '3.2%', change: 'stable', status: 'manual' },
    { label: 'Interest Rate', value: '5.25%', change: 'stable', status: 'manual' }
  ];

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Market Data Input Module
          </span>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              Last sync: {lastSync.toLocaleTimeString()}
            </Badge>
            <Button 
              size="sm" 
              onClick={handleRefreshData}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="automatic" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="automatic">🔄 Auto Fetch</TabsTrigger>
            <TabsTrigger value="manual">✏️ Manual Entry</TabsTrigger>
          </TabsList>
          
          <TabsContent value="automatic" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {marketData.map((item, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    <Badge 
                      variant={item.status === 'updated' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <div className="text-xl font-bold text-gray-900">{item.value}</div>
                  <div className={`text-sm ${item.change.includes('+') ? 'text-green-600' : item.change.includes('-') ? 'text-red-600' : 'text-gray-600'}`}>
                    {item.change}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Data
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Import Historical
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="manual" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="usd-inr">USD/INR Exchange Rate</Label>
                <Input id="usd-inr" type="number" placeholder="83.12" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="crude-oil">Crude Oil Price ($)</Label>
                <Input id="crude-oil" type="number" placeholder="78.23" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="inflation">Inflation Rate (%)</Label>
                <Input id="inflation" type="number" placeholder="3.2" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="interest">Interest Rate (%)</Label>
                <Input id="interest" type="number" placeholder="5.25" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="stock-index">Stock Market Index</Label>
                <Input id="stock-index" type="number" placeholder="4892.35" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gold-demand">Gold Demand Index</Label>
                <Input id="gold-demand" type="number" placeholder="85.4" />
              </div>
            </div>
            
            <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
              Update ML Model with New Data
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
