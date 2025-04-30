from pydantic import BaseModel
from typing import List, Optional
from decimal import Decimal

class DrinkBase(BaseModel):
    name: str
    description: Optional[str] = None
    availableSizes: Optional[str] = None
    price: Optional[Decimal] = None

class DrinkCreate(DrinkBase):
    pass

class Drink(DrinkBase):
    id: int

    class Config:
        from_attributes = True

# Simulamos una "base de datos" en memoria
menu_db: List[Drink] = []
