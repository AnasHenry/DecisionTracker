# Decision Tracker

Decision Tracker is a lightweight system for recording decisions, tracking their outcomes, and analyzing prediction accuracy over time.

The goal of the system is to help users understand how their **confidence in decisions compares with actual outcomes**, enabling better calibration of judgment and more reflective decision-making.

This project was built as part of the **Better Software Associate Software Engineer assessment**.

---

# Demo Overview

The application allows users to:

- Record a decision with a confidence level
- Update the decision outcome later
- Analyze decision accuracy and confidence trends
- View decisions and analytics through a simple dashboard

The system emphasizes **clear architecture, correctness, and maintainability** rather than feature complexity.

---

# Tech Stack

## Backend
- Python
- Flask
- SQLAlchemy
- Marshmallow (input validation)
- Pytest (automated tests)

## Frontend
- React
- TypeScript
- Axios

## Database
- SQLite (relational database)

---

# Project Structure

```
decision-tracker
│
├── backend
│   ├── app
│   │   ├── api
│   │   │   └── decision_routes.py
│   │   │
│   │   ├── services
│   │   │   └── decision_service.py
│   │   │
│   │   ├── models
│   │   │   └── decision.py
│   │   │
│   │   ├── schemas
│   │   │   └── decision_schema.py
│   │   │
│   │   ├── db
│   │   │   └── database.py
│   │   │
│   │   └── utils
│   │       └── logger.py
│   │
│   ├── tests
│   │   └── test_decisions.py
│   │
│   └── main.py
│
├── frontend
│   └── React + TypeScript UI
│
├── ai
│   ├── agents.md
│   ├── coding_rules.md
│   └── prompting_guidelines.md
│
└── README.md
```

---

# Architecture

The backend follows a **layered architecture** to maintain separation of concerns.

```
Routes
   ↓
Services
   ↓
Models
   ↓
Database
```

## API Layer (Routes)

Routes handle:

- HTTP request parsing
- response formatting
- invoking service methods

Routes intentionally contain **no business logic**.

---

## Service Layer

The service layer contains the **core domain logic**, including:

- decision creation
- outcome updates
- analytics computation

This layer isolates business logic from the HTTP layer, improving testability and maintainability.

---

## Models

SQLAlchemy models define the database structure and represent domain entities.

Example entity:

```
Decision
 ├─ id
 ├─ title
 ├─ description
 ├─ confidence
 ├─ status
 ├─ outcome
 ├─ result_value
 ├─ created_at
 └─ updated_at
```

---

## Schema Validation

All incoming API data is validated using **Marshmallow schemas**.

Example constraints:

- confidence must be between **0 and 100**
- outcome must be one of:
  - success
  - failure
  - neutral

This prevents invalid system states and ensures API contract safety.

---

# API Endpoints

## Create Decision

```
POST /decisions
```

Example request:

```json
{
  "title": "Invest in AI startup",
  "description": "Market shows strong growth",
  "confidence": 70
}
```

---

## List Decisions

```
GET /decisions
```

Returns all recorded decisions.

---

## Get Decision by ID

```
GET /decisions/{id}
```

---

## Update Outcome

```
PATCH /decisions/{id}/outcome
```

Example request:

```json
{
  "outcome": "success",
  "result_value": 15
}
```

---

## Analytics

```
GET /analytics
```

Example response:

```json
{
  "total_decisions": 10,
  "completed_decisions": 7,
  "successful_outcomes": 4,
  "accuracy": 57.14,
  "average_confidence": 68.2
}
```

---

# Observability

The system includes a logging layer to track important events.

Examples:

- decision creation
- outcome updates
- error conditions

This improves system diagnosability and debugging.

---

# Automated Tests

Pytest is used to verify core API behavior.

Current test coverage includes:

- decision creation
- validation failure handling
- outcome updates

Tests run using:

```
pytest
```

The test suite uses an **in-memory SQLite database** to ensure isolation and repeatability.

---

# Frontend

The frontend is built with **React + TypeScript**.

Key characteristics:

- typed API responses
- separated API layer
- minimal UI focused on functionality

Main features:

- decision creation form
- decision list
- analytics dashboard

---

# Key Technical Decisions

## Service Layer Separation

Business logic is isolated from HTTP routes to keep the API layer thin and maintainable.

This makes the system easier to test and extend.

---

## Input Validation

Marshmallow schemas enforce constraints on incoming requests, preventing invalid states and protecting system integrity.

---

## Type Safety

TypeScript is used on the frontend to enforce API contracts and prevent type mismatches between the client and server.

---

## Relational Database

SQLite was chosen for simplicity and reliability while still demonstrating relational modeling.

The architecture allows migration to PostgreSQL with minimal changes.

---

# AI Usage

AI tools were used during development to assist with:

- scaffolding components
- generating initial code structures
- suggesting improvements

However, strict architectural rules were enforced through the **AI guidance files** located in the `ai/` directory.

These files define:

- architecture constraints
- coding standards
- prompting guidelines

All generated code was reviewed and modified before integration.

---

# System Properties

The system was designed to satisfy the evaluation criteria of:

### Structure
Clear separation between API, services, models, and schemas.

### Simplicity
Readable and predictable code prioritizing clarity.

### Correctness
Validation ensures the system cannot enter invalid states.

### Interface Safety
Typed API responses and schema validation guard against misuse.

### Change Resilience
Layered architecture allows new features without widespread code changes.

### Verification
Automated tests confirm behavior remains correct.

### Observability
Logging makes system behavior visible and diagnosable.

---

# Future Improvements

Potential extensions include:

- user authentication
- tagging and categorizing decisions
- visualization of confidence calibration
- historical trend analysis
- multi-user support

---

# Running the Project

## Backend

```
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

Backend runs at:

```
http://127.0.0.1:5000
```

---

## Frontend

```
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# Running Tests

```
cd backend
pytest
```

---

# Final Notes

This project intentionally focuses on **system design, correctness, and maintainability** rather than feature complexity.

The goal is to demonstrate how small systems can remain understandable and reliable as they evolve.