import React, { useState } from 'react';
import type { PortfolioItem, AvatarCategory } from '../types';
import { Sparkles, Eye, X, Layers, Sliders } from 'lucide-react';

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
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-xs text-purple-300 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          <span>คลังผลงานที่ผ่านมา</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-['Space_Grotesk'] text-white">
          Cosmic <span className="cosmic-text-gradient">Portfolio</span>
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base">
          รวมตัวอย่างผลงาน VRChat Avatar ที่ออกแบบและเซ็ตอัประบบเสร็จสมบูรณ์ สามารถคลิกเพื่อดูสเปกและรายละเอียดเชิงลึก
        </p>

        {/* Category Filter Chips */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Avatar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveModalItem(item)}
            className="group glass-panel rounded-2xl overflow-hidden cursor-pointer border border-purple-900/30 hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] transition-all duration-300 flex flex-col"
          >
            {/* Image Thumbnail with Overlay */}
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060714] via-transparent to-transparent opacity-80" />

              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#060714]/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30 shadow-sm">
                  {item.category}
                </span>
              </div>

              {/* View Overlay on Hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-purple-950/40 backdrop-blur-[2px]">
                <span className="px-4 py-2 rounded-xl bg-slate-900/90 text-white text-xs font-medium flex items-center space-x-1.5 border border-cyan-400/40 shadow-lg">
                  <Eye className="w-4 h-4 text-cyan-300" />
                  <span>ดูสเปกโมเดล</span>
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors font-['Space_Grotesk']">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.tags.slice(0, 4).map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Bottom Quick Specs Bar */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center space-x-1">
                  <Layers className="w-3.5 h-3.5 text-purple-400" />
                  <span>{item.polyCount.split(' ')[0]} Tris</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{item.togglesCount} Toggles</span>
                </span>
                <span className="flex items-center space-x-1">
                  {item.questCompatible ? (
                    <span className="text-emerald-400 font-medium">✓ Quest OK</span>
                  ) : (
                    <span className="text-slate-500">PC Only</span>
                  )}
                </span>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Specs Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-panel rounded-3xl border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.3)] p-6 sm:p-8 space-y-6">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="rounded-2xl overflow-hidden aspect-[16/9] bg-slate-950 relative">
              <img
                src={activeModalItem.imageUrl}
                alt={activeModalItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3">
                <span className="px-3 py-1 rounded-md text-xs font-semibold bg-purple-950/90 text-purple-200 border border-purple-500/40">
                  {activeModalItem.category}
                </span>
              </div>
            </div>

            {/* Title & Desc */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk']">
                {activeModalItem.title}
              </h3>
              <p className="text-cyan-300 text-sm mt-1">{activeModalItem.subtitle}</p>
              <p className="text-slate-300 text-sm leading-relaxed mt-4">
                {activeModalItem.description}
              </p>
            </div>

            {/* VRChat Technical Specs Table */}
            <div className="bg-slate-950/80 rounded-2xl p-5 border border-slate-800 space-y-3">
              <h4 className="text-xs uppercase font-bold tracking-wider text-purple-300">
                สเปกเทคนิค VRChat (Technical Specifications)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 block">Polygon Count</span>
                  <span className="text-white font-semibold text-sm">{activeModalItem.polyCount}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">PhysBones Setup</span>
                  <span className="text-white font-semibold text-sm">{activeModalItem.physBones}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Radial / Menu Toggles</span>
                  <span className="text-white font-semibold text-sm">{activeModalItem.togglesCount} รายการ</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Meta Quest Support</span>
                  <span className={activeModalItem.questCompatible ? 'text-emerald-400 font-semibold' : 'text-slate-400 font-semibold'}>
                    {activeModalItem.questCompatible ? '✓ รองรับ (Quest Ready)' : '✕ PC Only'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Face Tracking (VRCFT)</span>
                  <span className={activeModalItem.faceTracking ? 'text-cyan-300 font-semibold' : 'text-slate-400'}>
                    {activeModalItem.faceTracking ? '✓ ติดตั้งพร้อมใช้' : '✕ ไม่ได้ติดตั้ง'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">AudioLink Integration</span>
                  <span className={activeModalItem.audioLink ? 'text-purple-400 font-semibold' : 'text-slate-400'}>
                    {activeModalItem.audioLink ? '✓ รองรับไฟตามเพลง' : '✕ ไม่ได้ติดตั้ง'}
                  </span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {activeModalItem.tags.map((tag, i) => (
                <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-purple-950/50 text-purple-300 border border-purple-800/40">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => handleOrderSimilar(activeModalItem.title)}
                className="flex-1 py-3.5 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all text-center flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-cyan-200" />
                <span>สั่งทำอวตารสไตล์แบบนี้</span>
              </button>
              
              <button
                onClick={() => setActiveModalItem(null)}
                className="py-3.5 px-6 rounded-xl font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors text-center cursor-pointer"
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
