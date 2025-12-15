from fastapi import Cookie, HTTPException
from utils.jwtUtil import verifyToken

def currentUser(token: str=Cookie(None)):
    if(not token):
        raise HTTPException(
            status_code=401,
            detail="User not authenticated"
        )
    
    payload=verifyToken(token)
    
    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    return payload