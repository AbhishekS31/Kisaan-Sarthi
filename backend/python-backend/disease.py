import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np
from openai import OpenAI
import os

client = OpenAI(
    base_url="https://api.groq.com/openai/v1",
    api_key=os.environ.get("GROQ_API_KEY")
)


def get_data(user_profile, system_message):
    response = client.beta.chat.completions.parse(
        # model="gpt-4o-mini",
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": f"This is the plant leaf image {user_profile}"},
            ],
            response_format=outptu_format,
    )
    message = response.choices[0].message

    # if message.content: print("Assistant:", message.content)

    return message.content



def predict_disease(image_path_):
    model = tf.keras.models.load_model("models/plant_disease_model.h5")

    img_path = image_path_  # path to the image you want to test
    img = image.load_img(img_path, target_size=(224, 224))  # Resize to match model input

    img_array = image.img_to_array(img)

    img_array = np.expand_dims(img_array, axis=0)

    img_array /= 255.0

    prediction = model.predict(img_array)

    predicted_class_index = np.argmax(prediction, axis=1)

    class_labels = ['Pepper__bell___Bacterial_spot', 'Tomato_Bacterial_spot', 'Tomato_Septoria_leaf_spot',
                    'Pepper__bell___healthy', 'Tomato_Early_blight', 'Tomato_Spider_mites_Two_spotted_spider_mite',
                    'Potato___Early_blight', 'Tomato_healthy', 'Tomato__Target_Spot',
                    'Potato___healthy', 'Tomato_Late_blight', 'Tomato__Tomato_mosaic_virus',
                    'Potato___Late_blight', 'Tomato_Leaf_Mold', 'Tomato__Tomato_YellowLeaf__Curl_Virus']

    predicted_class_label = class_labels[predicted_class_index[0]]

    print(f"The predicted disease is: {predicted_class_label}")

    return predicted_class_label


if __name__ == "__main__":
    image_path = "test.jpg"
    predict_disease(image_path)