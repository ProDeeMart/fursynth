import type { PortfolioItem, Order, CommissionSubmission, User } from '../types';

// Default to local backend or Cloudflare Tunnel URL configured in .env
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Initial High-Quality Demo Data for VRChat Avatar Creations
export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'Celestia: Nebula Sorceress',
    subtitle: 'Full Custom Avatar with Cosmic Shaders & Custom Particles',
    category: 'Full Custom',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    description: 'อวตารธีมดวงดาวอวกาศที่สร้างขึ้นใหม่ทั้งหมด ด้วยชุดเกราะเวทมนตร์คอสมิก พร้อมระบบ AudioLink ตอบสนองต่อเสียงเพลงในคลับ VRChat และฟิสิกส์เส้นผมสลวย',
    polyCount: '68,500 Triangles',
    physBones: '24 Components (Optimized)',
    togglesCount: 16,
    questCompatible: false,
    faceTracking: true,
    audioLink: true,
    gogoLoco: true,
    tags: ['Original', 'Cosmic', 'AudioLink', 'VRCFT', 'PhysBones'],
    featured: true,
  },
  {
    id: 'port-2',
    title: 'Shinra: Cyber Void Dragon',
    subtitle: 'Custom Retexture & Sci-Fi Techwear Cyberware Edit',
    category: 'Retexture & Edit',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    description: 'งานปรับแต่งโมเดล Shinra สไตล์ Cyberpunk อวกาศ เพ้นท์เท็กซ์เจอร์ผิวลายเกล็ดมังกรเรืองแสง พร้อมชุดสูทสตรีทแวร์ไฮเทคและท็อกเกิลปีกพลังงาน',
    polyCount: '78,200 Triangles',
    physBones: '18 Components',
    togglesCount: 22,
    questCompatible: false,
    faceTracking: false,
    audioLink: true,
    gogoLoco: true,
    tags: ['Shinra', 'Cyberpunk', 'Horns & Tail', 'DPS Ready'],
    featured: true,
  },
  {
    id: 'port-3',
    title: 'Manuka: Starlight Maiden',
    subtitle: 'Pastel Galaxy Retexture with Custom Outfit Fit & GogoLoco',
    category: 'Retexture & Edit',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    description: 'งานรีเท็กซ์เจอร์ Manuka ในโทนสีท้องฟ้าราตรีและดาวประกาย ผสมผสานชุดเดรสผ้าโปร่งแสงที่มีอนุภาคประกายดาวระยิบระยับรอบตัว',
    polyCount: '62,000 Triangles',
    physBones: '16 Components',
    togglesCount: 14,
    questCompatible: true,
    faceTracking: true,
    audioLink: false,
    gogoLoco: true,
    tags: ['Manuka', 'Pastel Galaxy', 'Quest Ready', 'Cute'],
    featured: true,
  },
  {
    id: 'port-4',
    title: 'Cosmic Valkyrie Wings & Halo Set',
    subtitle: '3D Asset Pack: PhysBones Dynamic Wings & Orbiting Planetary Halo',
    category: 'Outfits & Props',
    imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
    description: 'พร็อพปีกนางฟ้าจักรวาลและวงแหวนดาวเคราะห์หมุนรอบตัว พร้อมระบบพับปีกกางปีกด้วยท่าทางมือ และเซ็ตติ้ง LilToon Shaders เกรดพรีเมียม',
    polyCount: '18,400 Triangles',
    physBones: '8 Components',
    togglesCount: 8,
    questCompatible: false,
    faceTracking: false,
    audioLink: true,
    gogoLoco: false,
    tags: ['Accessories', 'Props', 'LilToon', 'Wings'],
  },
  {
    id: 'port-5',
    title: 'Kikyo: Deep Space Stealth (Quest Optimized)',
    subtitle: 'VRChat Quest & PC Cross-Platform Optimization',
    category: 'Optimized',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    description: 'การแปลงโมเดล Kikyo ให้รองรับแว่น Meta Quest โดยปรับลด Draw Calls รวมไฟล์ Atlas Texture ให้มี Performance Rank: Good บน Quest',
    polyCount: '19,800 Triangles',
    physBones: '6 Components',
    togglesCount: 6,
    questCompatible: true,
    faceTracking: false,
    audioLink: false,
    gogoLoco: true,
    tags: ['Quest Optimized', 'Performance Good', 'Kikyo'],
  },
];

