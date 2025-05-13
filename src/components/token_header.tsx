import React from 'react';
import Link from 'next/link';

interface TokenHeaderProps {
  name: string;
  symbol: string;
  logoSrc: string;
}

const TokenHeader: React.FC<TokenHeaderProps> = ({ name, symbol, logoSrc }) => {
  return (
    <div className="space-y-2">
      {/* Breadcrumb */}
      <nav className="text-gray-400 text-sm">
        <Link href="/explore" className="hover:underline">
          Explore
        </Link>
        <span className="mx-1">›</span>
        <Link href="/explore/tokens" className="hover:underline">
          Tokens
        </Link>
        <span className="mx-1">›</span>
        <span className="text-white font-medium">{symbol}</span>
      </nav>

      {/* Title and Actions */}
      <div className="flex items-center justify-between">
        {/* Token Title */}
        <div className="flex items-center gap-3">
          <img src={logoSrc} alt={name} className="w-10 h-10 rounded-full" />
          <div className="flex items-baseline gap-1">
            <h1 className="text-2xl font-semibold text-white">{name}</h1>
            <span className="text-gray-400 text-lg">{symbol}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenHeader;
