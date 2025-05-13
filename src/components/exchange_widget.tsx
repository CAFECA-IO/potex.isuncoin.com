import React, { useState, ChangeEvent } from 'react';

type Token = {
  symbol: string;
  logo: string;
};

const TOKENS: Token[] = [
  { symbol: 'USDT', logo: '/tether.svg' },
  { symbol: 'ISC', logo: '/8017.svg' },
];

const RATE_USDT_PER_ISC = 0.05;

const ExchangeWidget: React.FC = () => {
  const [sellAmount, setSellAmount] = useState<string>('');
  const [buyAmount, setBuyAmount] = useState<string>('');
  const [sellToken, setSellToken] = useState<Token>(TOKENS[0]);
  const [buyToken, setBuyToken] = useState<Token>(TOKENS[1]);
  const userBalance = 10000;

  // Handle sell input change
  const handleSellChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSellAmount(val);
    const isc = Number(val) / RATE_USDT_PER_ISC;
    setBuyAmount(!isNaN(isc) ? isc.toFixed(2) : '');
  };

  // Swap tokens
  const handleSwap = () => {
    setSellToken(buyToken);
    setBuyToken(sellToken);
    setSellAmount(buyAmount);
    setBuyAmount(sellAmount);
  };

  const insufficient = Number(sellAmount) > userBalance;

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      {/* Sell Panel */}
      <div className="relative bg-[#1e1e1e] rounded-xl p-4 space-y-2">
        <div className="text-gray-400 text-sm">Sell</div>
        <input
          type="number"
          value={sellAmount}
          onChange={handleSellChange}
          placeholder="0.00"
          min={0}
          className="bg-transparent w-1/2 outline-none text-4xl font-semibold text-white placeholder:text-gray-500 appearance-none"
        />
        <div className="text-gray-400 text-sm">
          ${sellAmount ? Number(sellAmount).toFixed(2) : '0.00'}
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <div className="flex items-center gap-2 bg-[#2a2a2a] rounded-full px-4 py-3">
            <img src={sellToken.logo} alt={sellToken.symbol} className="w-6 h-6 rounded-full" />
            <span className="text-white font-medium">{sellToken.symbol}</span>
          </div>
        </div>
      </div>

      {/* Buy Panel */}
      <div className="relative bg-[#1e1e1e] rounded-xl p-4 space-y-2">
        <div className="text-gray-400 text-sm">Buy</div>
        <input
          type="text"
          readOnly
          value={buyAmount}
          placeholder="0.00"
          className="bg-transparent w-full outline-none text-4xl font-semibold text-white placeholder:text-gray-500"
        />
        <div className="text-gray-400 text-sm">
          ${buyAmount ? (Number(buyAmount) * RATE_USDT_PER_ISC).toFixed(2) : '0.00'}
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <div className="flex items-center gap-2 bg-[#2a2a2a] rounded-full px-4 py-3">
            <img src={buyToken.logo} alt={buyToken.symbol} className="w-6 h-6 rounded-full" />
            <span className="text-white font-medium">{buyToken.symbol}</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        type="button"
        disabled={insufficient}
        className={`w-full py-3 rounded-lg transition ${
          insufficient
            ? 'bg-[#2a2a2a] text-gray-500 cursor-not-allowed'
            : 'bg-orange-600 text-white hover:bg-orange-700'
        }`}
      >
        {insufficient ? `Insufficient ${sellToken.symbol}` : `BUY ${buyAmount || '0'} ISC`}
      </button>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-gray-400 text-sm">
        <span>
          1 ISC = ${RATE_USDT_PER_ISC} USDT (${RATE_USDT_PER_ISC})
        </span>
        <button
          type="button"
          className="flex items-center gap-1 hover:text-white transition"
          onClick={handleSwap}
        >
          Swap
        </button>
      </div>
    </div>
  );
};

export default ExchangeWidget;
