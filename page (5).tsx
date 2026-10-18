"use client";

import { useState } from "react";

const instruments = [
  { symbol: "EUR/USD", bid: 1.08421, ask: 1.08438, digits: 5, category: "Forex" },
  { symbol: "GBP/USD", bid: 1.27182, ask: 1.27205, digits: 5, category: "Forex" },
  { symbol: "USD/JPY", bid: 149.312, ask: 149.345, digits: 3, category: "Forex" },
  { symbol: "USD/CHF", bid: 0.88412, ask: 0.88435, digits: 5, category: "Forex" },
  { symbol: "AUD/USD", bid: 0.66214, ask: 0.66232, digits: 5, category: "Forex" },
  { symbol: "XAU/USD", bid: 2348.45, ask: 2348.95, digits: 2, category: "Metals" },
  { symbol: "XAG/USD", bid: 28.412, ask: 28.445, digits: 3, category: "Metals" },
  { symbol: "US500", bid: 5421.25, ask: 5421.75, digits: 2, category: "Indices" },
  { symbol: "NAS100", bid: 18942.5, ask: 18945.0, digits: 1, category: "Indices" },
  { symbol: "GER40", bid: 18245.0, ask: 18248.5, digits: 1, category: "Indices" },
  { symbol: "UK100", bid: 8245.5, ask: 8247.0, digits: 1, category: "Indices" },
  { symbol: "WTI", bid: 78.42, ask: 78.48, digits: 2, category: "Energy" },
];

