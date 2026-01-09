import os
import base64
import resend


RESEND_API_KEY = os.getenv("RESEND_API_KEY")

MAIL_FROM = os.getenv("MAIL_FROM")
MAIL_TO = os.getenv("MAIL_TO")

def send_email_with_attachment(subject, body, filename, file_bytes):

    try:
        attachment_base64 = base64.b64encode(file_bytes).decode("utf-8")

        response = resend.Emails.send({
            "from": MAIL_FROM,
            "to": MAIL_TO,
            "subject": subject,
            "html": body.replace("\n", "<br>"),
            "attachments": [{
                "filename": filename,
                "content": attachment_base64
            }]
        })

        return {"success": True}
    
    except Exception:
        return {"success": False}