from pydantic import BaseModel, Field
from typing import Optional, List

class LoginRequest(BaseModel):
    username: str
    password: str

class RegisterRequest(BaseModel):
    username: str
    email: Optional[str] = None
    password: str
    discord_tag: Optional[str] = None

class CommissionCreate(BaseModel):
    customerName: str
    discordTag: str
    email: Optional[str] = None
    avatarType: str
    baseModel: str
    features: List[str] = []
    budget: Optional[str] = None
    deadline: Optional[str] = None
    refLinks: str
    notes: Optional[str] = None

class OrderUpdate(BaseModel):
    status: Optional[str] = None
    progressPercent: Optional[int] = None
    adminNotes: Optional[str] = None

class PortfolioCreate(BaseModel):
    title: str
    subtitle: Optional[str] = None
    category: str
    imageUrl: str
    description: Optional[str] = None
    polyCount: Optional[str] = None
    physBones: Optional[str] = None
    togglesCount: Optional[int] = 0
    questCompatible: Optional[bool] = False
    faceTracking: Optional[bool] = False
    audioLink: Optional[bool] = False
    gogoLoco: Optional[bool] = True
    tags: List[str] = []
    featured: Optional[bool] = False

