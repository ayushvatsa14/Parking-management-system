from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Generic, TypeVar
from pydantic.generics import GenericModel

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

T=TypeVar("T")

class ApiResponse(GenericModel, Generic[T]):
    success: bool
    message: str
    data: Optional[T]=None