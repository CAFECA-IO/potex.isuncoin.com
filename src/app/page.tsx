import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-4">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div className="text-xl font-bold">Explore</div>
        <input
          type="text"
          placeholder="Search tokens"
          className="bg-zinc-800 rounded-lg px-4 py-2 w-64 text-sm"
        />
        <button className="bg-pink-600 px-4 py-2 rounded-lg text-white font-semibold">Connect</button>
      </header>

      {/* Token Summary + Right Panel */}
      <section className="flex gap-6 mb-8 flex-col lg:flex-row">
        {/* Left Content */}
        <div className="flex-1">
          {/* Token Header */}
          <div className="flex items-center gap-3 mb-4">
            <Image src="/8017.svg" width={36} height={36} alt="eth" />
            <h1 className="text-2xl font-bold">iSunCoin <span className="text-gray-400">ISC</span></h1>
          </div>
          {/* Price */}
          <div className="text-3xl font-bold mb-2">$2,513.94 <span className="text-green-400 text-lg ml-2">+0.92%</span></div>

          {/* Placeholder Graph */}
          <div className="h-48 bg-gradient-to-b from-pink-500 to-black rounded-lg mb-4"></div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm mb-6">
            <div><p className="text-gray-400">TVL</p><p className="font-bold">$1.1B</p></div>
            <div><p className="text-gray-400">Market Cap</p><p className="font-bold">$303.4B</p></div>
            <div><p className="text-gray-400">FDV</p><p className="font-bold">$303.4B</p></div>
            <div><p className="text-gray-400">1 Day Volume</p><p className="font-bold">$802.1M</p></div>
          </div>

          {/* Transactions Table */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Transactions</h2>
            <table className="w-full text-sm bg-zinc-900 rounded-lg overflow-hidden">
              <thead className="bg-zinc-800">
                <tr className="text-left">
                  <th className="p-2">Time</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">$ETH</th>
                  <th className="p-2">For</th>
                  <th className="p-2">USD</th>
                  <th className="p-2">Wallet</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-zinc-700">
                  <td className="p-2">7m</td>
                  <td className="p-2 text-red-400">Sell</td>
                  <td className="p-2">0.200</td>
                  <td className="p-2">503.21 USDT</td>
                  <td className="p-2">$503.02</td>
                  <td className="p-2">0xACF6...2952</td>
                </tr>
                <tr className="border-t border-zinc-700">
                  <td className="p-2">7m</td>
                  <td className="p-2 text-green-400">Buy</td>
                  <td className="p-2">1.80</td>
                  <td className="p-2">3.0K SYRUP</td>
                  <td className="p-2">$797.91</td>
                  <td className="p-2">0x7839...e454</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Panel */}
        <aside className="w-full lg:w-80 flex-shrink-0">
          {/* Swap Box */}
          <div className="bg-zinc-800 p-4 rounded-xl mb-6">
            <h2 className="text-sm mb-2 font-semibold">Swap</h2>
            <div className="bg-zinc-700 p-2 rounded-lg mb-2">
              <input type="text" placeholder="0" className="bg-transparent w-full outline-none text-lg" />
              <p className="text-right text-gray-400 text-sm">Select token</p>
            </div>
            <div className="bg-zinc-700 p-2 rounded-lg">
              <input type="text" placeholder="0" className="bg-transparent w-full outline-none text-lg" />
              <p className="text-right text-white text-sm">ETH</p>
            </div>
            <button className="mt-4 w-full bg-blue-600 py-2 rounded-lg font-semibold">Connect Wallet</button>
          </div>

          {/* Info Box */}
          <div className="bg-zinc-800 p-4 rounded-xl text-sm">
            <p className="mb-2 font-semibold">Info</p>
            <p className="text-gray-400">
              Ethereum is a smart contract platform that enables developers to build decentralized apps. ETH is the native currency...
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
