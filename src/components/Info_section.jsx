import React, { useState } from 'react';
import { Globe, Github, BarChart2 } from 'lucide-react';

const links = [
  { name: 'BAIFA', icon: BarChart2, href: 'https://baifa.io/en/app/currencies/1' },
  { name: 'WEBSITE', icon: Globe, href: 'https://isuncoin.com' },
  { name: 'GITHUB', icon: Github, href: 'https://github.com/CAFECA-IO/isuncoin' },
];

export default function InfoSection({ description }) {
  const [expanded, setExpanded] = useState(false);
  const truncateLength = 120;
  const isTruncated = description.length > truncateLength;
  const displayedText = !expanded && isTruncated
    ? description.slice(0, truncateLength) + '...'
    : description;

  return (
    <div className="bg-[#1e1e1e] rounded-xl p-6 space-y-4 max-w-lg">
      <h2 className="text-white text-2xl font-semibold">Info</h2>
      <div className="flex space-x-3">
        {links.map(({ name, icon: Icon, href }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] transition rounded-full px-4 py-2 text-white text-sm"
          >
            <Icon className="w-4 h-4" />
            {name}
          </a>
        ))}
      </div>
      <p className="text-gray-300 text-base leading-relaxed">
        {displayedText}
        {isTruncated && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-1 text-gray-400 hover:text-gray-200 focus:outline-none"
          >
            {expanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </p>
    </div>
  );
}
