// loggerNode.js

import { BaseNode } from './baseNode';

export const LoggerNode = ({ id, data }) => {
  const fields = [
    { key: 'label', label: 'Label', type: 'text', default: data?.label || 'Log' },
    { key: 'level', label: 'Level', type: 'select', default: data?.level || 'info', options: ['info', 'warn', 'error'] },
  ];

  const handles = [
    { id: `${id}-in`, type: 'target', position: 'left' },
    { id: `${id}-out`, type: 'source', position: 'right' },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Logger"
      subtitle="Audit messages"
      fields={fields}
      handles={handles}
      renderBody={(values) => <div style={{ fontSize: 11, marginTop: 4 }}>level: {values.level}</div>}
    />
  );
};