export default function TradingPage() {
  const [selected, setSelected] = useState(instruments[0]);
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [volume, setVolume] = useState("1.00");
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [limitPrice, setLimitPrice] = useState("");
  const [sl, setSl] = useState("");
  const [tp, setTp] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => setOrderPlaced(false), 3000);
  };

  return (
    <div className="p-4 lg:p-6 h-[calc(100vh-0px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Trading Terminal</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Demo environment · Prices are simulated
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2.5 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/25">
            Connected
          </span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0">
        {/* Instrument list */}
        <div className="lg:col-span-3 oak-card overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-[#1E293B]">
            <input
              type="text"
              placeholder="Search instruments…"
              className="w-full h-9 px-3 rounded-md bg-[#0B1220] border border-[#1E293B] text-sm text-white placeholder:text-[#475569]"
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            {instruments.map((inst) => (
              <button
                key={inst.symbol}
                onClick={() => setSelected(inst)}
                className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors border-b border-[#1E293B]/50 ${
                  selected.symbol === inst.symbol
                    ? "bg-[#0D9488]/10"
                    : "hover:bg-[#1E293B]/40"
                }`}
              >
                <div>
                  <div className="font-medium text-sm text-white">
                    {inst.symbol}
                  </div>
                  <div className="text-[11px] text-[#64748B]">
                    {inst.category}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-xs text-[#94A3B8]">
                    {inst.bid.toFixed(inst.digits)}
                  </div>
                  <div className="font-mono text-xs text-white">
                    {inst.ask.toFixed(inst.digits)}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chart area + order ticket */}
        <div className="lg:col-span-6 flex flex-col gap-4 min-h-0">
          {/* Chart placeholder */}
          <div className="oak-card flex-1 min-h-[320px] flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-[#1E293B] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-white">
                  {selected.symbol}
                </span>
                <span className="text-xs text-[#64748B]">
                  {selected.category}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm font-mono">
                <span className="text-[#64748B]">
                  Bid{" "}
                  <span className="text-white">
                    {selected.bid.toFixed(selected.digits)}
                  </span>
                </span>
                <span className="text-[#64748B]">
                  Ask{" "}
                  <span className="text-white">
                    {selected.ask.toFixed(selected.digits)}
                  </span>
                </span>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center bg-[#0A0F1A] relative">
              {/* Simulated chart visual */}
              <div className="absolute inset-0 opacity-40">
                <svg
                  viewBox="0 0 800 300"
                  className="w-full h-full"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0D9488" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#0D9488" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,220 C50,200 100,180 150,190 C200,200 250,150 300,140 C350,130 400,160 450,120 C500,80 550,100 600,90 C650,80 700,60 750,70 L800,50 L800,300 L0,300 Z"
                    fill="url(#chartGrad)"
                  />
                  <path
                    d="M0,220 C50,200 100,180 150,190 C200,200 250,150 300,140 C350,130 400,160 450,120 C500,80 550,100 600,90 C650,80 700,60 750,70 L800,50"
                    fill="none"
                    stroke="#14B8A6"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="relative z-10 text-center">
                <p className="text-sm text-[#64748B]">
                  Chart · {selected.symbol}
                </p>
                <p className="text-xs text-[#475569] mt-1">
                  TradingView Lightweight Charts integration ready
                </p>
              </div>
            </div>
          </div>

          {/* Recent trades strip */}
          <div className="oak-card px-4 py-3 flex items-center gap-6 overflow-x-auto text-xs">
            <span className="text-[#64748B] flex-shrink-0">Recent fills</span>
            {[
              { s: "EUR/USD", side: "Buy", v: "1.50", p: "1.0842" },
              { s: "XAU/USD", side: "Buy", v: "0.50", p: "2341.2" },
              { s: "GBP/USD", side: "Sell", v: "2.00", p: "1.2731" },
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-2 flex-shrink-0">
                <span className="text-white font-medium">{t.s}</span>
                <span
                  className={
                    t.side === "Buy" ? "text-[#10B981]" : "text-[#F87171]"
                  }
                >
                  {t.side}
                </span>
                <span className="text-[#94A3B8] font-mono">
                  {t.v} @ {t.p}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Order ticket */}
        <div className="lg:col-span-3 oak-card flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-[#1E293B]">
            <h2 className="font-semibold text-white text-sm">Order Ticket</h2>
            <p className="text-xs text-[#64748B] mt-0.5">{selected.symbol}</p>
          </div>

          <div className="p-4 flex-1 space-y-4 overflow-y-auto">
            {/* Side toggle */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setSide("buy")}
                className={`h-11 rounded-lg font-semibold text-sm transition-all ${
                  side === "buy"
                    ? "bg-[#10B981] text-white"
                    : "bg-[#1E293B] text-[#94A3B8] hover:text-white"
                }`}
              >
                BUY
              </button>
              <button
                onClick={() => setSide("sell")}
                className={`h-11 rounded-lg font-semibold text-sm transition-all ${
                  side === "sell"
                    ? "bg-[#EF4444] text-white"
                    : "bg-[#1E293B] text-[#94A3B8] hover:text-white"
                }`}
              >
                SELL
              </button>
            </div>

            {/* Price display */}
            <div className="text-center py-2">
              <div className="text-2xl font-mono font-semibold text-white">
                {side === "buy"
                  ? selected.ask.toFixed(selected.digits)
                  : selected.bid.toFixed(selected.digits)}
              </div>
              <div className="text-xs text-[#64748B] mt-1">
                {side === "buy" ? "Ask" : "Bid"} · Spread{" "}
                {(
                  (selected.ask - selected.bid) *
                  Math.pow(10, selected.digits - 1)
                ).toFixed(1)}{" "}
                pips
              </div>
            </div>

            {/* Order type */}
            <div>
              <label className="text-xs text-[#94A3B8] mb-1.5 block">
                Order Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(["market", "limit"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setOrderType(t)}
                    className={`h-9 rounded-md text-xs font-medium capitalize ${
                      orderType === t
                        ? "bg-[#0D9488]/20 text-[#14B8A6] border border-[#0D9488]/40"
                        : "bg-[#0B1220] text-[#64748B] border border-[#1E293B]"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Volume */}
            <div>
              <label className="text-xs text-[#94A3B8] mb-1.5 block">
                Volume (Lots)
              </label>
              <input
                type="text"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="w-full h-10 px-3 rounded-md bg-[#0B1220] border border-[#1E293B] text-white font-mono text-sm"
              />
              <div className="flex gap-2 mt-2">
                {["0.10", "0.50", "1.00", "2.00"].map((v) => (
                  <button
                    key={v}
                    onClick={() => setVolume(v)}
                    className="flex-1 h-7 text-xs rounded bg-[#1E293B] text-[#94A3B8] hover:text-white transition-colors"
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {orderType === "limit" && (
              <div>
                <label className="text-xs text-[#94A3B8] mb-1.5 block">
                  Limit Price
                </label>
                <input
                  type="text"
                  value={limitPrice}
                  onChange={(e) => setLimitPrice(e.target.value)}
                  placeholder={selected.bid.toFixed(selected.digits)}
                  className="w-full h-10 px-3 rounded-md bg-[#0B1220] border border-[#1E293B] text-white font-mono text-sm"
                />
              </div>
            )}

            {/* SL / TP */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-[#94A3B8] mb-1.5 block">
                  Stop Loss
                </label>
                <input
                  type="text"
                  value={sl}
                  onChange={(e) => setSl(e.target.value)}
                  placeholder="Optional"
                  className="w-full h-10 px-3 rounded-md bg-[#0B1220] border border-[#1E293B] text-white font-mono text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-[#94A3B8] mb-1.5 block">
                  Take Profit
                </label>
                <input
                  type="text"
                  value={tp}
                  onChange={(e) => setTp(e.target.value)}
                  placeholder="Optional"
                  className="w-full h-10 px-3 rounded-md bg-[#0B1220] border border-[#1E293B] text-white font-mono text-sm"
                />
              </div>
            </div>

            {/* Place order */}
            <button
              onClick={handlePlaceOrder}
              className={`w-full h-12 rounded-lg font-semibold text-sm transition-all ${
                side === "buy"
                  ? "bg-[#10B981] hover:bg-[#059669] text-white"
                  : "bg-[#EF4444] hover:bg-[#DC2626] text-white"
              }`}
            >
              {side === "buy" ? "Buy" : "Sell"} {volume} {selected.symbol}
            </button>

            {orderPlaced && (
              <div className="text-center text-sm text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/20 rounded-lg py-2">
                Order submitted (Demo)
              </div>
            )}

            <p className="text-[11px] text-[#475569] text-center leading-relaxed">
              Demo mode. Orders are simulated and do not affect real balances.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
