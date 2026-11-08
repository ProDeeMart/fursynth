import React, { useState, useEffect } from 'react';
import { Search, User as UserIcon, LogOut, ShieldCheck, Menu, X, Rocket, MessageSquare } from 'lucide-react';
import type { User } from '../types';
import { api, clearAuth } from '../services/api';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  openLoginModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  currentUser,
  setCurrentUser,
  openLoginModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);

  useEffect(() => {
    api.checkServerHealth().then((online) => setBackendOnline(online));
    const interval = setInterval(() => {
      api.checkServerHealth().then((online) => setBackendOnline(online));
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    clearAuth();
    setCurrentUser(null);
  };

  const navLinks = [
    { id: 'home', label: 'หน้าแรก' },
    { id: 'portfolio', label: 'ผลงาน' },
    { id: 'commission', label: 'สั่งทำ Avatar' },
    { id: 'queue', label: 'ติดตามคิวงาน' },
    { id: 'pricing', label: 'ราคา & เงื่อนไข' },
  ];

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
      
      {/* Top Thin Announcement Strip (From Reference Image) */}
      <div className="bg-[#fef3c7] text-[#92400e] px-4 sm:px-8 py-2 text-xs sm:text-sm font-medium border-b border-amber-200/60 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between whitespace-nowrap">
          <div className="flex items-center space-x-2 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f97316] animate-pulse shrink-0" />
            <span className="font-bold text-slate-900">Fursynth Studio</span>
            <span className="text-amber-800 hidden sm:inline">• รับทำ VRChat Avatar PC & Meta Quest</span>
          </div>
          <div className="flex items-center space-x-3.5 text-xs sm:text-sm shrink-0">
            <span className="flex items-center space-x-1.5 font-medium shrink-0">
              <MessageSquare className="w-4 h-4 text-[#f97316] shrink-0" />
              <span className="hidden md:inline">Discord:</span>
              <span className="font-bold text-[#92400e]">Fursynth Community</span>
            </span>
            <span>•</span>
            <span className="text-xs sm:text-sm font-bold text-[#b45309] shrink-0">
              {backendOnline ? '🟢 Backend Online' : '🟠 Cloud Ready'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar (Guaranteed Single Line - No Wrapping) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24 gap-2 lg:gap-4">
          
          {/* Logo & Brand (Always 1 Line) */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group shrink-0"
            onClick={() => setCurrentTab('home')}
          >
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#f97316] shadow-sm shrink-0">
              <img 
                src="/logo.jpg" 
                alt="Fursynth Logo" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
            
            <div className="flex flex-col shrink-0">
              <div className="flex items-center space-x-1.5 whitespace-nowrap">
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 font-['Space_Grotesk'] leading-none">
                  Fursynth
                </span>
                <span className="text-[11px] uppercase font-black px-2 py-0.5 rounded-md bg-orange-100 text-[#ea580c] shrink-0">
                  VRChat
                </span>
              </div>
              <span className="text-[11px] sm:text-xs tracking-wide text-slate-500 font-semibold mt-0.5 whitespace-nowrap">
                Bespoke Avatar Studio
              </span>
            </div>
          </div>

          {/* Desktop Nav Links (Guaranteed 1 Line - whitespace-nowrap) */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 shrink-0">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setCurrentTab(link.id)}
                  className={`px-3 xl:px-4 py-2 rounded-xl text-sm xl:text-base font-bold whitespace-nowrap no-wrap-text transition-all duration-200 cursor-pointer shrink-0 ${
                    isActive
                      ? 'text-[#ea580c] bg-orange-50 shadow-xs'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span className="no-wrap-text whitespace-nowrap">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons (Guaranteed 1 Line - whitespace-nowrap) */}
          <div className="hidden sm:flex items-center space-x-2 lg:space-x-3 shrink-0">
            
            {/* Quick Search for Queue */}
            <button
              onClick={() => setCurrentTab('queue')}
              title="ค้นหาคิวงาน"
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer shrink-0"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Auth Pill */}
            {currentUser ? (
              <div className="flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 shrink-0 whitespace-nowrap no-wrap-text">
                <div className="flex items-center space-x-1.5 text-sm font-bold text-slate-800 shrink-0 whitespace-nowrap no-wrap-text">
                  {currentUser.role === 'admin' ? (
                    <ShieldCheck className="w-4 h-4 text-[#f97316] shrink-0" />
                  ) : (
                    <UserIcon className="w-4 h-4 text-slate-600 shrink-0" />
                  )}
                  <span className="whitespace-nowrap no-wrap-text">{currentUser.username}</span>
                </div>
                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => setCurrentTab('admin')}
                    className="text-xs px-2 py-0.5 bg-[#f97316] text-white rounded font-bold whitespace-nowrap shrink-0"
                  >
                    Admin
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  title="ออกจากระบบ"
                  className="p-1 text-slate-400 hover:text-rose-600 transition-colors shrink-0"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={openLoginModal}
                className="text-sm xl:text-base font-bold text-slate-700 hover:text-[#ea580c] px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer whitespace-nowrap no-wrap-text shrink-0"
              >
                เข้าสู่ระบบ
              </button>
            )}

            {/* Orange CTA Button (Guaranteed 1 Line - whitespace-nowrap) */}
            <button
              onClick={() => setCurrentTab('commission')}
              className="px-5 xl:px-6 py-2.5 xl:py-3 rounded-xl text-sm xl:text-base font-black text-white bg-[#f97316] hover:bg-[#ea580c] orange-glow transition-all flex items-center space-x-2 cursor-pointer shadow-md whitespace-nowrap no-wrap-text shrink-0"
            >
              <Rocket className="w-4 h-4 xl:w-5 xl:h-5 shrink-0" />
              <span className="whitespace-nowrap no-wrap-text">สั่งทำ Avatar</span>
            </button>

          </div>

          {/* Mobile menu toggle (Shows below lg screen so menu never wraps) */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setCurrentTab('commission')}
              className="sm:hidden px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-[#f97316] whitespace-nowrap"
            >
              สั่งทำ
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 pt-4 pb-6 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setCurrentTab(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-base font-bold ${
                currentTab === link.id
                  ? 'bg-orange-50 text-[#ea580c]'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-200 flex flex-col space-y-2.5">
            {currentUser ? (
              <div className="flex items-center justify-between px-2 text-base text-slate-700 font-semibold">
                <span>👤 {currentUser.username}</span>
                <button onClick={handleLogout} className="text-sm text-rose-600 underline">Logout</button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openLoginModal();
                }}
                className="w-full text-center py-2.5 rounded-xl border border-slate-300 text-base font-bold text-slate-700"
              >
                เข้าสู่ระบบ
              </button>
            )}
            <button
              onClick={() => {
                setCurrentTab('commission');
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-3 rounded-xl bg-[#f97316] text-white font-black text-base shadow-md"
            >
              สั่งทำ Avatar
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
