from fastapi import FastAPI
from dotenv import load_dotenv
import os
from routers.parkingRouter import router

app=FastAPI()

load_dotenv()

HOST=os.getenv("HOST", "127.0.0.1")
PORT=int(os.getenv("PORT", 8000))

@app.get("/")
def root():
    return {"Hellow": "World"}