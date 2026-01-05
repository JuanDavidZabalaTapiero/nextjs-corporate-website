from flask import Flask
from flask_cors import CORS

from .contact.routes import contact_bp
from .config import CORS_ORIGINS

def create_app():
    app = Flask(__name__)

    # BLUEPRINTS
    app.register_blueprint(contact_bp)

    # CORS
    CORS(app, origins=CORS_ORIGINS)

    return app