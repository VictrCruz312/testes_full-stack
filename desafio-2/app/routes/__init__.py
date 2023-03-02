from flask import Flask
from flask_security import forms, Security
from app.routes.routes import user_datastore


def init_app(app: Flask):
    from app.routes.routes import bp

    app.register_blueprint(bp)
    security = Security(
        app,
        user_datastore,
        login_form=forms.LoginForm,
        register_form=forms.RegisterForm,
    )
