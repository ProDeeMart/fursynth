import React, { useState } from 'react';
import type { User } from '../types';
import { api } from '../services/api';
import { X, Lock, User as UserIcon, AlertCircle, ShieldCheck } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.login(username, password);
      if (res.success && res.user) {
        onLoginSuccess(res.user);
        onClose();
      } else {
        setError(res.error || 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
      }
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
    } finally {
      setLoading(false);
    }
  };

  const fillAdminDemo = () => {
    setUsername('admin');
    setPassword('admin123');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 text-slate-900">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center space-y-1">
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#f97316] shadow-sm mx-auto mb-3">
            <img
              src="/logo.jpg"
              alt="Fursynth Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 font-['Space_Grotesk']">
            เข้าสู่ระบบ Fursynth
          </h3>
          <p className="text-xs text-slate-500">
            สำหรับลูกค้าตรวจสอบออเดอร์ หรือแอดมินจัดการคิวงาน
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              ชื่อผู้ใช้งาน (Username)
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                placeholder="กรอก Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#f97316] focus:bg-white text-slate-900 text-sm outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              รหัสผ่าน (Password)
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                placeholder="กรอกรหัสผ่าน"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#f97316] focus:bg-white text-slate-900 text-sm outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-[#f97316] hover:bg-[#ea580c] orange-glow transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? 'กำลังตรวจสอบ...' : 'เข้าสู่ระบบ'}
          </button>
        </form>

        {/* Demo Fast Login Helper */}
        <div className="pt-3 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-500 mb-2">
            🔑 ทดสอบเข้าระบบแอดมินสำหรับเจ้าของร้าน:
          </p>
          <button
            type="button"
            onClick={fillAdminDemo}
            className="text-xs px-3.5 py-1.5 rounded-lg bg-orange-50 border border-orange-200 text-[#ea580c] hover:bg-orange-100 transition-colors inline-flex items-center space-x-1.5 cursor-pointer font-medium"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#f97316]" />
            <span>กรอกรหัส Admin อัตโนมัติ (admin / admin123)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
