import requests
import json

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "phi3:mini"

def build_student_prompt(message: str, history: list) -> str:
    history_text = ""
    for msg in history[-6:]:
        role = "Student" if msg.role == "user" else "Assistant"
        history_text += f"{role}: {msg.text}\n"

    return f"""<|system|>
You are a medical education assistant for medical students. 
Answer the student's question directly and concisely.
Use proper medical terminology. Be educational and factual.
Do not simulate a conversation. Do not write 'Student:' or 'Assistant:' in your response.
Just give the answer.<|end|>
<|user|>
Previous conversation:
{history_text}
Question: {message}<|end|>
<|assistant|>"""

def build_patient_prompt(message: str, history: list, context: str = None) -> str:
    history_text = ""
    for msg in history[-6:]:
        role = "Patient" if msg.role == "user" else "Assistant"
        history_text += f"{role}: {msg.text}\n"

    context_text = f"Patient background: {context}\n" if context else ""

    return f"""<|system|>
You are a friendly medical AI assistant for non-medical users.
Use simple clear language. Never diagnose conditions.
Always recommend seeing a real doctor for serious concerns.
Be empathetic and reassuring.
Do not simulate a conversation. Do not write 'Patient:' or 'Assistant:' in your response.
Just answer directly.
{context_text}<|end|>
<|user|>
Previous conversation:
{history_text}
Message: {message}<|end|>
<|assistant|>"""

def ask_ollama(prompt: str) -> str:
    try:
        response = requests.post(
            OLLAMA_URL,
            json={
                "model": MODEL_NAME,
                "prompt": prompt,
                "stream": False,
                "options": {
                    "temperature": 0.7,
                    "num_predict": 256,
                    "stop": ["Patient:", "Student:", "User:", "Human:", "<|user|>", "<|system|>", "<|end|>"]
                }
            },
            timeout=120
        )
        if response.status_code == 200:
            return response.json().get("response", "").strip()
        else:
            return "I am having trouble responding right now. Please try again."
    except requests.exceptions.ReadTimeout:
        return "The AI is taking too long to respond. Please try again with a shorter question."
    except requests.exceptions.ConnectionError:
        return "AI model is not running. Please start Ollama and make sure Mistral is installed."
    except Exception as e:
        return f"An error occurred: {str(e)}"