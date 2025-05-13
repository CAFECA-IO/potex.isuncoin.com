import React, { useState } from 'react';
import Image from 'next/image';

export interface Transaction {
  time: string;
  type: 'Buy' | 'Sell';
  amount: number;
  price: string;
  priceUnit: string;
  tokenSymbol: string;
  tokenLogo: string;
  priceUnitLogo: string;
  usdValue: string;
  wallet: string;
}

export interface Pool {
  id: string;
  name: string;
  liquidity: number;
}

interface TransactionsTableProps {
  transactions: Transaction[];
  pools?: Pool[];
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions }) => {
  const [activeTab, setActiveTab] = useState<'Transactions' | 'Pools'>('Transactions');

  return (
    <div className="bg-black text-white rounded-xl p-4">
      {/* Tabs */}
      <div className="flex space-x-6 mb-4 text-lg font-medium">
        {['Transactions', 'Pools'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as 'Transactions' | 'Pools')}
            className={`pb-1 ${
              activeTab === tab ? 'border-b-2 border-white text-white' : 'text-gray-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Transactions' && (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-left">
            <thead>
              <tr className="text-gray-400 text-sm">
                <th className="px-2 py-3">Time</th>
                <th className="px-2 py-3">Type</th>
                <th className="px-2 py-3">Amount</th>
                <th className="px-2 py-3">Price</th>
                <th className="px-2 py-3">Total Value</th>
                <th className="px-2 py-3">Wallet</th>
                <th className="px-2 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, idx) => (
                <tr key={idx} className="border-t border-gray-800 hover:bg-gray-900">
                  <td className="px-2 py-3 text-sm">{tx.time}</td>
                  <td className={`px-2 py-3 text-sm font-medium ${tx.type === 'Buy' ? 'text-green-500' : 'text-red-500'}`}>{tx.type}</td>
                  <td className="px-2 py-3 text-sm items-center flex">
                    <Image src={tx.priceUnitLogo} alt={tx.priceUnit} width={24} height={24} className="w-4 h-4 rounded-full mr-1" />
                    <span>{tx.amount}</span>
                  </td>
                  <td className="px-2 py-3 text-sm items-center">
                    <span>{tx.price}</span>
                  </td>
                  <td className="px-2 py-3 text-sm">{tx.usdValue}</td>
                  <td className="px-2 py-3 text-sm">{tx.wallet}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'Pools' && (
        <div className="text-gray-500 text-center py-8">
          Pools view coming soon.
        </div>
      )}
    </div>
  );
};

export default TransactionsTable;
