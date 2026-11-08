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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md glass-panel rounded-3xl border border-purple-500/40 shadow-[0_0_50px_rgba(139,92,246,0.3)] p-6 sm:p-8 space-y-6">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center space-y-1">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-400 p-[1.5px] mx-auto mb-3 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
            <img
              src="/logo.jpg"
              alt="Fursynth Logo"
              className="w-full h-full object-cover rounded-[14px]"
            />
          </div>
          <h3 className="text-2xl font-bold text-white font-['Space_Grotesk']">
            เข้าสู่ระบบ Fursynth
          </h3>
          <p className="text-xs text-slate-400">
            สำหรับลูกค้าตรวจสอบออเดอร์ หรือแอดมินจัดการคิวงาน
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-500/40 text-rose-300 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              ชื่อผู้ใช้งาน (Username)
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                required
                placeholder="กรอก Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-cyan-400 text-white text-sm outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              รหัสผ่าน (Password)
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                placeholder="กรอกรหัสผ่าน"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-cyan-400 text-white text-sm outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? 'กำลังตรวจสอบ...' : 'เข้าสู่ระบบ'}
          </button>
        </form>

        {/* Demo Fast Login Helper */}
        <div className="pt-3 border-t border-slate-800/80 text-center">
          <p className="text-[11px] text-slate-400 mb-2">
            🔑 ทดสอบเข้าระบบแอดมินสำหรับเจ้าของร้าน:
          </p>
          <button
            type="button"
            onClick={fillAdminDemo}
            className="text-xs px-3 py-1.5 rounded-lg bg-purple-950/60 border border-purple-500/30 text-purple-300 hover:bg-purple-900/40 hover:text-cyan-300 transition-colors inline-flex items-center space-x-1.5 cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>กรอกรหัส Admin อัตโนมัติ (admin / admin123)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
