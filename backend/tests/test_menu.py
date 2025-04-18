from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_empty_menu():
    response = client.get("/menu/")
    assert response.status_code == 200
    assert response.json() == []

def test_add_drink():
    drink_data = {
        "id": 1,
        "name": "Limonada",
        "description": "Refrescante bebida de limón",
        "size": "Grande",
        "price": 2.50
    }
    response = client.post("/menu/", json=drink_data)
    assert response.status_code == 200
    assert response.json() == drink_data

def test_get_menu_after_adding():
    response = client.get("/menu/")
    assert response.status_code == 200
    assert len(response.json()) == 1
