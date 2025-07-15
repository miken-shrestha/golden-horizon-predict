
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
    { label: 'USD/NPR Rate', value: '132.45', change: '+0.15%', status: 'updated' },
    { label: 'INR/NPR Rate', value: '1.59', change: '-0.08%', status: 'updated' },
    { label: 'Nepal Stock Index (NEPSE)', value: '2,089.35', change: '+1.23%', status: 'updated' },
    { label: 'Indian Gold Price', value: '₹6,845/10g', change: '+0.45%', status: 'updated' },
    { label: 'Nepal Inflation Rate', value: '6.8%', change: 'stable', status: 'manual' },
    { label: 'Nepal Bank Rate', value: '7.5%', change: 'stable', status: 'manual' },
    { label: 'Import Duty Rate', value: '10%', change: 'stable', status: 'manual' },
    { label: 'Remittance Inflow', value: '$2.1B', change: '+2.5%', status: 'updated' }
  ];

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Nepal Market Data Input Module
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
                <Label htmlFor="usd-npr">USD/NPR Exchange Rate</Label>
                <Input id="usd-npr" type="number" placeholder="132.45" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nepse-index">NEPSE Index</Label>
                <Input id="nepse-index" type="number" placeholder="2089.35" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="inflation">Nepal Inflation Rate (%)</Label>
                <Input id="inflation" type="number" placeholder="6.8" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bank-rate">Nepal Bank Rate (%)</Label>
                <Input id="bank-rate" type="number" placeholder="7.5" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="import-duty">Import Duty Rate (%)</Label>
                <Input id="import-duty" type="number" placeholder="10" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="remittance">Remittance Inflow (USD Millions)</Label>
                <Input id="remittance" type="number" placeholder="2100" />
              </div>
            </div>
            
            <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
              Update ML Model with Nepal Market Data
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
