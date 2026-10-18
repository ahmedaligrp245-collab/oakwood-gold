"use client";

function formatMoney(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(n);
}

const exposure = [
  { asset: "EUR/USD", side: "Long", volume: 1.5, exposure: 162630, weight: 28.4, pl: 465 },
  { asset: "XAU/USD", side: "Long", volume: 0.5, exposure: 117440, weight: 20.5, pl: 1370 },
  { asset: "GBP/USD", side: "Short", volume: 2.0, exposure: 254380, weight: 44.4, pl: 720 },
  { asset: "US500", side: "Long", volume: 1.0, exposure: 54215, weight: 9.5, pl: 415 },
  { asset: "USD/JPY", side: "Flat", volume: 0, exposure: 0, weight: 0, pl: 0 },
];

const allocation = [
  { name: "Forex Majors", value: 72.8, color: "#0D9488" },
  { name: "Precious Metals", value: 20.5, color: "#C9A227" },
  { name: "Indices", value: 9.5, color: "#6366F1" },
  { name: "Cash", value: -2.8, color: "#64748B" },
];

export default function PortfolioPage() {
  const totalExposure = exposure.reduce((s, e) => s + e.exposure, 0);
  const totalPL = exposure.reduce((s, e) => s + e.pl, 0);

  return (
    <div className="p-6 lg:p-8 max-w-[1400px]">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">Portfolio</h1>
        <p className="text-sm text-[#64748B] mt-1">
          Exposure, allocation and risk overview · Demo Account
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="oak-card p-5">
          <div className="text-xs text-[#64748B] uppercase tracking-wide mb-1">
            Total Exposure
          </div>
          <div className="text-xl font-semibold text-white">
            {formatMoney(totalExposure)}
          </div>
        </div>
        <div className="oak-card p-5">
          <div className="text-xs text-[#64748B] uppercase tracking-wide mb-1">
            Open P/L
          </div>
          <div className={`text-xl font-semibold ${totalPL >= 0 ? "positive" : "negative"}`}>
            {totalPL >= 0 ? "+" : ""}
            {formatMoney(totalPL)}
          </div>
        </div>
        <div className="oak-card p-5">
          <div className="text-xs text-[#64748B] uppercase tracking-wide mb-1">
            Positions
          </div>
          <div className="text-xl font-semibold text-white">
            {exposure.filter((e) => e.volume > 0).length}
          </div>
        </div>
        <div className="oak-card p-5">
          <div className="text-xs text-[#64748B] uppercase tracking-wide mb-1">
            Margin Level
          </div>
          <div className="text-xl font-semibold text-[#14B8A6]">700.0%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Exposure table */}
        <div className="lg:col-span-2 oak-card overflow-hidden">
          <div className="px-5 py-4 border-b border-[#1E293B]">
            <h2 className="font-semibold text-white text-sm">
              Current Exposure
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full oak-table">
              <thead>
                <tr>
                  <th className="text-left">Instrument</th>
                  <th className="text-left">Side</th>
                  <th className="text-right">Volume</th>
                  <th className="text-right">Exposure</th>
                  <th className="text-right">Weight</th>
                  <th className="text-right">P/L</th>
                </tr>
              </thead>
              <tbody>
                {exposure.map((row) => (
                  <tr key={row.asset}>
                    <td className="font-medium text-white">{row.asset}</td>
                    <td>
                      <span
                        className={`text-xs font-medium ${
                          row.side === "Long"
                            ? "text-[#10B981]"
                            : row.side === "Short"
                            ? "text-[#F87171]"
                            : "text-[#64748B]"
                        }`}
                      >
                        {row.side}
                      </span>
                    </td>
                    <td className="text-right font-mono text-[13px]">
                      {row.volume.toFixed(2)}
                    </td>
                    <td className="text-right font-mono text-[13px]">
                      {formatMoney(row.exposure)}
                    </td>
                    <td className="text-right font-mono text-[13px]">
                      {row.weight.toFixed(1)}%
                    </td>
                    <td
                      className={`text-right font-mono text-[13px] font-medium ${
                        row.pl > 0
                          ? "positive"
                          : row.pl < 0
                          ? "negative"
                          : "text-[#64748B]"
                      }`}
                    >
                      {row.pl !== 0
                        ? `${row.pl > 0 ? "+" : ""}${formatMoney(row.pl)}`
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Allocation */}
        <div className="oak-card p-5">
          <h2 className="font-semibold text-white text-sm mb-5">
            Asset Allocation
          </h2>
          <div className="space-y-4">
            {allocation.map((item) => (
              <div key={item.name}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-[#CBD5E1]">{item.name}</span>
                  <span className="font-mono text-white">
                    {item.value > 0 ? item.value.toFixed(1) : "—"}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-[#1E293B] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.max(0, Math.min(100, item.value))}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-5 border-t border-[#1E293B]">
            <h3 className="text-xs text-[#64748B] uppercase tracking-wide mb-3">
              Risk Notes
            </h3>
            <ul className="space-y-2 text-xs text-[#94A3B8] leading-relaxed">
              <li>• Highest concentration in GBP/USD short</li>
              <li>• Metals exposure within policy limits</li>
              <li>• Margin level comfortably above 200%</li>
              <li>• No single instrument &gt; 50% of equity</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
