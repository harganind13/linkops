"""Backend API tests for LinkOps landing page."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://connector-scale.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---- Root ----
def test_root_returns_200(client):
    r = client.get(f"{API}/")
    assert r.status_code == 200
    data = r.json()
    assert "message" in data
    assert isinstance(data["message"], str) and len(data["message"]) > 0


# ---- POST /api/leads ----
def test_create_lead_valid(client):
    payload = {
        "name": "TEST_Jane",
        "email": "TEST_jane@example.com",
        "company": "TEST_Acme",
        "message": "Looking for a growth audit",
        "source": "hero",
    }
    r = client.post(f"{API}/leads", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert "id" in data and isinstance(data["id"], str)
    assert data["name"] == payload["name"]
    assert data["email"] == payload["email"]
    assert data["company"] == payload["company"]
    assert data["message"] == payload["message"]
    assert data["source"] == payload["source"]
    assert "_id" not in data


def test_create_lead_invalid_email(client):
    payload = {"name": "X", "email": "not-an-email", "company": "Y"}
    r = client.post(f"{API}/leads", json=payload)
    assert r.status_code == 422


def test_create_lead_missing_name(client):
    r = client.post(f"{API}/leads", json={"email": "a@b.com", "company": "Y"})
    assert r.status_code == 422


def test_create_lead_missing_email(client):
    r = client.post(f"{API}/leads", json={"name": "X", "company": "Y"})
    assert r.status_code == 422


def test_create_lead_missing_company(client):
    r = client.post(f"{API}/leads", json={"name": "X", "email": "a@b.com"})
    assert r.status_code == 422


# ---- GET /api/leads ----
def test_list_leads_no_objectid_leak(client):
    # Seed one
    payload = {"name": "TEST_Persist", "email": "TEST_persist@example.com", "company": "TEST_Co", "source": "final"}
    pr = client.post(f"{API}/leads", json=payload)
    assert pr.status_code == 200
    created_id = pr.json()["id"]

    r = client.get(f"{API}/leads")
    assert r.status_code == 200
    rows = r.json()
    assert isinstance(rows, list)
    # No ObjectId leak
    for row in rows:
        assert "_id" not in row
        assert "id" in row
    # Persistence check
    assert any(row.get("id") == created_id for row in rows)
