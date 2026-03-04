from flask import Flask
from app.db.database import init_db
from app.models.decision import Decision
from app.api.decision_routes import decision_bp

def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///decisions.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    init_db(app)

    app.register_blueprint(decision_bp)

    with app.app_context():
        from app.db.database import db
        db.create_all()

    @app.route("/")
    def home():
        return {"message": "Decision Tracker API running"}

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True)