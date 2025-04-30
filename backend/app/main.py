from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, delete
from typing import List
from app.menu import router as menu_router
from . import models, schemas
from .database import get_db, engine, Base

app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todas las origenes
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos
    allow_headers=["*"],  # Permite todos los headers
)

@app.on_event("startup")
async def startup():
    # Crear las tablas si no existen
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

app.include_router(menu_router, prefix="/menu", tags=["Menu"])

@app.post("/drinks/", response_model=models.Drink)
async def create_drink(drink: models.DrinkCreate, db: AsyncSession = Depends(get_db)):
    db_drink = schemas.DrinkDB(**drink.model_dump())
    db.add(db_drink)
    await db.commit()
    await db.refresh(db_drink)
    return db_drink

@app.get("/drinks/", response_model=List[models.Drink])
async def read_drinks(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(schemas.DrinkDB).offset(skip).limit(limit))
    drinks = result.scalars().all()
    return drinks

@app.get("/drinks/{drink_id}", response_model=models.Drink)
async def read_drink(drink_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(schemas.DrinkDB).filter(schemas.DrinkDB.id == drink_id))
    drink = result.scalar_one_or_none()
    if drink is None:
        raise HTTPException(status_code=404, detail="Bebida no encontrada")
    return drink

@app.put("/drinks/{drink_id}", response_model=models.Drink)
async def update_drink(drink_id: int, drink: models.DrinkCreate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        update(schemas.DrinkDB)
        .where(schemas.DrinkDB.id == drink_id)
        .values(**drink.model_dump())
        .returning(schemas.DrinkDB)
    )
    updated_drink = result.scalar_one_or_none()
    if updated_drink is None:
        raise HTTPException(status_code=404, detail="Bebida no encontrada")
    await db.commit()
    return updated_drink

@app.delete("/drinks/{drink_id}")
async def delete_drink(drink_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        delete(schemas.DrinkDB)
        .where(schemas.DrinkDB.id == drink_id)
        .returning(schemas.DrinkDB)
    )
    deleted_drink = result.scalar_one_or_none()
    if deleted_drink is None:
        raise HTTPException(status_code=404, detail="Bebida no encontrada")
    await db.commit()
    return {"message": "Bebida eliminada correctamente"}
