from app.db.database import db
from app.models.decision import Decision
import math


class DecisionService:

    @staticmethod
    def create_decision(data):
        decision = Decision(
            title=data["title"],
            description=data.get("description"),
            confidence=data["confidence"],
        )

        db.session.add(decision)
        db.session.commit()

        return decision


    @staticmethod
    def get_all_decisions():
        return Decision.query.all()


    @staticmethod
    def get_decision_by_id(decision_id):
        return Decision.query.get(decision_id)


    @staticmethod
    def update_outcome(decision_id, data):
        decision = Decision.query.get(decision_id)

        if not decision:
            return None

        decision.outcome = data["outcome"]
        decision.result_value = data.get("result_value")
        decision.status = "completed"

        db.session.commit()

        return decision


    @staticmethod
    def get_analytics():
        decisions = Decision.query.all()

        total = len(decisions)

        completed = [d for d in decisions if d.status == "completed"]
        completed_count = len(completed)

        success_count = len([d for d in completed if d.outcome == "success"])

        avg_confidence = (
            sum(d.confidence for d in decisions) / total if total > 0 else 0
        )

        accuracy = (
            (success_count / completed_count) * 100
            if completed_count > 0
            else 0
        )

        return {
            "total_decisions": total,
            "completed_decisions": completed_count,
            "successful_outcomes": success_count,
            "accuracy": round(accuracy, 2),
            "average_confidence": round(avg_confidence, 2)
        }