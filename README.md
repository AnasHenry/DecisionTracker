# Decision Tracker

Decision Tracker is a lightweight system for recording decisions, tracking their outcomes, and analyzing prediction accuracy over time.

The goal of the system is to help users understand how their **confidence in decisions compares with actual outcomes**, enabling better calibration of judgment and more reflective decision-making.

---

# Demo Overview

The application allows users to:

- Record a decision with a confidence level
- Update the decision outcome later
- Analyze decision accuracy and confidence trends
- View decisions and analytics through a simple dashboard

The system emphasizes **clear architecture, correctness, and maintainability** rather than feature complexity.

---

## 🎥 Project Walkthrough

This video walkthrough explains the architecture, design decisions, AI usage, and tradeoffs made while building the Decision Tracker system.

▶️ Watch the walkthrough:  
https://drive.google.com/file/d/1W3Co4q8iSL5iQhzcqjeWzE3E8pG0IStG/view?usp=sharing

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

# Frontend Architecture

The frontend is implemented using **React with TypeScript** and is responsible for presenting the user interface and interacting with the backend API.

The frontend is intentionally structured to separate **UI components, API communication, and type definitions**, ensuring maintainability as the application grows.

```
src/
│
├── api/
│   └── decisionApi.ts
│
├── components/
│   ├── DecisionForm.tsx
│   └── DecisionList.tsx
│
├── pages/
│   └── Dashboard.tsx
│
└── types/
    └── decision.ts
```

---

## API Layer

The `api` folder centralizes communication with the backend REST API using **Axios**.

Example functions:

```
getDecisions()
createDecision()
updateOutcome()
getAnalytics()
```

This abstraction ensures that UI components remain focused on presentation logic while API communication is handled in a dedicated module. If API endpoints change, updates are required only in this layer.

---

## Type Safety

TypeScript interfaces are used to define the structure of data received from the backend.

Example entities include:

```
Decision
Analytics
```

This approach ensures that frontend components interact with well-defined data structures, preventing runtime errors and improving maintainability.

---

## Dashboard Page

The **Dashboard** acts as the primary page of the application.

Responsibilities include:

- fetching decision data from the backend
- retrieving analytics summaries
- coordinating UI components

Data loading occurs when the component mounts using React hooks.

```
Dashboard
   ↓
API Layer
   ↓
Flask Backend
   ↓
Database
```

---

## Decision Form

The **DecisionForm component** allows users to create new decisions.

It manages form state locally and sends requests to the backend API when the user submits the form.

Client-side validation ensures that:

- all fields are filled
- confidence values remain between **0 and 100**

If invalid input is detected, a toast notification informs the user before the request is sent to the backend.

---

## Decision List

The **DecisionList component** displays recorded decisions and their current status.

For decisions that are still pending, the interface provides controls for updating outcomes:

```
Mark Success
Mark Failure
Neutral
```

These actions trigger API requests that update the database and refresh analytics metrics.

---

## Frontend–Backend Interaction

The frontend communicates with the backend through REST API requests.

The data flow follows this pattern:

```
User Action
   ↓
React Component
   ↓
Axios API Request
   ↓
Flask Endpoint
   ↓
Database Update
   ↓
Updated Response
   ↓
React UI Update
```

This clear separation ensures that frontend components remain lightweight while backend services handle core business logic.

---

## UI Design Considerations

The user interface intentionally follows a **minimal and calm layout** to improve readability and usability.

Key design choices include:

- card-based sections for content grouping
- consistent spacing between elements
- simple forms for decision input
- clear status indicators for decision outcomes

The goal was to prioritize **clarity and functionality** rather than complex visual styling.

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
venv\Scripts\activate 
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