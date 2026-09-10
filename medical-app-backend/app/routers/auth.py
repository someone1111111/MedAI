from fastapi import APIRouter, Depends, HTTPException, status, Response, Cookie
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.schemas import RegisterRequest, LoginRequest
from app.services.auth_service import (
    create_user, authenticate_user, create_access_token,
    get_user_by_email, validate_password, decode_token
)
from app.models.user import User

router = APIRouter(prefix="/auth", tags=["auth"])

def set_auth_cookie(response: Response, token: str):
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,       # JS cannot access this cookie
        secure=False,        # Set True in production (HTTPS)
        samesite="lax",
        max_age=3600 * 24    # 24 hours
    )

@router.post("/register")
def register(request: RegisterRequest, response: Response, db: Session = Depends(get_db)):
    existing = get_user_by_email(db, request.email)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    password_error = validate_password(
        request.password,
        request.first_name,
        request.last_name
    )
    if password_error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=password_error
        )
    user = create_user(db, request)
    token = create_access_token({"sub": user.email, "role": user.role})
    set_auth_cookie(response, token)
    return {
        "message": "Registration successful",
        "user_name": f"{user.first_name} {user.last_name}",
        "user_role": user.role,
        "access_token": token  # still return it for localStorage fallback
    }

@router.post("/login")
def login(request: LoginRequest, response: Response, db: Session = Depends(get_db)):
    user = authenticate_user(db, request.email, request.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    token = create_access_token({"sub": user.email, "role": user.role})
    set_auth_cookie(response, token)
    return {
        "message": "Login successful",
        "user_name": f"{user.first_name} {user.last_name}",
        "user_role": user.role,
        "access_token": token
    }

@router.post("/logout")
def logout(response: Response):
    response.delete_cookie("access_token")
    return {"message": "Logged out successfully"}

@router.get("/me")
def get_me(
    db: Session = Depends(get_db),
    access_token: str = Cookie(default=None)
):
    if not access_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    payload = decode_token(access_token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = get_user_by_email(db, payload.get("sub"))
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {
        "id": user.id,
        "name": f"{user.first_name} {user.last_name}",
        "email": user.email,
        "role": user.role,
        "city": user.city,
        "preferred_language": user.preferred_language,
        "is_verified": user.is_verified
    }

@router.get("/verify/{token}")
def verify_email(token: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(
        User.verification_token == token
    ).first()
    if not user:
        raise HTTPException(status_code=404, detail="Invalid verification token")
    user.is_verified = True
    user.verification_token = None
    db.commit()
    return {"message": "Email verified successfully!"}