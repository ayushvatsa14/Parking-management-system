from fastapi import FastAPI
from dotenv import load_dotenv
import os
from routers.parkingRouter import router
from database.db import Base, sqlEngine

app=FastAPI()

load_dotenv()

HOST=os.getenv("HOST", "127.0.0.1")
PORT=int(os.getenv("PORT", 8000))

Base.metadata.create_all(bind=sqlEngine)

@app.get("/")
def root():
    return {"message": "Welcome to Parking Management System"}

app.include_router(router, prefix='/parking-spaces', tags=["Parking"])