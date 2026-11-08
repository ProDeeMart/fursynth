import React from 'react';
import { MessageSquare, Globe, Heart, Shield, Sparkles, HelpCircle } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab }) => {
  return (
    <footer className="w-full bg-white border-t border-slate-200 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-100">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#f97316] shadow-sm">
                <img src="/logo.jpg" alt="Fursynth Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-slate-900 font-['Space_Grotesk'] leading-none">
                  FURSYNTH
                </span>
                <span className="text-[10px] uppercase font-bold text-[#ea580c] tracking-widest mt-0.5">
                  VRChat Studio
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              สตูดิโอสร้างสรรค์ VRChat 3D Avatar คุณภาพสูง รับทำโมเดล 3D, รีเท็กซ์เจอร์, PhysBones, Face Tracking (VRCFT) และปรับแต่ง Quest Optimization
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">เมนูลัด</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <button onClick={() => setCurrentTab('home')} className="hover:text-[#ea580c] transition-colors cursor-pointer">
                  หน้าแรก (Home)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('portfolio')} className="hover:text-[#ea580c] transition-colors cursor-pointer">
                  คลังผลงาน Avatar (Portfolio)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('commission')} className="hover:text-[#ea580c] transition-colors cursor-pointer">
                  ส่งใบสั่งทำอวตาร (Commission)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('queue')} className="hover:text-[#ea580c] transition-colors cursor-pointer">
                  ติดตามสถานะคิวงาน (Queue Tracker)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('pricing')} className="hover:text-[#ea580c] transition-colors cursor-pointer">
                  แพ็กเกจราคาและเงื่อนไข (ToS)
                </button>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">ช่องทางติดต่อ</h4>
            <div className="flex flex-col space-y-2.5 text-sm text-slate-600">
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2.5 hover:text-[#ea580c] transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-[#f97316]">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <span>Discord: <strong className="text-slate-800">Fursynth Community</strong></span>
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2.5 hover:text-[#ea580c] transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-[#f97316]">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <span>X / Twitter: <strong className="text-slate-800">@FursynthVRC</strong></span>
              </a>

              <a
                href="https://vrchat.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2.5 hover:text-[#ea580c] transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-[#f97316]">
                  <Globe className="w-4 h-4" />
                </div>
                <span>VRChat: <strong className="text-slate-800">Fursynth Studio</strong></span>
              </a>

              {/* Facebook Pending Badge */}
              <div className="flex items-center space-x-2.5 pt-1">
                <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs">
                  f
                </div>
                <div className="flex items-center space-x-1.5">
                  <span>Facebook Page</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium">เร็วๆ นี้</span>
                </div>
              </div>
            </div>
          </div>

          {/* Studio Standards */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">มาตรฐานการทำงาน</h4>
            <div className="space-y-2 text-xs text-slate-500 leading-relaxed">
              <div className="flex items-start space-x-2">
                <Shield className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>ทดสอบใน VRChat จริงก่อนส่งมอบทุกครั้ง (In-Game Tested)</span>
              </div>
              <div className="flex items-start space-x-2">
                <Sparkles className="w-4 h-4 text-[#f97316] shrink-0 mt-0.5" />
                <span>จัดโครงสร้าง Unity สะอาด พร้อมอัปโหลดขึ้นบัญชีทันที</span>
              </div>
              <div className="flex items-start space-x-2">
                <HelpCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>รับประกันแก้บั๊กฟรี 14 วันหลังส่งมอบงาน</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} FURSYNTH. All rights reserved. Powered by Cloudflare Pages & Git.</p>
          <div className="flex items-center space-x-1 text-slate-500">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#ea580c] fill-[#ea580c]" />
            <span>for VRChat Community</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
