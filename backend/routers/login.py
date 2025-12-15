from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from database.db import dbConnect
from schemas.userSchema import LoginRequest
from utils.authenticate import authenticateUser
from utils.jwtUtil import signToken

authRouter=APIRouter()

@authRouter.post('/')
def loginUser(
        credentials: LoginRequest,
        response: Response,
        db: Session=Depends(dbConnect)
    ):

    user=authenticateUser(credentials, db)

    if(not user):
        raise HTTPException(
            status_code=401,
            detail='Invalid Credentials'
        )
    
    token=signToken({
        "email": user.email
    })

    response.set_cookie(
        key="token",
        value=token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=60 * 60 * 24 * 7
    )

    return {
        "success": True,
        "message": "Login successful",
        "data": {
            token
        }
    }