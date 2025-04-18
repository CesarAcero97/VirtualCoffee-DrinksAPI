from pydantic import BaseModel
from typing import List

class Drink(BaseModel):
    id: int
    name: str
    description: str
    size: str
    price: float

# Simulamos una "base de datos" en memoria
menu_db: List[Drink] = []
