// splitNode.js

import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const SplitNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Split"
      inputs={[
        { label: 'Text', type: 'text', defaultValue: 'hello world', key: 'text' },
        { label: 'Separator', type: 'text', defaultValue: ' ', key: 'separator' }
      ]}
      handles={[
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'output' }
      ]}
    >
      <div style={{ marginTop: 10, fontSize: 10 }}>
        Splits text into parts
      </div>
    </BaseNode>
  );
};