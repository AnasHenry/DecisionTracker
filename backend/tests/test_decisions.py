import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import pytest
from main import create_app
from app.db.database import db

@pytest.fixture
def client():
    app = create_app()

    app.config["TESTING"] = True
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"

    with app.test_client() as client:
        with app.app_context():
            db.create_all()
        yield client


def test_create_decision(client):
    response = client.post(
        "/decisions",
        json={
            "title": "Test Decision",
            "description": "Testing system",
            "confidence": 70,
        },
    )

    assert response.status_code == 201
    data = response.get_json()

    assert data["title"] == "Test Decision"
    assert data["confidence"] == 70


def test_invalid_confidence(client):
    response = client.post(
        "/decisions",
        json={
            "title": "Bad Decision",
            "confidence": 200
        },
    )

    assert response.status_code == 400


def test_update_outcome(client):
    create = client.post(
        "/decisions",
        json={
            "title": "Outcome Test",
            "confidence": 60
        },
    )

    decision_id = create.get_json()["id"]

    update = client.patch(
        f"/decisions/{decision_id}/outcome",
        json={
            "outcome": "success",
            "result_value": 10
        },
    )

    assert update.status_code == 200
    data = update.get_json()

    assert data["outcome"] == "success"