"use client";

function formatMoney(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(n);
}

const closedTrades = [
  {
    id: "T-9821",
    symbol: "EUR/USD",
    side: "Buy",
    volume: 1.0,
    open: 1.0782,
    close: 1.0821,
    pl: 390.0,
    opened: "2026-10-15 09:14",
    closed: "2026-10-16 14:32",
  },
  {
    id: "T-9834",
    symbol: "XAU/USD",
    side: "Sell",
    volume: 0.3,
    open: 2362.1,
    close: 2341.8,
    pl: 609.0,
    opened: "2026-10-14 11:02",
    closed: "2026-10-15 16:45",
  },
  {
    id: "T-9847",
    symbol: "GBP/USD",
    side: "Buy",
    volume: 1.5,
    open: 1.2685,
    close: 1.2652,
    pl: -495.0,
    opened: "2026-10-13 08:30",
    closed: "2026-10-14 10:18",
  },
  {
    id: "T-9852",
    symbol: "US500",
    side: "Buy",
    volume: 0.5,
    open: 5310.0,
    close: 5385.5,
    pl: 377.5,
    opened: "2026-10-12 15:22",
    closed: "2026-10-13 19:05",
  },
  {
    id: "T-9861",
    symbol: "USD/JPY",
    side: "Sell",
    volume: 2.0,
    open: 148.85,
    close: 149.12,
    pl: -362.0,
    opened: "2026-10-11 07:45",
    closed: "2026-10-12 12:30",
  },
  {
    id: "T-9870",
    symbol: "NAS100",
    side: "Buy",
    volume: 0.8,
    open: 18620.0,
    close: 18810.0,
    pl: 1520.0,
    opened: "2026-10-10 13:10",
    closed: "2026-10-11 21:40",
  },
];

export default function HistoryPage() {
  const totalPL = closedTrades.reduce((s, t) => s + t.pl, 0);
  const wins = closedTrades.filter((t) => t.pl > 0).length;
  const winRate = ((wins / closedTrades.length) * 100).toFixed(0);

  return (
    <div className="p-6 lg:p-8 max-w-[1400px]">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">Trade History</h1>
        <p className="text-sm text-[#64748B] mt-1">
          Closed positions and performance · Demo Account
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="oak-card p-5">
          <div className="text-xs text-[#64748B] uppercase tracking-wide mb-1">
            Closed Trades
          </div>
          <div className="text-xl font-semibold text-white">
            {closedTrades.length}
          </div>
        </div>
        <div className="oak-card p-5">
          <div className="text-xs text-[#64748B] uppercase tracking-wide mb-1">
            Realized P/L
          </div>
          <div
            className={`text-xl font-semibold ${
              totalPL >= 0 ? "positive" : "negative"
            }`}
          >
            {totalPL >= 0 ? "+" : ""}
            {formatMoney(totalPL)}
          </div>
        </div>
        <div className="oak-card p-5">
          <div className="text-xs text-[#64748B] uppercase tracking-wide mb-1">
            Win Rate
          </div>
          <div className="text-xl font-semibold text-white">{winRate}%</div>
        </div>
        <div className="oak-card p-5">
          <div className="text-xs text-[#64748B] uppercase tracking-wide mb-1">
            Winning Trades
          </div>
          <div className="text-xl font-semibold text-[#10B981]">
            {wins} / {closedTrades.length}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="oak-card overflow-hidden">
        <div className="px-5 py-4 border-b border-[#1E293B] flex items-center justify-between">
          <h2 className="font-semibold text-white text-sm">Closed Trades</h2>
          <button className="btn btn-ghost h-8 px-3 text-xs">
            Export CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full oak-table">
            <thead>
              <tr>
                <th className="text-left">Ticket</th>
                <th className="text-left">Symbol</th>
                <th className="text-left">Side</th>
                <th className="text-right">Volume</th>
                <th className="text-right">Open</th>
                <th className="text-right">Close</th>
                <th className="text-right">P/L</th>
                <th className="text-left">Opened</th>
                <th className="text-left">Closed</th>
              </tr>
            </thead>
            <tbody>
              {closedTrades.map((t) => (
                <tr key={t.id}>
                  <td className="font-mono text-xs text-[#94A3B8]">{t.id}</td>
                  <td className="font-medium text-white">{t.symbol}</td>
                  <td>
                    <span
                      className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                        t.side === "Buy"
                          ? "bg-[#10B981]/15 text-[#10B981]"
                          : "bg-[#EF4444]/15 text-[#F87171]"
                      }`}
                    >
                      {t.side}
                    </span>
                  </td>
                  <td className="text-right font-mono text-[13px]">
                    {t.volume.toFixed(2)}
                  </td>
                  <td className="text-right font-mono text-[13px]">{t.open}</td>
                  <td className="text-right font-mono text-[13px]">{t.close}</td>
                  <td
                    className={`text-right font-mono text-[13px] font-medium ${
                      t.pl >= 0 ? "positive" : "negative"
                    }`}
                  >
                    {t.pl >= 0 ? "+" : ""}
                    {formatMoney(t.pl)}
                  </td>
                  <td className="text-[12px] text-[#94A3B8]">{t.opened}</td>
                  <td className="text-[12px] text-[#94A3B8]">{t.closed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
