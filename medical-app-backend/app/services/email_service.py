# EMAIL SERVICE — uncomment when Gmail SMTP is configured
# pip install fastapi-mail first

# from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
# from dotenv import load_dotenv
# import os

# load_dotenv()

# conf = ConnectionConfig(
#     MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
#     MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
#     MAIL_FROM=os.getenv("MAIL_FROM"),
#     MAIL_PORT=int(os.getenv("MAIL_PORT", 587)),
#     MAIL_SERVER=os.getenv("MAIL_SERVER"),
#     MAIL_STARTTLS=True,
#     MAIL_SSL_TLS=False,
#     USE_CREDENTIALS=True
# )

# async def send_verification_email(email: str, token: str):
#     verification_url = f"http://localhost:5173/verify/{token}"
#     message = MessageSchema(
#         subject="Verify your MediApp account",
#         recipients=[email],
#         body=f"""
#         <html>
#         <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
#             <div style="text-align: center; margin-bottom: 30px;">
#                 <h1 style="color: #0d9488;">🩺 MediApp</h1>
#             </div>
#             <h2 style="color: #111827;">Verify your email address</h2>
#             <p style="color: #6b7280;">
#                 Thank you for creating a MediApp account!
#                 Please verify your email address by clicking the button below.
#             </p>
#             <div style="text-align: center; margin: 30px 0;">
#                 <a href="{verification_url}"
#                    style="background-color: #7c3aed; color: white; padding: 12px 30px;
#                           border-radius: 8px; text-decoration: none; font-weight: bold;">
#                     Verify Email Address
#                 </a>
#             </div>
#             <p style="color: #9ca3af; font-size: 12px;">
#                 If you didn't create this account, you can safely ignore this email.
#                 This link expires in 24 hours.
#             </p>
#         </body>
#         </html>
#         """,
#         subtype="html"
#     )
#     fm = FastMail(conf)
#     await fm.send_message(message)

# Placeholder until email is configured
async def send_verification_email(email: str, token: str):
    print(f"[DEV MODE] Verification email for {email}")
    print(f"[DEV MODE] Token: {token}")
    print(f"[DEV MODE] Link: http://localhost:5173/verify/{token}")