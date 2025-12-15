from sqlalchemy.orm import Session
from models.userModel import Users
import bcrypt

def authenticateUser(credentials, db: Session):
    user=db.query(Users).filter(Users.email==credentials.email).first()

    if(not user):
        return None
    
    if(not bcrypt.checkpw(
        credentials.password.encode("utf-8"),
        user.password.encode("utf-8")
    )):
        return None
    
    return user