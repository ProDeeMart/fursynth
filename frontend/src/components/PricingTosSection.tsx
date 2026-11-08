import React from 'react';
import { Sparkles, Check, Shield } from 'lucide-react';

interface PricingTosSectionProps {
  setCurrentTab: (tab: string) => void;
}

export const PricingTosSection: React.FC<PricingTosSectionProps> = ({ setCurrentTab }) => {
  const tiers = [
    {
      name: 'Retexture & Edit',
      tag: 'ยอดนิยมสำหรับโมเดลฐาน',
      price: '฿1,800 - ฿3,500',
      desc: 'เพ้นท์สีผิว ลายสัก ดวงตา เสื้อผ้า และปรับแต่งทรงผมสำหรับโมเดลยอดนิยม เช่น Manuka, Shinra, Selestia',
      features: [
        'เพ้นท์เท็กซ์เจอร์ตามบรีฟ 100%',
        'ปรับแต่งแสง LilToon MatCap / Shaders',
        'เซ็ตอัป PhysBones ให้ขยับสวยงาม',
        'ท็อกเกิลเปลี่ยนสี / รอยสัก 2-4 จุด',
        'ทดสอบใน VRChat ก่อนส่งมอบ',
      ],
      popular: false,
    },
    {
      name: 'Outfit & Full Setup',
      tag: 'คุ้มค่าที่สุด',
      price: '฿3,500 - ฿6,500',
      desc: 'สวมใส่ชุด เสื้อผ้า พร็อพ อาวุธ พร้อมติดตั้งระบบเสริม GogoLoco และ Face Tracking ให้พร้อมเล่น',
      features: [
        'ใส่ชุดและพร็อพไม่จำกัดชิ้น (Weight Paint พอดีตัว)',
        'ติดตั้งระบบนอน/บิน/โพสท่า (GogoLoco)',
        'ติดตั้ง Radial Menu Toggles ถอด/ใส่ชุด',
        'ระบบ Face Tracking (VRCFT) เบื้องต้น',
        'ทำตัวสำรอง Quest Fallback ในตัว',
        'รับประกันแก้บั๊กฟรี 14 วัน',
      ],
      popular: true,
    },
    {
      name: 'Full Custom 3D Avatar',
      tag: 'สำหรับงาน Original แท้',
      price: '฿12,000+',
      desc: 'ปั้นโมเดล 3D ตั้งแต่โครงสร้างศูนย์ ออกแบบเฉพาะตัวตนของคุณ ไม่ซ้ำใคร พร้อมกระดูกและฟิสิกส์เต็มระบบ',
      features: [
        'ปั้นโมเดล 3D แบบ Exclusive 1 เดียวในโลก',
        'ลงสี Texture ความละเอียดสูง 4K',
        'จัดโครงกระดูก (Humanoid Rigging) เต็มรูปแบบ',
        'Full Blendshapes (หน้าตา ท่าทาง ลิ้น ปาก)',
        'ระบบ AudioLink กระพริบตามเสียงเพลง',
        'ส่งมอบไฟล์ Unitypackage + Blend + FBX',
      ],
      popular: false,
    },
  ];

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-xs text-purple-300 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          <span>Transparent Pricing</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-['Space_Grotesk'] text-white">
          แพ็กเกจราคาและ <span className="cosmic-text-gradient">ข้อตกลงการจ้าง</span>
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base">
          ราคาประเมินเบื้องต้นตามขอบเขตงาน ความซับซ้อน และจำนวนฟังก์ชันที่ต้องการติดตั้ง
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier, idx) => (
          <div
            key={idx}
            className={`glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
              tier.popular
                ? 'border-cyan-400/80 shadow-[0_0_35px_rgba(6,182,212,0.25)] ring-1 ring-cyan-400/50'
                : 'border-purple-900/30 hover:border-purple-500/50'
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md">
                  {tier.tag}
                </span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <span className="text-xs text-purple-300 font-semibold">{tier.tag}</span>
                <h3 className="text-2xl font-bold text-white mt-1 font-['Space_Grotesk']">
                  {tier.name}
                </h3>
                <div className="mt-3 text-3xl font-extrabold text-cyan-300 font-mono">
                  {tier.price}
                </div>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {tier.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-2.5">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  สิ่งที่รวมในแพ็กเกจ:
                </span>
                {tier.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start space-x-2 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={() => setCurrentTab('commission')}
                className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  tier.popular
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg hover:shadow-cyan-500/30'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700'
                }`}
              >
                เลือกแพ็กเกจนี้
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Terms of Service (ToS) Card */}
      <div className="glass-panel rounded-3xl border border-purple-900/40 p-6 sm:p-10 space-y-6">
        <div className="flex items-center space-x-3 border-b border-purple-900/40 pb-4">
          <Shield className="w-6 h-6 text-cyan-400" />
          <h3 className="text-xl sm:text-2xl font-bold text-white font-['Space_Grotesk']">
            ข้อตกลงและเงื่อนไขการให้บริการ (Terms of Service)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          
          <div className="space-y-2 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <h4 className="font-bold text-cyan-300 text-sm flex items-center space-x-1.5">
              <span>1. การชำระเงินและมัดจำ</span>
            </h4>
            <p>
              • ชำระมัดจำ <strong>50%</strong> ก่อนเริ่มลงมือทำงาน เพื่อยืนยันและล็อคคิวงานในระบบ<br />
              • ชำระส่วนที่เหลือ <strong>50%</strong> หลังจากทดสอบโมเดลใน VRChat และยืนยันความถูกต้อง ก่อนส่งมอบไฟล์ Unitypackage
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <h4 className="font-bold text-cyan-300 text-sm flex items-center space-x-1.5">
              <span>2. ลิขสิทธิ์โมเดลฐานและแอสเสต</span>
            </h4>
            <p>
              • ผู้ว่าจ้างต้องเป็นเจ้าของโมเดลฐานและแอสเสต 3D (ซื้อถูกต้องจาก Booth หรือครีเอเตอร์ต้นฉบับ)<br />
              • ครีเอเตอร์จะไม่นำโมเดลฐานของลูกค้าไปแจกจ่าย หรือขายต่อให้บุคคลที่สามโดยเด็ดขาด
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <h4 className="font-bold text-cyan-300 text-sm flex items-center space-x-1.5">
              <span>3. การแก้ไขงานและการรับประกัน</span>
            </h4>
            <p>
              • สามารถแก้ไขงานได้ฟรีในขั้นตอน Sketch / Modeling และ Texturing<br />
              • รับประกันแก้บั๊กเทคนิค (เช่น กระดูกเคลื่อน, ฟิสิกส์ทะลุ, บั๊ก Shaders) ฟรี <strong>14 วัน</strong> นับจากวันส่งมอบงาน
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <h4 className="font-bold text-cyan-300 text-sm flex items-center space-x-1.5">
              <span>4. การใช้งานเชิงพาณิชย์ & สตรีมเมอร์</span>
            </h4>
            <p>
              • สามารถนำไปใช้สตรีมเกม, ทำคอนเทนต์ลง YouTube / Twitch / TikTok ได้อย่างอิสระ<br />
              • สำหรับการนำไปผลิตสินค้า Merchandise หรือขายต่อ ต้องระบุในบรีฟเพื่อตกลง Commercial Rights เพิ่มเติม
            </p>
          </div>

        </div>

      </div>

    </section>
  );
};
