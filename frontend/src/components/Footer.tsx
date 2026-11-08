import React from 'react';
import { Orbit, Sparkles, MessageSquare, Globe, Heart, Shield, HelpCircle } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab }) => {
  return (
    <footer className="relative z-10 bg-[#04050d] border-t border-purple-900/30 pt-16 pb-12 mt-20">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-purple-900/10 to-transparent blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-400 p-[1.5px]">
                <div className="w-full h-full bg-[#08091a] rounded-[7px] flex items-center justify-center">
                  <Orbit className="w-5 h-5 text-cyan-300" />
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent font-['Space_Grotesk']">
                FURSYNTH
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              สตูดิโอสร้างสรรค์ VRChat 3D Avatar ระดับคอสมิก รับทำโมเดล 3D, รีเท็กซ์เจอร์, PhysBones, Face Tracking (VRCFT) และปรับแต่ง Quest Optimization
            </p>
            <div className="flex items-center space-x-2 text-xs text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cosmic Quality • Fully Tested in VRChat</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">เมนูลัด</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => setCurrentTab('home')} className="hover:text-cyan-300 transition-colors">
                  หน้าแรก (Home)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('portfolio')} className="hover:text-cyan-300 transition-colors">
                  คลังผลงาน Avatar (Portfolio)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('commission')} className="hover:text-cyan-300 transition-colors">
                  ส่งใบสั่งทำอวตาร (Commission)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('queue')} className="hover:text-cyan-300 transition-colors">
                  ติดตามสถานะคิวงาน (Queue Tracker)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('pricing')} className="hover:text-cyan-300 transition-colors">
                  แพ็กเกจราคาและเงื่อนไข (ToS)
                </button>
              </li>
            </ul>
          </div>

          {/* Social & Contacts */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">ช่องทางติดต่อ</h4>
            <div className="flex flex-col space-y-2.5 text-sm">
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2.5 text-slate-300 hover:text-indigo-400 transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center group-hover:border-indigo-400">
                  <MessageSquare className="w-4 h-4 text-indigo-400" />
                </div>
                <span>Discord: <strong className="text-slate-200 font-medium">Fursynth Community</strong></span>
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2.5 text-slate-300 hover:text-cyan-400 transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center group-hover:border-cyan-400">
                  <svg className="w-3.5 h-3.5 fill-cyan-400" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <span>X / Twitter: <strong className="text-slate-200 font-medium">@FursynthVRC</strong></span>
              </a>

              <a
                href="https://vrchat.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2.5 text-slate-300 hover:text-purple-400 transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-purple-950/60 border border-purple-500/30 flex items-center justify-center group-hover:border-purple-400">
                  <Globe className="w-4 h-4 text-purple-400" />
                </div>
                <span>VRChat: <strong className="text-slate-200 font-medium">Fursynth Studio</strong></span>
              </a>

              {/* Facebook Pending Badge */}
              <div className="flex items-center space-x-2.5 text-slate-400 pt-1">
                <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-400">f</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-slate-400">Facebook Page</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800/50">
                    เร็วๆ นี้
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Guarantees / Service Notes */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">มาตรฐานการทำงาน</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start space-x-2">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>ทดสอบใน VRChat จริงก่อนส่งมอบทุกครั้ง (In-Game Tested)</span>
              </div>
              <div className="flex items-start space-x-2">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>จัดโครงสร้าง Unity สะอาด พร้อมอัปโหลดขึ้นบัญชี VRChat ทันที</span>
              </div>
              <div className="flex items-start space-x-2">
                <HelpCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>รับประกันแก้บั๊กฟรี 14 วันหลังส่งมอบงาน</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} FURSYNTH. All rights reserved. Powered by Cloudflare Pages & Git.</p>
          <div className="flex items-center space-x-1 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for VRChat Community</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
