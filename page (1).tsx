"use client";

import Link from "next/link";

const accountSummary = {
  balance: 125480.32,
  equity: 128942.17,
  margin: 18420.5,
  freeMargin: 110521.67,
  marginLevel: 700.0,
  openPL: 3461.85,
};

const watchlist = [
  { symbol: "EUR/USD", bid: 1.0842, ask: 1.0844, change: 0.12, positive: true },
  { symbol: "GBP/USD", bid: 1.2718, ask: 1.2721, change: -0.08, positive: false },
  { symbol: "USD/JPY", bid: 149.32, ask: 149.35, change: 0.21, positive: true },
  { symbol: "XAU/USD", bid: 2348.6, ask: 2349.1, change: 0.45, positive: true },
  { symbol: "US500", bid: 5421.5, ask: 5422.0, change: -0.18, positive: false },
  { symbol: "NAS100", bid: 18942.0, ask: 18945.0, change: 0.32, positive: true },
];

const openPositions = [
  {
    id: "P-10482",
    symbol: "EUR/USD",
    side: "Buy",
    volume: 1.5,
    openPrice: 1.0812,
    current: 1.0843,
    pl: 465.0,
  },
  {
    id: "P-10491",
    symbol: "XAU/USD",
    side: "Buy",
    volume: 0.5,
    openPrice: 2321.4,
    current: 2348.8,
    pl: 1370.0,
  },
  {
    id: "P-10503",
    symbol: "GBP/USD",
    side: "Sell",
    volume: 2.0,
    openPrice: 1.2755,
    current: 1.2719,
    pl: 720.0,
  },
  {
    id: "P-10511",
    symbol: "US500",
    side: "Buy",
    volume: 1.0,
    openPrice: 5380.0,
    current: 5421.5,
    pl: 415.0,
  },
];

function formatMoney(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(n);
}

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-8 max-w-[1600px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
          <p className="text-sm text-[#64748B] mt-1">
            Welcome back · Gold Edition Demo Account
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/portal/trading"
            className="btn btn-primary h-10 px-5 text-sm"
          >
            Open Trading Terminal
          </Link>
        </div>
      </div>

      {/* Account summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {[
          { label: "Balance", value: formatMoney(accountSummary.balance) },
          { label: "Equity", value: formatMoney(accountSummary.equity) },
          { label: "Margin", value: formatMoney(accountSummary.margin) },
          {
            label: "Free Margin",
            value: formatMoney(accountSummary.freeMargin),
          },
          {
            label: "Margin Level",
            value: `${accountSummary.marginLevel.toFixed(1)}%`,
          },
          {
            label: "Open P/L",
            value: formatMoney(accountSummary.openPL),
            highlight: true,
          },
        ].map((card) => (
          <div key={card.label} className="oak-card p-4">
            <div className="text-xs text-[#64748B] font-medium uppercase tracking-wide mb-1.5">
              {card.label}
            </div>
            <div
              className={`text-lg font-semibold ${
                card.highlight
                  ? accountSummary.openPL >= 0
                    ? "positive"
                    : "negative"
                  : "text-white"
              }`}
            >
              {card.value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Watchlist */}
        <div className="xl:col-span-1 oak-card overflow-hidden">
          <div className="px-5 py-4 border-b border-[#1E293B] flex items-center justify-between">
            <h2 className="font-semibold text-white text-sm">Market Watch</h2>
            <span className="text-xs text-[#64748B]">Live · Demo</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full oak-table">
              <thead>
                <tr>
                  <th className="text-left">Symbol</th>
                  <th className="text-right">Bid</th>
                  <th className="text-right">Ask</th>
                  <th className="text-right">Chg%</th>
                </tr>
              </thead>
              <tbody>
                {watchlist.map((row) => (
                  <tr key={row.symbol}>
                    <td className="font-medium text-white">{row.symbol}</td>
                    <td className="text-right font-mono text-[13px]">
                      {row.bid}
                    </td>
                    <td className="text-right font-mono text-[13px]">
                      {row.ask}
                    </td>
                    <td
                      className={`text-right font-mono text-[13px] ${
                        row.positive ? "positive" : "negative"
                      }`}
                    >
                      {row.positive ? "+" : ""}
                      {row.change.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Open Positions */}
        <div className="xl:col-span-2 oak-card overflow-hidden">
          <div className="px-5 py-4 border-b border-[#1E293B] flex items-center justify-between">
            <h2 className="font-semibold text-white text-sm">
              Open Positions
            </h2>
            <span className="text-xs text-[#64748B]">
              {openPositions.length} positions
            </span>
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
                  <th className="text-right">Current</th>
                  <th className="text-right">P/L</th>
                </tr>
              </thead>
              <tbody>
                {openPositions.map((pos) => (
                  <tr key={pos.id}>
                    <td className="font-mono text-xs text-[#94A3B8]">
                      {pos.id}
                    </td>
                    <td className="font-medium text-white">{pos.symbol}</td>
                    <td>
                      <span
                        className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                          pos.side === "Buy"
                            ? "bg-[#10B981]/15 text-[#10B981]"
                            : "bg-[#EF4444]/15 text-[#F87171]"
                        }`}
                      >
                        {pos.side}
                      </span>
                    </td>
                    <td className="text-right font-mono text-[13px]">
                      {pos.volume.toFixed(2)}
                    </td>
                    <td className="text-right font-mono text-[13px]">
                      {pos.openPrice}
                    </td>
                    <td className="text-right font-mono text-[13px]">
                      {pos.current}
                    </td>
                    <td
                      className={`text-right font-mono text-[13px] font-medium ${
                        pos.pl >= 0 ? "positive" : "negative"
                      }`}
                    >
                      {pos.pl >= 0 ? "+" : ""}
                      {formatMoney(pos.pl)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/portal/trading"
          className="oak-card p-5 hover:border-[#0D9488]/40 transition-colors group"
        >
          <div className="text-[#14B8A6] mb-2 group-hover:translate-x-0.5 transition-transform">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
            </svg>
          </div>
          <div className="font-medium text-white">Trading Terminal</div>
          <div className="text-xs text-[#64748B] mt-1">
            Place orders & monitor markets
          </div>
        </Link>
        <Link
          href="/portal/portfolio"
          className="oak-card p-5 hover:border-[#C9A227]/40 transition-colors group"
        >
          <div className="text-[#C9A227] mb-2">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a2.25 2.25 0 00-2.25-2.25H9.75a2.25 2.25 0 00-2.25 2.25v.75m9 0v-.75a2.25 2.25 0 00-2.25-2.25H9.75A2.25 2.25 0 007.5 12v.75m9 0a2.25 2.25 0 012.25 2.25v.75a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 15v-.75A2.25 2.25 0 016.75 12h9z" />
            </svg>
          </div>
          <div className="font-medium text-white">Portfolio</div>
          <div className="text-xs text-[#64748B] mt-1">
            Exposure, allocation & risk
          </div>
        </Link>
        <Link
          href="/portal/history"
          className="oak-card p-5 hover:border-[#64748B]/40 transition-colors group"
        >
          <div className="text-[#94A3B8] mb-2">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="font-medium text-white">Trade History</div>
          <div className="text-xs text-[#64748B] mt-1">
            Closed trades & statements
          </div>
        </Link>
      </div>
    </div>
  );
}
