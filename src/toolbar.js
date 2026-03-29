// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ 
            padding: '16px 24px', 
            backgroundColor: '#FFFFFF',
            borderBottom: '2px solid #E5E7EB',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        }}>
            <div style={{ marginBottom: '12px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#111827' }}>
                    Pipeline Builder
                </h2>
                <p style={{ fontSize: '12px', color: '#6B7280', margin: '4px 0 0 0' }}>
                    Drag nodes to build your pipeline
                </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='constant' label='Constant' />
                <DraggableNode type='math' label='Math' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='logger' label='Logger' />
                <DraggableNode type='apiRequest' label='API Request' />
            </div>
        </div>
    );
};
