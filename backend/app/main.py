import json
import random
import os
import urllib.request
from datetime import datetime
from fastapi import FastAPI, HTTPException, Header, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List

from .database import (
    init_db, get_db, hash_password, verify_password,
    create_simple_token, verify_simple_token
)
from .models import LoginRequest, RegisterRequest, CommissionCreate, OrderUpdate, PortfolioCreate

app = FastAPI(
    title="Fursynth VRChat Avatar Studio API",
    description="Backend API for Fursynth Avatar Portfolio, Commission Requests, and Queue Tracking",
    version="1.0.0"
)

# Enable CORS for Cloudflare Pages, local Vite dev, and custom domains
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database tables on startup
@app.on_event("startup")
def startup_event():
    init_db()

@app.get("/api/health")
def health_check():
    return {
        "status": "online",
        "app": "Fursynth Cosmic API",
        "timestamp": datetime.utcnow().isoformat(),
        "database": "sqlite_ready"
    }

# --- Auth Endpoints ---

@app.post("/api/auth/login")
def login(req: LoginRequest):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE username = ?", (req.username.strip(),))
        user = cursor.fetchone()
        if not user:
            raise HTTPException(status_code=400, detail="ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง")
        
        if not verify_password(req.password, user["password_hash"], user["salt"]):
            raise HTTPException(status_code=400, detail="ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง")
        
        token = create_simple_token(user["id"], user["username"], user["role"])
        return {
            "success": True,
            "token": token,
            "user": {
                "id": user["id"],
                "username": user["username"],
                "email": user["email"],
                "role": user["role"],
                "discordTag": user["discord_tag"]
            }
        }

@app.post("/api/auth/register")
def register(req: RegisterRequest):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM users WHERE username = ?", (req.username.strip(),))
        if cursor.fetchone():
            raise HTTPException(status_code=400, detail="ชื่อผู้ใช้นี้ถูกใช้งานแล้ว")
        
        p_hash, salt = hash_password(req.password)
        user_id = f"usr-{int(datetime.utcnow().timestamp())}"
        now = datetime.utcnow().isoformat()
        
        cursor.execute("""
            INSERT INTO users (id, username, email, password_hash, salt, role, discord_tag, created_at)
            VALUES (?, ?, ?, ?, ?, 'customer', ?, ?)
        """, (user_id, req.username.strip(), req.email, p_hash, salt, req.discord_tag, now))
        conn.commit()

        token = create_simple_token(user_id, req.username.strip(), "customer")
        return {
            "success": True,
            "token": token,
            "user": {
                "id": user_id,
                "username": req.username.strip(),
                "email": req.email,
                "role": "customer",
                "discordTag": req.discord_tag
            }
        }

# --- Portfolio Endpoints ---

@app.get("/api/portfolio")
def get_portfolio():
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM portfolio ORDER BY featured DESC, created_at DESC")
        rows = cursor.fetchall()
        
        items = []
        for r in rows:
            items.append({
                "id": r["id"],
                "title": r["title"],
                "subtitle": r["subtitle"],
                "category": r["category"],
                "imageUrl": r["image_url"],
                "description": r["description"],
                "polyCount": r["poly_count"],
                "physBones": r["phys_bones"],
                "togglesCount": r["toggles_count"],
                "questCompatible": bool(r["quest_compatible"]),
                "faceTracking": bool(r["face_tracking"]),
                "audioLink": bool(r["audio_link"]),
                "gogoLoco": bool(r["gogo_loco"]),
                "tags": json.loads(r["tags_json"] or "[]"),
                "featured": bool(r["featured"])
            })
        return items

@app.post("/api/portfolio")
def create_portfolio(item: PortfolioCreate, authorization: Optional[str] = Header(None)):
    user = verify_auth_header(authorization)
    if not user or user.get("ro") != "admin":
        raise HTTPException(status_code=403, detail="สิทธิ์เฉพาะแอดมินเท่านั้น")

    with get_db() as conn:
        cursor = conn.cursor()
        port_id = f"port-{int(datetime.utcnow().timestamp())}"
        now = datetime.utcnow().isoformat()

        cursor.execute("""
            INSERT INTO portfolio (
                id, title, subtitle, category, image_url, description,
                poly_count, phys_bones, toggles_count, quest_compatible,
                face_tracking, audio_link, gogo_loco, tags_json, featured, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            port_id, item.title, item.subtitle, item.category, item.imageUrl, item.description,
            item.polyCount, item.physBones, item.togglesCount, int(item.questCompatible or 0),
            int(item.faceTracking or 0), int(item.audioLink or 0), int(item.gogoLoco or 0),
            json.dumps(item.tags), int(item.featured or 0), now
        ))
        conn.commit()
        return {"success": True, "id": port_id}

# --- Queue & Orders Endpoints ---

@app.get("/api/queue")
def get_public_queue():
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM orders ORDER BY created_at DESC")
        rows = cursor.fetchall()

        orders = []
        for r in rows:
            orders.append({
                "id": r["id"],
                "orderCode": r["order_code"],
                "customerName": r["customer_name"],
                "discordTag": r["discord_tag"],
                "email": r["email"],
                "avatarType": r["avatar_type"],
                "baseModel": r["base_model"],
                "features": json.loads(r["features_json"] or "[]"),
                "budget": r["budget"],
                "deadline": r["deadline"],
                "refLinks": r["ref_links"],
                "notes": r["notes"],
                "status": r["status"],
                "progressPercent": r["progress_percent"],
                "adminNotes": r["admin_notes"],
                "createdAt": r["created_at"],
                "updatedAt": r["updated_at"]
            })
        return orders

@app.get("/api/queue/lookup")
def lookup_queue(q: str):
    clean = q.strip().lower()
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT * FROM orders
            WHERE LOWER(order_code) = ? OR LOWER(discord_tag) LIKE ?
            LIMIT 1
        """, (clean, f"%{clean}%"))
        r = cursor.fetchone()
        if not r:
            raise HTTPException(status_code=404, detail="ไม่พบคำสั่งซื้อที่ตรงกับเงื่อนไข")
        
        return {
            "id": r["id"],
            "orderCode": r["order_code"],
            "customerName": r["customer_name"],
            "discordTag": r["discord_tag"],
            "email": r["email"],
            "avatarType": r["avatar_type"],
            "baseModel": r["base_model"],
            "features": json.loads(r["features_json"] or "[]"),
            "budget": r["budget"],
            "deadline": r["deadline"],
            "refLinks": r["ref_links"],
            "notes": r["notes"],
            "status": r["status"],
            "progressPercent": r["progress_percent"],
            "adminNotes": r["admin_notes"],
            "createdAt": r["created_at"],
            "updatedAt": r["updated_at"]
        }

