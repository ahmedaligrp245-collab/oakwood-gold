"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  {
    label: "Dashboard",
    href: "/portal/dashboard",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    label: "Trading",
    href: "/portal/trading",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
  {
    label: "Portfolio",
    href: "/portal/portfolio",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a2.25 2.25 0 00-2.25-2.25H9.75a2.25 2.25 0 00-2.25 2.25v.75m9 0v-.75a2.25 2.25 0 00-2.25-2.25H9.75A2.25 2.25 0 007.5 12v.75m9 0a2.25 2.25 0 012.25 2.25v.75a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 15v-.75A2.25 2.25 0 016.75 12h9z" />
      </svg>
    ),
  },
  {
    label: "History",
    href: "/portal/history",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("oakwood_session");
    localStorage.removeItem("oakwood_user");
    router.push("/");
  };

  return (
    <aside className="w-64 flex-shrink-0 border-r border-[#1E293B] bg-[#0F172A] flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="h-16 flex items-center gap-3 px-5 border-b border-[#1E293B]">
        <div className="w-8 h-8 rounded-md gold-bg flex items-center justify-center flex-shrink-0">
          <span className="text-[#0B1220] font-bold text-sm">O</span>
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-sm text-white truncate">
            Oakwood Advisory
          </div>
          <div className="text-[10px] text-[#C9A227] font-medium tracking-wider uppercase">
            Gold Edition
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#0D9488]/15 text-[#14B8A6] border border-[#0D9488]/25"
                  : "text-[#94A3B8] hover:text-white hover:bg-[#1E293B]/60"
              }`}
            >
              <span className={isActive ? "text-[#14B8A6]" : "text-[#64748B]"}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Account info + logout */}
      <div className="p-4 border-t border-[#1E293B]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-[#1E293B] flex items-center justify-center text-sm font-semibold text-[#C9A227]">
            GE
          </div>
          <div className="min-w-0">
            <div className="text-sm font-medium text-white truncate">
              Gold Edition Client
            </div>
            <div className="text-xs text-[#64748B]">Demo Account</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full btn btn-ghost h-9 text-xs"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
