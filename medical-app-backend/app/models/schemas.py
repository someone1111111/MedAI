from pydantic import BaseModel, EmailStr
from typing import List, Optional

# Chat schemas
class Message(BaseModel):
    role: str
    text: str

class ChatRequest(BaseModel):
    message: str
    history: List[Message] = []
    context: Optional[str] = None

class ChatResponse(BaseModel):
    response: str

# Patient form
class PatientForm(BaseModel):
    name: str
    age: str
    gender: str
    mainSymptom: str
    duration: str
    severity: int
    otherSymptoms: List[str] = []
    notes: Optional[str] = ""

# Auth schemas
class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str  # "student" or "patient"

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user_name: str
    user_role: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    role: str

    class Config:
        from_attributes = True
# Health Space schemas
class ConditionProfile(BaseModel):
    condition: str
    diagnosed_since: Optional[str] = ""
    medications: Optional[str] = ""
    notes: Optional[str] = ""

class LogEntry(BaseModel):
    mood: str
    energy: int
    symptoms: List[str] = []
    notes: Optional[str] = ""