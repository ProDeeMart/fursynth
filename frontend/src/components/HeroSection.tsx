import React from 'react';
import { Sparkles, Rocket, Eye, ShieldCheck, Zap, Layers, Activity } from 'lucide-react';

interface HeroSectionProps {
  setCurrentTab: (tab: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setCurrentTab }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background radial cosmic glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-purple-700/20 via-indigo-600/15 to-cyan-500/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-purple-500/30 text-xs text-slate-300 backdrop-blur-md shadow-[0_0_15px_rgba(139,92,246,0.2)]">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-cyan-300 font-medium">คิวงานเปิดรับแล้ว</span>
            <span className="text-slate-500">•</span>
            <span>รองรับ VRChat PC & Meta Quest</span>
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-['Space_Grotesk'] leading-[1.15]">
            สร้างสรรค์ <span className="cosmic-text-gradient">VRChat Avatar</span><br />
            ระดับคอสมิก สะท้อนตัวตนของคุณ
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            รับทำ 3D Avatar คุณภาพสูง ทั้งงาน Full Custom, รีเท็กซ์เจอร์, PhysBones, Face Tracking (VRCFT), 
            ระบบเสียง AudioLink และปรับแต่งความลื่นไหลสำหรับแว่น Meta Quest
          </p>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setCurrentTab('commission')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-[0_0_25px_rgba(139,92,246,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] transition-all flex items-center justify-center space-x-2 group cursor-pointer"
            >
              <Rocket className="w-5 h-5 text-cyan-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              <span>ส่งใบสั่งทำอวตาร (Order Now)</span>
            </button>

            <button
              onClick={() => setCurrentTab('portfolio')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800/80 border border-slate-700/80 hover:border-cyan-500/50 backdrop-blur-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Eye className="w-5 h-5 text-purple-400" />
              <span>ชมคลังผลงาน</span>
            </button>

            <button
              onClick={() => setCurrentTab('queue')}
              className="w-full sm:w-auto px-6 py-4 rounded-xl text-base font-medium text-slate-300 hover:text-cyan-300 bg-transparent hover:bg-slate-900/40 border border-transparent hover:border-slate-800 transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Activity className="w-5 h-5 text-emerald-400" />
              <span>เช็กสถานะคิวงาน</span>
            </button>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="glass-panel glass-panel-hover p-5 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-purple-950/70 border border-purple-500/40 flex items-center justify-center mb-3">
              <Zap className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">PhysBones Ready</h3>
            <p className="text-xs text-slate-400">เซ็ตฟิสิกส์ผม หู หาง เสื้อผ้า นุ่มนวล ไม่ดีด ไม่กระตุก</p>
          </div>

          <div className="glass-panel glass-panel-hover p-5 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/70 border border-cyan-500/40 flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Face Tracking</h3>
            <p className="text-xs text-slate-400">รองรับระบบ VRCFT ขยับใบหน้า ดวงตา ลิ้น ตามผู้เล่นแบบสมจริง</p>
          </div>

          <div className="glass-panel glass-panel-hover p-5 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-indigo-950/70 border border-indigo-500/40 flex items-center justify-center mb-3">
              <Layers className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Quest Optimized</h3>
            <p className="text-xs text-slate-400">บิลด์คู่ขนาน รองรับคนเล่นแว่น Quest ให้มองเห็นโมเดลลื่นไหล</p>
          </div>

          <div className="glass-panel glass-panel-hover p-5 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/70 border border-emerald-500/40 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">In-Game Test</h3>
            <p className="text-xs text-slate-400">ทดสอบใน World จริงพร้อมตัวคุณก่อนส่งมอบไฟล์ Unitypackage</p>
          </div>

        </div>

      </div>
    </section>
  );
};
