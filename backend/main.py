from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from collections import defaultdict, deque

app = FastAPI()

# Enable CORS to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Node(BaseModel):
    id: str
    type: str
    data: Dict[str, Any]
    position: Dict[str, float]


class Edge(BaseModel):
    source: str
    target: str
    id: str


class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]


def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Check if the pipeline forms a directed acyclic graph (DAG).
    Uses topological sort with cycle detection.
    """
    if not edges:
        return True
    
    # Build adjacency list
    graph = defaultdict(list)
    in_degree = defaultdict(int)
    node_ids = {node.id for node in nodes}
    
    for node in nodes:
        in_degree[node.id] = 0
    
    for edge in edges:
        # Ignore edges with invalid node references
        if edge.source not in node_ids or edge.target not in node_ids:
            continue
        graph[edge.source].append(edge.target)
        in_degree[edge.target] += 1
    
    # Kahn's algorithm for topological sort
    queue = deque([node_id for node_id in node_ids if in_degree[node_id] == 0])
    sorted_count = 0
    
    while queue:
        node = queue.popleft()
        sorted_count += 1
        
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If we sorted all nodes, it's a DAG; otherwise, there's a cycle
    return sorted_count == len(node_ids)


@app.post("/pipelines/parse")
async def parse_pipeline(pipeline: Pipeline):
    """
    Parse a pipeline and return stats about nodes, edges, and DAG validation.
    """
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_valid_dag = is_dag(pipeline.nodes, pipeline.edges)
    
    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_valid_dag,
    }


@app.get("/health")
async def health():
    """Health check endpoint."""
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
