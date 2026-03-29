// filterNode.js

import { BaseNode } from './baseNode';

export const FilterNode = ({ id, data }) => {
  const fields = [
    { key: 'condition', label: 'Condition', type: 'select', default: data?.condition || 'equals', options: [
      { value: 'equals', label: 'Equals' },
      { value: 'contains', label: 'Contains' },
      { value: 'startsWith', label: 'Starts With' },
    ] },
    { key: 'pattern', label: 'Pattern', type: 'text', default: data?.pattern || '' },
  ];

  const handles = [
    { id: `${id}-in`, type: 'target', position: 'left' },
    { id: `${id}-out`, type: 'source', position: 'right' },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Filter"
      subtitle="Route by condition"
      fields={fields}
      handles={handles}
    />
  );
};