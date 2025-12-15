import jwt
from datetime import datetime, timezone, timedelta
from dotenv import load_dotenv
import os

load_dotenv()

secretKey=os.getenv("JWTSECRET")
algorithm='HS256'

def signToken(payload: dict):
    payload["exp"]=datetime.now(timezone.utc) + timedelta(hours=24*7)
    return jwt.encode(payload, secretKey, algorithm=algorithm)

def verifyToken(token: str):
    try:
        return jwt.decode(token, secretKey, algorithms=[algorithm])
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None