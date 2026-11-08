import React, { useState, useEffect } from 'react';
import { Sparkles, Orbit, User as UserIcon, LogOut, ShieldCheck, Menu, X, Rocket } from 'lucide-react';
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
    // Check server health on mount
    api.checkServerHealth().then((online) => setBackendOnline(online));
    const interval = setInterval(() => {
      api.checkServerHealth().then((online) => setBackendOnline(online));
    }, 15000);
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#060714]/85 backdrop-blur-md border-b border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setCurrentTab('home')}
          >
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-[0_0_15px_rgba(139,92,246,0.5)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all">
              <div className="w-full h-full bg-[#08091a] rounded-[10px] flex items-center justify-center">
                <Orbit className="w-6 h-6 text-cyan-300 group-hover:rotate-45 transition-transform duration-500" />
              </div>
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-amber-300 animate-pulse" />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-extrabold tracking-wider bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent font-['Space_Grotesk']">
                  FURSYNTH
                </span>
                <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-500/30">
                  VRChat
                </span>
              </div>
              <span className="text-xs text-slate-400 tracking-wider">Cosmic Avatar Studio</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setCurrentTab(link.id)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentTab === link.id
                    ? 'text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Action / Status / Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Backend connection pill */}
            <div 
              title={backendOnline ? 'เชื่อมต่อ Python Backend (Local/Tunnel) เรียบร้อย' : 'กำลังใช้งานในโหมด Standby / Cloudflare Pages'}
              className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs bg-slate-900/80 border border-slate-700/50 text-slate-400"
            >
              <span className={`w-2 h-2 rounded-full ${backendOnline ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
              <span className="text-[11px]">
                {backendOnline ? 'Backend Online' : 'Cloud Sync'}
              </span>
            </div>

            {currentUser ? (
              <div className="flex items-center space-x-3 bg-slate-900/70 border border-purple-500/30 rounded-xl px-3 py-1.5">
                <div className="flex items-center space-x-2">
                  {currentUser.role === 'admin' ? (
                    <ShieldCheck className="w-4 h-4 text-purple-400" />
                  ) : (
                    <UserIcon className="w-4 h-4 text-cyan-400" />
                  )}
                  <span className="text-sm font-medium text-slate-200">
                    {currentUser.username}
                  </span>
                  {currentUser.role === 'admin' && (
                    <button
                      onClick={() => setCurrentTab('admin')}
                      className={`text-xs px-2 py-0.5 rounded bg-purple-600/30 border border-purple-400/40 text-purple-300 hover:bg-purple-600/50 transition-all ${
                        currentTab === 'admin' ? 'ring-2 ring-purple-400' : ''
                      }`}
                    >
                      Admin Panel
                    </button>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  title="ออกจากระบบ"
                  className="p-1 rounded-md text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={openLoginModal}
                className="flex items-center space-x-1.5 text-sm font-medium text-slate-300 hover:text-cyan-300 px-3 py-1.5 rounded-lg hover:bg-slate-800/60 transition-colors"
              >
                <UserIcon className="w-4 h-4" />
                <span>เข้าสู่ระบบ</span>
              </button>
            )}

            {/* CTA Button */}
            <button
              onClick={() => setCurrentTab('commission')}
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-semibold rounded-xl group bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 group-hover:from-purple-600 group-hover:to-cyan-500 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all"
            >
              <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-[#08091a] rounded-[10px] group-hover:bg-opacity-0 flex items-center space-x-1.5 text-white">
                <Rocket className="w-3.5 h-3.5 text-cyan-300" />
                <span>สั่งทำอวตาร</span>
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0d24] border-b border-purple-900/40 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setCurrentTab(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                currentTab === link.id
                  ? 'text-cyan-300 bg-cyan-950/50 border border-cyan-500/30'
                  : 'text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="pt-3 border-t border-slate-800 flex flex-col space-y-3">
            {currentUser ? (
              <div className="flex items-center justify-between px-2">
                <span className="text-sm text-cyan-300">👤 {currentUser.username} ({currentUser.role})</span>
                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => {
                      setCurrentTab('admin');
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs px-2.5 py-1 bg-purple-600 rounded text-white"
                  >
                    Admin
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="text-xs text-rose-400 hover:underline"
                >
                  ออกจากระบบ
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openLoginModal();
                }}
                className="w-full text-center py-2 rounded-lg border border-slate-700 text-sm text-slate-300"
              >
                เข้าสู่ระบบ
              </button>
            )}

            <button
              onClick={() => {
                setCurrentTab('commission');
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium text-sm"
            >
              สั่งทำ Avatar
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
