import sqlite3
import os
import hashlib
import secrets
import json
from datetime import datetime
from typing import Optional, List, Dict, Any

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "fursynth.db")

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def hash_password(password: str, salt: Optional[str] = None) -> tuple[str, str]:
    if not salt:
        salt = secrets.token_hex(16)
    hashed = hashlib.pbkdf2_hmac(
        'sha256',
        password.encode('utf-8'),
        salt.encode('utf-8'),
        100000
    ).hex()
    return hashed, salt

def verify_password(password: str, hashed: str, salt: str) -> bool:
    new_hash, _ = hash_password(password, salt)
    return secrets.compare_digest(new_hash, hashed)

def create_simple_token(user_id: str, username: str, role: str) -> str:
    payload = {
        "uid": user_id,
        "un": username,
        "ro": role,
        "ts": int(datetime.utcnow().timestamp())
    }
    raw = json.dumps(payload)
    sig = hashlib.sha256((raw + "FURSYNTH_SECRET_KEY_SPACE_2026").encode('utf-8')).hexdigest()
    return f"{raw.encode('utf-8').hex()}.{sig}"

def verify_simple_token(token: str) -> Optional[Dict[str, Any]]:
    try:
        parts = token.split(".")
        if len(parts) != 2:
            return None
        raw = bytes.fromhex(parts[0]).decode('utf-8')
        sig = parts[1]
        expected_sig = hashlib.sha256((raw + "FURSYNTH_SECRET_KEY_SPACE_2026").encode('utf-8')).hexdigest()
        if not secrets.compare_digest(sig, expected_sig):
            return None
        return json.loads(raw)
    except Exception:
        return None

def init_db():
    with get_db() as conn:
        cursor = conn.cursor()
        
        # 1. Users Table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                username TEXT UNIQUE NOT NULL,
                email TEXT,
                password_hash TEXT NOT NULL,
                salt TEXT NOT NULL,
                role TEXT NOT NULL DEFAULT 'customer',
                discord_tag TEXT,
                created_at TEXT NOT NULL
            )
        """)

        # 2. Orders Table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS orders (
                id TEXT PRIMARY KEY,
                order_code TEXT UNIQUE NOT NULL,
                customer_name TEXT NOT NULL,
                discord_tag TEXT NOT NULL,
                email TEXT,
                avatar_type TEXT NOT NULL,
                base_model TEXT NOT NULL,
                features_json TEXT NOT NULL DEFAULT '[]',
                budget TEXT,
                deadline TEXT,
                ref_links TEXT NOT NULL,
                notes TEXT,
                status TEXT NOT NULL DEFAULT 'pending',
                progress_percent INTEGER NOT NULL DEFAULT 5,
                admin_notes TEXT,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL
            )
        """)

        # 3. Portfolio Table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS portfolio (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                subtitle TEXT,
                category TEXT NOT NULL,
                image_url TEXT NOT NULL,
                description TEXT,
                poly_count TEXT,
                phys_bones TEXT,
                toggles_count INTEGER DEFAULT 0,
                quest_compatible INTEGER DEFAULT 0,
                face_tracking INTEGER DEFAULT 0,
                audio_link INTEGER DEFAULT 0,
                gogo_loco INTEGER DEFAULT 1,
                tags_json TEXT DEFAULT '[]',
                featured INTEGER DEFAULT 0,
                created_at TEXT NOT NULL
            )
        """)

        conn.commit()

        # Seed Admin user if not exists
        cursor.execute("SELECT * FROM users WHERE username = 'admin'")
        if not cursor.fetchone():
            p_hash, salt = hash_password("admin123")
            now = datetime.utcnow().isoformat()
            cursor.execute(
                "INSERT INTO users (id, username, email, password_hash, salt, role, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
                ("usr-admin", "admin", "admin@fursynth.com", p_hash, salt, "admin", now)
            )
            conn.commit()

        # Seed initial portfolio if empty
        cursor.execute("SELECT COUNT(*) FROM portfolio")
        if cursor.fetchone()[0] == 0:
            seed_portfolio(conn)

        # Seed initial sample orders if empty
        cursor.execute("SELECT COUNT(*) FROM orders")
        if cursor.fetchone()[0] == 0:
            seed_orders(conn)

def seed_portfolio(conn):
    items = [
        (
            'port-1', 'Celestia: Nebula Sorceress',
            'Full Custom Avatar with Cosmic Shaders & Custom Particles',
            'Full Custom',
            'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
            'อวตารธีมดวงดาวอวกาศที่สร้างขึ้นใหม่ทั้งหมด ด้วยชุดเกราะเวทมนตร์คอสมิก พร้อมระบบ AudioLink และฟิสิกส์เส้นผมสลวย',
            '68,500 Triangles', '24 Components (Optimized)', 16, 0, 1, 1, 1,
            json.dumps(['Original', 'Cosmic', 'AudioLink', 'VRCFT', 'PhysBones']), 1,
            datetime.utcnow().isoformat()
        ),
        (
            'port-2', 'Shinra: Cyber Void Dragon',
            'Custom Retexture & Sci-Fi Techwear Cyberware Edit',
            'Retexture & Edit',
            'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
            'งานปรับแต่งโมเดล Shinra สไตล์ Cyberpunk อวกาศ เพ้นท์เท็กซ์เจอร์ผิวลายเกล็ดมังกรเรืองแสง พร้อมชุดสูทสตรีทแวร์ไฮเทค',
            '78,200 Triangles', '18 Components', 22, 0, 0, 1, 1,
            json.dumps(['Shinra', 'Cyberpunk', 'Horns & Tail', 'DPS Ready']), 1,
            datetime.utcnow().isoformat()
        ),
        (
            'port-3', 'Manuka: Starlight Maiden',
            'Pastel Galaxy Retexture with Custom Outfit Fit & GogoLoco',
            'Retexture & Edit',
            'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
            'งานรีเท็กซ์เจอร์ Manuka ในโทนสีท้องฟ้าราตรีและดาวประกาย ผสมผสานชุดเดรสผ้าโปร่งแสงที่มีอนุภาคประกายดาวระยิบระยับ',
            '62,000 Triangles', '16 Components', 14, 1, 1, 0, 1,
            json.dumps(['Manuka', 'Pastel Galaxy', 'Quest Ready', 'Cute']), 1,
            datetime.utcnow().isoformat()
        )
    ]
    cursor = conn.cursor()
    cursor.executemany("""
        INSERT INTO portfolio (
            id, title, subtitle, category, image_url, description,
            poly_count, phys_bones, toggles_count, quest_compatible,
            face_tracking, audio_link, gogo_loco, tags_json, featured, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, items)
    conn.commit()

