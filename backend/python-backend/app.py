from flask import Flask, request, jsonify
import os
import json
from VoiceChat import VoiceChat
from flask_cors import CORS
import schemes
# from disease import predict_disease
import disea
from fertilizers import fertilizer_recommendation
from crop import crop_recommendation
from marketplace import marketplace
from news import news

app = Flask(__name__)
CORS(app)



UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def index():
    return "Hello, World!"


# @app.route('/get_news', methods=['POST'])
# def get_news():
#     # Ensure you are receiving JSON
#     print("received news request")
#     if request.is_json:
#         data = request.get_json()  # Get JSON data
#         # You can process the data here if needed
#         # print(data)  # For debugging or handling
#         result = news()
#         print(result)  # For debugging or handling
#         return jsonify(result)
#         # return jsonify({"status": "success", "data_received": data}), 200
#     else:
#         return jsonify({"status": "error", "message": "Invalid JSON"}), 400

@app.route('/api/news', methods=['GET'])
def get_news():
    # Your data here
    print("News request received")
    data = news()
    return data




@app.route('/get_crop', methods=['POST'])
def get_crop():
    # Ensure you are receiving JSON
    if request.is_json:
        data = request.get_json()  # Get JSON data
        # You can process the data here if needed
        print(data)  # For debugging or handling
        result = crop_recommendation(data)
        print(result)  # For debugging or handling
        return jsonify(result)
        # return jsonify({"status": "success", "data_received": data}), 200
    else:
        return jsonify({"status": "error", "message": "Invalid JSON"}), 400


@app.route('/get_marketplace', methods=['POST'])
def get_marketplace():
    # Ensure you are receiving JSON
    if request.is_json:
        data = request.get_json()  # Get JSON data
        # You can process the data here if needed
        print(data)  # For debugging or handling
        result = marketplace(data)
        print(result)  # For debugging or handling
        return jsonify(result)
        # return jsonify({"status": "success", "data_received": data}), 200
    else:
        return jsonify({"status": "error", "message": "Invalid JSON"}), 400






@app.route('/get_fertilizers', methods=['POST'])
def get_fertilizers():
    # Ensure you are receiving JSON
    if request.is_json:
        data = request.get_json()  # Get JSON data
        # You can process the data here if needed
        print(data)  # For debugging or handling
        result = fertilizer_recommendation(data)
        print(result)  # For debugging or handling
        return jsonify(result)
        # return jsonify({"status": "success", "data_received": data}), 200
    else:
        return jsonify({"status": "error", "message": "Invalid JSON"}), 400



@app.route('/get_schemes', methods=['POST'])
def get_schemes():
    # Ensure you are receiving JSON
    if request.is_json:
        data = request.get_json()  # Get JSON data
        # You can process the data here if needed
        print(data)  # For debugging or handling
        result = schemes.get_schemes(data)
        print(result)  # For debugging or handling
        return jsonify(result)
        # return jsonify({"status": "success", "data_received": data}), 200
    else:
        return jsonify({"status": "error", "message": "Invalid JSON"}), 400


@app.route('/identify_disease', methods=['POST'])
def identify_disease():
    print("Received disease identification request")
    # Ensure you are receiving JSON
    if 'image' not in request.files:
        return jsonify({'status': 'error', 'message': 'No image file provided'}), 400

    image = request.files['image']

    if image.filename == '':
        return jsonify({'status': 'error', 'message': 'No selected file'}), 400

    # Save the image to the uploads folder
    image_path = os.path.join(UPLOAD_FOLDER, image.filename)
    image.save(image_path)

    # result = predict_disease(image_path)
    result = disea.predict_disease(image_path)

    # return jsonify({'status': 'success', 'message': 'Image saved', 'image_path': image_path}), 200
    return jsonify(result)







@app.route('/upload_audio', methods=['POST'])
def upload_audio():
    try:
        if 'audio' not in request.files:
            return jsonify({"error": "No audio file received"}), 400  # Returns JSON error

        audio_file = request.files['audio']
        print("Received audio file:", audio_file.filename)

        # Save the audio file
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], audio_file.filename)
        audio_file.save(file_path)
        print("Audio file saved at:", file_path)

        result = VoiceChat(file_path)

        

        # Simulated response data
        response_data = {
            "message": f"{result}",
        }

        return jsonify(response_data)  # Ensure JSON response

    except Exception as e:
        return jsonify({"error": str(e)}), 500  # Catch errors & return JSON




if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)