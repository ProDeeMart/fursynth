import React from 'react';
import { ArrowRight, Check, ShieldCheck, Zap, Sparkles, Layers } from 'lucide-react';

interface HeroSectionProps {
  setCurrentTab: (tab: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setCurrentTab }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
      
      {/* Cinematic Hero Container (Directly From Reference Image) */}
      <div className="relative rounded-3xl overflow-hidden min-h-[520px] sm:min-h-[560px] flex items-center shadow-lg border border-slate-200">
        
        {/* Cinematic Background Image */}
        <img
          src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80"
          alt="VRChat Avatar Hero"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Content Inside Hero Grid */}
        <div className="relative z-10 w-full p-6 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Bold Headline & Persona (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-white">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-semibold text-white">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>VRChat 3D Avatar Creation Studio</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-['Space_Grotesk'] leading-[1.15]">
              สร้างสรรค์ <span className="text-[#fb923c]">VRChat Avatar</span><br />
              สะท้อนตัวตนของคุณ
            </h1>

            <p className="text-slate-200 text-sm sm:text-base max-w-xl leading-relaxed">
              รับทำ 3D Avatar คุณภาพสูง ทั้งงานขึ้นโมเดล Full Custom, รีเท็กซ์เจอร์, PhysBones, Face Tracking (VRCFT) และปรับแต่งความลื่นไหลสำหรับแว่น Meta Quest
            </p>

            {/* Quick Guarantees Pill Badges */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/20 text-xs font-medium text-slate-200">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>PhysBones Ready</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/20 text-xs font-medium text-slate-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>In-Game Tested</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/20 text-xs font-medium text-slate-200">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Quest Good Rank</span>
              </span>
            </div>
          </div>

          {/* Right Column: Signature Orange Featured Box (Exact Match from Reference Image) (5 cols) */}
          <div className="lg:col-span-5 flex justify-end">
            <div className="w-full max-w-md orange-card-gradient text-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-amber-300/40 relative overflow-hidden space-y-6">
              
              {/* Subtle Background Pattern */}
              <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none" />

              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-100 block mb-1">
                  COMMISSION SPECIAL
                </span>
                <h3 className="text-2xl font-extrabold tracking-tight font-['Space_Grotesk'] leading-snug">
                  เปิดรับออเดอร์แล้ว<br />
                  จองคิวงาน Avatar วันนี้
                </h3>
                <p className="text-amber-100/90 text-xs mt-2 leading-relaxed">
                  บริการขึ้นแบบ 3D และปรับแต่งโมเดล VRChat ทุกระดับ พร้อมซัพพอร์ตอัปโหลดขึ้นบัญชีให้ทันที
                </p>
              </div>

              {/* Checklist Inside Orange Card */}
              <div className="space-y-2.5 pt-2 border-t border-white/20 text-xs font-medium text-white">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-white stroke-[3]" />
                  </div>
                  <span>ขึ้นโครงโมเดล 3D และจัดกระดูก Humanoid</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-white stroke-[3]" />
                  </div>
                  <span>ใส่ระบบฟิสิกส์ PhysBones ผม หู หาง เสื้อผ้า</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-white stroke-[3]" />
                  </div>
                  <span>ติดตั้ง GogoLoco & Face Tracking (VRCFT)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-white stroke-[3]" />
                  </div>
                  <span>รับประกันดูแลแก้ไขบั๊กฟรี 14 วันหลังส่งมอบ</span>
                </div>
              </div>

              {/* Dark Pill Button Inside Orange Card (From Reference Image) */}
              <div className="pt-2">
                <button
                  onClick={() => setCurrentTab('commission')}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-slate-900 hover:bg-black shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer group"
                >
                  <span>ส่งใบสั่งทำอวตาร (Order Now)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
