// joinNode.js

import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const JoinNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Join"
      inputs={[
        { label: 'Text1', type: 'text', defaultValue: '', key: 'text1' },
        { label: 'Text2', type: 'text', defaultValue: '', key: 'text2' },
        { label: 'Separator', type: 'text', defaultValue: ' ', key: 'separator' }
      ]}
      handles={[
        { type: 'target', position: Position.Left, id: 'input1' },
        { type: 'target', position: Position.Left, id: 'input2', style: { top: '50%' } },
        { type: 'source', position: Position.Right, id: 'output' }
      ]}
    >
      <div style={{ marginTop: 10, fontSize: 10 }}>
        Joins texts with separator
      </div>
    </BaseNode>
  );
};