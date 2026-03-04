from app.db.database import db
from app.models.decision import Decision


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