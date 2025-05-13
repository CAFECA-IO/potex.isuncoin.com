import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { BarChart2, LineChart, ChevronDown } from 'lucide-react';

// Sample data generator for illustration; replace with real data fetch
const generateData = (points = 60, unit = 1440) => {
  const now = new Date();
  let lastPrice = 0.05;
  return Array.from({ length: points }).map((_, i) => {
    const time = new Date(now.getTime() - (points - i - 1) * unit * 1000);
    if (i > 0) {
      // small random fluctuation around previous value
      const delta = (Math.random() > 0.45 ? 1 : -1) * Math.random() * (unit ** 0.5) / 10000;
      lastPrice = Math.max(lastPrice + delta, 0);
    }
    const roundedPrice = Math.round(lastPrice * 1000000) / 1000000;
    return {
      time: unit > 10000
        ? time.toLocaleDateString()
        : time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      price: roundedPrice,
    };
  });
};

export default function PriceChart() {
  const [view, setView] = useState('line');
  const [period, setPeriod] = useState('1D');
  const [data, setData] = useState(generateData());
  const [currentPrice, setCurrentPrice] = useState(0.05);
  const [percentChange, setPercentChange] = useState(3.04);

  // Simulate data refresh on period change
  useEffect(() => {
    let points, unit;
    switch (period) {
      case '1H': points = 60; unit = 60; break;
      case '1D': points = 60; unit = 1440; break;
      case '1W': points = 60; unit = 10080; break;
      case '1M': points = 60; unit = 43200; break;
      case '1Y': points = 60; unit = 525600; break;
      default: points = 60; unit = 10080;
    }
    setData(generateData(points, unit));
    // compute current price and percentChange from data
    const first = data[0]?.price || currentPrice;
    const last = data[data.length - 1]?.price || currentPrice;
    setCurrentPrice(last.toFixed(5));
    setPercentChange((((last - first) / first) * 100).toFixed(2));
  }, [period]);

  return (
    <div className="bg-black text-white p-4 rounded-lg">
      {/* Header */}
      <div className="flex items-baseline justify-between">
        <div>
          <h1 className="text-3xl font-semibold">${currentPrice}</h1>
          <div className={
            `text-sm font-medium flex items-center ${percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`
          }>
            {percentChange}%
          </div>
        </div>
        {/* Controls */}
        <div className="flex items-center space-x-2">
          <LineChart
            className={
              `w-5 h-5 cursor-pointer ${view === 'line' ? 'text-white' : 'text-gray-500'}`
            }
            onClick={() => setView('line')}
          />
          <BarChart2
            className={
              `w-5 h-5 cursor-pointer ${view === 'bar' ? 'text-white' : 'text-gray-500'}`
            }
            onClick={() => setView('bar')}
          />
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-64 mt-4">
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B8BFF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3B8BFF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: 'gray', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'gray', fontSize: 12 }} />
            <Tooltip contentStyle={{ backgroundColor: '#1e1e1e', border: 'none' }} labelStyle={{ color: 'white' }} itemStyle={{ color: '#3B8BFF' }} />
            {view === 'line' && (
              <Area type="monotone" dataKey="price" stroke="#3B8BFF" fillOpacity={1} fill="url(#grad)" strokeWidth={2} />
            )}
            {view === 'bar' && (
              <Area type="step" dataKey="price" stroke="#3B8BFF" fillOpacity={1} fill="url(#grad)" strokeWidth={2} />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Period Selector */}
      <div className="flex justify-center space-x-4 mt-4 text-sm">
        {['1H', '1D', '1W', '1M', '1Y'].map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={
              `px-2 py-1 rounded-md focus:outline-none ${period === p ? 'bg-gray-700 text-white' : 'text-gray-500'}`
            }
          >
            {p}
          </button>
        ))}
      </div>

      {/* Bottom Label */}
      <div className="flex justify-end mt-2 text-gray-500 text-xs">
        <span>$0.05</span>
      </div>
    </div>
  );
}
