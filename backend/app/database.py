from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import DeclarativeBase

SQLALCHEMY_DATABASE_URL = "mysql+aiomysql://admin:OexqHk2Hc6fXKOomAZO4@pos-database.c3skeakag6df.us-east-2.rds.amazonaws.com:3306/pos"

engine = create_async_engine(SQLALCHEMY_DATABASE_URL, echo=True)
SessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

class Base(DeclarativeBase):
    pass

async def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        await db.close() 