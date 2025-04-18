from fastapi import APIRouter
from app.models import Drink, menu_db

router = APIRouter()

@router.get("/", response_model=list[Drink])
def get_menu():
    return menu_db

@router.post("/", response_model=Drink)
def add_drink(drink: Drink):
    menu_db.append(drink)
    return drink
