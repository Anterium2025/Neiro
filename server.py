from flask import Flask, request, jsonify, send_file
import torch
from diffusers import StableDiffusionPipeline
from PIL import Image
import io

app = Flask(__name__)

# Загрузка модели Stable Diffusion
model_id = "CompVis/stable-diffusion-v1-4"
pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16)
pipe = pipe.to("cuda")  # Используем GPU для ускорения

@app.route('/generate', methods=['POST'])
def generate_image():
    prompt = request.json.get('prompt')
    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400

    # Генерация изображения
    image = pipe(prompt).images[0]

    # Сохранение изображения в байтовый поток
    img_bytes = io.BytesIO()
    image.save(img_bytes, format='PNG')
    img_bytes.seek(0)

    return send_file(img_bytes, mimetype='image/png')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
