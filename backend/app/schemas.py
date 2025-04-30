from sqlalchemy import Column, Integer, String, Text, DECIMAL
from .database import Base

class DrinkDB(Base):
    __tablename__ = "Drinks"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    availableSizes = Column(String(255))
    price = Column(DECIMAL(10, 2)) 