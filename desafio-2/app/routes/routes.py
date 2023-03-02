from flask import Blueprint, request, redirect, url_for, render_template, flash
from flask_security import (
    current_user,
    login_required,
    login_user,
    MongoEngineUserDatastore,
    Security,
    UserMixin,
)
from flask_security.forms import LoginForm, RegisterForm
from flask_mongoengine import MongoEngine

from dotenv import load_dotenv
from werkzeug.exceptions import NotFound
import ipdb


load_dotenv()

bp = Blueprint("app", __name__)

db = MongoEngine()


class User(db.Document, UserMixin):
    email = db.EmailField(required=True, unique=True)
    password = db.StringField(required=True, min_length=6)
    active = db.BooleanField(default=True, required=False)
    roles = db.ListField(db.StringField(), default=[])
    fs_uniquifier = db.StringField(max_length=64, unique=True)


class Role(db.Document):
    name = db.StringField(max_length=80, unique=True)
    description = db.StringField(max_length=255)


user_datastore = MongoEngineUserDatastore(db, User, Role)


@bp.route("/register", methods=["GET", "POST"])
def register():
    form = RegisterForm()
    if request.method == "POST":
        user_datastore.create_user(email=form.email.data, password=form.password.data)
        return redirect(url_for("app.login"))

    return render_template("register.html")


@bp.route("/login", methods=["GET", "POST"])
def login():
    if current_user.is_authenticated:
        return redirect(url_for("app.dashboard"))
        ...
    form = LoginForm()
    if request.method == "POST":
        email = form.email.data
        password = form.password.data
        if not email or not password:
            return flash("Email ou senha inválidos.", "error")

        # Tenta autenticar o usuário
        user = user_datastore.find_user(email=email)
        if user is not None and user.password == password:
            login_user(user)
            return redirect(url_for("app.dashboard"))

        return render_template(
            "login.html", message="Email ou senha inválidos.", form=form
        )

    return render_template("login.html", form=form)


@bp.route("/")
@login_required
def dashboard():
    return render_template("dashboard.html", user=current_user)
