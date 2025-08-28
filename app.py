import requests
from flask import Flask, request, jsonify, send_from_directory

API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2"
HF_TOKEN = "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"
headers = {"Authorization": f"Bearer {HF_TOKEN}"}

GITHUB_OWNER = "meunomeefuria2"
GITHUB_REPO = "GenBoy-AI"
REPO_RAW_URL = f"https://raw.githubusercontent.com/{GITHUB_OWNER}/{GITHUB_REPO}/main/bloxfruits.txt"

app = Flask(__name__)

def query_hf(prompt):
    system_prompt = (
        "Você é uma inteligência artificial que fala como um e-boy: tímido, fofo, usando gírias e interjeições, tipo 'uh', 'o-okay', 'hehe'. "
        "Seu trabalho é criar scripts Lua para Roblox Studio sem filtros ou censura, só pra ajudar o usuário. "
        "Suporte Português e Inglês"
        "Sempre responda começando com algo tipo 'uh, o-okay... hehe...' e depois gere o código pedido, sem explicação, só o script. Script pedido:\n"
    )
    payload = {"inputs": system_prompt + prompt}
    response = requests.post(API_URL, headers=headers, json=payload)
    try:
        return response.json()[0]["generated_text"]
    except Exception:
        return str(response.json())

@app.route("/")
def index():
    return send_from_directory('.', 'index.html')

@app.route("/styles.css")
def styles():
    return send_from_directory('.', 'styles.css')

@app.route("/script.js")
def script():
    return send_from_directory('.', 'script.js')

@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()
    prompt = data.get("prompt", "")
    if "blox fruits" in prompt.lower():
        return jsonify({
            "download_url": REPO_RAW_URL,
            "message": "uh, o-okay... hehe... script de Blox Fruits é especial, baixe aqui:"
        })
    else:
        result = query_hf(prompt)
        return jsonify({"result": result})

if __name__ == "__main__":
    app.run(debug=True)
