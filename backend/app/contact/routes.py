from flask import Blueprint, jsonify

contact_bp = Blueprint("contact", __name__)

@contact_bp.route("/send-cv", methods=["POST"])
def send_cv():
    return jsonify({"message": "Hola desde Flask"})