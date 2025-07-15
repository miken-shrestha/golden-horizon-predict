
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface PriceChartProps {
  simple?: boolean;
}

export const PriceChart = ({ simple = false }: PriceChartProps) => {
  // Generate sample data for Nepal gold prices (NPR per tola)
  const generateData = () => {
    const data = [];
    const basePrice = 134000; // Base price in NPR per tola
    let currentPrice = basePrice;
    
    for (let i = 0; i < (simple ? 7 : 30); i++) {
      const change = (Math.random() - 0.5) * 2000; // NPR variation
      currentPrice += change;
      data.push({
        date: simple 
          ? `Day ${i + 1}`
          : new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
        price: Math.max(130000, Math.min(140000, currentPrice)),
        predicted: i >= (simple ? 5 : 25) ? Math.max(130000, Math.min(140000, currentPrice + (Math.random() - 0.5) * 1500)) : null
      });
    }
    return data;
  };

  const data = generateData();

  const formatNPR = (value: number) => {
    return new Intl.NumberFormat('ne-NP', {
      style: 'currency',
      currency: 'NPR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (simple) {
    return (
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#fbbf24" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#fde68a" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={formatNPR} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(251, 191, 36, 0.9)', 
                border: 'none', 
                borderRadius: '8px',
                color: 'white'
              }}
              formatter={(value: number) => [formatNPR(value), 'Price']}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#f59e0b"
              strokeWidth={3}
              fill="url(#goldGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#fde68a" />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 12 }} tickFormatter={formatNPR} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.8)', 
              border: 'none', 
              borderRadius: '8px',
              color: 'white'
            }}
            formatter={(value: number, name: string) => [formatNPR(value), name]}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#f59e0b" 
            strokeWidth={2}
            name="Actual Price"
            dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="predicted" 
            stroke="#dc2626" 
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Predicted Price"
            dot={{ fill: '#dc2626', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
