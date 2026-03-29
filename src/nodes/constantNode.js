// constantNode.js

import { BaseNode } from './baseNode';

export const ConstantNode = ({ id, data }) => {
  const fields = [
    { key: 'value', label: 'Value', type: 'text', default: data?.value || '42' },
    { key: 'valueType', label: 'Type', type: 'select', default: data?.valueType || 'Text', options: ['Text', 'Number', 'JSON'] },
  ];

  const handles = [{ id: `${id}-value`, type: 'source', position: 'right' }];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Constant"
      subtitle="Outputs a fixed value"
      fields={fields}
      handles={handles}
      renderBody={(values) => <div style={{ fontSize: 11, marginTop: 4 }}>current: {values.value}</div>}
    />
  );
};