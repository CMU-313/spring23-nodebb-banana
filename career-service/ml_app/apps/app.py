from flask import Flask, abort, jsonify, request
import joblib
import pandas as pd
import numpy as np
from flask_inputs import Inputs
from flask_inputs.validators import JsonSchema

app = Flask(__name__)

student_schema = {
   'type': 'object',
   'properties': {
       'name': { 'type': 'string' }, 
       'email': { 'type': 'string' }, 
       'age': { 'type': 'number', 'minimum': 0 }, 
       'gender': { 'type': 'string' }, 
    },
    'required': []
}

class StudentInputs(Inputs):
    json = [JsonSchema(schema=student_schema)]

def set_required(required):
    student_schema['required'] = required

def validate_student(request):
    inputs = StudentInputs(request)
    inputs_valid = inputs.validate()
    if inputs_valid:
        return None
    else:
        return inputs.errors

# Error Handlers
@app.errorhandler(404)
def page_not_found(e):
    return jsonify(error=str(e)), 404

@app.errorhandler(400)
def invalid_input(e):
    return jsonify(error=str(e)), 400

# Routes
@app.route('/')
def hello():
    return jsonify(message='Try the predict route it is great!')

@app.route('/predict', methods=['POST'])
def predict():
    errors = validate_student(request)
    if errors is not None:
        print(errors)
        abort(400, description=errors)

    # feature_vals = request.json
    # data = {}
    # for i in range(len(feature_names)):
    #     feature = feature_names[i]
    #     try:
    #         arg = feature_vals[feature]
    #         data[feature] = pd.Series(arg)
    #     except:
    #         abort(400, description=f"Request argument {feature} not found")
    
    # query_df = pd.DataFrame(data)
    # query = pd.get_dummies(query_df)
    # prediction = clf.predict(query)
    return jsonify(job_candidate=0) #prediction.item())

if __name__ == '__main__':
    [clf, feature_names] = joblib.load('/apps/model.pkl')
    # set_required(feature_names)
    app.run(host="0.0.0.0", port=6000, debug=True)
