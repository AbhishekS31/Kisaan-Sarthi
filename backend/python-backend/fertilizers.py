import pandas as pd
from openai import OpenAI
import datetime
import os
import json
from pydantic import BaseModel



client = OpenAI(
    base_url="https://api.groq.com/openai/v1",
    api_key=os.environ.get("GROQ_API_KEY")
)

# client = OpenAI(
#     api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
# )
# Model = "gpt-4o-mini"

# class output_format(BaseModel):
#     recommendation: list[str, str]

def get_soil_composition(district, file_path='data/mh-soil.csv'):
    # Read the CSV file into a DataFrame
    target_value = district.upper()
    df = pd.read_csv(file_path)
    
    # Assuming 'target_value' is in the first column (index 0)
    row = df[df.iloc[:, 0] == target_value]
    
    if not row.empty:
        # print("Row found:")
        # print(row)
        # print(json.loads(row.to_json()))
        return json.loads(row.to_json())
        
    else:
        print("Row not found.")


soil_composition =  get_soil_composition("NANDED")


def get_fertilizer_recommendation(data, system_message):
  # response = client.beta.chat.completions.parse(
  response = client.chat.completions.create(
      model="llama-3.3-70b-versatile",
      messages=[
        {"role": "system", "content": system_message},
        {"role": "user", "content": f"This is the farmer's data {data}"},
        ],
        # response_format=output_format,

  )
  message = response.choices[0].message

  # if message.content: print("Assistant:", message.content)

  return message.content


system_message = """
Your job is to recommend fertilizers for a farmer based on their crop, soil type, and other factors.
The values of N, P, K and pH are in percentage.
Do not use pronouns to address yourself.
The budget is in INR, suggest the best fertilizer for the budget.
"""


def clean(data):
  data = data.replace("*", "")
  data = data.replace("`", "")
  return data

def fertilizer_recommendation(data):
  # print(data)
  location = data["district"]
  soil_composition = get_soil_composition(location)
  # print(soil_composition)

  # merge data and soil composition
  data.update(soil_composition)
  # print(data)

  response = get_fertilizer_recommendation(data, system_message)
  # print(response)
  response = clean(response)
  return response



if __name__ == "__main__":
    # print(soil_composition)
    data = {
      "crop name": "Rice",
      "crop growth stage": "seeding",
      "district": "Nanded",
      "rainfall": "moderate",
    }

    fertilizer_recommendation(data)

