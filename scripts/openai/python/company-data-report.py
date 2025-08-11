from openai import OpenAI
from dotenv import load_dotenv
import json

load_dotenv()

client = OpenAI()

data = [
    {
  "company": {
    "id": "5OGY8qn5NB9qWlDLI-fM51QfctF_8kFc9XhSSKonq40",
    "name": "Slate Marketing",
    "description": "A marketing agency that built this portal, and the service provider.",
    "email": "support@slatemarketing.org",
    "phone": "3134827898",
    "status": "ACTIVE",
    "address": "347 Neff Rd",
    "city": "Grosse Pointe",
    "state": "MI",
    "postalCode": "48230",
    "country": "USA",
    "createdAt": "2025-08-10T20:11:06.648Z",
    "updatedAt": "2025-08-10T20:13:28.296Z"
  },
  "users": [
    {
      "id": "Wk04B2uckLS5yL2caLnKakRMOzOmBhFA",
      "name": "Nicholas Walsh",
      "email": "nickw@slatemarketing.org",
      "role": "ADMIN",
      "emailVerified": "false",
      "profile": {
        "id": "cme64asxt00018c3xpminnhjf",
        "userId": "Wk04B2uckLS5yL2caLnKakRMOzOmBhFA",
        "firstName": "Nick",
        "lastName": "Walsh",
        "company": "Slate Marketing",
        "phone": "3134827898",
        "bio": "Owner of Slate Marketing",
        "avatar": "data:image/jpeg;base64,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",
        "createdAt": "2025-08-10T20:09:42.370Z",
        "updatedAt": "2025-08-10T20:09:42.370Z"
      },
      "createdAt": "2025-08-10T20:08:18.237Z",
      "updatedAt": "2025-08-10T20:08:18.237Z"
    },
    {
      "id": "E9FE53xw5OGs2zZEknuo25fYx6Nu05bX",
      "name": "Arieh Zeitlin",
      "email": "ariz@slatemarketing.org",
      "role": "CLIENT",
      "emailVerified": "false",
      "profile": "null",
      "createdAt": "2025-08-10T20:08:36.255Z",
      "updatedAt": "2025-08-10T20:08:36.255Z"
    }
  ],
  "exportDate": "2025-08-10T21:57:59.826Z",
  "totalUsers": 2
}
]

response = client.responses.create(
    model="gpt-5-mini",
    prompt={
        "id": "pmpt_689916ddcaa081909f9fff09d1c90b460078f19e99dbf26e",
        "variables": {
            "company": json.dumps(data[0]),
        },
    },
)

print(response.output_text)

with open("python-data.json", "w", encoding="utf-8") as f:
    f.write(response.model_dump_json(indent=2))