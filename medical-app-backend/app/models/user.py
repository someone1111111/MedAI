from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    # Basic info
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    date_of_birth = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    city = Column(String, nullable=True)
    preferred_language = Column(String, default="en")
    role = Column(String, default="patient")  # "student", "doctor", "patient"
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    verification_token = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Student/Doctor specific
    institution = Column(String, nullable=True)
    professional_email = Column(String, nullable=True)
    study_level = Column(String, nullable=True)  # "1st year", "2nd year" etc

    # Patient specific
    has_chronic_disease = Column(Boolean, default=False)

class HealthProfile(Base):
    __tablename__ = "health_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=True)
    profile_name = Column(String, nullable=True)
    condition = Column(String, nullable=False)
    diagnosed_since = Column(String, nullable=True)
    medications = Column(String, nullable=True)
    notes = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class SymptomLog(Base):
    __tablename__ = "symptom_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=True)
    mood = Column(String, nullable=False)
    energy = Column(Integer, nullable=False)
    symptoms = Column(String, nullable=True)
    notes = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())