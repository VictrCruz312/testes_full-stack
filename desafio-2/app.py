from flask import Flask, request, redirect, url_for, render_template, flash
from flask_security import (
    Security,
    MongoEngineUserDatastore,
    RoleMixin,
    UserMixin,
    login_required,
    current_user,
    login_user,
)
from flask_security.forms import LoginForm, RegisterForm
from flask_mongoengine import MongoEngine
from dotenv import load_dotenv
import os
import ipdb


load_dotenv()

app = Flask(__name__)

app.config["MONGODB_SETTINGS"] = {
    "db": "desafio-2",
    "host": "mongodb",
    "port": 27017,
}

app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config["SECURITY_PASSWORD_SALT"] = "some-random-string"

db = MongoEngine(app)


class User(db.Document, UserMixin):
    email = db.EmailField(required=True, unique=True)
    password = db.StringField(required=True, min_length=6, max_length=30)
    active = db.BooleanField(default=True, required=False)
    roles = db.ListField(db.StringField(), default=[])
    fs_uniquifier = db.StringField(max_length=64, unique=True)


class Role(db.Document):
    name = db.StringField(max_length=80, unique=True)
    description = db.StringField(max_length=255)


user_datastore = MongoEngineUserDatastore(db, User, Role)
security = Security(
    app, user_datastore, login_form=LoginForm, register_form=RegisterForm
)


@app.route("/register", methods=["GET", "POST"])
def register():
    form = RegisterForm()
    if request.method == "POST":
        user_datastore.create_user(email=form.email.data, password=form.password.data)
        return redirect(url_for("login"))

    return render_template("register.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    ipdb.set_trace()
    form = LoginForm()
    if request.method == "POST":
        ipdb.set_trace()
        email = form.email.data
        password = form.password.data
        if not email or not password:
            return flash("Email ou senha inválidos.", "error")

        # Tenta autenticar o usuário
        print("testeLogin")
        user = user_datastore.find_user(email=email)
        if user is not None and user_datastore.validate_password(
            password, user.password
        ):
            login_user(user)
            return redirect(url_for("dashboard"))

        return render_template(
            "login.html", message="Email ou senha inválidos.", form=form
        )

    return render_template("register.html", form=form)


@app.route("/dashboard")
@login_required
def dashboard():
    return render_template("dashboard.html", user=current_user)
