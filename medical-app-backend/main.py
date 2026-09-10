from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from app.routers import chat, library, auth
from app.database import engine
from app.models import user
from app.routers import chat, library, auth, health

load_dotenv()

# Create all tables automatically
user.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="MediApp API",
    description="Backend for the medical education and consultation app",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(chat.router)
app.include_router(library.router)
app.include_router(health.router)

@app.get("/")
def root():
    return {"message": "MediApp backend is running!"}

@app.get("/health")
def health():
    return {"status": "ok"}