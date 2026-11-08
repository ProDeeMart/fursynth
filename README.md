# 🌌 Fursynth — VRChat Avatar Studio & Commission System

ระบบเว็บไซต์สตูดิโอรับทำ **VRChat 3D Avatar** ในธีม **"อวกาศและดวงดาว" (Space & Stars)** พร้อมระบบจัดการใบสั่งซื้อและติดตามสถานะคิวงานแบบ Real-time

---

## 🚀 สถาปัตยกรรมระบบ (Architecture)

* **หน้าบ้าน (Frontend):** โฮสต์บน **Cloudflare Pages** ฟรี 100%
  * พัฒนาด้วย React 19 + Vite + TypeScript + Tailwind CSS
  * ธีม Deep Cosmic Space พร้อมเอฟเฟกต์ดวงดาวระยิบระยับ (Animated Starfield Canvas)
  * หน้าหลัก: คลังผลงาน (Portfolio), ใบสั่งทำอวตาร (Commission Form), ติดตามคิวงาน (Queue Tracker), แพ็กเกจราคาและเงื่อนไข (Pricing & ToS)
  * ระบบล็อกอินสำหรับลูกค้า และ แอดมิน (Admin Panel) จัดการสถานะคิว
  * ทำงานได้แบบ Standalone/Offline Fallback (แม้ปิดคอม เว็บก็ยังเปิดดูได้ปกติ)

* **หลังบ้าน (Backend):** ทำงานด้วย **Python (FastAPI + SQLite)** บนเครื่องคอมพิวเตอร์ของคุณ
  * เซิร์ฟเวอร์ REST API จัดเก็บข้อมูลลงฐานข้อมูล SQLite ในเครื่อง (`fursynth.db`)
  * ปลอดภัยและเป็นส่วนตัว ข้อมูลออเดอร์ทั้งหมดอยู่ในเครื่องคุณ 100%
  * หน้าจัดการและทดสอบ API อัตโนมัติ (Swagger UI) ที่ `http://localhost:8000/docs`

* **การเชื่อมต่อระหว่าง หน้าบ้าน Cloudflare Pages และ หลังบ้าน Local PC:**
  * ใช้ **Cloudflare Tunnel (`cloudflared`)** เชื่อมต่อ `localhost:8000` ไปยังอินเทอร์เน็ตได้อย่างปลอดภัย
  * ไม่ต้อง Forward Port ที่เราเตอร์ ไม่ต้องมี Public IP แท้ และได้ SSL/HTTPS ฟรีอัตโนมัติ

---

## 🛠️ วิธีเปิดใช้งานบนเครื่องคอมพิวเตอร์ (Local Setup)

### 1. เปิดรันหลังบ้าน (Python Backend)
1. ไปที่โฟลเดอร์ `backend`
2. ดับเบิลคลิกที่ไฟล์ **`run_backend.bat`** (หรือเปิด Terminal แล้วรัน):
   ```bash
   cd backend
   .\venv\Scripts\activate
   python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```
3. เซิร์ฟเวอร์จะเปิดที่ `http://localhost:8000`
4. เข้าดู Swagger Docs ได้ที่ `http://localhost:8000/docs`

> **บัญชีแอดมินเริ่มต้น:**
> * **Username:** `admin`
> * **Password:** `admin123`

---

### 2. เปิดรันหน้าบ้าน (Frontend)
1. ไปที่โฟลเดอร์ `frontend`
2. รันคำสั่ง:
   ```bash
   cd frontend
   npm run dev
   ```
3. เปิดเบราว์เซอร์ไปที่ `http://localhost:5173`

---

### 3. เชื่อมต่อ Local Backend ออกอินเทอร์เน็ตด้วย Cloudflare Tunnel
เมื่อต้องการให้หน้าเว็บที่อยู่บน Cloudflare Pages คุยกับคอมของคุณได้:
1. ดับเบิลคลิกไฟล์ **`backend/run_tunnel.bat`**
2. คัดลอก URL ที่ได้ (เช่น `https://xxxxxx.trycloudflare.com`)
3. นำ URL นั้นไปใส่ในไฟล์ `frontend/.env`:
   ```env
   VITE_API_URL=https://xxxxxx.trycloudflare.com/api
   ```

---

## 🌐 วิธีนำ Frontend ขึ้น Cloudflare Pages (Deploy)

1. **Commit และ Push ขึ้น GitHub:**
   ```bash
   git add .
   git commit -m "feat: initial fursynth cosmic vrchat avatar platform"
   git branch -M main
   git remote add origin https://github.com/<your-username>/fursynth.git
   git push -u origin main
   ```

2. **เชื่อมต่อกับ Cloudflare Pages:**
   * เข้าสู่ระบบที่ [dash.cloudflare.com](https://dash.cloudflare.com)
   * ไปที่เมนู **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**
   * เลือก Repository `fursynth`
   * ตั้งค่าการ Build:
     * **Framework preset:** `Vite`
     * **Root directory:** `frontend`
     * **Build command:** `npm run build`
     * **Build output directory:** `dist`
   * กด **Save and Deploy** รอเพียงไม่กี่วินาที เว็บของคุณก็จะพร้อมใช้งานทั่วโลก!

---

## 📂 โครงสร้างโฟลเดอร์

```text
Fursynth/
├── frontend/                     # หน้าบ้าน (React + Vite + Tailwind CSS)
│   ├── public/
│   │   ├── _redirects            # SPA Fallback สำหรับ Cloudflare Pages
│   │   └── _headers              # Security & Cache Headers
│   ├── src/
│   │   ├── components/
│   │   │   ├── StarfieldBackground.tsx # พื้นหลังอวกาศและดาวเคลื่อนไหว
│   │   │   ├── Navbar.tsx              # แถบเมนูด้านบนและสถานะเซิร์ฟเวอร์
│   │   │   ├── HeroSection.tsx         # ส่วนหัวเว็บพร้อมเอฟเฟกต์คอสมิก
│   │   │   ├── PortfolioSection.tsx    # แกลเลอรีผลงานและสเปกโมเดล
│   │   │   ├── CommissionFormSection.tsx # ใบสั่งทำอวตาร VRChat
│   │   │   ├── QueueTrackerSection.tsx # ค้นหาและติดตามสถานะคิวงาน
│   │   │   ├── PricingTosSection.tsx   # ราคาและเงื่อนไขการให้บริการ (ToS)
│   │   │   ├── AdminDashboard.tsx      # แผงควบคุมสำหรับเจ้าของร้าน
│   │   │   ├── LoginModal.tsx          # ป็อปอัปเข้าสู่ระบบ
│   │   │   └── Footer.tsx              # ส่วนท้ายเว็บและช่องทางติดต่อ
│   │   ├── services/api.ts       # เชื่อมต่อ API / Offline Fallback Data
│   │   └── types/index.ts        # TypeScript Type Definitions
│   └── package.json
│
├── backend/                      # หลังบ้าน (Python FastAPI + SQLite)
│   ├── app/
│   │   ├── main.py               # จุดเริ่มต้น FastAPI Server & Endpoints
│   │   ├── database.py           # ตัวจัดการ SQLite Database & Auth Token
│   │   └── models.py             # Pydantic Data Models
│   ├── requirements.txt          # รายการ Library Python
│   ├── run_backend.bat           # ตัวคลิกรันเซิร์ฟเวอร์หลังบ้าน
│   └── run_tunnel.bat            # ตัวคลิกเปิด Cloudflare Tunnel
│
└── .gitignore
```
