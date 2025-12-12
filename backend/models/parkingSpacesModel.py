from sqlalchemy import Column, Integer, String, DateTime
from database.db import Base

class ParkingSpaces(Base):
    __table_name__="parking_spaces"

    id=Column(String(10), primary_key=True)
    level=Column(Integer)
    spot=Column(Integer)
    availability=Column(String(20))
    lastUpdated=Column(DateTime)