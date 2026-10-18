"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem("oakwood_session");
    if (!session) {
      router.replace("/");
    } else {
      setReady(true);
    }
  }, [router]);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B1220]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-lg gold-bg flex items-center justify-center animate-pulse">
            <span className="text-[#0B1220] font-bold">O</span>
          </div>
          <p className="text-sm text-[#64748B]">Loading portal…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0B1220]">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
