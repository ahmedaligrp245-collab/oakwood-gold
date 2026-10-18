"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Lang = "en" | "ar" | "es" | "fr" | "tr";

const translations: Record<Lang, Record<string, string>> = {
  en: {
    company: "COMPANY",
    home: "Home",
    about: "About",
    market: "Market",
    faq: "FAQ",
    title1: "LOGIN TO",
    title2: "YOUR ACCOUNT",
    username: "Username/Email",
    password: "Password",
    phone: "Phone Number",
    submit: "Submit",
    demo: "Demo",
    live: "Live",
    reviews: "Client Reviews",
  },
  ar: {
    company: "الشركة",
    home: "الرئيسية",
    about: "من نحن",
    market: "الأسواق",
    faq: "الأسئلة",
    title1: "تسجيل الدخول",
    title2: "إلى حسابك",
    username: "اسم المستخدم / البريد",
    password: "كلمة المرور",
    phone: "رقم الهاتف",
    submit: "دخول",
    demo: "تجريبي",
    live: "حقيقي",
    reviews: "آراء العملاء",
  },
  es: {
    company: "COMPANY",
    home: "Inicio",
    about: "Nosotros",
    market: "Mercados",
    faq: "FAQ",
    title1: "INICIA SESIÓN",
    title2: "EN TU CUENTA",
    username: "Usuario/Email",
    password: "Contraseña",
    phone: "Teléfono",
    submit: "Entrar",
    demo: "Demo",
    live: "Real",
    reviews: "Opiniones de clientes",
  },
  fr: {
    company: "COMPANY",
    home: "Accueil",
    about: "À propos",
    market: "Marchés",
    faq: "FAQ",
    title1: "CONNECTEZ-VOUS",
    title2: "À VOTRE COMPTE",
    username: "Identifiant/Email",
    password: "Mot de passe",
    phone: "Téléphone",
    submit: "Connexion",
    demo: "Démo",
    live: "Réel",
    reviews: "Avis clients",
  },
  tr: {
    company: "COMPANY",
    home: "Ana Sayfa",
    about: "Hakkımızda",
    market: "Piyasalar",
    faq: "SSS",
    title1: "HESABINIZA",
    title2: "GİRİŞ YAPIN",
    username: "Kullanıcı Adı/E-posta",
    password: "Şifre",
    phone: "Telefon",
    submit: "Giriş Yap",
    demo: "Demo",
    live: "Canlı",
    reviews: "Müşteri Yorumları",
  },
};

const tickerItems = [
  { type: "stock" as const, symbol: "EUR/USD", price: "1.0842", change: "+0.12%", up: true },
  { type: "stock" as const, symbol: "GBP/USD", price: "1.2718", change: "-0.08%", up: false },
  { type: "stock" as const, symbol: "XAU/USD", price: "2348.60", change: "+0.45%", up: true },
  { type: "stock" as const, symbol: "BTC/USD", price: "67,842", change: "+2.14%", up: true },
  { type: "stock" as const, symbol: "ETH/USD", price: "3,421", change: "+1.87%", up: true },
  { type: "stock" as const, symbol: "US500", price: "5,421.5", change: "-0.18%", up: false },
  { type: "stock" as const, symbol: "NAS100", price: "18,942", change: "+0.32%", up: true },
  { type: "stock" as const, symbol: "WTI Oil", price: "78.42", change: "+0.65%", up: true },
  { type: "stock" as const, symbol: "AAPL", price: "227.38", change: "+0.56%", up: true },
  { type: "stock" as const, symbol: "TSLA", price: "248.92", change: "+2.31%", up: true },
  { type: "stock" as const, symbol: "XAG/USD", price: "28.41", change: "+0.22%", up: true },
  { type: "stock" as const, symbol: "USD/JPY", price: "149.32", change: "+0.15%", up: true },
  { type: "event" as const, text: "🔴 Fed Rate Decision — Oct 22" },
  { type: "event" as const, text: "📅 NFP Report — Nov 1" },
  { type: "event" as const, text: "⚡ ECB Speech — Oct 20" },
  { type: "event" as const, text: "📊 CPI Data Release — Oct 25" },
  { type: "event" as const, text: "🏦 BoE Meeting — Nov 7" },
];

