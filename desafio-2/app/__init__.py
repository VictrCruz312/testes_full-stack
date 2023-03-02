from flask import Flask
import os
from app import routes
from flask_mongoengine import MongoEngine


def create_app():
    app = Flask(__name__)

    app.config["MONGODB_SETTINGS"] = {
        "db": "desafio-2",
        "host": "mongodb",
        "port": 27017,
    }

    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
    app.config["SECURITY_PASSWORD_SALT"] = "some-random-string"

    db = MongoEngine(app)

    routes.init_app(app)

    return app


# if __name__ == "__main__":
#     app = create_app()
#     app.run()
