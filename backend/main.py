from flask import Flask
from app.db.database import init_db

def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///decisions.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    init_db(app)

    @app.route("/")
    def home():
        return {"message": "Decision Tracker API running"}

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True)