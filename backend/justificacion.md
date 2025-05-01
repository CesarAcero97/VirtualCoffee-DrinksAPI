# ¿Qué advertencias se corrigieron?

## En database.py

database.py:1:0: W0611: Unused create_engine imported from sqlalchemy (unused-import)

database.py:2:0: W0611: Unused declarative_base imported from sqlalchemy.ext.declarative (unused-import)

Se corrigieron estos errores al eliminar los imports sin usar.

## En main.py

main.py:5:0: C0411: standard import "typing.List" should be placed before third party imports "fastapi.middleware.cors.CORSMiddleware", "fastapi.FastAPI", "sqlalchemy.ext.asyncio.AsyncSession", "sqlalchemy.select" (wrong-import-order)

Se arreglaron los órdenes de los imports.

## En models.py

models.py:2:0: C0411: standard import "typing.List" should be placed before third party import "pydantic.BaseModel" (wrong-import-order)

models.py:3:0: C0411: standard import "decimal.Decimal" should be placed before third party import "pydantic.BaseModel" (wrong-import-order)

Se arreglaron los órdenes de los imports.

# ¿Qué reglas se desactivaron y por qué?

Se desactivaron las reglas de disable=missing-module-docstring, missing-final-newline, line-too-long dado que no se consideraron relevantes para el funcionamiento y buena estructura del código.