const reviews = [
  { name: "James R.", text: "Execution speed is outstanding. Best institutional platform I've used.", rating: 5 },
  { name: "Sara M.", text: "Clean interface and reliable spreads. Gold Edition is worth every penny.", rating: 5 },
  { name: "Ahmed K.", text: "Risk tools and portfolio view helped me scale with confidence.", rating: 5 },
  { name: "Elena V.", text: "Fast deposits, tight spreads on majors. Highly recommended.", rating: 4 },
  { name: "Marcus T.", text: "The trading terminal feels professional and responsive.", rating: 5 },
  { name: "Layla H.", text: "Customer support responded within minutes. Excellent service.", rating: 5 },
  { name: "Omar F.", text: "Gold and oil CFDs have competitive spreads here.", rating: 4 },
  { name: "Nina P.", text: "I switched from another broker and never looked back.", rating: 5 },
  { name: "David L.", text: "Portfolio analytics are clear and actionable.", rating: 5 },
  { name: "Fatima S.", text: "Demo account helped me practice before going live.", rating: 4 },
  { name: "Chris B.", text: "Mobile experience is smooth. I trade on the go daily.", rating: 5 },
  { name: "Youssef A.", text: "Account manager is proactive and knowledgeable.", rating: 5 },
  { name: "Anna K.", text: "Withdrawal processed in under 24 hours. Very reliable.", rating: 5 },
  { name: "Hassan M.", text: "Charts and order ticket are well designed.", rating: 4 },
  { name: "Sophie R.", text: "Love the dark institutional design of the platform.", rating: 5 },
  { name: "Karim D.", text: "Low latency execution on EURUSD and GBPUSD.", rating: 5 },
  { name: "Mia J.", text: "Educational resources helped me improve my strategy.", rating: 4 },
  { name: "Tariq N.", text: "Multi-language support is a big plus for our team.", rating: 5 },
  { name: "Olivia W.", text: "Risk management tools are institutional grade.", rating: 5 },
  { name: "Rami Z.", text: "Been trading here for 8 months — zero platform issues.", rating: 5 },
  { name: "Grace T.", text: "The Gold Edition package delivers real value.", rating: 4 },
  { name: "Ibrahim S.", text: "Tight spreads during news events surprised me.", rating: 5 },
  { name: "Chloe M.", text: "Onboarding was fast and KYC was straightforward.", rating: 5 },
  { name: "Nour E.", text: "Best forex experience I've had in the Middle East.", rating: 5 },
  { name: "Lucas P.", text: "Indices and commodities selection is solid.", rating: 4 },
  { name: "Aisha B.", text: "I recommend Oakwood to all serious traders.", rating: 5 },
  { name: "Ethan H.", text: "Stable platform even during high volatility.", rating: 5 },
  { name: "Leila C.", text: "The dashboard gives me everything at a glance.", rating: 4 },
  { name: "Victor G.", text: "Professional tools without the complexity of others.", rating: 5 },
  { name: "Hana Y.", text: "Transparent fees and no hidden charges.", rating: 5 },
  { name: "Daniel K.", text: "Order execution is consistent and fair.", rating: 5 },
  { name: "Maya R.", text: "The client portal feels modern and secure.", rating: 4 },
  { name: "Samir O.", text: "Great for both discretionary and systematic traders.", rating: 5 },
  { name: "Isabella F.", text: "Support team understands trading, not just tickets.", rating: 5 },
  { name: "Zaid A.", text: "Oakwood Gold Edition exceeded my expectations.", rating: 5 },
];

