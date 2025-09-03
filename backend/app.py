from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)

# Load both files
with open("pipe.pkl", "rb") as f:
    pipe = pickle.load(f)

with open("df.pkl", "rb") as f:
    df = pickle.load(f)   # this can be your original DataFrame with training data or column info

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    input_df = pd.DataFrame([{
        "Company": data.get("Company"),
        "TypeName": data.get("TypeName"),
        "Ram": data.get("Ram"),
        "Weight": data.get("Weight"),
        "TouchScreen": data.get("TouchScreen"),
        "IPS": data.get("IPS"),
        "ppi": data.get("ppi"),
        "Cpu brand": data.get("Cpu brand"),
        "HDD": data.get("HDD"),
        "SSD": data.get("SSD"),
        "Gpu brand": data.get("Gpu brand"),
        "os": data.get("os"),
    }])

    # Exclude 'Price' from columns
    feature_cols = df.drop(columns=["Price"]).columns
    input_df = input_df[feature_cols]

    log_pred = float(pipe.predict(input_df)[0])
    price = float(np.exp(log_pred))

    return jsonify({"predicted_price": round(price, 0)})

if __name__ == "__main__":
    app.run(debug=True)
