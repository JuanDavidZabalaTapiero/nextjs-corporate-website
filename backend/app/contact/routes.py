from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from app.services.email import send_email_with_attachment

contact_bp = Blueprint("contact", __name__)

@contact_bp.route("/send-cv", methods=["POST"])
def send_cv():
    # ---- Validaciones básicas ----
    name = request.form.get("name")
    file = request.files.get("cv")

    if not name:
        return jsonify({"message": "El nombre es obligatorio"}), 400

    if not file:
        return jsonify({"message": "Debes adjuntar la hoja de vida"}), 400

    if file.mimetype != "application/pdf":
        return jsonify({"message": "El archivo debe ser un PDF"}), 400

    # Nombre seguro del archivo
    filename = secure_filename(file.filename)

    # ---- Cuerpo del correo ----
    body = f"""
Nueva hoja de vida recibida

Nombre: {name}

El CV va adjunto en PDF.
"""

    # ---- Envío del correo ----
    send_email_with_attachment(
        subject="Nueva hoja de vida desde la web",
        body=body,
        attachment=file,
        filename=filename
    )

    return jsonify({"message": "Hoja de vida enviada correctamente"})