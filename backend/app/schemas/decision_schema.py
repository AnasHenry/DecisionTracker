from marshmallow import Schema, fields, validate


class DecisionCreateSchema(Schema):
    title = fields.String(required=True)
    description = fields.String(required=False)

    confidence = fields.Integer(
        required=True,
        validate=validate.Range(min=0, max=100)
    )


class OutcomeUpdateSchema(Schema):
    outcome = fields.String(
        required=True,
        validate=validate.OneOf(["success", "failure", "neutral"])
    )

    result_value = fields.Float(required=False)