from pydantic import BaseModel
import base64
from openai import OpenAI
from dotenv import load_dotenv
load_dotenv()
import os
import json


key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=key)
Model = "gpt-4o-mini"


system_message = """
Your job is to scan the provided image of the leaf, find any diseases or pests present, and provide a detailed description of the issue.
Also provide the solution to the problem.
"""


class output_format(BaseModel):
    disease_name: str
    disease_description: str
    solution : str
    

# Function to encode the image
def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")


# def get_data(image_path, user_prompt, user_profile, user_diet):
def get_data(image_path):
    base64_image = encode_image(image_path)

    completion = client.beta.chat.completions.parse(
        model=Model,
        messages=[
            {
                "role": "system",
                "content": system_message
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        # "text": "This is maggie noodles, I am gonna eat all of this",
                        "text": f"This is the leaf from the plant",
                    },
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"},
                    },
                ],
            }
        ],
        response_format=output_format,


    )
    data = completion.choices[0].message.content
    # print(data)
    return data


def clean_data(data):    
    parsed_data = json.loads(data)
    disease_name = parsed_data.get("disease_name", "")
    disease_description = parsed_data.get("disease_description", "")
    solution = parsed_data.get("solution", "")
    return [disease_name, disease_description, solution]

def predict_disease(image_path):
    data = get_data(image_path)
    return clean_data(data)
    # return data
    # print(data)


if __name__ == "__main__":
    # image_path = input("Enter the path to the image: ")
    image_path = "test.jpeg"


    result = predict_disease(image_path)
    print(result)