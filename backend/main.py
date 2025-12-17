from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import HTTPException as FastAPIHTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from routers.parkingRouter import router
from routers.auth import authRouter
from database.db import Base, sqlEngine

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()

HOST=os.getenv("HOST", "127.0.0.1")
PORT=int(os.getenv("PORT", 8000))

Base.metadata.create_all(bind=sqlEngine)

@app.exception_handler(FastAPIHTTPException)
async def http_exception_handler(request: Request, exc: FastAPIHTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "message": exc.detail if isinstance(exc.detail, str) else exc.detail.get("message"),
            "code": exc.status_code
        }
    )

@app.get("/")
def root():
    return {"message": "Welcome to Parking Management System"}

app.include_router(router, prefix='/parking-spaces', tags=["Parking"])
app.include_router(authRouter, prefix='/auth', tags=["Auth"])