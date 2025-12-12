from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Any

class ParkingSpaceBase(BaseModel):
    id: str
    level: int
    spot: int
    availability: str
    lastUpdated: datetime


class UpdateParkingSpace(BaseModel):
    level: int
    spot: int
    availability: str


class ParkingSpaceResponse(ParkingSpaceBase):
    class Config:
        orm_mode = True

class ApiResponse(BaseModel):
    success: bool
    message: str
    data: Optional[Any]=None