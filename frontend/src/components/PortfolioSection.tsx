import React, { useState } from 'react';
import type { PortfolioItem, AvatarCategory } from '../types';
import { Eye, X, Layers, Sliders, ArrowRight, Sparkles } from 'lucide-react';

interface PortfolioSectionProps {
  portfolio: PortfolioItem[];
  setCurrentTab: (tab: string) => void;
  setSelectedAvatarForCommission?: (title: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  portfolio,
  setCurrentTab,
  setSelectedAvatarForCommission,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<AvatarCategory>('All');
  const [activeModalItem, setActiveModalItem] = useState<PortfolioItem | null>(null);

  const categories: AvatarCategory[] = [
    'All',
    'Full Custom',
    'Retexture & Edit',
    'Outfits & Props',
    'Optimized',
  ];

  const filteredItems = selectedCategory === 'All'
    ? portfolio
    : portfolio.filter((item) => item.category === selectedCategory);

  const handleOrderSimilar = (title: string) => {
    if (setSelectedAvatarForCommission) {
      setSelectedAvatarForCommission(title);
    }
    setActiveModalItem(null);
    setCurrentTab('commission');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-200 gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-orange-100 text-[#ea580c] text-sm font-extrabold mb-2.5">
            <Sparkles className="w-4 h-4" />
            <span>คลังผลงานสร้างสรรค์</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-['Space_Grotesk'] tracking-tight">
            VRChat Avatar Showcase
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-2 max-w-xl font-medium">
            รวมตัวอย่างผลงานที่ออกแบบและเซ็ตอัประบบเสร็จสมบูรณ์ สามารถคลิกเพื่อดูสเปกและรายละเอียดเชิงลึก
          </p>
        </div>

        {/* Filter Chips (Styled from Reference Image) */}
        <div className="flex flex-wrap gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm sm:text-base font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#f97316] text-white shadow-md'
                  : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Avatar Cards (Styled from Reference Image Bento Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveModalItem(item)}
            className="group bg-white rounded-3xl overflow-hidden cursor-pointer border border-slate-200 hover:border-[#f97316] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
          >
            {/* Image Thumbnail */}
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Category Pill Tag */}
              <div className="absolute top-3.5 left-3.5">
                <span className="px-3 py-1 rounded-lg text-xs font-black bg-white/95 text-[#ea580c] shadow-sm">
                  {item.category}
                </span>
              </div>

              {/* Hover View Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/35 backdrop-blur-[2px]">
                <span className="px-5 py-2.5 rounded-xl bg-white text-slate-900 text-sm font-bold flex items-center space-x-2 shadow-lg">
                  <Eye className="w-4 h-4 text-[#f97316]" />
                  <span>ดูสเปกโมเดล</span>
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#ea580c] transition-colors font-['Space_Grotesk']">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {item.tags.slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-semibold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Bottom Quick Specs Bar */}
              <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-sm text-slate-600 font-medium">
                <span className="flex items-center space-x-1.5">
                  <Layers className="w-4 h-4 text-[#f97316]" />
                  <span>{item.polyCount.split(' ')[0]} Tris</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <Sliders className="w-4 h-4 text-slate-600" />
                  <span>{item.togglesCount} Toggles</span>
                </span>
                <span>
                  {item.questCompatible ? (
                    <span className="text-emerald-600 font-bold">✓ Quest OK</span>
                  ) : (
                    <span className="text-slate-400 font-medium">PC Only</span>
                  )}
                </span>
              </div>

              {/* Action Button (From Ref Image Style) */}
              <div className="pt-1">
                <button
                  type="button"
                  className="w-full py-3 rounded-xl bg-orange-50 hover:bg-[#f97316] text-[#ea580c] hover:text-white text-sm font-bold transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>รายละเอียดและสั่งทำ</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Bottom Highlight Feature Bar (Directly From Reference Image Bottom Section) */}
      <div className="mt-16 pt-10 border-t border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-100/90 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          
          {/* Left Side: 2 Feature Highlights with Orange Circle Icons (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            
            {/* Feature 1 */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-full bg-[#f97316] text-white flex items-center justify-center font-bold shadow-md shadow-orange-500/25 shrink-0">
                  <Sliders className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-black text-slate-900 font-['Space_Grotesk'] leading-tight">
                    PhysBones & GogoLoco
                  </h4>
                  <span className="text-sm text-[#ea580c] font-bold">Dynamic Physics Setup</span>
                </div>
              </div>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                ติดตั้งฟิสิกส์เส้นผม หาง หู และเสื้อผ้าอย่างเป็นธรรมชาติ พร้อมระบบ GogoLoco ท่าทาง นอน หมอบ บิน ท่าทางนั่งครบครัน
              </p>
            </div>

            {/* Feature 2 */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-full bg-[#f97316] text-white flex items-center justify-center font-bold shadow-md shadow-orange-500/25 shrink-0">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-black text-slate-900 font-['Space_Grotesk'] leading-tight">
                    Meta Quest Optimized
                  </h4>
                  <span className="text-sm text-[#ea580c] font-bold">Standalone Good Rank</span>
                </div>
              </div>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                ปรับแต่งโมเดลแบบ Good Rank สำหรับแว่น Meta Quest 2 / 3 ให้เพื่อนๆ ชาว Quest มองเห็นตัวคุณได้อย่างสวยงามและลื่นไหล
              </p>
            </div>

          </div>

          {/* Right Side: Dark Banner Card with Avatar Image & Highlight (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden min-h-[220px] bg-slate-900 text-white p-7 sm:p-8 flex flex-col justify-between shadow-xl border border-slate-800">
              <img
                src="/portfolio/avatar-2.jpg"
                alt="Featured Preview"
                className="absolute inset-0 w-full h-full object-cover opacity-35"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent" />
              
              <div className="relative z-10 space-y-2.5">
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#fb923c]">
                  VERIFIED STUDIO QUALITY
                </span>
                <h4 className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] leading-snug">
                  ทุกงานส่งมอบพร้อมไฟล์ Unitypackage & FBX
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  ทดสอบใน VRChat จริงทุกชิ้นงานก่อนส่งมอบ พร้อมคู่มือและบริการช่วยอัปโหลดเข้าบัญชีฟรี
                </p>
              </div>

              <div className="relative z-10 pt-4">
                <button
                  onClick={() => setCurrentTab('commission')}
                  className="text-sm sm:text-base font-bold text-white bg-[#f97316] hover:bg-[#ea580c] px-6 py-3 rounded-xl inline-flex items-center space-x-2 transition-all cursor-pointer shadow-md orange-glow"
                >
                  <span>ส่งใบสั่งทำอวตาร</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Lightbox / Specs Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="rounded-2xl overflow-hidden aspect-[16/9] bg-slate-100 relative">
              <img
                src={activeModalItem.imageUrl}
                alt={activeModalItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4">
                <span className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#f97316] text-white shadow-md">
                  {activeModalItem.category}
                </span>
              </div>
            </div>

            {/* Title & Desc */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Space_Grotesk']">
                {activeModalItem.title}
              </h3>
              <p className="text-[#ea580c] text-sm mt-1 font-semibold">{activeModalItem.subtitle}</p>
              <p className="text-slate-600 text-sm leading-relaxed mt-3">
                {activeModalItem.description}
              </p>
            </div>

            {/* Technical Specs Table */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
              <h4 className="text-xs uppercase font-bold tracking-wider text-[#ea580c]">
                สเปกเทคนิค VRChat (Technical Specifications)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 block">Polygon Count</span>
                  <span className="text-slate-900 font-bold text-sm">{activeModalItem.polyCount}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">PhysBones Setup</span>
                  <span className="text-slate-900 font-bold text-sm">{activeModalItem.physBones}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Radial Menu Toggles</span>
                  <span className="text-slate-900 font-bold text-sm">{activeModalItem.togglesCount} รายการ</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Meta Quest Support</span>
                  <span className={activeModalItem.questCompatible ? 'text-emerald-600 font-bold' : 'text-slate-500 font-bold'}>
                    {activeModalItem.questCompatible ? '✓ รองรับ (Quest Ready)' : '✕ PC Only'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Face Tracking (VRCFT)</span>
                  <span className={activeModalItem.faceTracking ? 'text-cyan-600 font-bold' : 'text-slate-500'}>
                    {activeModalItem.faceTracking ? '✓ ติดตั้งพร้อมใช้' : '✕ ไม่ได้ติดตั้ง'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">AudioLink Integration</span>
                  <span className={activeModalItem.audioLink ? 'text-purple-600 font-bold' : 'text-slate-500'}>
                    {activeModalItem.audioLink ? '✓ รองรับไฟตามเพลง' : '✕ ไม่ได้ติดตั้ง'}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => handleOrderSimilar(activeModalItem.title)}
                className="flex-1 py-3.5 px-6 rounded-xl font-bold text-white bg-[#f97316] hover:bg-[#ea580c] orange-glow transition-all text-center flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>สั่งทำอวตารสไตล์แบบนี้</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => setActiveModalItem(null)}
                className="py-3.5 px-6 rounded-xl font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors text-center cursor-pointer"
              >
                ปิดหน้าต่าง
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
