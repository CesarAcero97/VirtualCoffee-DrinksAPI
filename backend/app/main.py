from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from app.menu import router as menu_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(menu_router, prefix="/menu", tags=["Menu"])
