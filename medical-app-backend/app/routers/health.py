from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.schemas import ConditionProfile, LogEntry
from app.models.user import HealthProfile, SymptomLog

router = APIRouter(prefix="/health", tags=["health"])

@router.post("/profile")
def save_profile(profile: ConditionProfile, db: Session = Depends(get_db)):
    new_profile = HealthProfile(
        condition=profile.condition,
        diagnosed_since=profile.diagnosed_since,
        medications=profile.medications,
        notes=profile.notes
    )
    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)
    return {"message": "Profile saved", "id": new_profile.id}

@router.post("/log")
def save_log(entry: LogEntry, db: Session = Depends(get_db)):
    log = SymptomLog(
        mood=entry.mood,
        energy=entry.energy,
        symptoms=", ".join(entry.symptoms),
        notes=entry.notes
    )
    db.add(log)
    db.commit()
    db.refresh(log)
    return {"message": "Log saved", "id": log.id}

@router.get("/conditions")
def get_conditions():
    return {
        "conditions": [
            { "id": "diabetes", "label": "Diabetes", "icon": "🩸" },
            { "id": "hypertension", "label": "Hypertension", "icon": "❤️" },
            { "id": "asthma", "label": "Asthma", "icon": "🫁" },
            { "id": "obesity", "label": "Obesity", "icon": "⚖️" },
            { "id": "anxiety", "label": "Anxiety / Depression", "icon": "🧠" },
            { "id": "arthritis", "label": "Arthritis", "icon": "🦴" },
            { "id": "heart_disease", "label": "Heart Disease", "icon": "💓" },
            { "id": "other", "label": "Other", "icon": "➕" },
        ]
    }