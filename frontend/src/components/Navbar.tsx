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
      <div className="bg-[#fef3c7] text-[#92400e] px-4 sm:px-8 py-1.5 text-xs font-medium border-b border-amber-200/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse" />
            <span>Fursynth Studio • รับทำ VRChat Avatar PC & Meta Quest</span>
          </div>
          <div className="hidden sm:flex items-center space-x-4 text-xs">
            <span className="flex items-center space-x-1">
              <MessageSquare className="w-3.5 h-3.5 text-[#f97316]" />
              <span>Discord: Fursynth Community</span>
            </span>
            <span>•</span>
            <span className="text-[11px] text-[#b45309]">
              {backendOnline ? '🟢 Backend Online' : '🟠 Cloud Ready'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setCurrentTab('home')}
          >
            <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#f97316] shadow-sm shrink-0">
              <img 
                src="/logo.jpg" 
                alt="Fursynth Logo" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="text-2xl font-black tracking-tight text-slate-900 font-['Space_Grotesk'] leading-none">
                  Fursynth
                </span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-orange-100 text-[#ea580c]">
                  VRChat
                </span>
              </div>
              <span className="text-[10px] tracking-wider text-slate-500 font-medium mt-0.5">
                Bespoke Avatar Studio
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setCurrentTab(link.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#ea580c] bg-orange-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            
            {/* Quick Search for Queue */}
            <button
              onClick={() => setCurrentTab('queue')}
              title="ค้นหาคิวงาน"
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Auth Pill */}
            {currentUser ? (
              <div className="flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800">
                  {currentUser.role === 'admin' ? (
                    <ShieldCheck className="w-3.5 h-3.5 text-[#f97316]" />
                  ) : (
                    <UserIcon className="w-3.5 h-3.5 text-slate-600" />
                  )}
                  <span>{currentUser.username}</span>
                </div>
                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => setCurrentTab('admin')}
                    className="text-[10px] px-2 py-0.5 bg-[#f97316] text-white rounded font-medium"
                  >
                    Admin
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  title="ออกจากระบบ"
                  className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={openLoginModal}
                className="text-xs font-bold text-slate-700 hover:text-[#ea580c] px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
              >
                เข้าสู่ระบบ
              </button>
            )}

            {/* Orange CTA Button (From Reference Image) */}
            <button
              onClick={() => setCurrentTab('commission')}
              className="px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-[#f97316] hover:bg-[#ea580c] orange-glow transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Rocket className="w-4 h-4" />
              <span>สั่งทำ Avatar</span>
            </button>

          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setCurrentTab(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold ${
                currentTab === link.id
                  ? 'bg-orange-50 text-[#ea580c]'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-200 flex flex-col space-y-2">
            {currentUser ? (
              <div className="flex items-center justify-between px-2 text-sm text-slate-700">
                <span>👤 {currentUser.username}</span>
                <button onClick={handleLogout} className="text-xs text-rose-600 underline">Logout</button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openLoginModal();
                }}
                className="w-full text-center py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-700"
              >
                เข้าสู่ระบบ
              </button>
            )}
            <button
              onClick={() => {
                setCurrentTab('commission');
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2.5 rounded-lg bg-[#f97316] text-white font-bold text-sm"
            >
              สั่งทำ Avatar
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
