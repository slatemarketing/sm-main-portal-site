from openai import OpenAI
from dotenv import load_dotenv
import json

load_dotenv()

client = OpenAI()

response = client.responses.create(
    model="gpt-5-mini",
    input={
        
    }
)

print(response.output_text)
