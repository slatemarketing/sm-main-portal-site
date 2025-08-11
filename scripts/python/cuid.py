import secrets, base64

id = base64.urlsafe_b64encode(secrets.token_bytes(32)).rstrip(b'=').decode()

print(id)