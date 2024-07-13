from flask import Flask
from flask import request
from flask import json

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, AGI House!</p>"


@app.route('/execute_demo', methods=['GET'])
def execute_demo():
    api_provider = request.args.get('api_provider', 'openai')
    api_key = request.args.get('api_key', None)
    model = request.args.get('model', None)
    selected_available_agents = request.args.get('selected_available_agents', None)

    data = {
        'api_provider': api_provider,
        'api_key': api_key,
        'model': model,
        'selected_available_agents': selected_available_agents,
        'meadow_response': 'This response will be updated after meadow integration',
    }
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response
