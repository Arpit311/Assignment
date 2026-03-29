# Backend Setup Guide

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (optional but recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Backend

Start the FastAPI server:

```bash
python main.py
```

Or using uvicorn directly:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The server will be available at `http://localhost:8000`

## API Endpoints

### POST /pipelines/parse
Analyzes a pipeline for node/edge count and DAG validation.

**Request Body:**
```json
{
  "nodes": [
    {
      "id": "customInput-1",
      "type": "customInput",
      "data": { "inputName": "input_", "inputType": "Text" },
      "position": { "x": 100, "y": 100 }
    }
  ],
  "edges": [
    {
      "source": "customInput-1",
      "target": "text-1",
      "id": "customInput-1->text-1"
    }
  ]
}
```

**Response:**
```json
{
  "num_nodes": 2,
  "num_edges": 1,
  "is_dag": true
}
```

### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "ok"
}
```

## Features

- **Node Counting**: Counts total nodes in the pipeline
- **Edge Counting**: Counts total edges in the pipeline
- **DAG Validation**: Uses Kahn's algorithm to detect cycles and validate that the pipeline forms a directed acyclic graph
- **CORS Support**: Allows requests from the frontend

## Testing

You can test the backend using curl:

```bash
curl -X POST http://localhost:8000/pipelines/parse \
  -H "Content-Type: application/json" \
  -d '{
    "nodes": [{"id": "n1", "type": "input", "data": {}, "position": {"x": 0, "y": 0}}],
    "edges": []
  }'
```

Or test health:
```bash
curl http://localhost:8000/health
```
