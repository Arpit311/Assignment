// mathNode.js

import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const MathNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Math"
      inputs={[
        { label: 'A', type: 'number', defaultValue: 0, key: 'a' },
        { label: 'B', type: 'number', defaultValue: 0, key: 'b' },
        { label: 'Operation', type: 'select', options: ['+', '-', '*', '/'], defaultValue: '+', key: 'operation' }
      ]}
      handles={[
        { type: 'target', position: Position.Left, id: 'a' },
        { type: 'target', position: Position.Left, id: 'b', style: { top: '50%' } },
        { type: 'source', position: Position.Right, id: 'result' }
      ]}
    />
  );
};