export default function HomePage() {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>("en");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [accountType, setAccountType] = useState<"demo" | "live">("demo");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const t = translations[lang];
  const isRTL = lang === "ar";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    if (email.trim() && password.trim()) {
      localStorage.setItem("oakwood_session", "true");
      localStorage.setItem("oakwood_user", email);
      localStorage.setItem("oakwood_lang", lang);
      router.push("/portal/dashboard");
    } else {
      setError("Required fields missing");
      setIsLoading(false);
    }
  };

  return (
    <div
      className={"min-h-screen w-full relative overflow-hidden flex flex-col " + (isRTL ? "rtl" : "")}
      dir={isRTL ? "rtl" : "ltr"}
      style={{
        background: "linear-gradient(145deg, #050D1C 0%, #0A1635 35%, #06102A 70%, #030A18 100%)",
      }}
    >
      {/* BIG LIVE CHART BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 1200 700"
          className="absolute inset-0 w-full h-full opacity-[0.14]"
          preserveAspectRatio="xMidYMid slice"
        >
          {[100, 200, 300, 400, 500, 600].map((y) => (
            <line key={y} x1="0" y1={y} x2="1200" y2={y} stroke="#3B82F6" strokeWidth="0.5" opacity="0.3" />
          ))}
          {Array.from({ length: 40 }).map((_, i) => {
            const x = 30 + i * 30;
            const h = 25 + Math.sin(i * 0.55) * 50 + Math.cos(i * 0.3) * 25 + (i % 5) * 8;
            const y = 320 - h / 2 + Math.sin(i * 0.2) * 40;
            const up = Math.sin(i * 0.7) > -0.2;
            return (
              <g key={i}>
                <line x1={x} y1={y - 20} x2={x} y2={y + h + 20} stroke="#60A5FA" strokeWidth="1.2" />
                <rect x={x - 8} y={y} width="16" height={Math.max(h, 8)} fill={up ? "#3B82F6" : "#1E3A8A"} rx="1" />
              </g>
            );
          })}
          <path d="M20,480 Q150,420 280,380 T520,280 T780,200 T1100,120" fill="none" stroke="#FACC15" strokeWidth="2" opacity="0.5" />
          <path d="M20,500 Q180,460 320,400 T600,300 T900,220 T1180,160" fill="none" stroke="#14B8A6" strokeWidth="1.5" opacity="0.35" />
        </svg>
        <div className="absolute top-0 right-0 w-[55%] h-[65%]" style={{ background: "radial-gradient(ellipse at 80% 35%, rgba(37,99,235,0.2) 0%, transparent 60%)" }} />
        <div className="absolute bottom-0 left-0 w-[45%] h-[45%]" style={{ background: "radial-gradient(ellipse at 15% 85%, rgba(201,162,39,0.07) 0%, transparent 55%)" }} />
      </div>

      {/* Yellow beams */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { top: "35%", left: "40%", w: "50%", rot: "-26deg", op: 0.4 },
          { top: "42%", left: "45%", w: "45%", rot: "-20deg", op: 0.28 },
          { top: "50%", left: "48%", w: "38%", rot: "-32deg", op: 0.22 },
        ].map((b, i) => (
          <div key={i} className="absolute" style={{ top: b.top, left: b.left, width: b.w, height: "2px", background: "linear-gradient(90deg, transparent 0%, #FACC15 45%, transparent 100%)", transform: "rotate(" + b.rot + ")", opacity: b.op }} />
        ))}
      </div>

      {/* Coins */}
      <div className="absolute z-[5] animate-float-slow hidden md:flex" style={{ right: "3%", top: "22%", width: 90, height: 90, borderRadius: "50%", background: "linear-gradient(145deg, #4B4B4B 0%, #2A2A2A 40%, #151515 100%)", border: "4px solid #5A5A5A", boxShadow: "0 20px 45px rgba(0,0,0,0.5)", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 38, fontWeight: 700, color: "#F5F5F5" }}>₿</span>
      </div>
      <div className="absolute z-[5] animate-float-medium hidden md:flex" style={{ right: "8%", top: "55%", width: 65, height: 65, borderRadius: "50%", background: "linear-gradient(145deg, #4B4B4B 0%, #2A2A2A 40%, #151515 100%)", border: "3px solid #5A5A5A", boxShadow: "0 15px 35px rgba(0,0,0,0.45)", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 24, color: "#E0E0E0" }}>◇</span>
      </div>

      {/* TICKER */}
      <div className="relative z-40 bg-[#0A1228]/95 border-b border-[#1E3A5F]/50 overflow-hidden">
        <div className="flex animate-ticker whitespace-nowrap py-2">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <div key={i} className="inline-flex items-center mx-5 text-[12px]">
              {item.type === "stock" ? (
                <>
                  <span className="text-white/50 font-medium mr-1.5">{item.symbol}</span>
                  <span className="text-white font-semibold mr-1.5">{item.price}</span>
                  <span className={item.up ? "text-emerald-400" : "text-red-400"}>{item.change}</span>
                </>
              ) : (
                <span className="text-[#FACC15]/90 font-medium">{item.text}</span>
              )}
              <span className="mx-4 text-white/15">|</span>
            </div>
          ))}
        </div>
      </div>

      {/* NAV */}
      <header className="relative z-30 flex items-center justify-between px-5 sm:px-8 h-11">
        <div className="text-white font-semibold tracking-[0.25em] text-[12px] uppercase">{t.company}</div>
        <nav className="hidden md:flex items-center gap-7 text-[12px] text-white/60">
          <a href="#" className="hover:text-white transition-colors">{t.home}</a>
          <a href="#" className="hover:text-white transition-colors">{t.about}</a>
          <a href="#" className="hover:text-white transition-colors">{t.market}</a>
          <a href="#" className="hover:text-white transition-colors">{t.faq}</a>
        </nav>
        <div className="flex gap-0.5">
          {(["en", "ar", "es", "fr", "tr"] as Lang[]).map((l) => (
            <button key={l} onClick={() => setLang(l)} className={"px-2 py-0.5 rounded text-[10px] uppercase font-semibold transition-all " + (lang === l ? "bg-[#FACC15] text-black" : "text-white/35 hover:text-white/70")}>
              {l}
            </button>
          ))}
        </div>
      </header>

      {/* MAIN */}
      <div className="relative z-20 flex-1 max-w-[1400px] mx-auto px-4 sm:px-6 py-3 flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
        {/* LEFT: Form */}
        <div className="w-full lg:w-[38%] flex flex-col items-center lg:items-start order-2 lg:order-1">
          <h1 className="text-[36px] sm:text-[44px] font-bold text-white leading-[1.1] text-center lg:text-left mb-5 tracking-wide" style={{ textShadow: "0 4px 24px rgba(0,0,0,0.45)" }}>
            <span className="block">{t.title1}</span>
            <span className="block">{t.title2}</span>
          </h1>
          <div className="w-full max-w-[340px] relative">
            <div className="absolute -inset-5 rounded-2xl -z-10" style={{ background: "linear-gradient(155deg, #0B1528 0%, #0E1C32 45%, #081220 100%)", border: "1px solid rgba(59,130,246,0.3)", boxShadow: "0 30px 70px rgba(0,0,0,0.5)" }} />
            <form onSubmit={handleLogin} className="space-y-3 relative z-10">
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.username} className="w-full h-[46px] px-5 rounded-full text-sm text-white placeholder:text-white/40 focus:outline-none" style={{ background: "rgba(10,20,40,0.92)", border: "1.5px solid #1E3A5F" }} />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t.password} className="w-full h-[46px] px-5 rounded-full text-sm text-white placeholder:text-white/40 focus:outline-none" style={{ background: "rgba(10,20,40,0.92)", border: "1.5px solid #1E3A5F" }} />
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t.phone} className="w-full h-[46px] px-5 rounded-full text-sm text-white placeholder:text-white/40 focus:outline-none" style={{ background: "rgba(10,20,40,0.92)", border: "1.5px solid #1E3A5F" }} />
              <div className="flex gap-2">
                <button type="button" onClick={() => setAccountType("demo")} className={"flex-1 h-9 rounded-full text-sm font-semibold transition-all " + (accountType === "demo" ? "bg-[#FACC15] text-black" : "text-white/45")} style={accountType !== "demo" ? { background: "rgba(10,20,40,0.9)", border: "1.5px solid #1E3A5F" } : {}}>
                  {t.demo}
                </button>
                <button type="button" onClick={() => setAccountType("live")} className={"flex-1 h-9 rounded-full text-sm font-semibold transition-all " + (accountType === "live" ? "bg-[#3B82F6] text-white" : "text-white/45")} style={accountType !== "live" ? { background: "rgba(10,20,40,0.9)", border: "1.5px solid #1E3A5F" } : {}}>
                  {t.live}
                </button>
              </div>
              {error && <p className="text-red-400 text-xs text-center">{error}</p>}
              <button type="submit" disabled={isLoading} className="w-full h-[46px] rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-black font-bold text-[15px] transition-all disabled:opacity-60" style={{ boxShadow: "0 8px 25px rgba(250,204,21,0.35)" }}>
                {isLoading ? "…" : t.submit}
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT: Your picture */}
        <div className="w-full lg:w-[58%] relative order-1 lg:order-2 flex items-center justify-center">
          <div className="relative w-full max-w-[620px]">
            <img src="/hero-trader.webp" alt="Oakwood Trader" className="w-full h-auto object-contain drop-shadow-2xl" />
          </div>
        </div>
      </div>

      {/* 35 REVIEWS scrolling right to left */}
      <div className="relative z-30 border-t border-[#1E3A5F]/40 bg-[#060D1C]/90 overflow-hidden py-3">
        <div className="text-[10px] uppercase tracking-wider text-white/35 font-medium px-6 mb-2">
          {t.reviews} · {reviews.length} verified
        </div>
        <div className="flex animate-reviews-scroll whitespace-nowrap">
          {[...reviews, ...reviews].map((r, i) => (
            <div key={i} className="inline-flex items-center gap-3 mx-3 px-4 py-2.5 rounded-xl flex-shrink-0" style={{ background: "rgba(15,25,45,0.85)", border: "1px solid rgba(59,130,246,0.2)", minWidth: 280 }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0" style={{ background: "linear-gradient(135deg, #3B82F6, #1D4ED8)" }}>
                {r.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-semibold text-white">{r.name}</span>
                  <span className="text-[#FACC15] text-[10px]">{"★".repeat(r.rating)}</span>
                </div>
                <p className="text-[11px] text-white/60 truncate max-w-[220px]">&ldquo;{r.text}&rdquo;</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(3deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(-3deg); }
        }
        .animate-float-slow { animation: float-slow 7.5s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 9s ease-in-out infinite 1.1s; }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker { animation: ticker 40s linear infinite; }
        .animate-ticker:hover { animation-play-state: paused; }
        @keyframes reviews-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-reviews-scroll { animation: reviews-scroll 90s linear infinite; }
        .animate-reviews-scroll:hover { animation-play-state: paused; }
      `}</style>
    </div>
  );
}
