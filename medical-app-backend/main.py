from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Medical app backend is alive!"}

@app.get("/health")
def health():
    return {"status": "ok"}
