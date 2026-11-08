import React from 'react';
import { ArrowRight, Check, ShieldCheck, Zap, Sparkles, Layers } from 'lucide-react';

interface HeroSectionProps {
  setCurrentTab: (tab: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setCurrentTab }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
      
      {/* Cinematic Hero Container (Directly From Reference Image) */}
      <div className="relative rounded-3xl overflow-hidden min-h-[560px] sm:min-h-[620px] flex items-center shadow-xl border border-slate-200">
        
        {/* Cinematic Background Image (Using User's Avatar Art) */}
        <img
          src="/portfolio/avatar-1.jpg"
          alt="VRChat Avatar Hero"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Cinematic Gradient Overlays for high readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Content Inside Hero Grid */}
        <div className="relative z-10 w-full p-6 sm:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Bold Headline & Persona (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-white">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-sm font-bold text-white">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>VRChat 3D Avatar Creation Studio</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-['Space_Grotesk'] leading-[1.12]">
              สร้างสรรค์ <span className="text-[#fb923c]">VRChat Avatar</span><br />
              สะท้อนตัวตนของคุณ
            </h1>

            <p className="text-slate-100 text-base sm:text-xl max-w-xl leading-relaxed font-normal">
              รับทำ 3D Avatar คุณภาพสูง ทั้งงานขึ้นโมเดล Full Custom, รีเท็กซ์เจอร์, PhysBones, Face Tracking (VRCFT) และปรับแต่งความลื่นไหลสำหรับแว่น Meta Quest
            </p>

            {/* Quick Guarantees Pill Badges */}
            <div className="flex flex-wrap gap-3 pt-2">
              <span className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-black/50 backdrop-blur-md border border-white/25 text-sm sm:text-base font-bold text-slate-100">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>PhysBones Ready</span>
              </span>
              <span className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-black/50 backdrop-blur-md border border-white/25 text-sm sm:text-base font-bold text-slate-100">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>In-Game Tested</span>
              </span>
              <span className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-black/50 backdrop-blur-md border border-white/25 text-sm sm:text-base font-bold text-slate-100">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Quest Good Rank</span>
              </span>
            </div>
          </div>

          {/* Right Column: Signature Orange Featured Box (Exact Match from Reference Image) (5 cols) */}
          <div className="lg:col-span-5 flex justify-end">
            <div className="w-full max-w-md orange-card-gradient text-white rounded-3xl p-7 sm:p-9 shadow-2xl border border-amber-300/40 relative overflow-hidden space-y-6">
              
              {/* Subtle Background Pattern */}
              <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none" />

              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-amber-100 block mb-1">
                  COMMISSION SPECIAL
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-['Space_Grotesk'] leading-snug">
                  เปิดรับออเดอร์แล้ว<br />
                  จองคิวงาน Avatar วันนี้
                </h3>
                <p className="text-amber-100/95 text-sm mt-2 leading-relaxed font-medium">
                  บริการขึ้นแบบ 3D และปรับแต่งโมเดล VRChat ทุกระดับ พร้อมซัพพอร์ตอัปโหลดขึ้นบัญชีให้ทันที
                </p>
              </div>

              {/* Checklist Inside Orange Card */}
              <div className="space-y-3 pt-3 border-t border-white/25 text-sm font-semibold text-white">
                <div className="flex items-center space-x-2.5">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                  </div>
                  <span>ขึ้นโครงโมเดล 3D และจัดกระดูก Humanoid</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                  </div>
                  <span>ใส่ระบบฟิสิกส์ PhysBones ผม หู หาง เสื้อผ้า</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                  </div>
                  <span>ติดตั้ง GogoLoco & Face Tracking (VRCFT)</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                  </div>
                  <span>รับประกันดูแลแก้ไขบั๊กฟรี 14 วันหลังส่งมอบ</span>
                </div>
              </div>

              {/* Dark Pill Button Inside Orange Card (From Reference Image) */}
              <div className="pt-2">
                <button
                  onClick={() => setCurrentTab('commission')}
                  className="w-full py-4 px-6 rounded-2xl font-black text-base sm:text-lg text-white bg-slate-900 hover:bg-black shadow-lg transition-all flex items-center justify-center space-x-2.5 cursor-pointer group"
                >
                  <span>ส่งใบสั่งทำอวตาร (Order Now)</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
