import React from 'react';

export interface StatItem {
  label: string;
  value: string;
}

interface StatsSectionProps {
  stats: StatItem[];
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  return (
    <div className="flex justify-between bg-black text-white p-4">
      {stats.map(({ label, value }) => (
        <div key={label} className="flex flex-col items-start space-y-1">
          <span className="text-gray-400 text-sm uppercase tracking-wider">{label}</span>
          <span className="text-2xl font-semibold">{value}</span>
        </div>
      ))}
    </div>
  );
};

export default StatsSection;
