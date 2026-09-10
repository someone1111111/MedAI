from fastapi import APIRouter
from app.models.schemas import ChatRequest, ChatResponse
from app.services.ai_service import ask_ollama

router = APIRouter(prefix="/library", tags=["library"])

@router.post("/summarize", response_model=ChatResponse)
async def summarize(request: ChatRequest):
    prompt = f"""You are a medical education assistant.
Summarize the following medical content clearly and concisely for a medical student.
Focus on key concepts, important facts and clinical relevance.

Content: {request.message}

Summary:"""
    response = ask_ollama(prompt)
    return ChatResponse(response=response)

@router.get("/resources")
async def get_resources():
    # Will connect to database later
    return {
        "resources": [
            { "id": 1, "title": "Gray's Anatomy", "type": "book", "category": "Anatomy" },
            { "id": 2, "title": "Pathophysiology of Heart Disease", "type": "book", "category": "Cardiology" },
            { "id": 3, "title": "Understanding COVID-19 Variants", "type": "article", "category": "Infectious Disease" },
        ]
    }