# MultiAgentFigma

cd meadow
make install

poetry run python examples/demo.py \
  --api-key API_KEY \
  --db-path examples/data/sales_example.sqlite



# Running backend server
cd back-end

[start virtual environment]

pip install -r requirements.txt
flask --app backend_server --debug run

http://127.0.0.1:5000/
http://127.0.0.1:5000/execute_demo?model=gpt4o