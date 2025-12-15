from fastapi import APIRouter, Depends, Path
from sqlalchemy.orm import Session
from database.db import dbConnect
from datetime import datetime
from schemas.parkingSpacesSchema import ParkingSpaceResponse, UpdateParkingSpace, ApiResponse
from models.parkingSpacesModel import ParkingSpaces
from dependencies.auth import currentUser

router=APIRouter()

@router.get("/", response_model=ApiResponse[list[ParkingSpaceResponse]])
def parkingSpacesAll(
    db: Session=Depends(dbConnect),
    current_user=Depends(currentUser)
):
    spacesAll=db.query(ParkingSpaces).all()

    if not spacesAll:
        return ApiResponse(
            success=False,
            message="Internal system error",
            data=None
        )
    
    return ApiResponse(
        success=True,
        message="All spaces successfully retrieved",
        data=spacesAll
    )

@router.get("/empty", response_model=ApiResponse[list[ParkingSpaceResponse]])
def emptySpaceAll(
    db: Session=Depends(dbConnect),
    current_user=Depends(currentUser)
):
    emptySpaces=db.query(ParkingSpaces).filter(
        ParkingSpaces.availability=="empty"
    ).all()
    
    return ApiResponse(
        success=True,
        message="All empty spaces successfully retrieved",
        data=emptySpaces
    )

@router.get("/empty/{level}", response_model=ApiResponse[list[ParkingSpaceResponse]])
def emptySpaceByLevel(
    level: int=Path(..., ge=1, le=3),
    db: Session=Depends(dbConnect),
    current_user=Depends(currentUser)
):
    spacesByLevel=db.query(ParkingSpaces).filter(
        ParkingSpaces.level==level,
        ParkingSpaces.availability=="empty"
    ).all()

    return ApiResponse(
        success=True,
        message="All empty spaces by level successfully retrieved",
        data=spacesByLevel
    )

@router.patch("/update", response_model=ApiResponse[ParkingSpaceResponse])
def updateParkingSpace(
    updated_space: UpdateParkingSpace,
    db: Session=Depends(dbConnect),
    current_user=Depends(currentUser),
):
    spaceId=f'L{updated_space.level}-S{updated_space.spot}'

    space=db.query(ParkingSpaces).filter(
        ParkingSpaces.id==spaceId
    ).first()

    if not space:
        return ApiResponse(
            success=False,
            message="Space id not found",
            data=None
        )
    
    space.availability=updated_space.availability
    space.lastUpdated=datetime.now()

    db.commit()
    db.refresh(space)

    return ApiResponse(
        success=True,
        message="Space updated successfully",
        data=space
    )

@router.get("/full-capacity", response_model=ApiResponse[bool])
def isFullCapacity(
    db: Session=Depends(dbConnect),
    current_user=Depends(currentUser)
):
    emptySpaceCount=db.query(ParkingSpaces).filter(
        ParkingSpaces.availability=="empty"
    ).count()

    return ApiResponse(
        success=True,
        message="Empty spaces count retrieved",
        data=emptySpaceCount==0
    )