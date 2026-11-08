import React, { useState } from 'react';
import type { CommissionSubmission } from '../types';
import { api } from '../services/api';
import { Sparkles, Send, CheckCircle2, AlertCircle, Check, ArrowRight } from 'lucide-react';

interface CommissionFormSectionProps {
  initialSelectedAvatar?: string;
  setCurrentTab: (tab: string) => void;
  onOrderCreated?: (orderCode: string) => void;
}

export const CommissionFormSection: React.FC<CommissionFormSectionProps> = ({
  initialSelectedAvatar,
  setCurrentTab,
  onOrderCreated,
}) => {
  const [formData, setFormData] = useState<CommissionSubmission>({
    customerName: '',
    discordTag: '',
    email: '',
    avatarType: 'Full Custom Avatar',
    baseModel: initialSelectedAvatar ? `คล้ายกับ: ${initialSelectedAvatar}` : 'Manuka',
    features: ['PhysBones', 'GogoLoco', 'Radial Menu Toggles'],
    budget: '฿4,000 - ฿8,000',
    deadline: '',
    refLinks: '',
    notes: '',
    agreedToTos: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<{ code: string; message: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const avatarTypes = [
    'Full Custom Avatar (ขึ้นโมเดลใหม่ 100%)',
    'Custom Retexture & Shaders (เพ้นท์สีใหม่)',
    'Outfit Fitting & Accessories (ใส่ชุด/พร็อพ/ทรงผม)',
    'Unity Setup & PhysBones / GogoLoco',
    'Quest Optimization (แปลงลง Meta Quest)',
    'อื่น ๆ (ระบุในรายละเอียด)',
  ];

  const popularBaseModels = [
    'Original Model (ไม่มีโมเดลฐาน)',
    'Manuka (マヌカ)',
    'Shinra (森羅)',
    'Selestia (セレスティア)',
    'Kikyo (桔梗)',
    'Maya (マヤ)',
    'Moe (萌)',
    'Rindo (竜胆)',
    'Furry / Custom Base',
  ];

  const availableFeatures = [
    { id: 'PhysBones', label: 'PhysBones (ฟิสิกส์ผม หาง หู เสื้อผ้า)' },
    { id: 'GogoLoco', label: 'GogoLoco (ระบบนอน บิน หมอบ นั่ง ท่าทาง)' },
    { id: 'Face Tracking (VRCFT)', label: 'Face Tracking (รองรับกล้องจับใบหน้า)' },
    { id: 'AudioLink', label: 'AudioLink (เสื้อผ้า/รอยสักกระพริบตามเสียงเพลง)' },
    { id: 'Radial Menu Toggles', label: 'Radial Menu Toggles (สลับชุด/ถอดพร็อพ)' },
    { id: 'Custom Gestures', label: 'Custom Hand Gestures (หน้าตาตามการกำมือ)' },
    { id: 'Quest Fallback', label: 'Quest Compatible (ทำตัวรองรับแว่นเควสท์)' },
    { id: 'MMD / Dance Ready', label: 'MMD / Dance World Ready (รองรับเต้น)' },
  ];

  const toggleFeature = (featId: string) => {
    if (formData.features.includes(featId)) {
      setFormData({
        ...formData,
        features: formData.features.filter((f) => f !== featId),
      });
    } else {
      setFormData({
        ...formData,
        features: [...formData.features, featId],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.customerName.trim()) {
      setErrorMsg('กรุณากรอกชื่อของคุณ');
      return;
    }
    if (!formData.discordTag.trim()) {
      setErrorMsg('กรุณากรอก Discord Username เพื่อให้ครีเอเตอร์ติดต่อส่งงานได้');
      return;
    }
    if (!formData.refLinks.trim()) {
      setErrorMsg('กรุณาแนบลิงก์รูปภาพอ้างอิง (Ref Sheet / Pinterest / Google Drive)');
      return;
    }
    if (!formData.agreedToTos) {
      setErrorMsg('กรุณาติ๊กยอมรับข้อตกลงและเงื่อนไขการจ้าง (ToS) ก่อนส่งใบสั่งซื้อ');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.submitCommission(formData);
      if (res.success) {
        setSubmitSuccess({ code: res.orderCode, message: res.message });
        if (onOrderCreated) {
          onOrderCreated(res.orderCode);
        }
      } else {
        setErrorMsg(res.message || 'เกิดข้อผิดพลาดในการส่งใบสั่งซื้อ กรุณาลองใหม่อีกครั้ง');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'ไม่สามารถติดต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-xs text-purple-300 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          <span>VRChat Commission Request</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-['Space_Grotesk'] text-white">
          ใบสั่งทำ <span className="cosmic-text-gradient">Avatar</span>
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base">
          กรอกรายละเอียดความต้องการเพื่อขอรับใบเสนอราคาและจองคิวงาน ครีเอเตอร์จะติดต่อกลับผ่านทาง Discord ภายใน 24 ชม.
        </p>
      </div>

      {submitSuccess ? (
        /* Success Screen */
        <div className="glass-panel rounded-3xl border border-emerald-500/40 p-8 sm:p-12 text-center space-y-6 shadow-[0_0_50px_rgba(16,185,129,0.2)] animate-in fade-in zoom-in duration-300">
          <div className="w-20 h-20 rounded-full bg-emerald-950/80 border border-emerald-400/50 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk']">
              ส่งใบสั่งซื้อเรียบร้อยแล้ว!
            </h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto">
              ระบบได้บันทึกออเดอร์ของคุณเข้าสู่ระบบเรียบร้อย คุณสามารถใช้รหัสคำสั่งซื้อนี้ตรวจสอบสถานะการทำงานได้ตลอดเวลา
            </p>
          </div>

          {/* Order Code Box */}
          <div className="inline-block px-8 py-4 rounded-2xl bg-slate-950 border border-purple-500/40 text-center">
            <span className="text-xs text-purple-300 uppercase tracking-widest block mb-1">
              รหัสคำสั่งซื้อของคุณ (Order Code)
            </span>
            <span className="text-3xl sm:text-4xl font-extrabold text-cyan-300 tracking-wider font-mono">
              {submitSuccess.code}
            </span>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => setCurrentTab('queue')}
              className="py-3.5 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>ไปที่หน้าติดตามคิวงาน</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setSubmitSuccess(null);
                setFormData({
                  ...formData,
                  customerName: '',
                  refLinks: '',
                  notes: '',
                  agreedToTos: false,
                });
              }}
              className="py-3.5 px-6 rounded-xl font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors cursor-pointer"
            >
              ส่งใบสั่งซื้อใหม่
            </button>
          </div>
        </div>
      ) : (
        /* The Order Form */
        <form onSubmit={handleSubmit} className="glass-panel rounded-3xl border border-purple-900/40 p-6 sm:p-10 space-y-8">
          
          {errorMsg && (
            <div className="p-4 rounded-xl bg-rose-950/70 border border-rose-500/40 text-rose-300 text-sm flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Section 1: Contact Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-purple-900/40 pb-2">
              <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center font-bold">1</span>
              <h3 className="text-lg font-bold text-white">ข้อมูลการติดต่อของคุณ</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  ชื่อ / นามแฝงของคุณ <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น Alex Starwalker"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white text-sm placeholder:text-slate-600 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Discord Username <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น alex_vr (เพื่อใช้ติดต่อส่งงาน)"
                  value={formData.discordTag}
                  onChange={(e) => setFormData({ ...formData, discordTag: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white text-sm placeholder:text-slate-600 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                อีเมล (ไม่บังคับ - สำหรับส่งใบเสนอราคา)
              </label>
              <input
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white text-sm placeholder:text-slate-600 outline-none transition-all"
              />
            </div>
          </div>

          {/* Section 2: Avatar & Project Specs */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-purple-900/40 pb-2">
              <span className="w-6 h-6 rounded-full bg-cyan-600 text-white text-xs flex items-center justify-center font-bold">2</span>
              <h3 className="text-lg font-bold text-white">ประเภทงานและโมเดลฐาน</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  ประเภทงานอวตาร <span className="text-rose-400">*</span>
                </label>
                <select
                  value={formData.avatarType}
                  onChange={(e) => setFormData({ ...formData, avatarType: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-cyan-400 text-white text-sm outline-none transition-all"
                >
                  {avatarTypes.map((type, i) => (
                    <option key={i} value={type} className="bg-slate-900 text-white">
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  โมเดลฐาน (Base Avatar Model)
                </label>
                <select
                  value={formData.baseModel}
                  onChange={(e) => setFormData({ ...formData, baseModel: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-cyan-400 text-white text-sm outline-none transition-all"
                >
                  {popularBaseModels.map((m, i) => (
                    <option key={i} value={m} className="bg-slate-900 text-white">
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Features Checkbox Grid */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                ฟีเจอร์และระบบเสริมที่ต้องการติดตั้ง (เลือกได้หลายข้อ):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {availableFeatures.map((feat) => {
                  const checked = formData.features.includes(feat.id);
                  return (
                    <div
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className={`p-3 rounded-xl border text-xs flex items-center space-x-2.5 cursor-pointer transition-all ${
                        checked
                          ? 'bg-purple-950/40 border-cyan-400 text-white shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                          : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        checked ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-600'
                      }`}>
                        {checked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="font-medium">{feat.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Section 3: References & Budget */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-purple-900/40 pb-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-bold">3</span>
              <h3 className="text-lg font-bold text-white">ภาพอ้างอิงและงบประมาณ</h3>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                ลิงก์รูปภาพอ้างอิง / Ref Sheet <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="เช่น ลิงก์ Google Drive, Pinterest, Imgur, หรือ Discord CDN"
                value={formData.refLinks}
                onChange={(e) => setFormData({ ...formData, refLinks: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-cyan-400 text-white text-sm placeholder:text-slate-600 outline-none transition-all"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                * หากมีไฟล์หลายภาพ สามารถรวมเป็นโฟลเดอร์ Google Drive หรือระบุใน Discord ภายหลังได้ครับ
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  งบประมาณโดยประมาณ
                </label>
                <input
                  type="text"
                  placeholder="เช่น ฿3,500 หรือ ต่อรองได้"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-cyan-400 text-white text-sm outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  วันที่ต้องการรับงาน (Deadline)
                </label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-cyan-400 text-white text-sm outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                รายละเอียดเพิ่มเติม / ความต้องการพิเศษ
              </label>
              <textarea
                rows={3}
                placeholder="เช่น ต้องการให้หูขยับได้เมื่อมีเสียงดัง, โทนสีม่วงประกายทอง, หรือมีแว่นตาถอดใส่ได้"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-cyan-400 text-white text-sm placeholder:text-slate-600 outline-none transition-all"
              />
            </div>
          </div>

          {/* Section 4: Terms of Service Agreement */}
          <div className="pt-2 border-t border-purple-900/40">
            <label className="flex items-start space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.agreedToTos}
                onChange={(e) => setFormData({ ...formData, agreedToTos: e.target.checked })}
                className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-0 cursor-pointer"
              />
              <span className="text-xs text-slate-300 leading-relaxed">
                ฉันได้อ่านและยอมรับ <button type="button" onClick={() => setCurrentTab('pricing')} className="text-cyan-400 underline hover:text-cyan-300">ข้อตกลงและเงื่อนไขการจ้าง (ToS)</button> รวมถึงเข้าใจขั้นตอนการมัดจำ 50% ก่อนเริ่มงาน และการทดสอบโมเดลใน VRChat ก่อนส่งมอบ
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-[0_0_30px_rgba(139,92,246,0.4)] disabled:opacity-50 transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              {isSubmitting ? (
                <span>กำลังประมวลผลคำสั่งซื้อ...</span>
              ) : (
                <>
                  <Send className="w-5 h-5 text-cyan-200" />
                  <span>ยืนยันและส่งใบสั่งซื้อ</span>
                </>
              )}
            </button>
          </div>

        </form>
      )}

    </section>
  );
};
