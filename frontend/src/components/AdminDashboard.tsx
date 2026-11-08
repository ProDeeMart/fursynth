import React, { useState } from 'react';
import type { Order, OrderStatus } from '../types';
import { api } from '../services/api';
import { ShieldCheck, Edit, Save, CheckCircle, RefreshCw, ExternalLink } from 'lucide-react';

interface AdminDashboardProps {
  orders: Order[];
  onRefreshOrders: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ orders, onRefreshOrders }) => {
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const statusOptions: { value: OrderStatus; label: string }[] = [
    { value: 'pending', label: '1. รอการยืนยัน (Pending)' },
    { value: 'queued', label: '2. อยู่ในคิวงาน (In Queue)' },
    { value: 'sketch_modeling', label: '3. ขึ้นโครงโมเดล (Modeling)' },
    { value: 'texturing_rigging', label: '4. ลงสี & Rigging (Texturing)' },
    { value: 'unity_physbones', label: '5. เซ็ตอัป Unity & PhysBones' },
    { value: 'testing_vrc', label: '6. ทดสอบใน VRChat (In-Game)' },
    { value: 'completed', label: '7. ส่งมอบเสร็จสมบูรณ์ (Completed)' },
    { value: 'cancelled', label: '8. ยกเลิก (Cancelled)' },
  ];

  const handleStartEdit = (order: Order) => {
    setEditingOrder({ ...order });
    setSuccessMsg(null);
  };

  const handleSave = async () => {
    if (!editingOrder) return;
    setSaving(true);
    setSuccessMsg(null);

    try {
      const ok = await api.updateOrder(editingOrder.id, {
        status: editingOrder.status,
        progressPercent: Number(editingOrder.progressPercent),
        adminNotes: editingOrder.adminNotes,
      });

      if (ok) {
        setSuccessMsg(`บันทึกสถานะออเดอร์ ${editingOrder.orderCode} เรียบร้อยแล้ว!`);
        onRefreshOrders();
        setEditingOrder(null);
      }
    } catch (err: any) {
      alert('บันทึกล้มเหลว: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-[#f97316]" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Space_Grotesk']">
              Fursynth Admin Management Panel
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            แผงควบคุมหลังบ้านสำหรับจัดการคำสั่งซื้อ ปรับปรุงสถานะคิวงาน และเพิ่มบันทึกความคืบหน้า
          </p>
        </div>

        <button
          onClick={onRefreshOrders}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 flex items-center space-x-1.5 text-xs font-semibold shadow-sm cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#f97316]" />
          <span>รีเฟรชข้อมูล</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 shrink-0 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase tracking-wider text-xs font-semibold">
              <tr>
                <th className="py-3.5 px-4">รหัสคิว</th>
                <th className="py-3.5 px-4">ลูกค้า (Discord)</th>
                <th className="py-3.5 px-4">ประเภทงาน & โมเดล</th>
                <th className="py-3.5 px-4">งบประมาณ</th>
                <th className="py-3.5 px-4">สถานะปัจจุบัน</th>
                <th className="py-3.5 px-4 text-center">ความคืบหน้า</th>
                <th className="py-3.5 px-4 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-orange-50/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#ea580c]">
                    {ord.orderCode}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-slate-900 font-medium block">{ord.customerName}</span>
                    <span className="text-xs text-slate-500 font-mono">{ord.discordTag}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">
                    <span className="block font-medium">{ord.avatarType}</span>
                    <span className="text-xs text-slate-500">{ord.baseModel}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-700">
                    {ord.budget || '-'}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 border border-slate-200 text-slate-700">
                      {ord.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono">
                    <span className="text-[#ea580c] font-bold">{ord.progressPercent}%</span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleStartEdit(ord)}
                      className="px-3 py-1.5 rounded-lg bg-orange-50 border border-orange-200 text-[#ea580c] hover:bg-[#f97316] hover:text-white text-xs font-semibold inline-flex items-center space-x-1 cursor-pointer transition-colors"
                    >
                      <Edit className="w-3 h-3" />
                      <span>อัปเดตสถานะ</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Order Modal */}
      {editingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-xl bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xl text-slate-900">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-['Space_Grotesk']">
                  แก้ไขสถานะ: {editingOrder.orderCode}
                </h3>
                <span className="text-xs text-slate-500">
                  ลูกค้า: {editingOrder.customerName} ({editingOrder.discordTag})
                </span>
              </div>
              <button
                onClick={() => setEditingOrder(null)}
                className="text-slate-400 hover:text-slate-700 text-sm p-1 cursor-pointer"
              >
                ✕ ปิด
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  เปลี่ยนขั้นตอนสถานะงาน (Status)
                </label>
                <select
                  value={editingOrder.status}
                  onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value as OrderStatus })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm outline-none focus:border-[#f97316] focus:bg-white"
                >
                  {statusOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    เปอร์เซ็นต์ความคืบหน้า (Progress)
                  </label>
                  <span className="text-xs font-mono font-bold text-[#ea580c]">
                    {editingOrder.progressPercent}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={editingOrder.progressPercent}
                  onChange={(e) => setEditingOrder({ ...editingOrder, progressPercent: Number(e.target.value) })}
                  className="w-full accent-[#f97316] cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  บันทึกข้อความถึงลูกค้า (Admin Note ที่จะแสดงในหน้าเช็กคิว)
                </label>
                <textarea
                  rows={3}
                  value={editingOrder.adminNotes || ''}
                  onChange={(e) => setEditingOrder({ ...editingOrder, adminNotes: e.target.value })}
                  placeholder="เช่น เพ้นท์สีเสร็จแล้ว อยู่ระหว่างเซ็ตอัป PhysBones และโครงสร้างนิ้ว"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm outline-none focus:border-[#f97316] focus:bg-white placeholder:text-slate-400"
                />
              </div>

              {editingOrder.refLinks && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <span className="text-slate-500 block mb-1">ลิงก์ภาพอ้างอิงของลูกค้า:</span>
                  <a
                    href={editingOrder.refLinks}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#ea580c] hover:underline flex items-center space-x-1"
                  >
                    <span>{editingOrder.refLinks}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setEditingOrder(null)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 cursor-pointer"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-[#f97316] hover:bg-[#ea580c] flex items-center space-x-1.5 cursor-pointer disabled:opacity-50 shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'กำลังบันทึก...' : 'บันทึกการเปลี่ยนแปลง'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
