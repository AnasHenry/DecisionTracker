# AI Agent Guidelines

This project allows AI-assisted development but enforces strict architectural boundaries.

Agents must follow these rules:

1. Routes must remain thin and only handle HTTP concerns.
2. Business logic must reside in the service layer.
3. Database access must occur only through SQLAlchemy models.
4. Input validation must be enforced through schemas.
5. Generated code must prioritize readability over clever optimizations.

Any generated code should be reviewed for correctness, security, and maintainability before integration.