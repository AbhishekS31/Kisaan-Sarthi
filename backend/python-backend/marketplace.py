import pandas as pd
from openai import OpenAI
import datetime
import os
import json
from pydantic import BaseModel



# client = OpenAI(
#     base_url="https://api.groq.com/openai/v1",
#     api_key=os.environ.get("GROQ_API_KEY")
# )

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
Model = "gpt-4o"

# class output_format(BaseModel):
#     recommendation: list[str, str]

class output_format(BaseModel):
    price: float
    explanation: str





def get_data(data, system_message):
  # response = client.beta.chat.completions.parse(
  response = client.beta.chat.completions.parse(
      # model="llama-3.3-70b-versatile",
      model=Model,
      messages=[
        {"role": "system", "content": system_message},
        {"role": "user", "content": f"This is the farmer's crop ~data {data}"},
        ],
        response_format=output_format,

  )
  message = response.choices[0].message

  # if message.content: print("Assistant:", message.content)

  return message.content


system_message = """
Your job is to estimate the price of a product in the market for thhe farmer.
You will be given the following information:
crop name, district and state and todays date to find out the current season.
output - price should be per kg and in INR
"""

def clean(data):
    parsed_data = json.loads(data)

    # Separate nutritional facts and suggestions
    price = parsed_data.get("price", [])
    explanation = parsed_data.get("explanation", [])

    explanation = explanation.replace("*", "")
    explanation = explanation.replace("`", "")

    return [price, explanation]

def marketplace(data):
  # print(data)
  response = get_data(data, system_message)
  # print(response)
  response = clean(response)
  # print(response)
  return response



if __name__ == "__main__":
    # print(soil_composition)
    data = {
      "crop name": "wheat",
      "district": "Nanded",
      "state": "Maharashtra",
    }

    print(marketplace(data))


