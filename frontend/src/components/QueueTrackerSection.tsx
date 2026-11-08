import React, { useState } from 'react';
import type { Order, OrderStatus } from '../types';
import { Search, Calendar, Activity } from 'lucide-react';

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
        return { label: 'ส่งมอบเสร็จสิ้น', color: 'bg-emerald-100 text-emerald-800' };
      case 'testing_vrc':
        return { label: 'ทดสอบใน VRChat', color: 'bg-cyan-100 text-cyan-800' };
      case 'unity_physbones':
        return { label: 'Unity & PhysBones', color: 'bg-orange-100 text-[#ea580c]' };
      case 'texturing_rigging':
        return { label: 'ลงสี & Rigging', color: 'bg-indigo-100 text-indigo-800' };
      case 'sketch_modeling':
        return { label: 'ขึ้นโครงโมเดล 3D', color: 'bg-amber-100 text-amber-800' };
      case 'queued':
        return { label: 'อยู่ในคิวงาน', color: 'bg-slate-100 text-slate-800' };
      default:
        return { label: 'รอการยืนยัน', color: 'bg-slate-100 text-slate-600' };
    }
  };

  const pipelineStages: { id: OrderStatus; name: string }[] = [
    { id: 'queued', name: '1. รับเข้าคิว' },
    { id: 'sketch_modeling', name: '2. ขึ้นโมเดล' },
    { id: 'texturing_rigging', name: '3. ลงสี/Rigging' },
    { id: 'unity_physbones', name: '4. Unity Setup' },
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
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-orange-100 text-[#ea580c] text-sm font-extrabold mb-3">
          <Activity className="w-4 h-4" />
          <span>Real-time Work Tracker</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-black text-slate-900 font-['Space_Grotesk'] tracking-tight">
          ติดตาม <span className="text-[#f97316]">คิวและสถานะงาน</span>
        </h2>
        <p className="mt-3 text-slate-600 text-base sm:text-lg font-medium">
          ตรวจสอบความคืบหน้าของอวตารของคุณได้ตลอด 24 ชั่วโมง เพียงกรอกรหัสคำสั่งซื้อ (Order Code) หรือชื่อ Discord
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mt-8 max-w-xl mx-auto flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="ค้นหาด้วยรหัสคำสั่งซื้อ เช่น FS-9812 หรือชื่อ Discord..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200 focus:border-[#f97316] focus:ring-2 focus:ring-orange-100 text-slate-900 text-base placeholder:text-slate-400 outline-none transition-all shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="px-8 py-4 rounded-2xl font-black text-base text-white bg-[#f97316] hover:bg-[#ea580c] orange-glow transition-all cursor-pointer shadow-md"
          >
            ค้นหา
          </button>
        </form>
      </div>

      {/* Searched Order Card (If matched) */}
      {selectedOrder && (
        <div className="mb-14 bg-white rounded-3xl border border-orange-200 p-6 sm:p-8 space-y-6 shadow-md animate-in fade-in duration-300">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
            <div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl sm:text-3xl font-black text-[#ea580c] font-mono">
                  {selectedOrder.orderCode}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(selectedOrder.status).color}`}>
                  {getStatusBadge(selectedOrder.status).label}
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                ผู้สั่งทำ: <strong className="text-slate-900">{selectedOrder.customerName}</strong> ({selectedOrder.discordTag})
              </p>
            </div>

            <div className="text-right sm:text-right">
              <span className="text-xs text-slate-400 block">กำหนดส่งมอบงาน</span>
              <span className="text-sm font-bold text-slate-800 flex items-center sm:justify-end space-x-1.5 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-[#f97316]" />
                <span>{selectedOrder.deadline || 'ตามตกลง'}</span>
              </span>
            </div>
          </div>

          {/* Progress Bar & Percentage */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-700">ความคืบหน้ารวม</span>
              <span className="text-[#ea580c] font-mono text-sm">{selectedOrder.progressPercent}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#fb923c] to-[#ea580c] transition-all duration-700"
                style={{ width: `${selectedOrder.progressPercent}%` }}
              />
            </div>
          </div>

          {/* Stepper Pipeline */}
          <div className="pt-2">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-3">
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
                        ? 'bg-orange-50 border-[#f97316] text-[#ea580c] font-bold shadow-xs'
                        : isCompleted
                        ? 'bg-slate-50 border-slate-200 text-slate-800 font-medium'
                        : 'bg-slate-50 border-transparent text-slate-400'
                    }`}
                  >
                    <div className="mb-0.5">{stage.name}</div>
                    <span className="text-[10px] block opacity-80">
                      {isCurrent ? '⚡ กำลังดำเนินการ' : isCompleted ? '✓ เสร็จแล้ว' : '○ รอเริ่ม'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Details & Admin Note */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
              <span className="text-[#ea580c] font-bold uppercase tracking-wider block">สเปกอวตาร</span>
              <div className="text-slate-800"><strong>ประเภท:</strong> {selectedOrder.avatarType}</div>
              <div className="text-slate-800"><strong>โมเดลฐาน:</strong> {selectedOrder.baseModel}</div>
              <div className="text-slate-800"><strong>ฟีเจอร์:</strong> {selectedOrder.features?.join(', ') || 'ตามบรีฟ'}</div>
            </div>

            <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-200 space-y-1.5 text-xs">
              <span className="text-[#ea580c] font-bold uppercase tracking-wider block">บันทึกความคืบหน้าจากครีเอเตอร์</span>
              <p className="text-slate-800 leading-relaxed italic">
                "{selectedOrder.adminNotes || 'กำลังดำเนินงานตามแผนงาน'}"
              </p>
              <span className="text-[10px] text-slate-400 block">อัปเดตล่าสุด: {selectedOrder.updatedAt}</span>
            </div>
          </div>

        </div>
      )}

      {/* Public Active Queue Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#f97316] animate-pulse" />
            <h3 className="text-xl font-bold text-slate-900 font-['Space_Grotesk']">
              ตารางคิวงานปัจจุบัน (Live Queue)
            </h3>
          </div>
          <span className="text-xs font-medium text-slate-500">
            กำลังดำเนินการ {orders.filter((o) => o.status !== 'completed').length} คิว
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 text-xs uppercase font-bold tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">รหัสคิว</th>
                  <th className="py-3.5 px-4">ผู้ว่าจ้าง</th>
                  <th className="py-3.5 px-4">ประเภทงาน</th>
                  <th className="py-3.5 px-4">สถานะปัจจุบัน</th>
                  <th className="py-3.5 px-4 text-center">ความคืบหน้า</th>
                  <th className="py-3.5 px-4 text-right">การจัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((ord) => {
                  const badge = getStatusBadge(ord.status);
                  const maskedName = ord.customerName.length > 3
                    ? `${ord.customerName.substring(0, 2)}***`
                    : ord.customerName;

                  return (
                    <tr
                      key={ord.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-[#ea580c]">
                        {ord.orderCode}
                      </td>
                      <td className="py-3.5 px-4 text-slate-800 font-medium">
                        {maskedName}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 max-w-[180px] truncate">
                        {ord.avatarType}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${badge.color}`}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-16 h-2 rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#fb923c] to-[#ea580c]"
                              style={{ width: `${ord.progressPercent}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono text-slate-500">{ord.progressPercent}%</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => {
                            setSelectedOrder(ord);
                            setSearchQuery(ord.orderCode);
                            window.scrollTo({ top: 350, behavior: 'smooth' });
                          }}
                          className="text-xs font-bold text-[#f97316] hover:underline cursor-pointer"
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

        <div className="text-center pt-4">
          <button
            onClick={() => setCurrentTab('commission')}
            className="text-xs font-bold text-[#ea580c] hover:underline cursor-pointer"
          >
            ต้องการจองคิวอวตารสำหรับโปรเจกต์ของคุณ? ส่งใบสั่งซื้อที่นี่ →
          </button>
        </div>

      </div>

    </section>
  );
};
