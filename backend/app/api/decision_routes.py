from flask import Blueprint, request, jsonify
from app.services.decision_service import DecisionService
from app.schemas.decision_schema import DecisionCreateSchema, OutcomeUpdateSchema
from marshmallow import ValidationError

decision_bp = Blueprint("decisions", __name__)

create_schema = DecisionCreateSchema()
outcome_schema = OutcomeUpdateSchema()


@decision_bp.route("/decisions", methods=["POST"])
def create_decision():

    try:
        data = create_schema.load(request.json)
    except ValidationError as err:
        return {"errors": err.messages}, 400

    decision = DecisionService.create_decision(data)

    return jsonify(decision.to_dict()), 201


@decision_bp.route("/decisions", methods=["GET"])
def get_decisions():
    decisions = DecisionService.get_all_decisions()

    return jsonify([d.to_dict() for d in decisions])


@decision_bp.route("/decisions/<decision_id>", methods=["GET"])
def get_decision(decision_id):
    decision = DecisionService.get_decision_by_id(decision_id)

    if not decision:
        return {"error": "Decision not found"}, 404

    return decision.to_dict()


@decision_bp.route("/decisions/<decision_id>/outcome", methods=["PATCH"])
def update_outcome(decision_id):
    try:
        data = outcome_schema.load(request.json)
    except ValidationError as err:
        return {"errors": err.messages}, 400

    decision = DecisionService.update_outcome(decision_id, data)

    if not decision:
        return {"error": "Decision not found"}, 404

    return decision.to_dict()


@decision_bp.route("/analytics", methods=["GET"])
def analytics():
    data = DecisionService.get_analytics()
    return jsonify(data)
