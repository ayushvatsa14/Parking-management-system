from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os

load_dotenv()

username=os.getenv("DATABASE_USER")
password=os.getenv("DATABASE_PASSWORD")

DATABASE_URL = f'mysql+pymysql://{username}:{password}@localhost:3306/parking_db'

sqlEngine=create_engine(
    DATABASE_URL
)

LocalSession=sessionmaker(autocommit=False, autoflush=False, bind=sqlEngine)

Base=declarative_base()

def dbConnect():
    db=LocalSession

    try:
        yield db
    finally:
        db.close()