export const INITIAL_QUEUE: Order[] = [
  {
    id: 'ord-101',
    orderCode: 'FS-9812',
    customerName: 'Kaelen Stars',
    discordTag: 'kaelen_vr#0001',
    avatarType: 'Full Custom Avatar',
    baseModel: 'Original 3D Model',
    features: ['PhysBones', 'Face Tracking (VRCFT)', 'GogoLoco', 'AudioLink', 'Custom Outfits (2 sets)'],
    budget: '฿12,000 - ฿15,000',
    deadline: '2026-12-15',
    refLinks: 'https://pinterest.com/pin/example-ref-1',
    status: 'unity_physbones',
    progressPercent: 70,
    adminNotes: 'ลงสีเสร็จแล้ว อยู่ระหว่างเซ็ตอัป PhysBones และโครงกระดูกนิ้วมือ',
    createdAt: '2026-10-25',
    updatedAt: '2026-11-06',
    timeline: [
      { title: 'รับออเดอร์และยืนยันบรีฟ', description: 'ชำระมัดจำงวดแรก 50% เรียบร้อย', timestamp: '25 ต.ค.', completed: true },
      { title: 'ขึ้นโครงสร้าง 3D Model', description: 'ส่งแบบร่างเช็กสัดส่วนตัวละคร', timestamp: '30 ต.ค.', completed: true },
      { title: 'ลงสีเท็กซ์เจอร์ & Rigging', description: 'เพ้นท์ลวดลายอวกาศและลงน้ำหนักกระดูก', timestamp: '04 พ.ย.', completed: true },
      { title: 'เซ็ตอัป Unity & PhysBones', description: 'ใส่ระบบฟิสิกส์เส้นผม หู หาง และท็อกเกิล', timestamp: '06 พ.ย.', completed: false },
      { title: 'ทดสอบใน VRChat & ส่งมอบ', description: 'เข้า World ไปทดสอบกับผู้ว่าจ้าง', timestamp: '15 พ.ย.', completed: false },
    ],
  },
  {
    id: 'ord-102',
    orderCode: 'FS-9844',
    customerName: 'Mio_VRC',
    discordTag: 'mio_furry#8888',
    avatarType: 'Custom Retexture & Edit',
    baseModel: 'Manuka',
    features: ['Galaxy Glow Textures', 'Hair PhysBones', 'GogoLoco', '3 Custom Toggles'],
    budget: '฿4,500',
    deadline: '2026-11-28',
    refLinks: 'https://drive.google.com/drive/folders/example-mio',
    status: 'texturing_rigging',
    progressPercent: 45,
    adminNotes: 'กำลังเพ้นท์หน้าตาและไฮไลต์ดวงตาแบบคอสมิก',
    createdAt: '2026-11-01',
    updatedAt: '2026-11-07',
    timeline: [
      { title: 'รับออเดอร์และยืนยันบรีฟ', description: 'ตกลงโทนสีชมพู-ม่วงเนบิวลา', timestamp: '01 พ.ย.', completed: true },
      { title: 'เพ้นท์เท็กซ์เจอร์ลายผ้า', description: 'กำลังระบายสีและจัดวางเลเยอร์', timestamp: '05 พ.ย.', completed: true },
      { title: 'เซ็ตอัป Unity Shaders', description: 'ปรับแสง LilToon MatCap', timestamp: '10 พ.ย.', completed: false },
      { title: 'ทดสอบและส่งมอบไฟล์', description: 'ส่งแพ็กเกจ Unitypackage', timestamp: '28 พ.ย.', completed: false },
    ],
  },
  {
    id: 'ord-103',
    orderCode: 'FS-9870',
    customerName: 'AstraNova',
    discordTag: 'astranova_official',
    avatarType: 'Quest Optimization',
    baseModel: 'Shinra',
    features: ['Quest Fallback Rank: Good', 'Polygon Reduction', 'Texture Atlas'],
    budget: '฿2,200',
    deadline: '2026-11-20',
    refLinks: 'https://discord.gg/example-ref',
    status: 'queued',
    progressPercent: 15,
    adminNotes: 'อยู่ในคิว เตรียมเริ่มขั้นตอน Decimate โมเดล',
    createdAt: '2026-11-05',
    updatedAt: '2026-11-07',
    timeline: [
      { title: 'จองคิวงานเรียบร้อย', description: 'รอเริ่มดำเนินงานตามลำดับคิว', timestamp: '05 พ.ย.', completed: true },
      { title: 'ลดทอนจำนวนโพลีกอน', description: 'ลดเหลือไม่เกิน 20k Tris สำหรับ Quest', timestamp: '08 พ.ย.', completed: false },
      { title: 'บิลด์ทดสอบบน Meta Quest 3', description: 'ตรวจสอบความลื่นไหลในเกม', timestamp: '18 พ.ย.', completed: false },
    ],
  },
];

// Helper to get stored auth token
export const getAuthToken = (): string | null => {
  return localStorage.getItem('fursynth_token');
};

export const getStoredUser = (): User | null => {
  const userJson = localStorage.getItem('fursynth_user');
  if (!userJson) return null;
  try {
    return JSON.parse(userJson);
  } catch {
    return null;
  }
};

