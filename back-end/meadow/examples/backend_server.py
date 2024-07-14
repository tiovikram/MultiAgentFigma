from flask import Flask
from flask import request
from flask import json

import argparse
import asyncio

from meadow import Client
from meadow.agent.controller import ControllerAgent
from meadow.agent.data_agents.attribute_detector import AttributeDetectorAgent
from meadow.agent.data_agents.planner_constraints import (
    attribute_detector_constraints,
    sql_agent_constraints,
)
from meadow.agent.data_agents.schema_renamer import SchemaRenamerAgent
from meadow.agent.data_agents.text2sql import SQLGeneratorAgent
from meadow.agent.planner import PlannerAgent
from meadow.agent.user import UserAgent
from meadow.agent.utils import print_message
from meadow.cache import DuckDBCache
from meadow.client.api.anthropic import AnthropicClient
from meadow.client.api.api_client import APIClient
from meadow.client.api.openai import OpenAIClient
from meadow.client.schema import LLMConfig
from meadow.database.connector.connector import Connector
from meadow.database.connector.duckdb import DuckDBConnector
from meadow.database.connector.sqlite import SQLiteConnector
from meadow.database.database import Database
from demo import run_meadow

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
    db_type = request.args.get('db_type', None)
    db_path = request.args.get('db_path', None)
    instruction = request.args.get('instruction', None)
    auto_advance = request.args.get('auto_advance', None)

    api_client = OpenAIClient(api_key=api_key)

    run_meadow(
        api_provider,
        api_key,
        db_type,
        db_path,
        model,
        instruction,
        auto_advance,
    )

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
