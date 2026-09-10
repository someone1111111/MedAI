from fastapi import APIRouter
from app.models.schemas import ChatRequest, ChatResponse
from app.services.ai_service import ask_ollama, build_student_prompt, build_patient_prompt

router = APIRouter(prefix="/chat", tags=["chat"])

@router.post("/student", response_model=ChatResponse)
async def student_chat(request: ChatRequest):
    prompt = build_student_prompt(request.message, request.history)
    response = ask_ollama(prompt)
    return ChatResponse(response=response)

@router.post("/patient", response_model=ChatResponse)
async def patient_chat(request: ChatRequest):
    prompt = build_patient_prompt(
        request.message,
        request.history,
        request.context
    )
    response = ask_ollama(prompt)
    return ChatResponse(response=response)