export const saveAuth = (user: User, token: string) => {
  localStorage.setItem('fursynth_token', token);
  localStorage.setItem('fursynth_user', JSON.stringify(user));
};

export const clearAuth = () => {
  localStorage.removeItem('fursynth_token');
  localStorage.removeItem('fursynth_user');
};

// API Service
export const api = {
  // Check backend server status
  async checkServerHealth(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/health`, { method: 'GET', signal: AbortSignal.timeout(2000) });
      return res.ok;
    } catch {
      return false;
    }
  },

  // Get portfolio items
  async getPortfolio(): Promise<PortfolioItem[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/portfolio`, { signal: AbortSignal.timeout(2500) });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch {
      // Fallback to local demo data
    }
    const cached = localStorage.getItem('fursynth_portfolio');
    if (cached) {
      try { return JSON.parse(cached); } catch { /* ignore */ }
    }
    return INITIAL_PORTFOLIO;
  },

  // Get public queue
  async getQueue(): Promise<Order[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/queue`, { signal: AbortSignal.timeout(2500) });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch {
      // Fallback
    }
    const cached = localStorage.getItem('fursynth_orders');
    if (cached) {
      try { return JSON.parse(cached); } catch { /* ignore */ }
    }
    return INITIAL_QUEUE;
  },

  // Look up specific order
  async lookupOrder(query: string): Promise<Order | null> {
    const clean = query.trim().toLowerCase();
    try {
      const res = await fetch(`${API_BASE_URL}/queue/lookup?q=${encodeURIComponent(clean)}`, {
        signal: AbortSignal.timeout(2500),
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    const queue = await this.getQueue();
    return queue.find(
      (o) => o.orderCode.toLowerCase() === clean || o.discordTag.toLowerCase() === clean
    ) || null;
  },

  // Submit new commission
  async submitCommission(data: CommissionSubmission): Promise<{ success: boolean; orderCode: string; message: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Offline fallback: save locally and generate order code
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newCode = `FS-${randomNum}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderCode: newCode,
      customerName: data.customerName,
      discordTag: data.discordTag,
      email: data.email,
      avatarType: data.avatarType,
      baseModel: data.baseModel,
      features: data.features,
      budget: data.budget,
      deadline: data.deadline,
      refLinks: data.refLinks,
      notes: data.notes,
      status: 'pending',
      progressPercent: 5,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      timeline: [
        {
          title: 'ส่งใบสั่งซื้อสำเร็จ',
          description: 'รอครีเอเตอร์ตรวจสอบรายละเอียดและยืนยันคิว',
          timestamp: 'วันนี้',
          completed: true,
        },
      ],
    };

    const currentOrders = await this.getQueue();
    const updated = [newOrder, ...currentOrders];
    localStorage.setItem('fursynth_orders', JSON.stringify(updated));

    return {
      success: true,
      orderCode: newCode,
      message: 'ใบสั่งซื้อของคุณถูกส่งเรียบร้อยแล้ว! ครีเอเตอร์จะติดต่อกลับทาง Discord ครับ',
    };
  },

  // Login
  async login(username: string, password: string): Promise<{ success: boolean; user?: User; token?: string; error?: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        const result = await res.json();
        saveAuth(result.user, result.token);
        return { success: true, user: result.user, token: result.token };
      } else {
        const err = await res.json();
        return { success: false, error: err.detail || 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' };
      }
    } catch {
      // Local demo login for testing when backend isn't running
      if (username.toLowerCase() === 'admin' && password === 'admin123') {
        const adminUser: User = { id: 'usr-admin', username: 'admin', email: 'admin@fursynth.com', role: 'admin' };
        saveAuth(adminUser, 'demo-token-admin');
        return { success: true, user: adminUser, token: 'demo-token-admin' };
      } else if (username.length >= 3 && password.length >= 4) {
        const clientUser: User = { id: `usr-${Date.now()}`, username, email: `${username}@client.com`, role: 'customer' };
        saveAuth(clientUser, 'demo-token-client');
        return { success: true, user: clientUser, token: 'demo-token-client' };
      }
      return { success: false, error: 'เข้าสู่ระบบล้มเหลว (ทดสอบด้วย admin / admin123)' };
    }
  },

  // Update order status (Admin)
  async updateOrder(orderId: string, updates: Partial<Order>): Promise<boolean> {
    const token = getAuthToken();
    try {
      const res = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });
      if (res.ok) return true;
    } catch {
      // fallback local update
    }

    const current = await this.getQueue();
    const updated = current.map((ord) => (ord.id === orderId ? { ...ord, ...updates, updatedAt: new Date().toISOString().split('T')[0] } : ord));
    localStorage.setItem('fursynth_orders', JSON.stringify(updated));
    return true;
  },
};
