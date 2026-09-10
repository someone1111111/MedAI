#  MediApp — AI-Powered Medical Platform

A full-stack medical web application featuring two distinct interfaces: one for **medical students** and one for **patients**. The platform integrates a locally-hosted AI model for real-time medical assistance, with zero API cost.

>  This application is for educational purposes only and does not replace professional medical consultation.

---

##  Features

###  Student Interface
- **AI Medical Chatbot** — Ask questions about anatomy, pharmacology, clinical cases and more, powered by a local LLM
- **Medical Library** — Browse and search books and articles by category
- **Surgery Simulation Game** — Step-by-step surgical decision-making with scoring and explanations (Appendectomy, Cholecystectomy, Inguinal Hernia Repair)

###  Patient Interface
- **AI Consultation Chat** — Symptom-based medical guidance in plain language
- **My Health Space** — Personalized chronic disease companion with multiple profiles (for self, family members, etc.)
- **Mood & Symptom Logger** — Track how you feel whenever you want
- **Lifestyle Tips** — Nutrition, exercise, sleep and hydration guidance
- **Mental Wellness** — Psychological support for living with chronic conditions
- **Condition-Specific Articles** — Curated resources based on your condition
- **Visitor Mode** — Use the patient interface without an account (no history saved)

###  Authentication & Security
- JWT authentication stored in HTTP-only cookies (XSS-safe)
- Multi-step registration with role selection (Student / Doctor / Patient)
- Password strength validation (uppercase, lowercase, special character, min 8 chars)
- Email verification system (ready, SMTP configuration pending)
- Protected routes with role-based access control

---

##  Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS v4 |
| Backend | Python + FastAPI |
| Database | PostgreSQL 15 + SQLAlchemy |
| AI Model | Ollama (local) + Phi3:mini / Mistral 7B |
| Auth | JWT + HTTP-only cookies + bcrypt |
| Routing | React Router v6 |

---

##  AI Architecture

The AI runs **entirely locally** — no OpenAI, no paid API, zero cost per query.

```
User Message
     ↓
React Frontend
     ↓
FastAPI Backend (prompt engineering)
     ↓
Ollama (local runtime)
     ↓
Phi3:mini or Mistral 7B
     ↓
Medical Response
```

Two separate prompt pipelines:
- **Student prompt** — uses medical terminology, educational tone, factual and thorough
- **Patient prompt** — plain language, empathetic, never diagnoses, always recommends professional consultation

---

##  Project Structure

```
MediApp/
├── medical-app-frontend/          # React + TypeScript
│   └── src/
│       ├── pages/
│       │   ├── Landing.tsx
│       │   ├── Login.tsx
│       │   ├── Register.tsx
│       │   ├── VerifyEmail.tsx
│       │   ├── student/
│       │   │   ├── StudentHome.tsx
│       │   │   ├── Library.tsx
│       │   │   ├── Chatbot.tsx
│       │   │   └── SurgeryGame.tsx
│       │   └── patient/
│       │       ├── PatientHome.tsx
│       │       ├── HealthSpace.tsx
│       │       ├── ConditionSetup.tsx
│       │       ├── MoodLogger.tsx
│       │       ├── Consultation.tsx
│       │       ├── Lifestyle.tsx
│       │       ├── MentalWellness.tsx
│       │       └── Articles.tsx
│       ├── components/
│       │   ├── Navbar.tsx
│       │   ├── Layout.tsx
│       │   └── ProtectedRoute.tsx
│       └── context/
│           └── AuthContext.tsx
│
└── medical-app-backend/           # Python + FastAPI
    └── app/
        ├── routers/
        │   ├── auth.py
        │   ├── chat.py
        │   ├── library.py
        │   └── health.py
        ├── models/
        │   ├── user.py
        │   └── schemas.py
        ├── services/
        │   ├── auth_service.py
        │   ├── ai_service.py
        │   └── email_service.py
        └── database.py
```

---

##  Getting Started

### Prerequisites
- Node.js 20+
- Python 3.11+
- PostgreSQL 15+
- [Ollama](https://ollama.com) installed

### 1 — Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/mediapp.git
cd mediapp
```

### 2 — Set up the AI model
```bash
ollama pull phi3:mini
```

### 3 — Backend setup
```bash
cd medical-app-backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux

pip install -r requirements.txt
```

Create a `.env` file:
```env
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/mediapp
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

# Email (uncomment when configured)
# MAIL_USERNAME=yourgmail@gmail.com
# MAIL_PASSWORD=your-app-password
# MAIL_FROM=yourgmail@gmail.com
# MAIL_PORT=587
# MAIL_SERVER=smtp.gmail.com
```

Create the database tables:
```bash
python -c "from app.database import engine; from app.models.user import Base; Base.metadata.create_all(bind=engine)"
```

Start the backend:
```bash
python -m uvicorn main:app --reload
```

Backend runs at `http://localhost:8000`
API docs available at `http://localhost:8000/docs`

### 4 — Frontend setup
```bash
cd medical-app-frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

---

##  Access Rules

| Role | Student Interface | Patient Interface |
|------|:-----------------:|:-----------------:|
| Student | ✅ Full access | ✅ Full access |
| Doctor | ✅ Full access | ✅ Full access |
| Patient | ❌ No access | ✅ Full access |
| Visitor | ❌ No access | ✅ Limited (no history) |

---

##  API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Create account |
| POST | `/auth/login` | Login |
| POST | `/auth/logout` | Logout |
| GET | `/auth/me` | Get current user |
| GET | `/auth/verify/{token}` | Verify email |

### Chat
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/chat/student` | Student AI chat |
| POST | `/chat/patient` | Patient AI chat |

### Health
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health/conditions` | List conditions |
| POST | `/health/profile` | Save health profile |
| POST | `/health/log` | Save mood/symptom log |

### Library
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/library/resources` | Get resources |
| POST | `/library/summarize` | AI summarize content |

---

##  Roadmap

- [x] Student and patient dual interface
- [x] Local AI integration (Ollama + Phi3/Mistral)
- [x] JWT authentication with HTTP-only cookies
- [x] Role-based protected routes
- [x] Chronic disease health space
- [x] Mood and symptom logger
- [x] Surgery simulation game
- [ ] RAG pipeline (AI reads uploaded PDFs)
- [ ] Chat history persistence in database
- [ ] Email verification (SMTP configured)
- [ ] AI fine-tuning on medical datasets (QLoRA)
- [ ] Mobile responsiveness
- [ ] Docker deployment
- [ ] Real-time notifications

---

##  Author

**Manar Ben Ghozzi**
- M.S. Computer Science & Telecommunications
- Full-Stack Developer
- [LinkedIn](https://linkedin.com/in/YOUR_LINKEDIN)
- [GitHub](https://github.com/YOUR_USERNAME)

---

##  Disclaimer

This application is built for **educational and portfolio purposes**. The AI responses are generated by a local language model and are not medically validated. Always consult a qualified healthcare professional for medical advice.
