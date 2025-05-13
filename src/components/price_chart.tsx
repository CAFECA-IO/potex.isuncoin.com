import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { BarChart2, LineChart } from 'lucide-react';

interface DataPoint {
  time: string;
  price: number;
}

enum ViewType {
  Line = 'line',
  Bar = 'bar',
}

enum PeriodType {
  H1 = '1H',
  D1 = '1D',
  W1 = '1W',
  M1 = '1M',
  Y1 = '1Y',
}

// Random-walk data generator starting at 0.05
const generateData = (points = 60, unitMinutes = 1_440): DataPoint[] => {
  const now = new Date();
  let lastPrice = 0.05;
  return Array.from({ length: points }).map((_, i) => {
    const time = new Date(now.getTime() - (points - i - 1) * unitMinutes * 1_000);
    if (i > 0) {
      const randomDelta = (Math.random() > 0.45 ? 1 : -1) * Math.random() * Math.sqrt(unitMinutes) / 10_000;
      const delta = lastPrice + randomDelta > 0 ? randomDelta : lastPrice * -0.1;
      lastPrice = Math.max(lastPrice + delta, 0);
    }
    const rounded = Math.round(lastPrice * 1_000_000) / 1_000_000;
    const label = unitMinutes > 10_000
      ? time.toLocaleDateString()
      : time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    return { time: label, price: rounded };
  });
};

const PriceChart: React.FC = () => {
  const [view, setView] = useState<ViewType>(ViewType.Line);
  const [period, setPeriod] = useState<PeriodType>(PeriodType.D1);
  const [data, setData] = useState<DataPoint[]>(generateData());
  const [currentPrice, setCurrentPrice] = useState<number>(0.05);
  const [percentChange, setPercentChange] = useState<number>(0);

  useEffect(() => {
    let points: number;
    let unit: number;
    switch (period) {
      case PeriodType.H1:
        points = 60; unit = 60;
        break;
      case PeriodType.D1:
        points = 60; unit = 1_440;
        break;
      case PeriodType.W1:
        points = 60; unit = 10_080;
        break;
      case PeriodType.M1:
        points = 60; unit = 43_200;
        break;
      case PeriodType.Y1:
        points = 60; unit = 525_600;
        break;
      default:
        points = 60; unit = 10_080;
    }
    const newData = generateData(points, unit);
    setData(newData);
    const first = newData[0]?.price ?? currentPrice;
    const last = newData[newData.length - 1]?.price ?? currentPrice;
    setCurrentPrice(Number(last.toFixed(6)));
    setPercentChange(Number((((last - first) / first) * 100).toFixed(2)));
  }, [period]);

  return (
    <div className="bg-black text-white p-4 rounded-lg">
      {/* Header */}
      <div className="flex items-baseline justify-between">
        <div>
          <h1 className="text-3xl font-semibold">${currentPrice}</h1>
          <div className={`text-sm font-medium flex items-center ${percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {percentChange}%
          </div>
        </div>
        {/* Controls */}
        <div className="flex items-center space-x-2">
          <LineChart
            className={`w-5 h-5 cursor-pointer ${view === ViewType.Line ? 'text-white' : 'text-gray-500'}`}
            onClick={() => setView(ViewType.Line)}
          />
          <BarChart2
            className={`w-5 h-5 cursor-pointer ${view === ViewType.Bar ? 'text-white' : 'text-gray-500'}`}
            onClick={() => setView(ViewType.Bar)}
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
            {view === ViewType.Line && (
              <Area type="monotone" dataKey="price" stroke="#3B8BFF" fillOpacity={1} fill="url(#grad)" strokeWidth={2} />
            )}
            {view === ViewType.Bar && (
              <Area type="step" dataKey="price" stroke="#3B8BFF" fillOpacity={1} fill="url(#grad)" strokeWidth={2} />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Period Selector */}
      <div className="flex justify-center space-x-4 mt-4 text-sm">
        {Object.values(PeriodType).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p as PeriodType)}
            className={`px-2 py-1 rounded-md focus:outline-none ${period === p ? 'bg-gray-700 text-white' : 'text-gray-500'}`}
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
};

export default PriceChart;
