from openai import OpenAI
import datetime
import os
from pydantic import BaseModel
import json



client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)

# client = OpenAI(
#     base_url="https://api.groq.com/openai/v1",
#     api_key=os.environ.get("GROQ_API_KEY")
# )

def take_input():
    print("Enter your prompt. (Ctrl-D to end input)")
    contents = []
    while True:
        try:
            line = input()
        except EOFError:
            break
        contents.append(line)

    # join all lines and make it s tring
    prompt = "\n".join(contents)
    return prompt





class output_format(BaseModel):
    schemes: list[str, str, str]


def get_data(user_profile, system_message):
    response = client.beta.chat.completions.parse(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": f"This is the user profile data {user_profile}"},
            ],
            response_format=output_format,
    )
    message = response.choices[0].message

    # if message.content: print("Assistant:", message.content)

    return message.content

def clean(data):
    parsed_data = json.loads(data)

    # Separate nutritional facts and suggestions
    schemes = parsed_data.get("schemes", [])

    return schemes

# system_message = "Your job is to help indian farmers with governemt schemes."
system_message = """
Your job is to help indian farmers with governemt schemes based on the user information provided.
the output has to be in the following format
    schemes: list[str, str]
    where the first element is the scheme name and the second element is the scheme description and the  third element is the scheme link.
"""

def get_schemes(user_profile):
    result = get_data(user_profile, system_message)
    result = clean(result)
    result = [result[i:i+3] for i in range(0, len(result), 3)]
    return result



if __name__ == "__main__":
    # user = take_input()
    # example
    user_profile = {
        "age": 25,
        "type of farming": "crop farming",
        "crop": "rice",
        "location": "karnataka",
        "land size": "10 acres",
        "ownership status": "owned",
        "income": 100000,
        "current financial needs": "loan",
        "challenges faced": "water shortage",
    }
    
    print("\nGenerating response...\n")
    print("\n")

    result = get_schemes(user_profile)
    print(result)
    for i in result:
        print("\n")
        print(i)

    print("----------------------------------------------------")