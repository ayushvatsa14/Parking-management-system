from fastapi import Cookie, HTTPException
from utils.jwtUtil import verifyToken

def currentUser(token: str=Cookie(None)):
    if(not token):
        raise HTTPException(401, "User not authenticated")
    
    payload=verifyToken(token)
    
    if not payload:
        raise HTTPException(401, "Invalid or expired token")

    return {
        "token": token,
        "payload": payload
    }