from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import StandardScaler
from flask_cors import CORS
import logging
import json

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.DEBUG)

@app.route('/extract-columns', methods=['POST'])
def extract_columns():
    try:
        if 'file' not in request.files:
            logging.error('No file part in the request')
            return jsonify({'error': 'No file part in the request'}), 400

        file = request.files['file']

        if not file.filename.endswith('.csv'):
            logging.error('Uploaded file is not a CSV')
            return jsonify({'error': 'Only CSV files are supported'}), 400

        df = pd.read_csv(file)
        new_df = df.iloc[:, :-1]
        columns = new_df.columns.tolist()

        return jsonify({'columns': columns})

    except Exception as e:
        logging.error(f"An error occurred: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if 'file' not in request.files or 'algorithm' not in request.form or 'column_values' not in request.form:
            return jsonify({'error': 'File, algorithm, and column_values must be provided'}), 400

        file = request.files['file']
        algorithm = request.form.get('algorithm')
        column_values = json.loads(request.form.get('column_values'))

        if not file.filename.endswith('.csv'):
            return jsonify({'error': 'Only CSV files are supported'}), 400

        df = pd.read_csv(file)

        target_column = request.form.get('target_column', df.columns[-1])
        X = df.drop(columns=[target_column])
        y = df[target_column]
        X = pd.get_dummies(X)

        missing_columns = [col for col in X.columns if col not in column_values]
        if missing_columns:
            return jsonify({'error': f'Missing columns in the dataset: {missing_columns}'}), 400

        selected_values = [column_values.get(col, X[col].mean()) for col in X.columns]
        prediction_input = pd.DataFrame([selected_values], columns=X.columns)

        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)
        prediction_input_scaled = scaler.transform(prediction_input)

        if algorithm == 'RF':
            model = RandomForestClassifier()
        elif algorithm == 'LR':
            model = LogisticRegression(max_iter=1000)
        elif algorithm == 'DT':
            model = DecisionTreeClassifier()
        else:
            return jsonify({'error': 'Unsupported algorithm'}), 400

        X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)
        model.fit(X_train, y_train)
        prediction = model.predict(prediction_input_scaled)[0]
        accuracy = model.score(X_test, y_test)

        # Convert the prediction to a JSON-serializable format
        if isinstance(prediction, (int, float)):
            prediction = float(prediction)  # Convert int to float
        elif isinstance(prediction, np.int64):
            prediction = int(prediction)  # Convert np.int64 to int

        # Convert the DataFrame to a serializable format
        dataset = df.applymap(lambda x: x if isinstance(x, (str, float, int)) else str(x)).to_dict(orient='records')

        return jsonify({
            'accuracy': float(accuracy),
            'prediction': prediction,
            'dataset': dataset
        })

    except Exception as e:
        logging.error(f"An error occurred: {e}", exc_info=True)
        return jsonify({'error': 'An internal server error occurred'}), 500
    
if __name__ == '__main__':
    app.run(debug=True)
