// mathNode.js

import { BaseNode } from './baseNode';

export const MathNode = ({ id, data }) => {
  const fields = [
    { key: 'a', label: 'A', type: 'text', default: data?.a || '0' },
    { key: 'b', label: 'B', type: 'text', default: data?.b || '0' },
    { key: 'operator', label: 'Op', type: 'select', default: data?.operator || '+', options: ['+', '-', '*', '/'] },
  ];

  const handles = [
    { id: `${id}-inA`, type: 'target', position: 'left', style: { top: '30%' } },
    { id: `${id}-inB`, type: 'target', position: 'left', style: { top: '60%' } },
    { id: `${id}-out`, type: 'source', position: 'right' },
  ];

  const evaluate = (values) => {
    const a = Number(values.a) || 0;
    const b = Number(values.b) || 0;
    switch (values.operator) {
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b !== 0 ? a / b : 'NaN';
      default: return a + b;
    }
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Math"
      subtitle="Simple arithmetic"
      fields={fields}
      handles={handles}
      renderBody={(values) => <div style={{ fontSize: 11, marginTop: 4 }}>result: {evaluate(values)}</div>}
    />
  );
};