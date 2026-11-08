import React, { useState } from 'react';
import type { Order, OrderStatus } from '../types';
import { Search, Activity, Calendar } from 'lucide-react';

interface QueueTrackerSectionProps {
  orders: Order[];
  searchedCode?: string;
  setCurrentTab: (tab: string) => void;
}

export const QueueTrackerSection: React.FC<QueueTrackerSectionProps> = ({
  orders,
  searchedCode = '',
  setCurrentTab,
}) => {
  const [searchQuery, setSearchQuery] = useState(searchedCode);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(
    searchedCode ? orders.find((o) => o.orderCode.toLowerCase() === searchedCode.toLowerCase()) || null : null
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSelectedOrder(null);
      return;
    }
    const clean = searchQuery.trim().toLowerCase();
    const found = orders.find(
      (o) => o.orderCode.toLowerCase() === clean || o.discordTag.toLowerCase().includes(clean)
    );
    setSelectedOrder(found || null);
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'completed':
        return { label: 'ส่งมอบเสร็จสิ้น', color: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40' };
      case 'testing_vrc':
        return { label: 'ทดสอบใน VRChat', color: 'bg-cyan-950/80 text-cyan-400 border-cyan-500/40' };
      case 'unity_physbones':
        return { label: 'เซ็ตอัป Unity & PhysBones', color: 'bg-purple-950/80 text-purple-300 border-purple-500/40' };
      case 'texturing_rigging':
        return { label: 'ลงสี & Rigging', color: 'bg-indigo-950/80 text-indigo-300 border-indigo-500/40' };
      case 'sketch_modeling':
        return { label: 'ขึ้นโครงโมเดล 3D', color: 'bg-blue-950/80 text-blue-300 border-blue-500/40' };
      case 'queued':
        return { label: 'อยู่ในคิวงาน', color: 'bg-amber-950/80 text-amber-300 border-amber-500/40' };
      case 'pending':
        return { label: 'รอการยืนยัน', color: 'bg-slate-900 text-slate-400 border-slate-700' };
      default:
        return { label: 'กำลังดำเนินการ', color: 'bg-slate-900 text-slate-300 border-slate-700' };
    }
  };

  const pipelineStages: { id: OrderStatus; name: string }[] = [
    { id: 'queued', name: '1. รับเข้าคิว' },
    { id: 'sketch_modeling', name: '2. ขึ้นโมเดล' },
    { id: 'texturing_rigging', name: '3. ลงสี/Rigging' },
    { id: 'unity_physbones', name: '4. Unity/PhysBones' },
    { id: 'testing_vrc', name: '5. ทดสอบในเกม' },
    { id: 'completed', name: '6. ส่งมอบงาน' },
  ];

  const getStageIndex = (status: OrderStatus) => {
    const map: Record<OrderStatus, number> = {
      pending: 0,
      queued: 1,
      sketch_modeling: 2,
      texturing_rigging: 3,
      unity_physbones: 4,
      testing_vrc: 5,
      completed: 6,
      cancelled: -1,
    };
    return map[status] ?? 0;
  };

  return (
    <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs text-cyan-300 mb-3">
          <Activity className="w-3.5 h-3.5 text-cyan-300" />
          <span>Real-time Work Tracker</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-['Space_Grotesk'] text-white">
          ติดตาม <span className="cosmic-text-gradient">คิวและสถานะงาน</span>
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base">
          ตรวจสอบความคืบหน้าของอวตารของคุณได้ตลอด 24 ชั่วโมง เพียงกรอกรหัสคำสั่งซื้อ (Order Code) หรือชื่อ Discord
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mt-8 max-w-xl mx-auto flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="ค้นหาด้วยรหัสคำสั่งซื้อ เช่น FS-9812 หรือชื่อ Discord..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-900/90 border border-purple-500/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white text-sm placeholder:text-slate-500 outline-none transition-all shadow-inner"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3.5 rounded-2xl font-semibold text-sm text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all cursor-pointer"
          >
            ค้นหา
          </button>
        </form>
      </div>

      {/* Searched Order Card (If matched) */}
      {selectedOrder && (
        <div className="mb-14 glass-panel rounded-3xl border border-cyan-500/40 p-6 sm:p-8 space-y-6 shadow-[0_0_40px_rgba(6,182,212,0.2)] animate-in fade-in duration-300">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-purple-900/40 gap-4">
            <div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-cyan-300 font-mono">
                  {selectedOrder.orderCode}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(selectedOrder.status).color}`}>
                  {getStatusBadge(selectedOrder.status).label}
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                ผู้สั่งทำ: <strong className="text-white">{selectedOrder.customerName}</strong> ({selectedOrder.discordTag})
              </p>
            </div>

            <div className="text-right sm:text-right">
              <span className="text-xs text-slate-400 block">กำหนดส่งมอบงาน</span>
              <span className="text-sm font-semibold text-purple-300 flex items-center sm:justify-end space-x-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{selectedOrder.deadline || 'ตามตกลง'}</span>
              </span>
            </div>
          </div>

          {/* Progress Bar & Percentage */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-slate-300">ความคืบหน้ารวม</span>
              <span className="text-cyan-300 font-mono text-sm">{selectedOrder.progressPercent}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-400 transition-all duration-700 shadow-[0_0_12px_rgba(6,182,212,0.5)]"
                style={{ width: `${selectedOrder.progressPercent}%` }}
              />
            </div>
          </div>

          {/* Stepper Pipeline */}
          <div className="pt-2">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-3">
              ขั้นตอนการทำงาน (Workflow Pipeline)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {pipelineStages.map((stage, idx) => {
                const currentIdx = getStageIndex(selectedOrder.status);
                const isCompleted = idx + 1 < currentIdx || selectedOrder.status === 'completed';
                const isCurrent = idx + 1 === currentIdx;

                return (
                  <div
                    key={stage.id}
                    className={`p-3 rounded-xl border text-xs text-center transition-all ${
                      isCurrent
                        ? 'bg-cyan-950/60 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400'
                        : isCompleted
                        ? 'bg-purple-950/30 border-purple-800 text-purple-300'
                        : 'bg-slate-950/40 border-slate-800/80 text-slate-500'
                    }`}
                  >
                    <div className="font-semibold mb-0.5">{stage.name}</div>
                    <span className="text-[10px] block">
                      {isCurrent ? '⚡ กำลังดำเนินการ' : isCompleted ? '✓ เสร็จแล้ว' : '○ รอเริ่ม'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Details & Admin Note */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
              <span className="text-slate-400 font-bold uppercase tracking-wider block">สเปกอวตาร</span>
              <div className="text-slate-300"><strong>ประเภท:</strong> {selectedOrder.avatarType}</div>
              <div className="text-slate-300"><strong>โมเดลฐาน:</strong> {selectedOrder.baseModel}</div>
              <div className="text-slate-300"><strong>ฟีเจอร์:</strong> {selectedOrder.features?.join(', ') || 'ตามบรีฟ'}</div>
            </div>

            <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-900/40 space-y-2 text-xs">
              <span className="text-purple-300 font-bold uppercase tracking-wider block">บันทึกความคืบหน้าจากครีเอเตอร์</span>
              <p className="text-slate-200 leading-relaxed italic">
                "{selectedOrder.adminNotes || 'กำลังดำเนินงานตามแผนงาน'}"
              </p>
              <span className="text-[10px] text-slate-500 block">อัปเดตล่าสุด: {selectedOrder.updatedAt}</span>
            </div>
          </div>

        </div>
      )}

      {/* Public Active Queue Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
              ตารางคิวงานปัจจุบัน (Live Queue)
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            กำลังดำเนินการ {orders.filter((o) => o.status !== 'completed').length} คิว
          </span>
        </div>

        <div className="glass-panel rounded-2xl border border-purple-900/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">รหัสคิว</th>
                  <th className="py-3.5 px-4">ผู้ว่าจ้าง</th>
                  <th className="py-3.5 px-4">ประเภทงาน</th>
                  <th className="py-3.5 px-4">สถานะปัจจุบัน</th>
                  <th className="py-3.5 px-4 text-center">ความคืบหน้า</th>
                  <th className="py-3.5 px-4 text-right">การจัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {orders.map((ord) => {
                  const badge = getStatusBadge(ord.status);
                  // Anonymize discord tag for privacy: e.g. "kaelen_vr#0001" -> "ka***#0001"
                  const maskedName = ord.customerName.length > 3
                    ? `${ord.customerName.substring(0, 2)}***`
                    : ord.customerName;

                  return (
                    <tr
                      key={ord.id}
                      className="hover:bg-purple-950/20 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-cyan-300">
                        {ord.orderCode}
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">
                        {maskedName}
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 max-w-[180px] truncate">
                        {ord.avatarType}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${badge.color}`}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-16 h-2 rounded-full bg-slate-900 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-500 to-cyan-400"
                              style={{ width: `${ord.progressPercent}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono text-slate-400">{ord.progressPercent}%</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => {
                            setSelectedOrder(ord);
                            setSearchQuery(ord.orderCode);
                            window.scrollTo({ top: 350, behavior: 'smooth' });
                          }}
                          className="text-xs font-medium text-cyan-400 hover:text-cyan-300 underline"
                        >
                          ดูรายละเอียด
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center pt-6">
          <p className="text-xs text-slate-400">
            ต้องการจองคิวอวตารสำหรับอีเวนต์หรือโปรเจกต์ของคุณ?
          </p>
          <button
            onClick={() => setCurrentTab('commission')}
            className="mt-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200 underline"
          >
            ส่งใบสั่งทำอวตารและจองคิวตอนนี้ →
          </button>
        </div>

      </div>

    </section>
  );
};
