"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FileText, LogOut, Edit2, ClipboardList, MessageSquare, Truck } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const navItems = [
    { name: "Inquiries", href: "/inquiries", icon: MessageSquare },
    { name: "Quotations", href: "/quotations", icon: ClipboardList },
    { name: "Invoices", href: "/invoices", icon: FileText },
    { name: "Tracking", href: "/tracking", icon: Truck },
  ];

  return (
    <div className="h-screen w-full bg-[#0a0a0c] flex font-sans antialiased text-neutral-900 overflow-hidden relative">
      
      {/* Glowing Aura Streams - Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(249,115,22,0.15),transparent_70%)]" />
        <div className="absolute -left-[5%] top-[-20%] w-48 sm:w-64 h-[150%] bg-gradient-to-b from-orange-600/35 via-amber-500/20 to-transparent blur-[80px] transform -rotate-12 animate-pulse duration-1000" />
        <div className="absolute left-[20%] top-[-10%] w-56 sm:w-72 h-[160%] bg-gradient-to-b from-orange-500/45 via-orange-600/25 to-black/90 blur-[95px] transform -rotate-6" />
        <div className="absolute left-[70%] top-[-15%] w-48 sm:w-64 h-[150%] bg-gradient-to-b from-orange-600/30 via-orange-800/20 to-black blur-[90px] transform rotate-6" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      {/* Sidebar */}
      <div className="relative z-10 w-64 h-full flex flex-col bg-transparent">
          <div className="p-6 md:p-8 flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <span className="font-extrabold text-white text-base leading-none">V</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">Vertex</span>
          </div>

          <nav className="flex-1 px-4 space-y-2 mt-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              return (
                <Link 
                  key={item.name} 
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? "bg-white/10 text-white font-medium shadow-sm border border-white/5" 
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile Section */}
          <div className="p-4 mt-auto">
            <div className="flex items-center justify-between group p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  WE
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">Wendt Test-Dev</span>
                  <span className="text-xs text-neutral-500 group-hover:text-neutral-400 transition-colors">Admin</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors" title="Edit Profile">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={handleLogout} className="p-1.5 rounded-lg text-neutral-400 hover:text-orange-500 hover:bg-orange-500/10 transition-colors" title="Logout">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area Container */}
        <div className="relative z-10 flex-1 h-full py-2 pr-2 sm:py-4 sm:pr-4 lg:py-4 lg:pr-4 pl-0 flex">
          <div className="w-full h-full bg-gradient-to-br from-[#f6f7f9] via-[#f6f7f9] to-orange-50 rounded-2xl lg:rounded-[2rem] shadow-xl overflow-y-auto">
            {children}
          </div>
        </div>

    </div>
  );
}
