from sqlalchemy import Column, String
from database.db import Base

class Users(Base):
    __tablename__="users"

    id=Column(String(50), primary_key=True)
    email=Column(String(50))
    password=Column(String(100))
    name=Column(String(50))