def seed_orders(conn):
    orders = [
        (
            'ord-101', 'FS-9812', 'Kaelen Stars', 'kaelen_vr#0001', 'kaelen@example.com',
            'Full Custom Avatar', 'Original 3D Model',
            json.dumps(['PhysBones', 'Face Tracking (VRCFT)', 'GogoLoco', 'AudioLink', 'Custom Outfits']),
            '฿12,000 - ฿15,000', '2026-12-15', 'https://pinterest.com/pin/example-ref-1',
            'ต้องการสไตล์อวกาศคอสมิกสีม่วงคราม',
            'unity_physbones', 70,
            'ลงสีเสร็จแล้ว อยู่ระหว่างเซ็ตอัป PhysBones และโครงกระดูกนิ้วมือ',
            '2026-10-25', '2026-11-06'
        ),
        (
            'ord-102', 'FS-9844', 'Mio_VRC', 'mio_furry#8888', 'mio@example.com',
            'Custom Retexture & Edit', 'Manuka',
            json.dumps(['Galaxy Glow Textures', 'Hair PhysBones', 'GogoLoco', '3 Custom Toggles']),
            '฿4,500', '2026-11-28', 'https://drive.google.com/drive/folders/example-mio',
            'เน้นโทนสีชมพู-ม่วงประกายดาว',
            'texturing_rigging', 45,
            'กำลังเพ้นท์หน้าตาและไฮไลต์ดวงตาแบบคอสมิก',
            '2026-11-01', '2026-11-07'
        )
    ]
    cursor = conn.cursor()
    cursor.executemany("""
        INSERT INTO orders (
            id, order_code, customer_name, discord_tag, email,
            avatar_type, base_model, features_json, budget, deadline,
            ref_links, notes, status, progress_percent, admin_notes,
            created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, orders)
    conn.commit()
