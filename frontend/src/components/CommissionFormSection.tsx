import React, { useState } from 'react';
import type { CommissionSubmission } from '../types';
import { api } from '../services/api';
import { Send, CheckCircle2, AlertCircle, Check, ArrowRight, Sparkles } from 'lucide-react';

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
    { id: 'Face Tracking (VRCFT)', label: 'Face Tracking (กล้องจับใบหน้า)' },
    { id: 'AudioLink', label: 'AudioLink (เสื้อผ้า/รอยสักกระพริบตามเพลง)' },
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
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-orange-100 text-[#ea580c] text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>VRChat Commission Request</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Space_Grotesk']">
          ใบสั่งทำ <span className="text-[#f97316]">Avatar</span>
        </h2>
        <p className="mt-2 text-slate-600 text-sm sm:text-base">
          กรอกรายละเอียดความต้องการเพื่อขอรับใบเสนอราคาและจองคิวงาน ครีเอเตอร์จะติดต่อกลับผ่าน Discord ภายใน 24 ชม.
        </p>
      </div>

      {submitSuccess ? (
        /* Success Screen */
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center space-y-6 shadow-md animate-in fade-in zoom-in duration-300">
          <div className="w-16 h-16 rounded-full bg-orange-100 text-[#ea580c] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Space_Grotesk']">
              ส่งใบสั่งซื้อเรียบร้อยแล้ว!
            </h3>
            <p className="text-slate-600 text-sm max-w-md mx-auto">
              ระบบได้บันทึกออเดอร์ของคุณเข้าสู่ระบบเรียบร้อย คุณสามารถใช้รหัสคำสั่งซื้อนี้ตรวจสอบสถานะการทำงานได้ตลอดเวลา
            </p>
          </div>

          {/* Order Code Box */}
          <div className="inline-block px-8 py-4 rounded-2xl bg-orange-50 border border-orange-200 text-center">
            <span className="text-xs text-[#ea580c] uppercase font-bold tracking-widest block mb-1">
              รหัสคำสั่งซื้อของคุณ (Order Code)
            </span>
            <span className="text-3xl sm:text-4xl font-black text-[#ea580c] tracking-wider font-mono">
              {submitSuccess.code}
            </span>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => setCurrentTab('queue')}
              className="py-3.5 px-6 rounded-xl font-bold text-white bg-[#f97316] hover:bg-[#ea580c] orange-glow transition-all flex items-center justify-center space-x-2 cursor-pointer"
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
              className="py-3.5 px-6 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              ส่งใบสั่งซื้อใหม่
            </button>
          </div>
        </div>
      ) : (
        /* The Order Form */
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-8 shadow-sm">
          
          {errorMsg && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Section 1: Contact Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
              <span className="w-6 h-6 rounded-full bg-[#f97316] text-white text-xs flex items-center justify-center font-bold">1</span>
              <h3 className="text-base font-bold text-slate-900">ข้อมูลการติดต่อของคุณ</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                  ชื่อ / นามแฝงของคุณ <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น Alex Starwalker"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#f97316] focus:bg-white text-slate-900 text-sm outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                  Discord Username <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น alex_vr"
                  value={formData.discordTag}
                  onChange={(e) => setFormData({ ...formData, discordTag: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#f97316] focus:bg-white text-slate-900 text-sm outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                อีเมล (ไม่บังคับ - สำหรับส่งใบเสนอราคา)
              </label>
              <input
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#f97316] focus:bg-white text-slate-900 text-sm outline-none transition-all"
              />
            </div>
          </div>

          {/* Section 2: Avatar & Project Specs */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
              <span className="w-6 h-6 rounded-full bg-[#f97316] text-white text-xs flex items-center justify-center font-bold">2</span>
              <h3 className="text-base font-bold text-slate-900">ประเภทงานและโมเดลฐาน</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                  ประเภทงานอวตาร <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.avatarType}
                  onChange={(e) => setFormData({ ...formData, avatarType: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#f97316] text-slate-900 text-sm outline-none transition-all cursor-pointer"
                >
                  {avatarTypes.map((type, i) => (
                    <option key={i} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                  โมเดลฐาน (Base Avatar Model)
                </label>
                <select
                  value={formData.baseModel}
                  onChange={(e) => setFormData({ ...formData, baseModel: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#f97316] text-slate-900 text-sm outline-none transition-all cursor-pointer"
                >
                  {popularBaseModels.map((m, i) => (
                    <option key={i} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Features Checkbox Grid */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-2">
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
                          ? 'bg-orange-50 border-[#f97316] text-[#ea580c] shadow-xs font-semibold'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        checked ? 'bg-[#f97316] border-[#f97316] text-white' : 'border-slate-400 bg-white'
                      }`}>
                        {checked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span>{feat.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Section 3: References & Budget */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
              <span className="w-6 h-6 rounded-full bg-[#f97316] text-white text-xs flex items-center justify-center font-bold">3</span>
              <h3 className="text-base font-bold text-slate-900">ภาพอ้างอิงและงบประมาณ</h3>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                ลิงก์รูปภาพอ้างอิง / Ref Sheet <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="เช่น ลิงก์ Google Drive, Pinterest, Imgur, หรือ Discord CDN"
                value={formData.refLinks}
                onChange={(e) => setFormData({ ...formData, refLinks: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#f97316] text-slate-900 text-sm outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                  งบประมาณโดยประมาณ
                </label>
                <input
                  type="text"
                  placeholder="เช่น ฿3,500 หรือ ต่อรองได้"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#f97316] text-slate-900 text-sm outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                  วันที่ต้องการรับงาน (Deadline)
                </label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#f97316] text-slate-900 text-sm outline-none transition-all cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                รายละเอียดเพิ่มเติม / ความต้องการพิเศษ
              </label>
              <textarea
                rows={3}
                placeholder="ระบุสีตา, โทนสีเสื้อผ้า, พร็อพที่ต้องการ, หรือเอฟเฟกต์เฉพาะ..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#f97316] text-slate-900 text-sm outline-none transition-all"
              />
            </div>
          </div>

          {/* Section 4: Terms of Service Agreement */}
          <div className="pt-2 border-t border-slate-100">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.agreedToTos}
                onChange={(e) => setFormData({ ...formData, agreedToTos: e.target.checked })}
                className="mt-1 w-4 h-4 rounded border-slate-300 text-[#f97316] focus:ring-0 cursor-pointer"
              />
              <span className="text-xs text-slate-600 leading-relaxed">
                ฉันได้อ่านและยอมรับ <button type="button" onClick={() => setCurrentTab('pricing')} className="text-[#ea580c] font-bold underline hover:text-[#c2410c]">ข้อตกลงและเงื่อนไขการจ้าง (ToS)</button> รวมถึงการมัดจำ 50% ก่อนเริ่มงาน และการทดสอบโมเดลใน VRChat ก่อนส่งมอบงาน
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl font-bold text-base text-white bg-[#f97316] hover:bg-[#ea580c] orange-glow disabled:opacity-50 transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              {isSubmitting ? (
                <span>กำลังประมวลผลคำสั่งซื้อ...</span>
              ) : (
                <>
                  <Send className="w-5 h-5" />
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
