import React, { useState } from "react";

const TOKENS = [
  { symbol: "USDT", logo: "/tether.svg" },
  { symbol: "ISC", logo: "/8017.svg" },
];

export default function ExchangeWidget() {
  const [sellAmount, setSellAmount] = useState("");
  const [buyAmount, setBuyAmount] = useState("");
  const [sellToken, setSellToken] = useState(TOKENS[0]);
  const [buyToken, setBuyToken] = useState(TOKENS[1]);
  const userBalance = 10000;
  const rateUSDTperISC = 0.05;

  // Calculate buy amount when sell changes
  const handleSellChange = (e) => {
    const val = e.target.value;
    setSellAmount(val);
    const isc = val / rateUSDTperISC;
    setBuyAmount(isc ? isc.toFixed(2) : "");
  };

  // Swap tokens and amounts
  const handleSwap = () => {
    setSellToken(buyToken);
    setBuyToken(sellToken);
    setSellAmount(buyAmount);
    setBuyAmount(sellAmount);
  };

  const insufficient = parseFloat(sellAmount) > userBalance;

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      {/* Sell Panel */}
      <div className="bg-[#1e1e1e] rounded-xl p-4 space-y-2 relative">
        <div className="text-gray-400 text-sm">Sell</div>
        <input
          type="number"
          value={sellAmount}
          onChange={handleSellChange}
          placeholder="0.00"
          min="0"
          max="1000"
          className="bg-transparent w-1/2 outline-none text-4xl font-semibold text-white placeholder:text-gray-500 appearance-none"
        />
        <div className="text-gray-400 text-sm">
          ${sellAmount ? (parseFloat(sellAmount)).toFixed(2) : "0.00"}
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <div className="flex items-center gap-2 bg-[#2a2a2a] rounded-full px-4 py-3">
            <img src={sellToken.logo} alt={sellToken.symbol} className="w-6 h-6 rounded-full" />
            <span className="text-white font-medium">{sellToken.symbol}</span>
          </div>
        </div>
      </div>

      {/* Swap Button 
      <div className="flex justify-center relative -mt-4">
        <button
          onClick={handleSwap}
          className="bg-[#2a2a2a] p-2 rounded-full border border-gray-700 hover:bg-[#3a3a3a] transition"
        >
        </button>
      </div>
        */}

      {/* Buy Panel */}
      <div className="bg-[#1e1e1e] rounded-xl p-4 space-y-2 relative">
        <div className="text-gray-400 text-sm">Buy</div>
        <input
          type="text"
          readOnly
          value={buyAmount}
          placeholder="0.00"
          className="bg-transparent w-full outline-none text-4xl font-semibold text-white placeholder:text-gray-500"
        />
        <div className="text-gray-400 text-sm">
          ${buyAmount ? (parseFloat(buyAmount) * rateUSDTperISC).toFixed(2) : "0.00"}
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
        disabled={insufficient}
        className={`w-full py-3 rounded-lg transition ${insufficient ? "bg-[#2a2a2a] text-gray-500 cursor-not-allowed" : "bg-orange-600 text-white hover:bg-orange-700"}`}
      >
        {insufficient ? `Insufficient ${sellToken.symbol}` : `BUY ${buyAmount || 0} ISC`}
      </button>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-gray-400 text-sm">
        <span>1 ISC = ${rateUSDTperISC} USDT (${rateUSDTperISC})</span>
        <button className="flex items-center gap-1 hover:text-white transition">
        </button>
      </div>
    </div>
  );
}
