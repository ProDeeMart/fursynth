export type UserRole = 'admin' | 'customer';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  discordTag?: string;
  token?: string;
}

export type AvatarCategory = 'All' | 'Full Custom' | 'Retexture & Edit' | 'Outfits & Props' | 'Optimized';

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Full Custom' | 'Retexture & Edit' | 'Outfits & Props' | 'Optimized';
  subtitle: string;
  imageUrl: string;
  galleryImages?: string[];
  description: string;
  polyCount: string;
  physBones: string;
  togglesCount: number;
  questCompatible: boolean;
  faceTracking: boolean;
  audioLink: boolean;
  gogoLoco: boolean;
  tags: string[];
  featured?: boolean;
}

export type OrderStatus =
  | 'pending'           // รอการยืนยัน
  | 'queued'            // อยู่ในคิวงาน
  | 'sketch_modeling'   // ขึ้นโมเดล / แก้โครงสร้าง
  | 'texturing_rigging' // ลงสีและริกกิ้ง
  | 'unity_physbones'   // เซ็ตอัป Unity & PhysBones
  | 'testing_vrc'       // ทดสอบใน VRChat
  | 'completed'         // เสร็จสมบูรณ์ / ส่งมอบแล้ว
  | 'cancelled';        // ยกเลิก

export interface OrderTimelineEvent {
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
}

export interface Order {
  id: string;
  orderCode: string; // e.g. FS-7821
  customerName: string;
  discordTag: string;
  email?: string;
  avatarType: string;
  baseModel: string;
  features: string[];
  budget: string;
  deadline: string;
  refLinks: string;
  notes?: string;
  status: OrderStatus;
  progressPercent: number;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
  timeline: OrderTimelineEvent[];
}

export interface CommissionSubmission {
  customerName: string;
  discordTag: string;
  email?: string;
  avatarType: string;
  baseModel: string;
  features: string[];
  budget: string;
  deadline: string;
  refLinks: string;
  notes?: string;
  agreedToTos: boolean;
}

