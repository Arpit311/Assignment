// displayNode.js

import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const DisplayNode = ({ id, data }) => {
  // Note: In a real app, this would connect to the input value, but for demo, just show the input
  const displayText = data?.text || 'Display';

  return (
    <BaseNode
      id={id}
      data={data}
      title="Display"
      inputs={[
        { label: 'Text', type: 'text', defaultValue: 'Hello World', key: 'text' }
      ]}
      handles={[
        { type: 'target', position: Position.Left, id: 'input' }
      ]}
    >
      <div style={{ marginTop: 10, fontSize: 12 }}>
        <strong>Output:</strong> {displayText}
      </div>
    </BaseNode>
  );
};