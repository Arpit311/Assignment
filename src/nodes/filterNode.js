// filterNode.js

import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const FilterNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Filter"
      inputs={[
        { label: 'Text', type: 'text', defaultValue: '', key: 'text' },
        { label: 'Filter', type: 'select', options: ['Uppercase', 'Lowercase', 'Reverse'], defaultValue: 'Uppercase', key: 'filter' }
      ]}
      handles={[
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'output' }
      ]}
    />
  );
};