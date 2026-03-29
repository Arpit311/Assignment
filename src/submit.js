// submit.js

import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);

    const handleSubmit = async () => {
        if (nodes.length === 0) {
            alert('Please add at least one node to your pipeline');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nodes: nodes.map(node => ({
                        id: node.id,
                        type: node.type,
                        data: node.data,
                        position: node.position,
                    })),
                    edges: edges.map(edge => ({
                        source: edge.source,
                        target: edge.target,
                        id: edge.id,
                    })),
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            // Display user-friendly alert
            const dagStatus = result.is_dag ? 'Yes' : 'No';
            const message = `Pipeline Analysis Results\n\nTotal Nodes: ${result.num_nodes}\nTotal Edges: ${result.num_edges}\nIs DAG: ${dagStatus}`;
            
            alert(message);
        } catch (error) {
            console.error('Error:', error);
            alert(`Error submitting pipeline: ${error.message}\n\nMake sure the backend is running on http://localhost:8000`);
        }
    };

    return (
        <div style={{
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '24px',
            backgroundColor: '#FFFFFF',
            borderTop: '2px solid #E5E7EB',
        }}>
            <button 
                type="submit"
                onClick={handleSubmit}
                style={{
                    backgroundColor: '#10B981',
                    color: 'white',
                    padding: '12px 32px',
                    fontSize: '14px',
                    fontWeight: '600',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 150ms ease-in-out',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
                onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#059669';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1)';
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#10B981';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
                }}
                onMouseDown={(e) => {
                    e.target.style.transform = 'translateY(0)';
                }}
                onMouseUp={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                }}
            >
                Submit Pipeline
            </button>
        </div>
    );
}
