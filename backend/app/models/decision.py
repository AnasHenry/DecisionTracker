from datetime import datetime
import uuid
from app.db.database import db


class Decision(db.Model):
    __tablename__ = "decisions"

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)

    confidence = db.Column(db.Integer, nullable=False)

    status = db.Column(db.String(20), default="pending")
    outcome = db.Column(db.String(20), nullable=True)
    result_value = db.Column(db.Float, nullable=True)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "confidence": self.confidence,
            "status": self.status,
            "outcome": self.outcome,
            "result_value": self.result_value,
            "created_at": self.created_at,
        }