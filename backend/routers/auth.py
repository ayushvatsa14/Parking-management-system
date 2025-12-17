from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from database.db import dbConnect
from schemas.userSchema import LoginRequest
from utils.authenticate import authenticateUser
from utils.jwtUtil import signToken
from dependencies.auth import currentUser

authRouter=APIRouter()

@authRouter.post('/login')
def loginUser(
        credentials: LoginRequest,
        response: Response,
        db: Session=Depends(dbConnect)
    ):

    user=authenticateUser(credentials, db)

    if(not user):
        raise HTTPException(401, "Invalid credentials")
    
    token=signToken({
        "id": user.id,
        "name": user.name,
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

    userData={
        "id": user.id,
        "name": user.name,
        "email": user.email
    }

    return {
        "success": True,
        "message": "Login successful",
        "data": {
            "token": token,
            "user": userData
        }
    }

@authRouter.get("/me")
def authMe(user=Depends(currentUser)):
    return {
        "success": True,
        "message": "Login successful",
        "data": {
            "token": user["token"],
            "user": user["payload"]
        }
    }

@authRouter.post("/logout")
def logoutUser(response: Response):
    response.delete_cookie(
        key="token",
        path="/",
        httponly=True,
        samesite="none",
        secure=True
    )

    return {
        "success": True,
        "message": "Logged out successfully"
    }