@app.post("/api/orders")
def submit_order(order: CommissionCreate):
    with get_db() as conn:
        cursor = conn.cursor()
        random_code = f"FS-{random.randint(1000, 9999)}"
        order_id = f"ord-{int(datetime.utcnow().timestamp())}"
        now_date = datetime.utcnow().strftime("%Y-%m-%d")

        cursor.execute("""
            INSERT INTO orders (
                id, order_code, customer_name, discord_tag, email,
                avatar_type, base_model, features_json, budget, deadline,
                ref_links, notes, status, progress_percent, admin_notes,
                created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', 5, 'ได้รับใบสั่งซื้อแล้ว รอครีเอเตอร์ตรวจสอบบรีฟ', ?, ?)
        """, (
            order_id, random_code, order.customerName, order.discordTag, order.email,
            order.avatarType, order.baseModel, json.dumps(order.features),
            order.budget, order.deadline, order.refLinks, order.notes,
            now_date, now_date
        ))
        conn.commit()

        # Try sending Discord Webhook notification if configured
        webhook_url = os.environ.get("DISCORD_WEBHOOK_URL")
        if webhook_url:
            send_discord_notification(webhook_url, random_code, order)

        return {
            "success": True,
            "orderCode": random_code,
            "message": "ใบสั่งซื้อถูกส่งเข้าสู่ระบบ Fursynth เรียบร้อยแล้ว!"
        }

@app.patch("/api/orders/{order_id}")
def update_order(order_id: str, updates: OrderUpdate, authorization: Optional[str] = Header(None)):
    user = verify_auth_header(authorization)
    if not user or user.get("ro") != "admin":
        raise HTTPException(status_code=403, detail="สิทธิ์เฉพาะแอดมินเท่านั้น")

    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM orders WHERE id = ?", (order_id,))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="ไม่พบคำสั่งซื้อ")

        fields = []
        values = []
        if updates.status is not None:
            fields.append("status = ?")
            values.append(updates.status)
        if updates.progressPercent is not None:
            fields.append("progress_percent = ?")
            values.append(updates.progressPercent)
        if updates.adminNotes is not None:
            fields.append("admin_notes = ?")
            values.append(updates.adminNotes)
        
        fields.append("updated_at = ?")
        values.append(datetime.utcnow().strftime("%Y-%m-%d"))

        values.append(order_id)
        query = f"UPDATE orders SET {', '.join(fields)} WHERE id = ?"
        cursor.execute(query, values)
        conn.commit()

        return {"success": True, "message": "อัปเดตสถานะคำสั่งซื้อเรียบร้อย"}

def verify_auth_header(auth_header: Optional[str]) -> Optional[dict]:
    if not auth_header or not auth_header.startswith("Bearer "):
        return None
    token = auth_header.split(" ")[1]
    return verify_simple_token(token)

def send_discord_notification(webhook_url: str, code: str, order: CommissionCreate):
    try:
        payload = {
            "username": "Fursynth Order Bot",
            "embeds": [{
                "title": f"🚀 ใบสั่งซื้อใหม่: {code}",
                "color": 0x8b5cf6,
                "fields": [
                    {"name": "👤 ลูกค้า", "value": f"{order.customerName} ({order.discordTag})", "inline": True},
                    {"name": "🎭 ประเภทงาน", "value": order.avatarType, "inline": True},
                    {"name": "📦 โมเดลฐาน", "value": order.baseModel, "inline": True},
                    {"name": "💰 งบประมาณ", "value": order.budget or "ตามตกลง", "inline": True},
                    {"name": "🔗 ลิงก์ Ref", "value": order.refLinks, "inline": False},
                ],
                "footer": {"text": "Fursynth VRChat Studio"}
            }]
        }
        data = json.dumps(payload).encode('utf-8')
        req = urllib.request.Request(
            webhook_url,
            data=data,
            headers={'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0'}
        )
        urllib.request.urlopen(req, timeout=3)
    except Exception:
        pass

